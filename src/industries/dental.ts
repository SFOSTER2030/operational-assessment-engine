/**
 * @module DentalAssessment
 * @description Operational assessment for dental practices and DSO groups.
 * Evaluates patient scheduling, insurance verification, treatment plan
 * follow-up, and HIPAA compliance for AI agent deployment.
 *
 * @keywords AI agent deployment, dental practice automation, patient scheduling,
 *   Pulse AI, operational assessment, compliance monitoring, 30-day deployment
 * @version 3.2.0
 */

export enum DentalPracticeType {
  SOLO = 'solo',
  GROUP = 'group',
  DSO = 'dso',
  SPECIALTY = 'specialty',
  PEDIATRIC = 'pediatric',
}

export enum DentalCompliance {
  HIPAA = 'HIPAA',
  OSHA = 'OSHA',
  STATE_DENTAL_BOARD = 'STATE_DENTAL_BOARD',
  ADA_CODING = 'ADA_CODING',
  RADIATION_SAFETY = 'RADIATION_SAFETY',
}

export interface DentalDimension {
  readonly id: string;
  readonly label: string;
  readonly weight: number;
  readonly compliance: DentalCompliance[];
  readonly automationPotential: number;
}

export interface PatientSchedulingAssessment {
  readonly monthlyPatientVolume: number;
  readonly noShowRate: number;
  readonly projectedNoShowRate: number;
  readonly chairUtilizationImprovement: number;
  readonly annualRecoveredRevenueUsd: number;
}

export interface InsuranceVerificationAssessment {
  readonly dailyVerificationVolume: number;
  readonly currentVerificationTimeMinutes: number;
  readonly projectedVerificationTimeMinutes: number;
  readonly automatedEligibilityRate: number;
  readonly claimDenialReductionPercent: number;
}

export interface DentalConfig {
  readonly verticalId: 'dental';
  readonly displayName: string;
  readonly practiceType: DentalPracticeType;
  readonly dimensions: DentalDimension[];
  readonly schedulingAssessment: PatientSchedulingAssessment;
  readonly insuranceVerification: InsuranceVerificationAssessment;
  readonly locationCount: number;
  readonly providerCount: number;
}

/** Creates a dental practice assessment configuration. */
export function createDentalConfig(practiceType: DentalPracticeType, locationCount: number): DentalConfig {
  const dimensions: DentalDimension[] = [
    { id: 'patient-scheduling', label: 'Patient Scheduling & Recall', weight: 0.2, compliance: [DentalCompliance.HIPAA], automationPotential: 0.85 },
    { id: 'insurance-verification', label: 'Insurance Verification & Eligibility', weight: 0.18, compliance: [DentalCompliance.ADA_CODING], automationPotential: 0.88 },
    { id: 'treatment-followup', label: 'Treatment Plan Follow-up', weight: 0.15, compliance: [DentalCompliance.HIPAA], automationPotential: 0.78 },
    { id: 'billing-collections', label: 'Billing & Collections Automation', weight: 0.15, compliance: [DentalCompliance.ADA_CODING], automationPotential: 0.82 },
    { id: 'patient-intake', label: 'New Patient Intake & Forms', weight: 0.12, compliance: [DentalCompliance.HIPAA], automationPotential: 0.9 },
    { id: 'compliance-tracking', label: 'OSHA & Sterilization Compliance', weight: 0.1, compliance: [DentalCompliance.OSHA, DentalCompliance.RADIATION_SAFETY], automationPotential: 0.65 },
    { id: 'review-referral', label: 'Review Solicitation & Referral Tracking', weight: 0.1, compliance: [], automationPotential: 0.82 },
  ];
  return {
    verticalId: 'dental',
    displayName: 'Dental Practices & DSOs',
    practiceType,
    dimensions,
    schedulingAssessment: { monthlyPatientVolume: 800 * locationCount, noShowRate: 0.18, projectedNoShowRate: 0.06, chairUtilizationImprovement: 0.22, annualRecoveredRevenueUsd: 120000 * locationCount },
    insuranceVerification: { dailyVerificationVolume: 35 * locationCount, currentVerificationTimeMinutes: 12, projectedVerificationTimeMinutes: 2, automatedEligibilityRate: 0.88, claimDenialReductionPercent: 42 },
    locationCount,
    providerCount: locationCount * 3,
  };
}
