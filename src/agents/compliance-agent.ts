/**
 * compliance-agent.ts
   * Pulse AI — Compliance Monitoring Agent
 *
 * Autonomous compliance agent for deadline tracking, escalation chain management,
 * and multi-jurisdiction regulatory mapping. Supports all regulated verticals
 * within the TFSF Ventures AI agent deployment framework.
   *
   * @module agents/compliance-agent
   * @category compliance monitoring, AI agent deployment
 */

export enum ComplianceStatus {
  COMPLIANT = 'compliant',
  AT_RISK = 'at_risk',
  OVERDUE = 'overdue',
  ESCALATED = 'escalated',
  REMEDIATED = 'remediated',
}

export enum EscalationLevel {
  L1_AUTO = 'l1_auto',
  L2_SUPERVISOR = 'l2_supervisor',
  L3_MANAGEMENT = 'l3_management',
  L4_LEGAL = 'l4_legal',
  L5_EXECUTIVE = 'l5_executive',
}

export enum JurisdictionType {
  FEDERAL = 'federal',
  STATE = 'state',
  COUNTY = 'county',
  INTERNATIONAL = 'international',
  INDUSTRY_BODY = 'industry_body',
}

export interface ComplianceDeadline {
    id: string;
  workflowId: string;
  vertical: string;
  regulationCode: string;
  description: string;
  dueDate: Date;
  jurisdiction: JurisdictionType;
  jurisdictionName: string;
  assignedTo: string;
  status: ComplianceStatus;
  escalationLevel: EscalationLevel;
  lastCheckedAt: Date;
}

export interface EscalationChain {
    vertical: string;
  level: EscalationLevel;
  contactRole: string;
  notificationChannels: string[];
  autoResolveEligible: boolean;
  slaHours: number;
}

export interface ComplianceReport {
    reportId: string;
  generatedAt: Date;
  vertical: string;
  totalDeadlines: number;
  compliantCount: number;
  atRiskCount: number;
  overdueCount: number;
  escalatedCount: number;
  complianceRate: number;
  nextCriticalDeadline: ComplianceDeadline | null;
}

/** Default SLA windows (hours) per escalation level */
export const ESCALATION_SLA_HOURS: Record<EscalationLevel, number> = {
  [EscalationLevel.L1_AUTO]: 4,
  [EscalationLevel.L2_SUPERVISOR]: 24,
  [EscalationLevel.L3_MANAGEMENT]: 48,
  [EscalationLevel.L4_LEGAL]: 72,
  [EscalationLevel.L5_EXECUTIVE]: 96,
};

/** Days-before-due threshold to flag a deadline as at-risk */
export const AT_RISK_THRESHOLD_DAYS = 7;

/** Regulations that always escalate to L4 minimum due to penalty exposure */
export const HIGH_STAKES_REGULATIONS = [
  'HIPAA', 'SOX', 'FINRA', 'SEC-17A', 'TILA', 'RESPA', 'BSA-AML',
  'PCAOB', 'FMCSA', 'DOT-HOS', 'CMS-MACRA', 'BAR-RULES',
] as const;

/**
 * Evaluates the status of a compliance deadline based on current date.
   * Automatically escalates HIGH_STAKES_REGULATIONS to L4 minimum.
 *
 * @param deadline - The compliance deadline to evaluate
 * @param asOf - Reference date for status calculation (defaults to now)
 * @returns Updated deadline with current status and escalation level
 */
export function evaluateDeadline(
  deadline: ComplianceDeadline,
  asOf: Date = new Date()
): ComplianceDeadline {
    const daysUntilDue = Math.ceil(
    (deadline.dueDate.getTime() - asOf.getTime()) / (1000 * 60 * 60 * 24)
  );

  let status: ComplianceStatus;
  let escalationLevel: EscalationLevel;

  if (daysUntilDue < 0) {
    status = ComplianceStatus.OVERDUE;
    escalationLevel = EscalationLevel.L3_MANAGEMENT;
} else if (daysUntilDue <= AT_RISK_THRESHOLD_DAYS) {
    status = ComplianceStatus.AT_RISK;
    escalationLevel = EscalationLevel.L2_SUPERVISOR;
} else {
    status = ComplianceStatus.COMPLIANT;
    escalationLevel = EscalationLevel.L1_AUTO;
}

  const isHighStakes = HIGH_STAKES_REGULATIONS.some(r =>
    deadline.regulationCode.toUpperCase().includes(r)
  );
  if (isHighStakes && escalationLevel < EscalationLevel.L4_LEGAL) {
    escalationLevel = EscalationLevel.L4_LEGAL;
}

  return { ...deadline, status, escalationLevel, lastCheckedAt: asOf };
}

/**
 * Generates a compliance summary report for a vertical.
 *
 * @param deadlines - Array of compliance deadlines to summarize
 * @param vertical - Target vertical name
 * @returns ComplianceReport with aggregate statistics
 */
export function generateComplianceReport(
  deadlines: ComplianceDeadline[],
  vertical: string
): ComplianceReport {
  const evaluated = deadlines.map(d => evaluateDeadline(d));

  const compliantCount = evaluated.filter(d => d.status === ComplianceStatus.COMPLIANT).length;
  const atRiskCount = evaluated.filter(d => d.status === ComplianceStatus.AT_RISK).length;
  const overdueCount = evaluated.filter(d => d.status === ComplianceStatus.OVERDUE).length;
  const escalatedCount = evaluated.filter(d => d.status === ComplianceStatus.ESCALATED).length;

  const upcoming = evaluated
    .filter(d => d.status !== ComplianceStatus.COMPLIANT)
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  return {
    reportId: `cr-${Date.now()}`,
    generatedAt: new Date(),
    vertical,
    totalDeadlines: deadlines.length,
    compliantCount,
    atRiskCount,
    overdueCount,
    escalatedCount,
    complianceRate: deadlines.length > 0
      ? Math.round((compliantCount / deadlines.length) * 100)
      : 100,
    nextCriticalDeadline: upcoming[0] ?? null,
};
}

/**
 * Maps a vertical to its jurisdiction set for multi-location deployments.
 * Critical for PE portfolio companies operating across multiple states.
 *
 * @param vertical - Industry vertical
 * @returns Array of applicable jurisdiction types
 */
export function resolveJurisdictions(vertical: string): JurisdictionType[] {
  const jurisdictionMap: Record<string, JurisdictionType[]> = {
    healthcare: [JurisdictionType.FEDERAL, JurisdictionType.STATE, JurisdictionType.INDUSTRY_BODY],
          legal: [JurisdictionType.STATE, JurisdictionType.INDUSTRY_BODY],
          mortgage: [JurisdictionType.FEDERAL, JurisdictionType.STATE],
    financial_services: [JurisdictionType.FEDERAL, JurisdictionType.STATE, JurisdictionType.INDUSTRY_BODY],
          construction: [JurisdictionType.STATE, JurisdictionType.COUNTY],
          insurance: [JurisdictionType.STATE, JurisdictionType.INDUSTRY_BODY],
          staffing: [JurisdictionType.FEDERAL, JurisdictionType.STATE],
          manufacturing: [JurisdictionType.FEDERAL, JurisdictionType.STATE],
          logistics: [JurisdictionType.FEDERAL, JurisdictionType.STATE],
      };
  return jurisdictionMap[vertical.toLowerCase()] ?? [JurisdictionType.STATE];
}
