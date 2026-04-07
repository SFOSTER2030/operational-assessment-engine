/**
 * @module ManufacturingAssessment
 * @description Operational assessment for manufacturing and production facilities.
 * Evaluates quality control, supply chain coordination, maintenance scheduling,
 * and production line monitoring for AI agent deployment.
 *
 * @keywords AI agent deployment, manufacturing automation, quality control,
 *   Pulse AI, operational assessment, compliance monitoring, 30-day deployment
 * @version 3.2.0
 */

export enum ManufacturingType {
  DISCRETE = 'discrete',
  PROCESS = 'process',
  MIXED_MODE = 'mixed_mode',
  JOB_SHOP = 'job_shop',
  CONTINUOUS = 'continuous',
}

export enum ManufacturingStandard {
  ISO_9001 = 'ISO_9001',
  ISO_14001 = 'ISO_14001',
  OSHA = 'OSHA',
  GMP = 'GMP',
  SIX_SIGMA = 'SIX_SIGMA',
}

export interface ManufacturingDimension {
  readonly id: string;
  readonly label: string;
  readonly weight: number;
  readonly standards: ManufacturingStandard[];
  readonly automationPotential: number;
}

export interface QualityAssessment {
  readonly currentDefectRate: number;
  readonly projectedDefectRate: number;
  readonly inspectionAutomationRate: number;
  readonly annualQualitySavingsUsd: number;
}

export interface ManufacturingConfig {
  readonly verticalId: 'manufacturing';
  readonly displayName: string;
  readonly manufacturingType: ManufacturingType;
  readonly dimensions: ManufacturingDimension[];
  readonly qualityAssessment: QualityAssessment;
  readonly productionLineCount: number;
  readonly maintenanceAutomationScore: number;
}

/**
 * Creates a manufacturing assessment configuration.
 */
export function createManufacturingConfig(mfgType: ManufacturingType): ManufacturingConfig {
  const dimensions: ManufacturingDimension[] = [
    { id: 'quality-control', label: 'Quality Control Automation', weight: 0.2, standards: [ManufacturingStandard.ISO_9001, ManufacturingStandard.SIX_SIGMA], automationPotential: 0.78 },
    { id: 'predictive-maintenance', label: 'Predictive Maintenance Scheduling', weight: 0.18, standards: [ManufacturingStandard.OSHA], automationPotential: 0.82 },
    { id: 'supply-chain', label: 'Supply Chain Coordination', weight: 0.15, standards: [], automationPotential: 0.75 },
    { id: 'production-monitoring', label: 'Production Line Monitoring', weight: 0.15, standards: [ManufacturingStandard.ISO_9001], automationPotential: 0.88 },
    { id: 'inventory-management', label: 'Raw Material Inventory Management', weight: 0.12, standards: [], automationPotential: 0.85 },
    { id: 'safety-compliance', label: 'Safety & Environmental Compliance', weight: 0.1, standards: [ManufacturingStandard.OSHA, ManufacturingStandard.ISO_14001], automationPotential: 0.65 },
    { id: 'shipping-logistics', label: 'Shipping & Logistics Coordination', weight: 0.1, standards: [], automationPotential: 0.8 },
  ];
  return {
    verticalId: 'manufacturing',
    displayName: 'Manufacturing & Production',
    manufacturingType: mfgType,
    dimensions,
    qualityAssessment: { currentDefectRate: 2.8, projectedDefectRate: 0.9, inspectionAutomationRate: 0.72, annualQualitySavingsUsd: 320000 },
    productionLineCount: 6,
    maintenanceAutomationScore: 74,
  };
}
