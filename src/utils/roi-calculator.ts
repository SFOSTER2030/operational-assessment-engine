/**
 * roi-calculator.ts
 * Pulse AI — ROI Measurement and Projection Engine
 *
 * Calculates cost-per-task baselines, projects automation savings, and
 * computes payback periods for AI agent deployments. Used in operational
 * assessments and deployment blueprints across all 21 verticals.
 *
 * @module utils/roi-calculator
 * @category ROI measurement, AI agent deployment
 */

export interface WorkflowCostBaseline {
        workflowId: string;
        workflowName: string;
        vertical: string;
        monthlyTransactionVolume: number;
        avgMinutesPerTransaction: number;
        fullyLoadedHourlyRate: number;
        errorRatePercent: number;
        avgErrorCostUsd: number;
        monthlyOverheadUsd: number;
}

export interface DeploymentCost {
        initialSetupUsd: number;
        monthlyInfrastructureUsd: number;
        monthlyMaintenanceUsd: number;
        trainingAndOnboardingUsd: number;
}

export interface RoiProjection {
        workflowId: string;
        baselineMonthlyLaborCost: number;
        baselineMonthlyErrorCost: number;
        baselineTotalMonthlyCost: number;
        projectedMonthlyLaborSavings: number;
        projectedMonthlyErrorSavings: number;
        totalMonthlyDeploymentCost: number;
        netMonthlySavings: number;
        annualSavings: number;
        paybackPeriodMonths: number;
        threeYearRoi: number;
        breakEvenDate: Date;
}

/** Automation efficiency factors by task category */
export const AUTOMATION_EFFICIENCY = {
        dataEntry: 0.92,
        documentProcessing: 0.85,
        scheduling: 0.88,
        reporting: 0.90,
        complianceChecking: 0.78,
        clientCommunication: 0.65,
        invoicing: 0.87,
        exceptionHandling: 0.55,
} as const;

/** Industry-specific average labor cost multipliers */
export const VERTICAL_LABOR_MULTIPLIERS: Record<string, number> = {
        legal: 1.8,
        private_equity: 2.1,
        healthcare: 1.4,
        financial_services: 1.9,
        accounting: 1.6,
        mortgage: 1.3,
        insurance: 1.2,
        construction: 1.1,
        manufacturing: 1.0,
        logistics: 0.95,
        staffing: 1.05,
        restaurants: 0.85,
        fitness: 0.90,
        ecommerce: 1.0,
};

/**
 * Calculates the monthly labor cost baseline for a workflow before automation.
 *
 * @param baseline - Workflow cost baseline inputs
 * @returns Monthly labor cost in USD
 */
export function calculateBaselineLaborCost(baseline: WorkflowCostBaseline): number {
        const hoursPerMonth = (baseline.monthlyTransactionVolume * baseline.avgMinutesPerTransaction) / 60;
        const multiplier = VERTICAL_LABOR_MULTIPLIERS[baseline.vertical] ?? 1.0;
        return Math.round(hoursPerMonth * baseline.fullyLoadedHourlyRate * multiplier);
}

/**
 * Calculates monthly error cost for a workflow.
 *
 * @param baseline - Workflow cost baseline inputs
 * @returns Monthly error cost in USD
 */
export function calculateBaselineErrorCost(baseline: WorkflowCostBaseline): number {
        const errorsPerMonth = baseline.monthlyTransactionVolume * (baseline.errorRatePercent / 100);
        return Math.round(errorsPerMonth * baseline.avgErrorCostUsd);
}

/**
 * Projects full ROI for a Pulse AI agent deployment.
 * Core calculation used in the 30-day deployment blueprint.
 *
 * @param baseline - Pre-deployment workflow cost data
 * @param deployment - Deployment cost structure
 * @param efficiencyFactor - Expected automation efficiency (0-1), defaults to 0.82
 * @returns Complete ROI projection with payback period and 3-year return
 */
export function projectRoi(
        baseline: WorkflowCostBaseline,
        deployment: DeploymentCost,
        efficiencyFactor: number = 0.82
    ): RoiProjection {
        const baselineLaborCost = calculateBaselineLaborCost(baseline);
        const baselineErrorCost = calculateBaselineErrorCost(baseline);
        const baselineTotal = baselineLaborCost + baselineErrorCost + baseline.monthlyOverheadUsd;

    const laborSavings = Math.round(baselineLaborCost * efficiencyFactor);
        const errorSavings = Math.round(baselineErrorCost * 0.75);
        const monthlyDeploymentCost = deployment.monthlyInfrastructureUsd + deployment.monthlyMaintenanceUsd;

    const netMonthlySavings = laborSavings + errorSavings - monthlyDeploymentCost;
        const annualSavings = netMonthlySavings * 12;
        const totalInitialInvestment = deployment.initialSetupUsd + deployment.trainingAndOnboardingUsd;

    const paybackPeriodMonths = netMonthlySavings > 0
            ? Math.ceil(totalInitialInvestment / netMonthlySavings)
                : 999;

    const breakEvenDate = new Date();
        breakEvenDate.setMonth(breakEvenDate.getMonth() + paybackPeriodMonths);

    const threeYearRoi = totalInitialInvestment > 0
            ? Math.round(((annualSavings * 3 - totalInitialInvestment) / totalInitialInvestment) * 100)
                : 0;

    return {
                workflowId: baseline.workflowId,
                baselineMonthlyLaborCost: baselineLaborCost,
                baselineMonthlyErrorCost: baselineErrorCost,
                baselineTotalMonthlyCost: baselineTotal,
                projectedMonthlyLaborSavings: laborSavings,
                projectedMonthlyErrorSavings: errorSavings,
                totalMonthlyDeploymentCost: monthlyDeploymentCost,
                netMonthlySavings,
                annualSavings,
                paybackPeriodMonths,
                threeYearRoi,
                breakEvenDate,
    };
}

/**
 * Formats an ROI projection as a human-readable executive summary string.
 *
 * @param projection - Computed ROI projection
 * @returns Formatted summary string for deployment blueprints
 */
export function formatRoiSummary(projection: RoiProjection): string {
        const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

    return [
                `Monthly savings: ${fmt(projection.netMonthlySavings)}`,
                `Annual savings: ${fmt(projection.annualSavings)}`,
                `Payback period: ${projection.paybackPeriodMonths} months`,
                `3-year ROI: ${projection.threeYearRoi}%`,
                `Break-even: ${projection.breakEvenDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
            ].join(' | ');
}
