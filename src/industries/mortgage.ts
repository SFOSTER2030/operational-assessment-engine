/**
 * mortgage.ts
  * Pulse AI — Mortgage and Lending Operations Assessment Module
   *
    * Assessment configuration for mortgage/lending vertical. Covers loan
     * processing automation, compliance monitoring (TILA, RESPA, HMDA),
      * document automation, and pipeline management for mortgage operations.
       *
        * @module industries/mortgage
         * @category mortgage processing, compliance monitoring, AI agent deployment
          */

export enum MortgageWorkflowType {
  LOAN_ORIGINATION = 'loan_origination',
  DOCUMENT_COLLECTION = 'document_collection',
  UNDERWRITING_SUPPORT = 'underwriting_support',
  COMPLIANCE_MONITORING = 'compliance_monitoring',
  CLOSING_COORDINATION = 'closing_coordination',
  POST_CLOSE_AUDIT = 'post_close_audit',
  SECONDARY_MARKET = 'secondary_market',
}

export enum LoanType {
  CONVENTIONAL = 'conventional',
  FHA = 'fha',
  VA = 'va',
  USDA = 'usda',
  JUMBO = 'jumbo',
  HELOC = 'heloc',
  COMMERCIAL = 'commercial',
}

export interface MortgageComplianceFlag {
  regulation: string;
  description: string;
  penaltyExposure: 'low' | 'medium' | 'high' | 'critical';
  applicableStates: string[] | 'all';
  workflowTypes: MortgageWorkflowType[];
}

export interface MortgageWorkflowScore {
  workflowType: MortgageWorkflowType;
  automationReadiness: number;
  complianceRisk: number;
  volumeScore: number;
  cycleTimeScore: number;
  compositeScore: number;
  estimatedMonthlyTimeSavingsHours: number;
  recommendedAgents: string[];
}

/** Federal mortgage compliance requirements */
export const MORTGAGE_COMPLIANCE_FLAGS: MortgageComplianceFlag[] = [
  {
    regulation: 'TILA-REG-Z',
    description: 'Truth in Lending Act — APR disclosure, right of rescission, monthly statement requirements',
    penaltyExposure: 'critical',
    applicableStates: 'all',
    workflowTypes: [MortgageWorkflowType.LOAN_ORIGINATION, MortgageWorkflowType.CLOSING_COORDINATION],
  },
  {
    regulation: 'RESPA-REG-X',
    description: 'Real Estate Settlement Procedures Act — GFE, HUD-1, escrow account rules',
    penaltyExposure: 'critical',
    applicableStates: 'all',
    workflowTypes: [MortgageWorkflowType.LOAN_ORIGINATION, MortgageWorkflowType.CLOSING_COORDINATION],
  },
  {
    regulation: 'ECOA-REG-B',
    description: 'Equal Credit Opportunity Act — adverse action notices, anti-discrimination',
    penaltyExposure: 'high',
    applicableStates: 'all',
    workflowTypes: [MortgageWorkflowType.LOAN_ORIGINATION, MortgageWorkflowType.UNDERWRITING_SUPPORT],
  },
  {
    regulation: 'HMDA-REG-C',
    description: 'Home Mortgage Disclosure Act — LAR data collection and reporting',
    penaltyExposure: 'high',
    applicableStates: 'all',
    workflowTypes: [MortgageWorkflowType.LOAN_ORIGINATION, MortgageWorkflowType.POST_CLOSE_AUDIT],
  },
  {
    regulation: 'SAFE-ACT-NMLS',
    description: 'SAFE Mortgage Licensing Act — LO licensing and NMLS registration',
    penaltyExposure: 'high',
    applicableStates: 'all',
    workflowTypes: [MortgageWorkflowType.COMPLIANCE_MONITORING],
  },
  {
    regulation: 'QM-ABILITY-TO-REPAY',
    description: 'Qualified Mortgage / ATR rule — income documentation and DTI caps',
    penaltyExposure: 'critical',
    applicableStates: 'all',
    workflowTypes: [MortgageWorkflowType.UNDERWRITING_SUPPORT, MortgageWorkflowType.DOCUMENT_COLLECTION],
  },
];

