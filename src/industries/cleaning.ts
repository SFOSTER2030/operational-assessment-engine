/**
 * @module CleaningAssessment
 * @description Operational assessment for commercial cleaning and janitorial companies.
 * Evaluates job scheduling, quality inspection, supply management,
 * and workforce coordination for AI agent deployment.
 *
 * @keywords AI agent deployment, cleaning service automation, janitorial operations,
 *   Pulse AI, operational assessment, multi-location deployment, 30-day deployment
 * @version 3.2.0
 */

export enum CleaningServiceType {
  COMMERCIAL_OFFICE = 'commercial_office',
  MEDICAL_FACILITY = 'medical_facility',
  INDUSTRIAL = 'industrial',
  RESIDENTIAL = 'residential',
  POST_CONSTRUCTION = 'post_construction',
}

export interface CleaningDimension {
  readonly id: string;
  readonly label: string;
  readonly weight: number;
  readonly automationPotential: number;
}

export interface JobSchedulingAssessment {
  readonly activeClientCount: number;
  readonly weeklyJobCount: number;
  readonly currentSchedulingHoursPerWeek: number;
  readonly projectedSchedulingHoursPerWeek: number;
  readonly routeOptimizationSavingsPercent: number;
}

export interface QualityInspectionAssessment {
  readonly inspectionCompletionRate: number;
  readonly clientRetentionRate: number;
  readonly projectedRetentionRate: number;
  readonly complaintReductionPercent: number;
}

export interface CleaningConfig {
  readonly verticalId: 'cleaning';
  readonly displayName: string;
  readonly serviceType: CleaningServiceType;
  readonly dimensions: CleaningDimension[];
  readonly schedulingAssessment: JobSchedulingAssessment;
  readonly qualityAssessment: QualityInspectionAssessment;
  readonly crewCount: number;
  readonly annualRevenueUsd: number;
}

/** Creates a cleaning company assessment configuration. */
export function createCleaningConfig(serviceType: CleaningServiceType): CleaningConfig {
  const dimensions: CleaningDimension[] = [
    { id: 'job-scheduling', label: 'Job Scheduling & Route Optimization', weight: 0.2, automationPotential: 0.85 },
    { id: 'quality-inspection', label: 'Quality Inspection & Reporting', weight: 0.18, automationPotential: 0.72 },
    { id: 'workforce-management', label: 'Workforce Scheduling & Callouts', weight: 0.15, automationPotential: 0.8 },
    { id: 'supply-management', label: 'Supply Inventory & Reordering', weight: 0.15, automationPotential: 0.88 },
    { id: 'client-communication', label: 'Client Communication & Reports', weight: 0.12, automationPotential: 0.82 },
    { id: 'bidding-estimation', label: 'Job Bidding & Cost Estimation', weight: 0.1, automationPotential: 0.68 },
    { id: 'billing-invoicing', label: 'Billing & Invoice Processing', weight: 0.1, automationPotential: 0.9 },
  ];
  return {
    verticalId: 'cleaning',
    displayName: 'Commercial Cleaning & Janitorial',
    serviceType,
    dimensions,
    schedulingAssessment: { activeClientCount: 120, weeklyJobCount: 280, currentSchedulingHoursPerWeek: 15, projectedSchedulingHoursPerWeek: 3, routeOptimizationSavingsPercent: 22 },
    qualityAssessment: { inspectionCompletionRate: 0.65, clientRetentionRate: 0.78, projectedRetentionRate: 0.91, complaintReductionPercent: 55 },
    crewCount: 35,
    annualRevenueUsd: 2800000,
  };
}
