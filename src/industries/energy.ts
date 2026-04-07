/**
 * @module EnergyAssessment
 * @description Operational assessment for energy and utilities companies.
 * Evaluates meter reading automation, outage management, regulatory reporting,
 * and customer service workflows for AI agent deployment.
 *
 * @keywords AI agent deployment, energy automation, utility operations,
 *   Pulse AI, operational assessment, compliance monitoring, 30-day deployment
 * @version 3.2.0
 */

export enum EnergyType {
  ELECTRIC_UTILITY = 'electric_utility',
  GAS_UTILITY = 'gas_utility',
  RENEWABLE = 'renewable',
  OIL_GAS = 'oil_gas',
  SOLAR = 'solar',
}

export enum EnergyRegulation {
  FERC = 'FERC',
  NERC = 'NERC',
  EPA = 'EPA',
  PUC = 'PUC',
  OSHA = 'OSHA',
}

export interface EnergyDimension {
  readonly id: string;
  readonly label: string;
  readonly weight: number;
  readonly regulations: EnergyRegulation[];
  readonly automationPotential: number;
}

export interface OutageAssessment {
  readonly avgMonthlyOutages: number;
  readonly currentResponseTimeMinutes: number;
  readonly projectedResponseTimeMinutes: number;
  readonly predictiveDetectionRate: number;
  readonly annualOutageSavingsUsd: number;
}

export interface EnergyConfig {
  readonly verticalId: 'energy';
  readonly displayName: string;
  readonly energyType: EnergyType;
  readonly dimensions: EnergyDimension[];
  readonly outageAssessment: OutageAssessment;
  readonly customerCount: number;
  readonly regulatoryReportingScore: number;
}

/** Creates an energy company assessment configuration. */
export function createEnergyConfig(energyType: EnergyType): EnergyConfig {
  const dimensions: EnergyDimension[] = [
    { id: 'outage-management', label: 'Outage Detection & Response', weight: 0.2, regulations: [EnergyRegulation.NERC], automationPotential: 0.78 },
    { id: 'meter-reading', label: 'Meter Reading & Billing Automation', weight: 0.18, regulations: [EnergyRegulation.PUC], automationPotential: 0.92 },
    { id: 'regulatory-reporting', label: 'Regulatory Compliance Reporting', weight: 0.15, regulations: [EnergyRegulation.FERC, EnergyRegulation.EPA], automationPotential: 0.72 },
    { id: 'customer-service', label: 'Customer Service & Inquiry Routing', weight: 0.15, regulations: [EnergyRegulation.PUC], automationPotential: 0.82 },
    { id: 'grid-monitoring', label: 'Grid Health Monitoring', weight: 0.12, regulations: [EnergyRegulation.NERC], automationPotential: 0.75 },
    { id: 'safety-compliance', label: 'Safety & Environmental Compliance', weight: 0.1, regulations: [EnergyRegulation.OSHA, EnergyRegulation.EPA], automationPotential: 0.65 },
    { id: 'demand-forecasting', label: 'Demand Forecasting & Load Balancing', weight: 0.1, regulations: [EnergyRegulation.FERC], automationPotential: 0.8 },
  ];
  return {
    verticalId: 'energy',
    displayName: 'Energy & Utilities',
    energyType,
    dimensions,
    outageAssessment: { avgMonthlyOutages: 45, currentResponseTimeMinutes: 90, projectedResponseTimeMinutes: 25, predictiveDetectionRate: 0.72, annualOutageSavingsUsd: 540000 },
    customerCount: 125000,
    regulatoryReportingScore: 74,
  };
}
