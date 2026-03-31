/**
 * Deployment Blueprint Generator
 *
 * Transforms assessment results into a client-ready deployment
 * blueprint document. Produced within 24 hours of assessment completion.
 *
 * Blueprint sections:
 * 1. Executive Summary
 * 2. Workflow Analysis (per-workflow scoring across 19 dimensions)
 * 3. Agent Recommendations (specific agents per workflow)
 * 4. Cost Estimate (initial + ongoing)
 * 5. ROI Timeline (month-by-month with break-even)
 * 6. Deployment Sequence (priority ordering for multi-workflow)
 * 7. Compliance Requirements (industry-specific)
 * 8. Risk Assessment (deployment risks and mitigation)
 */

import { AssessmentResult, CostEstimate, ROIEstimate } from '../industries/types';

interface BlueprintSection {
  title: string;
  content: string;
  priority: number;
}

interface Blueprint {
  clientName: string;
  industryId: string;
  generatedAt: string;
  sections: BlueprintSection[];
  totalEstimatedCost: CostEstimate;
  totalEstimatedROI: ROIEstimate;
  deploymentTimeline: string;
  readinessScore: number;
}

export function generateBlueprint(
  clientName: string,
  assessmentResult: AssessmentResult
): Blueprint {
  const sections: BlueprintSection[] = [];

  // Section 1: Executive Summary
  sections.push({
    title: 'Executive Summary',
    content: generateExecutiveSummary(clientName, assessmentResult),
    priority: 1,
  });

  // Section 2: Workflow Analysis
  sections.push({
    title: 'Workflow Analysis',
    content: generateWorkflowAnalysis(assessmentResult),
    priority: 2,
  });

  // Section 3: Agent Recommendations
  sections.push({
    title: 'Recommended Agent Architecture',
    content: generateAgentRecommendations(assessmentResult),
    priority: 3,
  });

  // Section 4: Cost Estimate
  sections.push({
    title: 'Investment Summary',
    content: generateCostSection(assessmentResult.estimatedCost),
    priority: 4,
  });

  // Section 5: ROI Timeline
  sections.push({
    title: 'ROI Projection',
    content: generateROITimeline(assessmentResult.estimatedROI, assessmentResult.estimatedCost),
    priority: 5,
  });

  // Section 6: Deployment Sequence
  sections.push({
    title: 'Deployment Sequence',
    content: generateDeploymentSequence(assessmentResult),
    priority: 6,
  });

  // Section 7: Compliance Requirements
  if (assessmentResult.complianceNotes.length > 0) {
    sections.push({
      title: 'Compliance and Regulatory Considerations',
      content: assessmentResult.complianceNotes.join('\n\n'),
      priority: 7,
    });
  }

  // Section 8: Risk Assessment
  sections.push({
    title: 'Risk Assessment and Mitigation',
    content: generateRiskAssessment(assessmentResult),
    priority: 8,
  });

  return {
    clientName,
    industryId: assessmentResult.industryId,
    generatedAt: new Date().toISOString(),
    sections,
    totalEstimatedCost: assessmentResult.estimatedCost,
    totalEstimatedROI: assessmentResult.estimatedROI,
    deploymentTimeline: assessmentResult.deploymentTimeline,
    readinessScore: assessmentResult.overallReadiness,
  };
}

function generateExecutiveSummary(clientName: string, result: AssessmentResult): string {
  const readinessLabel = {
    high: 'highly ready for immediate deployment',
    moderate: 'ready for deployment with minor preparation',
    low: 'deployable after addressing identified prerequisites',
    not_ready: 'not yet recommended — infrastructure improvements needed first',
  }[result.readinessLevel];

  return `${clientName} scored ${result.overallReadiness}/100 on the Operational Intelligence Assessment, indicating the organization is ${readinessLabel}.\n\n` +
    `Based on the assessment, we recommend deploying ${result.recommendedAgents.length} specialized agents across the identified workflows. ` +
    `The estimated deployment timeline is ${result.deploymentTimeline}.\n\n` +
    `Projected ROI: ${result.estimatedROI.yearOneROIPercent}% in Year 1, with break-even at ${result.estimatedROI.paybackDays} days post-deployment.`;
}