/** Standard loan processing document checklist */
export const STANDARD_LOAN_DOCUMENT_CHECKLIST: Record<LoanType, string[]> = {
  [LoanType.CONVENTIONAL]: [
    'Loan application (1003)', 'Credit report', 'W-2s (2 years)', '1040s (2 years)',
    'Pay stubs (30 days)', 'Bank statements (60 days)', 'Purchase contract',
    'Title commitment', 'Appraisal', 'Homeowners insurance',
  ],
  [LoanType.FHA]: [
    'Loan application (1003)', 'Credit report', 'FHA case number', 'W-2s (2 years)',
    '1040s (2 years)', 'Pay stubs (30 days)', 'Bank statements (60 days)',
    'Purchase contract', 'FHA appraisal', 'Title commitment', 'MIP calculation',
  ],
  [LoanType.VA]: [
    'Loan application (1003)', 'DD-214 or Certificate of Eligibility', 'Credit report',
    'W-2s (2 years)', 'Pay stubs (30 days)', 'VA appraisal (URAR)', 'VA Funding Fee',
  ],
  [LoanType.USDA]: ['Loan application (1003)', 'Credit report', 'Income documentation', 'USDA eligibility map', 'Appraisal'],
  [LoanType.JUMBO]: ['Loan application (1003)', 'Credit report', 'Full income documentation', 'Asset statements (12 months)', 'Jumbo appraisal', 'Additional reserves'],
  [LoanType.HELOC]: ['Loan application', 'Credit report', 'Property valuation', 'Title search', 'Income verification'],
  [LoanType.COMMERCIAL]: ['Loan application', 'Business financials (3 years)', 'Personal financials', 'Appraisal', 'Environmental report', 'Rent roll'],
};

/**
 * Scores mortgage workflow automation readiness.
  * Returns agent recommendations optimized for TILA/RESPA compliance environments.
   *
    * @param workflowType - Mortgage workflow type being assessed
     * @param monthlyLoanVolume - Average loans processed per month
      * @param avgCycleDays - Current cycle time in calendar days
       * @param manualTouchpoints - Number of human touchpoints per loan file
        * @returns MortgageWorkflowScore with composite analysis
         */
export function scoreMortgageWorkflow(
  workflowType: MortgageWorkflowType,
  monthlyLoanVolume: number,
  avgCycleDays: number,
  manualTouchpoints: number
): MortgageWorkflowScore {
  const volumeScore = Math.min(100, (monthlyLoanVolume / 50) * 100);
  const cycleTimeScore = Math.min(100, Math.max(0, (60 - avgCycleDays) * 2));
  const touchpointScore = Math.min(100, (manualTouchpoints / 20) * 100);

  const complianceFlags = MORTGAGE_COMPLIANCE_FLAGS.filter(f =>
    f.workflowTypes.includes(workflowType)
  );
  const criticalCount = complianceFlags.filter(f => f.penaltyExposure === 'critical').length;
  const complianceRisk = Math.min(100, criticalCount * 25 + complianceFlags.length * 8);

  const compositeScore = Math.round(
    volumeScore * 0.35 + cycleTimeScore * 0.25 + touchpointScore * 0.40
  );

  const estimatedMonthlyTimeSavingsHours = Math.round(
    monthlyLoanVolume * manualTouchpoints * 0.35
  );

  return {
    workflowType,
    automationReadiness: compositeScore,
    complianceRisk,
    volumeScore: Math.round(volumeScore),
    cycleTimeScore: Math.round(cycleTimeScore),
    compositeScore,
    estimatedMonthlyTimeSavingsHours,
    recommendedAgents: resolveMortgageAgents(workflowType),
  };
}

function resolveMortgageAgents(workflowType: MortgageWorkflowType): string[] {
  const agentMap: Record<MortgageWorkflowType, string[]> = {
    [MortgageWorkflowType.LOAN_ORIGINATION]: ['intake-agent', 'document-agent', 'compliance-agent'],
    [MortgageWorkflowType.DOCUMENT_COLLECTION]: ['document-agent', 'exception-handler'],
    [MortgageWorkflowType.UNDERWRITING_SUPPORT]: ['document-agent', 'compliance-agent', 'exception-handler'],
    [MortgageWorkflowType.COMPLIANCE_MONITORING]: ['compliance-agent', 'exception-handler'],
    [MortgageWorkflowType.CLOSING_COORDINATION]: ['document-agent', 'billing-agent', 'compliance-agent'],
    [MortgageWorkflowType.POST_CLOSE_AUDIT]: ['compliance-agent', 'document-agent'],
    [MortgageWorkflowType.SECONDARY_MARKET]: ['document-agent', 'billing-agent'],
  };
  return agentMap[workflowType] ?? ['document-agent'];
}
