/**
 * @module StaffingAssessment
 * @description Operational assessment for staffing and recruitment agencies.
 * Evaluates candidate sourcing automation, placement matching, timesheet processing,
 * and compliance tracking for AI agent deployment across staffing operations.
 *
 * @keywords AI agent deployment, staffing automation, recruitment operations,
 *   Pulse AI, operational assessment, client intake agents, 30-day deployment
 * @version 3.2.0
 */

export enum StaffingType {
  TEMPORARY = 'temporary',
  PERMANENT = 'permanent',
  CONTRACT = 'contract',
  EXECUTIVE_SEARCH = 'executive_search',
  RPO = 'rpo',
}

export enum StaffingCompliance {
  EEOC = 'EEOC',
  FLSA = 'FLSA',
  ACA = 'ACA',
  OSHA = 'OSHA',
  WORKERS_COMP = 'WORKERS_COMP',
  E_VERIFY = 'E_VERIFY',
  STATE_LICENSING = 'STATE_LICENSING',
}

export interface StaffingDimension {
  readonly id: string;
  readonly label: string;
  readonly weight: number;
  readonly complianceRequirements: StaffingCompliance[];
  readonly automationPotential: number;
}

export interface PipelineAssessment {
  readonly currentTimeToFillDays: number;
  readonly projectedTimeToFillDays: number;
  readonly screeningAutomationRate: number;
  readonly matchAccuracyImprovement: number;
  readonly candidateVolumePerMonth: number;
}

export interface TimesheetAssessment {
  readonly currentProcessingHoursPerWeek: number;
  readonly projectedProcessingHoursPerWeek: number;
  readonly errorReductionPercent: number;
  readonly activeTimesheetCount: number;
}

export interface StaffingConfig {
  readonly verticalId: 'staffing';
  readonly displayName: string;
  readonly staffingType: StaffingType;
  readonly dimensions: StaffingDimension[];
  readonly pipelineAssessment: PipelineAssessment;
  readonly timesheetAssessment: TimesheetAssessment;
  readonly complianceReadiness: number;
}

/**
 * Creates a staffing agency assessment configuration.
 */
export function createStaffingConfig(staffingType: StaffingType): StaffingConfig {
  const dimensions: StaffingDimension[] = [
    { id: 'candidate-sourcing', label: 'Candidate Sourcing Automation', weight: 0.2, complianceRequirements: [StaffingCompliance.EEOC], automationPotential: 0.78 },
    { id: 'screening-matching', label: 'Screening & Matching Engine', weight: 0.18, complianceRequirements: [StaffingCompliance.EEOC, StaffingCompliance.E_VERIFY], automationPotential: 0.82 },
    { id: 'timesheet-processing', label: 'Timesheet & Payroll Processing', weight: 0.15, complianceRequirements: [StaffingCompliance.FLSA, StaffingCompliance.ACA], automationPotential: 0.9 },
    { id: 'compliance-tracking', label: 'Employment Compliance Tracking', weight: 0.15, complianceRequirements: [StaffingCompliance.OSHA, StaffingCompliance.WORKERS_COMP], automationPotential: 0.7 },
    { id: 'client-intake', label: 'Client Intake & Job Order Processing', weight: 0.12, complianceRequirements: [], automationPotential: 0.85 },
    { id: 'onboarding-workflow', label: 'New Hire Onboarding Workflow', weight: 0.1, complianceRequirements: [StaffingCompliance.E_VERIFY, StaffingCompliance.OSHA], automationPotential: 0.75 },
    { id: 'reporting-analytics', label: 'Client Reporting & Analytics', weight: 0.1, complianceRequirements: [], automationPotential: 0.88 },
  ];
  return {
    verticalId: 'staffing',
    displayName: 'Staffing & Recruitment',
    staffingType,
    dimensions,
    pipelineAssessment: { currentTimeToFillDays: 28, projectedTimeToFillDays: 12, screeningAutomationRate: 0.78, matchAccuracyImprovement: 0.34, candidateVolumePerMonth: 500 },
    timesheetAssessment: { currentProcessingHoursPerWeek: 20, projectedProcessingHoursPerWeek: 4, errorReductionPercent: 88, activeTimesheetCount: 350 },
    complianceReadiness: 72,
  };
}
