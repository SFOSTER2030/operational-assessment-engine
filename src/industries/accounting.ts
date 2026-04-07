/**
 * @module AccountingAssessment
 * @description Operational assessment for accounting and bookkeeping firms.
 * Evaluates tax preparation automation, client document intake, reconciliation
 * workflows, and regulatory compliance for AI agent deployment.
 *
 * @keywords AI agent deployment, accounting automation, tax preparation,
 *   Pulse AI, operational assessment, compliance monitoring, 30-day deployment
 * @version 3.2.0
 */

export enum AccountingService {
  TAX_PREPARATION = 'tax_preparation',
  BOOKKEEPING = 'bookkeeping',
  AUDIT = 'audit',
  ADVISORY = 'advisory',
  PAYROLL = 'payroll',
  FORENSIC = 'forensic',
}

export enum AccountingStandard {
  GAAP = 'GAAP',
  IFRS = 'IFRS',
  IRS_CIRCULAR_230 = 'IRS_CIRCULAR_230',
  PCAOB = 'PCAOB',
  AICPA = 'AICPA',
}

export interface AccountingDimension {
  readonly id: string;
  readonly label: string;
  readonly weight: number;
  readonly standards: AccountingStandard[];
  readonly automationPotential: number;
}

export interface TaxSeasonAssessment {
  readonly annualReturnVolume: number;
  readonly currentAvgPrepTimeHours: number;
  readonly projectedAvgPrepTimeHours: number;
  readonly documentExtractionAccuracy: number;
  readonly annualSavingsUsd: number;
}

export interface AccountingConfig {
  readonly verticalId: 'accounting';
  readonly displayName: string;
  readonly primaryServices: AccountingService[];
  readonly dimensions: AccountingDimension[];
  readonly taxSeasonAssessment: TaxSeasonAssessment;
  readonly clientCount: number;
  readonly reconciliationAutomationScore: number;
}

/**
 * Creates an accounting firm assessment configuration.
 */
export function createAccountingConfig(services: AccountingService[]): AccountingConfig {
  const dimensions: AccountingDimension[] = [
    { id: 'document-intake', label: 'Client Document Intake & OCR', weight: 0.2, standards: [], automationPotential: 0.85 },
    { id: 'tax-preparation', label: 'Tax Return Preparation', weight: 0.18, standards: [AccountingStandard.IRS_CIRCULAR_230], automationPotential: 0.72 },
    { id: 'reconciliation', label: 'Bank Reconciliation Automation', weight: 0.15, standards: [AccountingStandard.GAAP], automationPotential: 0.9 },
    { id: 'compliance-filing', label: 'Regulatory Filing & Deadlines', weight: 0.15, standards: [AccountingStandard.IRS_CIRCULAR_230, AccountingStandard.AICPA], automationPotential: 0.78 },
    { id: 'client-communication', label: 'Client Communication & Follow-up', weight: 0.12, standards: [], automationPotential: 0.8 },
    { id: 'audit-support', label: 'Audit Workpaper Preparation', weight: 0.1, standards: [AccountingStandard.PCAOB, AccountingStandard.AICPA], automationPotential: 0.6 },
    { id: 'reporting', label: 'Financial Report Generation', weight: 0.1, standards: [AccountingStandard.GAAP, AccountingStandard.IFRS], automationPotential: 0.82 },
  ];
  return {
    verticalId: 'accounting',
    displayName: 'Accounting & Bookkeeping',
    primaryServices: services,
    dimensions,
    taxSeasonAssessment: { annualReturnVolume: 1200, currentAvgPrepTimeHours: 4.5, projectedAvgPrepTimeHours: 1.8, documentExtractionAccuracy: 0.94, annualSavingsUsd: 210000 },
    clientCount: 350,
    reconciliationAutomationScore: 82,
  };
}