function generateWorkflowAnalysis(result: AssessmentResult): string {
  return result.scores
    .sort((a, b) => b.weightedScore - a.weightedScore)
    .map(score => {
      const vs = score.rawScore >= score.industryBenchmark ? 'above' : 'below';
      return `${formatDimension(score.dimension)}: ${score.rawScore}/10 (${vs} industry benchmark of ${score.industryBenchmark}/10)\n` +
        score.notes.map(n => `  — ${n}`).join('\n');
    })
    .join('\n\n');
}

function generateAgentRecommendations(result: AssessmentResult): string {
  return result.recommendedAgents
    .map((agent, i) => `${i + 1}. ${agent}`)
    .join('\n');
}

function generateCostSection(cost: CostEstimate): string {
  return `Initial Deployment: $${cost.initialDeployment.low.toLocaleString()} — $${cost.initialDeployment.high.toLocaleString()}\n` +
    `Monthly Infrastructure: $${cost.monthlyInfrastructure.low.toLocaleString()} — $${cost.monthlyInfrastructure.high.toLocaleString()}/month\n` +
    `Year 1 Total: $${cost.yearOneCost.low.toLocaleString()} — $${cost.yearOneCost.high.toLocaleString()}`;
}

function generateROITimeline(roi: ROIEstimate, cost: CostEstimate): string {
  const months = [];
  let cumulativeBenefit = 0;
  const initialCost = (cost.initialDeployment.low + cost.initialDeployment.high) / 2;
  const monthlyCost = (cost.monthlyInfrastructure.low + cost.monthlyInfrastructure.high) / 2;

  for (let m = 1; m <= 12; m++) {
    cumulativeBenefit += roi.monthlyBenefit;
    const cumulativeCost = initialCost + (monthlyCost * m);
    const netPosition = cumulativeBenefit - cumulativeCost;
    const status = netPosition >= 0 ? '✓ Positive' : 'Investing';
    months.push(`Month ${m}: Cumulative benefit $${Math.round(cumulativeBenefit).toLocaleString()} | Net: $${Math.round(netPosition).toLocaleString()} (${status})`);
  }

  return months.join('\n');
}

function generateDeploymentSequence(result: AssessmentResult): string {
  return `Recommended deployment order based on ROI priority:\n\n` +
    `Week 1: Operational Intelligence Assessment (complete)\n` +
    `Week 2: Agent architecture design and system integration mapping\n` +
    `Week 3: Controlled deployment with parallel processing\n` +
    `Week 4: Full autonomy with monitoring and optimization\n\n` +
    `Post-deployment: Monthly performance review, quarterly authority boundary review, ongoing optimization.`;
}

function generateRiskAssessment(result: AssessmentResult): string {
  const risks: string[] = [];

  if (result.overallReadiness < 60) {
    risks.push('Moderate Risk: Below-average readiness score may require extended parallel processing period during deployment.');
  }

  if (result.complianceNotes.length > 3) {
    risks.push('Compliance Complexity: Multiple regulatory frameworks require careful authority boundary configuration and ongoing compliance monitoring.');
  }

  const lowScores = result.scores.filter(s => s.rawScore <= 3);
  if (lowScores.length > 0) {
    risks.push(`Infrastructure Gaps: ${lowScores.map(s => formatDimension(s.dimension)).join(', ')} scored below threshold and may require improvement before or during deployment.`);
  }

  if (risks.length === 0) {
    risks.push('Low Risk: Assessment indicates strong readiness across all dimensions. Standard deployment protocol recommended.');
  }

  return risks.join('\n\n');
}

function formatDimension(dimension: string): string {
  return dimension
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
