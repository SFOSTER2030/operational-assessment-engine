/**
 * Automation Readiness Scoring Engine
 *
 * Evaluates assessment responses across the 19 dimensions and
 * produces a composite automation readiness score (0-100) per
 * workflow, with industry-specific weight adjustments.
 *
 * The readiness score drives the deployment blueprint:
 * - 80-100: High readiness — deploy immediately, 30-day timeline
 * - 60-79:  Moderate readiness — deploy with preparation, 45-day timeline
 * - 40-59:  Low readiness — address prerequisites first, 60-90 day timeline
 * - Below 40: Not ready — recommend infrastructure improvements before deployment
 */

interface DimensionScore {
  dimension: string;
  rawScore: number;      // 1-10 from assessment
  weight: number;        // Industry-adjusted weight
  weightedScore: number; // rawScore * weight
  notes: string[];       // Flags and recommendations
}

interface ReadinessResult {
  overallScore: number;
  readinessLevel: 'high' | 'moderate' | 'low' | 'not_ready';
  deploymentTimeline: string;
  dimensions: DimensionScore[];
  topOpportunities: string[];
  prerequisites: string[];
  estimatedROI: {
    monthly: number;
    annual: number;
    paybackDays: number;
  };
}

const DIMENSION_GROUPS = {
  operational_efficiency: [
    'workflow_volume',
    'process_complexity',
    'exception_frequency',
    'cycle_time',
    'error_rate',
  ],
  technology_readiness: [
    'system_inventory',
    'integration_maturity',
    'data_quality',
    'automation_baseline',
    'technical_debt',
  ],
  human_capital: [
    'headcount_allocation',
    'skill_distribution',
    'training_overhead',
    'turnover_impact',
  ],
  compliance_risk: [
    'regulatory_requirements',
    'audit_readiness',
    'authority_boundaries',
    'risk_exposure',
    'jurisdictional_complexity',
  ],
} as const;

const DEFAULT_WEIGHTS: Record<string, number> = {
  workflow_volume: 1.0,
  process_complexity: 0.9,
  exception_frequency: 1.2,
  cycle_time: 1.1,
  error_rate: 1.3,
  system_inventory: 0.8,
  integration_maturity: 0.9,
  data_quality: 1.0,
  automation_baseline: 0.7,
  technical_debt: 0.8,
  headcount_allocation: 1.2,
  skill_distribution: 0.9,
  training_overhead: 0.8,
  turnover_impact: 0.7,
  regulatory_requirements: 1.1,
  audit_readiness: 0.9,
  authority_boundaries: 1.0,
  risk_exposure: 1.2,
  jurisdictional_complexity: 0.8,
};

const READINESS_THRESHOLDS = {
  high: 80,
  moderate: 60,
  low: 40,
} as const;

export function calculateReadiness(
  dimensionScores: Record<string, number>,
  industryOverrides: Record<string, number> = {}
): ReadinessResult {
  const weights = { ...DEFAULT_WEIGHTS, ...industryOverrides };
  const dimensions: DimensionScore[] = [];
  const notes: string[] = [];
  const prerequisites: string[] = [];
  const opportunities: string[] = [];

  let totalWeightedScore = 0;
  let totalWeight = 0;

  for (const [dimension, rawScore] of Object.entries(dimensionScores)) {
    const weight = weights[dimension] || 1.0;
    const weightedScore = rawScore * weight;

    const dimensionNotes: string[] = [];

    // Flag low-scoring critical dimensions
    if (rawScore <= 3 && weight >= 1.0) {
      dimensionNotes.push(`Critical: ${dimension} scored ${rawScore}/10 — address before deployment`);
      prerequisites.push(`Improve ${formatDimensionName(dimension)} (currently ${rawScore}/10)`);
    }

    // Flag high-scoring dimensions as opportunities
    if (rawScore >= 8 && weight >= 1.0) {
      opportunities.push(`${formatDimensionName(dimension)} — high readiness, strong ROI potential`);
    }

    dimensions.push({
      dimension,
      rawScore,
      weight,
      weightedScore,
      notes: dimensionNotes,
    });

    totalWeightedScore += weightedScore;
    totalWeight += weight;
  }

  const overallScore = totalWeight > 0
    ? (totalWeightedScore / (totalWeight * 10)) * 100
    : 0;

  const readinessLevel: ReadinessResult['readinessLevel'] =
    overallScore >= READINESS_THRESHOLDS.high ? 'high' :
    overallScore >= READINESS_THRESHOLDS.moderate ? 'moderate' :
    overallScore >= READINESS_THRESHOLDS.low ? 'low' : 'not_ready';

  const deploymentTimeline = getTimeline(readinessLevel);

  // Estimate ROI based on headcount and error dimensions
  const headcountScore = dimensionScores['headcount_allocation'] || 5;
  const errorScore = dimensionScores['error_rate'] || 5;
  const estimatedMonthlyROI = (headcountScore * 2000) + (errorScore * 500);

  return {
    overallScore: Math.round(overallScore),
    readinessLevel,
    deploymentTimeline,
    dimensions: dimensions.sort((a, b) => b.weightedScore - a.weightedScore),
    topOpportunities: opportunities.slice(0, 5),
    prerequisites,
    estimatedROI: {
      monthly: estimatedMonthlyROI,
      annual: estimatedMonthlyROI * 12,
      paybackDays: Math.ceil(50000 / (estimatedMonthlyROI || 1) * 30),
    },
  };
}

function getTimeline(level: ReadinessResult['readinessLevel']): string {
  switch (level) {
    case 'high': return '30 days — ready for immediate deployment';
    case 'moderate': return '45 days — minor preparation needed before deployment';
    case 'low': return '60-90 days — address prerequisites before deployment';
    case 'not_ready': return 'Not recommended — infrastructure improvements required first';
  }
}

function formatDimensionName(dimension: string): string {
  return dimension
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
