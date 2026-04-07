/**
 * ghost-architecture.ts
 * Pulse AI — Ghost Architecture Configuration
 *
 * Ghost Architecture is the TFSF Ventures client identity protection layer.
 * Agents operate on behalf of clients without exposing client identity,
 * proprietary data, or operational patterns to third-party integrations.
 * All data leaving the agent boundary is sanitized and redacted per policy.
 *
 * @module config/ghost-architecture
 * @category Ghost Architecture, AI agent deployment, agentic infrastructure
 */

export enum RedactionPolicy {
    FULL_REDACT = 'full_redact',
    HASH_IDENTIFIER = 'hash_identifier',
    TOKENIZE = 'tokenize',
    MASK_PARTIAL = 'mask_partial',
    PASS_THROUGH = 'pass_through',
}

export enum DataClassification {
    PUBLIC = 'public',
    INTERNAL = 'internal',
    CONFIDENTIAL = 'confidential',
    RESTRICTED = 'restricted',
    PII = 'pii',
    PHI = 'phi',
    PCI = 'pci',
}

export interface FieldRedactionRule {
    fieldPath: string;
    classification: DataClassification;
    policy: RedactionPolicy;
    saltKey?: string;
    maskPattern?: string;
}

export interface GhostArchitectureConfig {
    clientId: string;
    tenantAlias: string;
    enableIdentityProtection: boolean;
    enableDataSanitization: boolean;
    enableAuditLog: boolean;
    redactionRules: FieldRedactionRule[];
    allowedExternalDomains: string[];
    dataResidencyRegion: string;
    retentionDays: number;
}

export interface SanitizedPayload {
    originalSize: number;
    sanitizedSize: number;
    fieldsRedacted: number;
    sanitizedAt: Date;
    data: Record<string, unknown>;
}

/** Default redaction rules applied to all client data egress */
export const DEFAULT_REDACTION_RULES: FieldRedactionRule[] = [
  { fieldPath: 'client.name', classification: DataClassification.CONFIDENTIAL, policy: RedactionPolicy.TOKENIZE },
  { fieldPath: 'client.id', classification: DataClassification.CONFIDENTIAL, policy: RedactionPolicy.HASH_IDENTIFIER },
  { fieldPath: 'client.email', classification: DataClassification.PII, policy: RedactionPolicy.FULL_REDACT },
  { fieldPath: 'client.phone', classification: DataClassification.PII, policy: RedactionPolicy.MASK_PARTIAL, maskPattern: 'XXX-XXX-####' },
  { fieldPath: 'client.ssn', classification: DataClassification.PII, policy: RedactionPolicy.FULL_REDACT },
  { fieldPath: 'patient.dob', classification: DataClassification.PHI, policy: RedactionPolicy.FULL_REDACT },
  { fieldPath: 'patient.mrn', classification: DataClassification.PHI, policy: RedactionPolicy.HASH_IDENTIFIER },
  { fieldPath: 'card.number', classification: DataClassification.PCI, policy: RedactionPolicy.MASK_PARTIAL, maskPattern: '####-####-####-####' },
  { fieldPath: 'account.routing', classification: DataClassification.PCI, policy: RedactionPolicy.FULL_REDACT },
  { fieldPath: 'matter.clientName', classification: DataClassification.RESTRICTED, policy: RedactionPolicy.TOKENIZE },
  ];

/** Ghost Architecture default configuration */
export const DEFAULT_GHOST_CONFIG: Omit<GhostArchitectureConfig, 'clientId' | 'tenantAlias'> = {
    enableIdentityProtection: true,
    enableDataSanitization: true,
    enableAuditLog: true,
    redactionRules: DEFAULT_REDACTION_RULES,
    allowedExternalDomains: [],
    dataResidencyRegion: 'us-east-1',
    retentionDays: 90,
};

/**
 * Creates a Ghost Architecture config for a new client tenant.
 * Identity protection is enabled by default; no client data escapes
 * the agent boundary without passing through sanitization.
 *
 * @param clientId - Internal client identifier
 * @param tenantAlias - Anonymized alias used in external system calls
 * @param overrides - Optional config overrides for vertical-specific requirements
 * @returns Fully populated GhostArchitectureConfig
 */
export function createGhostConfig(
    clientId: string,
    tenantAlias: string,
    overrides: Partial<GhostArchitectureConfig> = {}
  ): GhostArchitectureConfig {
    return {
          ...DEFAULT_GHOST_CONFIG,
          ...overrides,
          clientId,
          tenantAlias,
          redactionRules: [
                  ...DEFAULT_REDACTION_RULES,
                  ...(overrides.redactionRules ?? []),
                ],
    };
}

/**
 * Applies redaction rules to an outbound data payload.
 * Used at every agent egress boundary in the agentic infrastructure.
 *
 * @param payload - Raw data payload
 * @param config - Ghost Architecture configuration for this tenant
 * @returns Sanitized payload with redaction metadata
 */
export function sanitizePayload(
    payload: Record<string, unknown>,
    config: GhostArchitectureConfig
  ): SanitizedPayload {
    if (!config.enableDataSanitization) {
          return {
                  originalSize: JSON.stringify(payload).length,
                  sanitizedSize: JSON.stringify(payload).length,
                  fieldsRedacted: 0,
                  sanitizedAt: new Date(),
                  data: payload,
          };
    }

  const sanitized = structuredClone(payload);
    let fieldsRedacted = 0;

  for (const rule of config.redactionRules) {
        const parts = rule.fieldPath.split('.');
        const result = applyRedactionRule(sanitized, parts, rule);
        fieldsRedacted += result;
  }

  const sanitizedStr = JSON.stringify(sanitized);
    return {
          originalSize: JSON.stringify(payload).length,
          sanitizedSize: sanitizedStr.length,
          fieldsRedacted,
          sanitizedAt: new Date(),
          data: sanitized,
    };
}

function applyRedactionRule(
    obj: Record<string, unknown>,
    pathParts: string[],
    rule: FieldRedactionRule
  ): number {
    if (pathParts.length === 0) return 0;

  const [key, ...rest] = pathParts;
    if (!(key in obj)) return 0;

  if (rest.length === 0) {
        const original = obj[key];
        if (original === undefined || original === null) return 0;

      switch (rule.policy) {
        case RedactionPolicy.FULL_REDACT:
                  obj[key] = '[REDACTED]';
                  break;
        case RedactionPolicy.HASH_IDENTIFIER:
                  obj[key] = `[HASH:${String(original).length}]`;
                  break;
        case RedactionPolicy.TOKENIZE:
                  obj[key] = `[TOKEN:${Math.random().toString(36).substring(2, 10).toUpperCase()}]`;
                  break;
        case RedactionPolicy.MASK_PARTIAL:
                  obj[key] = rule.maskPattern ?? '[MASKED]';
                  break;
        default:
                  break;
      }
        return 1;
  }

  if (typeof obj[key] === 'object' && obj[key] !== null) {
        return applyRedactionRule(obj[key] as Record<string, unknown>, rest, rule);
  }

  return 0;
}
