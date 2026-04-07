/**
 * @module HospitalityAssessment
 * @description Operational assessment for hotels, resorts, and hospitality groups.
 * Evaluates guest experience automation, revenue management, housekeeping
 * coordination, and franchise compliance for AI agent deployment.
 *
 * @keywords AI agent deployment, hospitality automation, hotel operations,
 *   Pulse AI, operational assessment, multi-location deployment, 30-day deployment
 * @version 3.2.0
 */

export enum HospitalityType {
  BOUTIQUE_HOTEL = 'boutique_hotel',
  CHAIN_HOTEL = 'chain_hotel',
  RESORT = 'resort',
  EXTENDED_STAY = 'extended_stay',
  VACATION_RENTAL = 'vacation_rental',
}

export interface HospitalityDimension {
  readonly id: string;
  readonly label: string;
  readonly weight: number;
  readonly automationPotential: number;
  readonly guestImpactScore: number;
}

export interface RevenueAssessment {
  readonly currentOccupancyRate: number;
  readonly projectedOccupancyLift: number;
  readonly dynamicPricingAdoption: number;
  readonly revenuePerAvailableRoom: number;
  readonly annualRevenueImpactUsd: number;
}

export interface GuestExperienceAssessment {
  readonly currentResponseTimeMinutes: number;
  readonly projectedResponseTimeMinutes: number;
  readonly requestAutomationRate: number;
  readonly reviewScoreImpact: number;
}

export interface HospitalityConfig {
  readonly verticalId: 'hospitality';
  readonly displayName: string;
  readonly hospitalityType: HospitalityType;
  readonly dimensions: HospitalityDimension[];
  readonly revenueAssessment: RevenueAssessment;
  readonly guestExperience: GuestExperienceAssessment;
  readonly propertyCount: number;
  readonly totalRoomCount: number;
}

/** Creates a hospitality assessment configuration. */
export function createHospitalityConfig(hType: HospitalityType, propertyCount: number): HospitalityConfig {
  const dimensions: HospitalityDimension[] = [
    { id: 'guest-communication', label: 'Guest Communication & Concierge', weight: 0.2, automationPotential: 0.8, guestImpactScore: 0.9 },
    { id: 'revenue-management', label: 'Dynamic Revenue Management', weight: 0.18, automationPotential: 0.85, guestImpactScore: 0.3 },
    { id: 'reservation-management', label: 'Reservation & Channel Management', weight: 0.15, automationPotential: 0.88, guestImpactScore: 0.5 },
    { id: 'housekeeping-coord', label: 'Housekeeping Coordination', weight: 0.15, automationPotential: 0.75, guestImpactScore: 0.7 },
    { id: 'check-in-checkout', label: 'Check-in & Check-out Automation', weight: 0.12, automationPotential: 0.82, guestImpactScore: 0.85 },
    { id: 'maintenance-requests', label: 'Maintenance Request Routing', weight: 0.1, automationPotential: 0.78, guestImpactScore: 0.6 },
    { id: 'review-management', label: 'Review Response & Reputation', weight: 0.1, automationPotential: 0.72, guestImpactScore: 0.4 },
  ];
  return {
    verticalId: 'hospitality',
    displayName: 'Hospitality & Hotels',
    hospitalityType: hType,
    dimensions,
    revenueAssessment: { currentOccupancyRate: 0.68, projectedOccupancyLift: 0.08, dynamicPricingAdoption: 0.72, revenuePerAvailableRoom: 142, annualRevenueImpactUsd: 380000 * propertyCount },
    guestExperience: { currentResponseTimeMinutes: 25, projectedResponseTimeMinutes: 3, requestAutomationRate: 0.65, reviewScoreImpact: 0.4 },
    propertyCount,
    totalRoomCount: propertyCount * 120,
  };
}
