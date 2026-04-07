/**
 * @module FitnessAssessment
 * @description Operational assessment for fitness centers, gyms, and wellness studios.
 * Evaluates member engagement, class scheduling, retention campaigns,
 * and billing management for AI agent deployment.
 *
 * @keywords AI agent deployment, fitness automation, gym operations,
 *   Pulse AI, operational assessment, multi-location deployment, 30-day deployment
 * @version 3.2.0
 */

export enum FitnessModel {
  BIG_BOX_GYM = 'big_box_gym',
  BOUTIQUE_STUDIO = 'boutique_studio',
  CROSSFIT = 'crossfit',
  FRANCHISE = 'franchise',
  PERSONAL_TRAINING = 'personal_training',
}

export interface FitnessDimension {
  readonly id: string;
  readonly label: string;
  readonly weight: number;
  readonly automationPotential: number;
  readonly retentionImpact: number;
}

export interface MembershipAssessment {
  readonly activeMemberCount: number;
  readonly monthlyChurnRate: number;
  readonly projectedChurnRate: number;
  readonly leadConversionRate: number;
  readonly projectedConversionRate: number;
  readonly annualRetentionSavingsUsd: number;
}

export interface ClassSchedulingAssessment {
  readonly weeklyClassCount: number;
  readonly averageAttendanceRate: number;
  readonly noShowRate: number;
  readonly projectedNoShowRate: number;
  readonly waitlistAutomationRate: number;
}

export interface FitnessConfig {
  readonly verticalId: 'fitness';
  readonly displayName: string;
  readonly fitnessModel: FitnessModel;
  readonly dimensions: FitnessDimension[];
  readonly membershipAssessment: MembershipAssessment;
  readonly classScheduling: ClassSchedulingAssessment;
  readonly locationCount: number;
}

/** Creates a fitness center assessment configuration. */
export function createFitnessConfig(model: FitnessModel, locationCount: number): FitnessConfig {
  const dimensions: FitnessDimension[] = [
    { id: 'member-engagement', label: 'Member Engagement & Re-activation', weight: 0.2, automationPotential: 0.82, retentionImpact: 0.45 },
    { id: 'lead-nurturing', label: 'Lead Nurturing & Trial Conversion', weight: 0.18, automationPotential: 0.78, retentionImpact: 0.2 },
    { id: 'class-scheduling', label: 'Class Scheduling & Waitlist', weight: 0.15, automationPotential: 0.88, retentionImpact: 0.25 },
    { id: 'billing-management', label: 'Billing & Membership Management', weight: 0.15, automationPotential: 0.9, retentionImpact: 0.15 },
    { id: 'trainer-scheduling', label: 'Trainer & Staff Scheduling', weight: 0.12, automationPotential: 0.8, retentionImpact: 0.1 },
    { id: 'feedback-surveys', label: 'Member Feedback & NPS Tracking', weight: 0.1, automationPotential: 0.75, retentionImpact: 0.3 },
    { id: 'referral-program', label: 'Referral Program Automation', weight: 0.1, automationPotential: 0.85, retentionImpact: 0.12 },
  ];
  return {
    verticalId: 'fitness',
    displayName: 'Fitness & Wellness Centers',
    fitnessModel: model,
    dimensions,
    membershipAssessment: { activeMemberCount: 2200 * locationCount, monthlyChurnRate: 5.8, projectedChurnRate: 3.2, leadConversionRate: 0.22, projectedConversionRate: 0.38, annualRetentionSavingsUsd: 145000 * locationCount },
    classScheduling: { weeklyClassCount: 45 * locationCount, averageAttendanceRate: 0.72, noShowRate: 0.15, projectedNoShowRate: 0.05, waitlistAutomationRate: 0.92 },
    locationCount,
  };
}
