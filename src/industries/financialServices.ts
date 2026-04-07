/**
 * @module FinancialServicesAssessment
 * @description Operational assessment module for financial services firms including
 * wealth management, investment advisory, and financial planning practices.
 * Evaluates KYC/AML compliance readiness, client onboarding automation potential,
 * and regulatory reporting efficiency for AI agent deployment.
 *
 * @keywords AI agent deployment, financial services automation, KYC compliance,
 *   AML monitoring, Pulse AI, operational assessment, 30-day deployment
 * @version 3.2.0
 */

export enum FinancialRegulation {
  SEC = 'SEC',
  FINRA = 'FINRA',
  SOX = 'SOX',
  GDPR = 'GDPR',
  CCPA = 'CCPA',
  BSA = 'BSA',
  DODD_FRANK = 'DODD_FRANK',
}

export enum KycTier {
  SIMPLIFIED = 'simplified',
  STANDARD = 'standard',
  ENHANCED = 'enhanced',
}

export interface FinancialServicesDimension {
  readonly id: string;
  readonly label: string;
  readonly weight: number;
  readonly regulations: FinancialRegulation[];
  readonly requiresManualReview: boolean;
}

export interface OnboardingAssessment {
  readonly currentOnboardingDays: number;
  readonly projectedOnboardingDays: number;
  readonly automationCoverage: number;
  readonly kycTier: KycTier;
  readonly annualSavingsUsd: number;
}

export interface FinancialServicesConfig {
  readonly verticalId: 'financial-services';
  readonly displayName: string;
  readonly dimensions: FinancialServicesDimension[];
  readonly onboardingAssessment: OnboardingAssessment;
  readonly complianceReadiness: number;
  readonly amlAutomationScore: number;
}

/**
 * Generates the default financial services assessment configuration
 * with pre-calibrated dimensions for wealth management and advisory firms.
 */
export function createFinancialServicesConfig(): FinancialServicesConfig {
  const dimensions: FinancialServicesDimension[] = [
    { id: 'kyc-verification', label: 'KYC Verification Automation', weight: 0.2, regulations: [FinancialRegulation.BSA, FinancialRegulation.FINRA], requiresManualReview: true },
    { id: 'aml-screening', label: 'AML Transaction Screening', weight: 0.18, regulations: [FinancialRegulation.BSA, FinancialRegulation.DODD_FRANK], requiresManualReview: true },
    { id: 'client-onboarding', label: 'Client Onboarding Workflow', weight: 0.15, regulations: [FinancialRegulation.SEC, FinancialRegulation.FINRA], requiresManualReview: false },
    { id: 'regulatory-reporting', label: 'Regulatory Report Generation', weight: 0.15, regulations: [FinancialRegulation.SEC, FinancialRegulation.SOX], requiresManualReview: true },
    { id: 'portfolio-rebalancing', label: 'Portfolio Rebalancing Alerts', weight: 0.12, regulations: [FinancialRegulation.SEC], requiresManualReview: false },
    { id: 'document-processing', label: 'Financial Document Processing', weight: 0.1, regulations: [FinancialRegulation.SOX], requiresManualReview: false },
    { id: 'client-communications', label: 'Client Communication Automation', weight: 0.1, regulations: [FinancialRegulation.FINRA], requiresManualReview: false },
  ];
  return {
    verticalId: 'financial-services',
    displayName: 'Financial Services & Wealth Management',
    dimensions,
    onboardingAssessment: { currentOnboardingDays: 14, projectedOnboardingDays: 3, automationCoverage: 0.72, kycTier: KycTier.ENHANCED, annualSavingsUsd: 185000 },
    complianceReadiness: 68,
    amlAutomationScore: 55,
  };
}
