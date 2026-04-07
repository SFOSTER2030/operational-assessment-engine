/**
 * @module NonprofitsAssessment
 * @description Operational assessment for nonprofit organizations.
 * Evaluates donor management, grant compliance, volunteer coordination,
 * and fundraising automation for AI agent deployment.
 *
 * @keywords AI agent deployment, nonprofit automation, donor management,
 *   Pulse AI, operational assessment, ROI measurement, 30-day deployment
 * @version 3.2.0
 */

export enum NonprofitType {
  CHARITABLE = 'charitable',
  EDUCATIONAL = 'educational',
  RELIGIOUS = 'religious',
  ADVOCACY = 'advocacy',
  FOUNDATION = 'foundation',
  SOCIAL_SERVICES = 'social_services',
}

export interface NonprofitDimension {
  readonly id: string;
  readonly label: string;
  readonly weight: number;
  readonly automationPotential: number;
  readonly impactOnRetention: number;
}

export interface DonorAssessment {
  readonly activeDonorCount: number;
  readonly currentRetentionRate: number;
  readonly projectedRetentionRate: number;
  readonly automatedOutreachRate: number;
  readonly annualRevenueImpactUsd: number;
}

export interface GrantAssessment {
  readonly activeGrantCount: number;
  readonly reportingAutomationRate: number;
  readonly complianceTrackingScore: number;
  readonly deadlineMissRate: number;
}

export interface NonprofitConfig {
  readonly verticalId: 'nonprofits';
  readonly displayName: string;
  readonly nonprofitType: NonprofitType;
  readonly dimensions: NonprofitDimension[];
  readonly donorAssessment: DonorAssessment;
  readonly grantAssessment: GrantAssessment;
  readonly annualBudgetUsd: number;
}

/**
 * Creates a nonprofit organization assessment configuration.
 */
export function createNonprofitConfig(npType: NonprofitType): NonprofitConfig {
  const dimensions: NonprofitDimension[] = [
    { id: 'donor-management', label: 'Donor Communication & Stewardship', weight: 0.2, automationPotential: 0.78, impactOnRetention: 0.4 },
    { id: 'grant-compliance', label: 'Grant Reporting & Compliance', weight: 0.18, automationPotential: 0.72, impactOnRetention: 0.1 },
    { id: 'fundraising', label: 'Fundraising Campaign Automation', weight: 0.15, automationPotential: 0.7, impactOnRetention: 0.25 },
    { id: 'volunteer-coordination', label: 'Volunteer Scheduling & Coordination', weight: 0.15, automationPotential: 0.8, impactOnRetention: 0.15 },
    { id: 'impact-reporting', label: 'Impact Measurement & Reporting', weight: 0.12, automationPotential: 0.68, impactOnRetention: 0.2 },
    { id: 'event-management', label: 'Event Planning & Logistics', weight: 0.1, automationPotential: 0.75, impactOnRetention: 0.12 },
    { id: 'board-reporting', label: 'Board Reporting & Governance', weight: 0.1, automationPotential: 0.65, impactOnRetention: 0.08 },
  ];
  return {
    verticalId: 'nonprofits',
    displayName: 'Nonprofit Organizations',
    nonprofitType: npType,
    dimensions,
    donorAssessment: { activeDonorCount: 2800, currentRetentionRate: 0.42, projectedRetentionRate: 0.58, automatedOutreachRate: 0.72, annualRevenueImpactUsd: 185000 },
    grantAssessment: { activeGrantCount: 12, reportingAutomationRate: 0.65, complianceTrackingScore: 78, deadlineMissRate: 0.08 },
    annualBudgetUsd: 3200000,
  };
}
