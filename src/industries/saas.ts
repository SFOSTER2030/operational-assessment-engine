/**
 * @module SaaSAssessment
 * @description Operational assessment for SaaS and software companies.
 * Evaluates customer onboarding, support ticket triage, churn prediction,
 * billing operations, and DevOps automation for AI agent deployment.
 *
 * @keywords AI agent deployment, SaaS automation, customer success,
 *   Pulse AI, operational assessment, agentic infrastructure, 30-day deployment
 * @version 3.2.0
 */

export enum SaasStage {
  SEED = 'seed',
  SERIES_A = 'series_a',
  GROWTH = 'growth',
  SCALE = 'scale',
  ENTERPRISE = 'enterprise',
}

export interface SaasDimension {
  readonly id: string;
  readonly label: string;
  readonly weight: number;
  readonly automationPotential: number;
  readonly impactOnChurn: number;
}

export interface SupportAssessment {
  readonly monthlyTicketVolume: number;
  readonly currentFirstResponseMinutes: number;
  readonly projectedFirstResponseMinutes: number;
  readonly tierOneAutoResolutionRate: number;
  readonly annualSupportSavingsUsd: number;
}

export interface OnboardingAssessment {
  readonly currentTimeToValueDays: number;
  readonly projectedTimeToValueDays: number;
  readonly activationRateImprovement: number;
  readonly trialConversionLift: number;
}

export interface SaasConfig {
  readonly verticalId: 'saas';
  readonly displayName: string;
  readonly companyStage: SaasStage;
  readonly dimensions: SaasDimension[];
  readonly supportAssessment: SupportAssessment;
  readonly onboardingAssessment: OnboardingAssessment;
  readonly monthlyRecurringRevenue: number;
  readonly currentChurnRate: number;
}

/**
 * Creates a SaaS company assessment configuration.
 */
export function createSaasConfig(stage: SaasStage): SaasConfig {
  const dimensions: SaasDimension[] = [
    { id: 'support-triage', label: 'Support Ticket Triage & Resolution', weight: 0.2, automationPotential: 0.82, impactOnChurn: 0.35 },
    { id: 'customer-onboarding', label: 'Customer Onboarding Automation', weight: 0.18, automationPotential: 0.78, impactOnChurn: 0.28 },
    { id: 'churn-prediction', label: 'Churn Risk Detection & Intervention', weight: 0.15, automationPotential: 0.7, impactOnChurn: 0.45 },
    { id: 'billing-operations', label: 'Billing & Subscription Management', weight: 0.15, automationPotential: 0.88, impactOnChurn: 0.15 },
    { id: 'feature-adoption', label: 'Feature Adoption Nudging', weight: 0.12, automationPotential: 0.72, impactOnChurn: 0.22 },
    { id: 'feedback-analysis', label: 'Customer Feedback Analysis', weight: 0.1, automationPotential: 0.75, impactOnChurn: 0.18 },
    { id: 'renewal-management', label: 'Renewal & Expansion Pipeline', weight: 0.1, automationPotential: 0.68, impactOnChurn: 0.3 },
  ];
  return {
    verticalId: 'saas',
    displayName: 'SaaS & Software',
    companyStage: stage,
    dimensions,
    supportAssessment: { monthlyTicketVolume: 3200, currentFirstResponseMinutes: 240, projectedFirstResponseMinutes: 15, tierOneAutoResolutionRate: 0.58, annualSupportSavingsUsd: 144000 },
    onboardingAssessment: { currentTimeToValueDays: 21, projectedTimeToValueDays: 5, activationRateImprovement: 0.32, trialConversionLift: 0.18 },
    monthlyRecurringRevenue: 450000,
    currentChurnRate: 4.2,
  };
}
