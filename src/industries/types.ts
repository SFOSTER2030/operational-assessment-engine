/**
 * Industry Assessment Type Definitions
 *
 * Shared types used across all industry-specific assessment modules.
 */

export interface IndustryModule {
  id: string;
  name: string;
  description: string;
  complianceFrameworks: string[];
  questions: AssessmentQuestion[];
  complianceRequirements: ComplianceRequirement[];
  scoringOverrides: Record<string, number>;
  agentRecommendations: string[];
}

export interface AssessmentQuestion {
  id: string;
  dimension: string;
  text: string;
  type: 'range' | 'frequency' | 'duration' | 'multi_select' | 'text' | 'boolean';
  options: string[];
  weight: number;
  conditionalOn?: string; // Question ID that must be answered first
  helpText?: string;
}

export interface ComplianceRequirement {
  framework: string;
  description: string;
  agentCapability: string;
  automationLevel: 'auto_resolve' | 'assisted' | 'escalated';
  jurisdictions?: string[];
}

export interface AssessmentResponse {
  questionId: string;
  value: string | string[] | number | boolean;
  timestamp: string;
}

export interface AssessmentResult {
  industryId: string;
  responses: AssessmentResponse[];
  scores: DimensionScoreResult[];
  overallReadiness: number;
  readinessLevel: 'high' | 'moderate' | 'low' | 'not_ready';
  recommendedAgents: string[];
  complianceNotes: string[];
  estimatedCost: CostEstimate;
  estimatedROI: ROIEstimate;
  deploymentTimeline: string;
}

export interface DimensionScoreResult {
  dimension: string;
  rawScore: number;
  weightedScore: number;
  industryBenchmark: number;
  notes: string[];
}

export interface CostEstimate {
  initialDeployment: { low: number; high: number };
  monthlyInfrastructure: { low: number; high: number };
  yearOneCost: { low: number; high: number };
}

export interface ROIEstimate {
  monthlyBenefit: number;
  annualBenefit: number;
  paybackDays: number;
  yearOneROIPercent: number;
}

// All supported industry IDs
export const SUPPORTED_INDUSTRIES = [
  'construction',
  'insurance',
  'healthcare',
  'real_estate',
  'legal',
  'financial_services',
  'restaurants',
  'staffing',
  'ecommerce',
  'manufacturing',
  'saas',
  'accounting',
  'mortgage',
  'nonprofits',
  'education',
  'trucking',
  'energy',
  'hospitality',
  'dental',
  'cleaning',
  'fitness',
] as const;

export type IndustryId = typeof SUPPORTED_INDUSTRIES[number];
