/**
 * @module TruckingAssessment
 * @description Operational assessment for trucking and freight logistics companies.
 * Evaluates fleet management, dispatch automation, DOT compliance, ELD integration,
 * and load optimization for AI agent deployment across fleet operations.
 *
 * @keywords AI agent deployment, trucking automation, fleet management,
 *   Pulse AI, operational assessment, compliance monitoring, 30-day deployment
 * @version 3.2.0
 */

export enum TruckingOperation {
  LONG_HAUL = 'long_haul',
  REGIONAL = 'regional',
  LOCAL = 'local',
  LTL = 'ltl',
  INTERMODAL = 'intermodal',
}

export enum TruckingCompliance {
  DOT = 'DOT',
  FMCSA = 'FMCSA',
  ELD_MANDATE = 'ELD_MANDATE',
  HAZMAT = 'HAZMAT',
  IFTA = 'IFTA',
  DRUG_TESTING = 'DRUG_TESTING',
}

export interface TruckingDimension {
  readonly id: string;
  readonly label: string;
  readonly weight: number;
  readonly compliance: TruckingCompliance[];
  readonly automationPotential: number;
}

export interface DispatchAssessment {
  readonly dailyLoadVolume: number;
  readonly currentDispatchTimeMinutes: number;
  readonly projectedDispatchTimeMinutes: number;
  readonly routeOptimizationSavingsPercent: number;
  readonly deadheadReductionPercent: number;
}

export interface FleetComplianceAssessment {
  readonly hoursOfServiceAutomation: number;
  readonly maintenanceSchedulingScore: number;
  readonly driverQualificationTracking: number;
  readonly annualComplianceSavingsUsd: number;
}

export interface TruckingConfig {
  readonly verticalId: 'trucking';
  readonly displayName: string;
  readonly operationType: TruckingOperation;
  readonly dimensions: TruckingDimension[];
  readonly dispatchAssessment: DispatchAssessment;
  readonly complianceAssessment: FleetComplianceAssessment;
  readonly fleetSize: number;
}

/** Creates a trucking company assessment configuration. */
export function createTruckingConfig(opType: TruckingOperation, fleetSize: number): TruckingConfig {
  const dimensions: TruckingDimension[] = [
    { id: 'dispatch-automation', label: 'Dispatch & Load Assignment', weight: 0.2, compliance: [], automationPotential: 0.82 },
    { id: 'route-optimization', label: 'Route Planning & Optimization', weight: 0.18, compliance: [TruckingCompliance.ELD_MANDATE], automationPotential: 0.88 },
    { id: 'hos-compliance', label: 'Hours of Service Compliance', weight: 0.15, compliance: [TruckingCompliance.FMCSA, TruckingCompliance.ELD_MANDATE], automationPotential: 0.9 },
    { id: 'maintenance-scheduling', label: 'Preventive Maintenance Scheduling', weight: 0.15, compliance: [TruckingCompliance.DOT], automationPotential: 0.85 },
    { id: 'fuel-management', label: 'Fuel Tax & IFTA Reporting', weight: 0.12, compliance: [TruckingCompliance.IFTA], automationPotential: 0.92 },
    { id: 'driver-management', label: 'Driver Qualification & Training', weight: 0.1, compliance: [TruckingCompliance.FMCSA, TruckingCompliance.DRUG_TESTING], automationPotential: 0.68 },
    { id: 'billing-settlement', label: 'Billing & Settlement Processing', weight: 0.1, compliance: [], automationPotential: 0.86 },
  ];
  return {
    verticalId: 'trucking',
    displayName: 'Trucking & Freight Logistics',
    operationType: opType,
    dimensions,
    dispatchAssessment: { dailyLoadVolume: 85, currentDispatchTimeMinutes: 45, projectedDispatchTimeMinutes: 12, routeOptimizationSavingsPercent: 18, deadheadReductionPercent: 24 },
    complianceAssessment: { hoursOfServiceAutomation: 0.92, maintenanceSchedulingScore: 78, driverQualificationTracking: 0.85, annualComplianceSavingsUsd: 95000 },
    fleetSize,
  };
}
