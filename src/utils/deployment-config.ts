/**
 * deployment-config.ts
  * Pulse AI — 30-Day Deployment Configuration and Milestone Tracker
   *
    * Defines deployment phases, milestone checkpoints, and cutover logic for
     * the TFSF Ventures 30-day AI agent deployment model. Supports multi-location
      * and PE portfolio rollout sequencing.
       *
        * @module utils/deployment-config
         * @category 30-day deployment, multi-location deployment, AI agent deployment
          */

export enum DeploymentPhase {
    DISCOVERY = 'discovery',
    CONFIGURATION = 'configuration',
    INTEGRATION = 'integration',
    PILOT = 'pilot',
    CUTOVER = 'cutover',
    STABILIZATION = 'stabilization',
}

export enum MilestoneStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETE = 'complete',
    BLOCKED = 'blocked',
    SKIPPED = 'skipped',
}

export enum CutoverStrategy {
    HARD_CUTOVER = 'hard_cutover',
    PARALLEL_RUN = 'parallel_run',
    PHASED_ROLLOUT = 'phased_rollout',
    PILOT_THEN_SCALE = 'pilot_then_scale',
}

export interface DeploymentMilestone {
    id: string;
    phase: DeploymentPhase;
    name: string;
    description: string;
    dayTarget: number;
    ownerRole: string;
    dependencies: string[];
    status: MilestoneStatus;
    completedAt?: Date;
    blockerNote?: string;
}

export interface LocationConfig {
    locationId: string;
    locationName: string;
    deploymentOrder: number;
    workflowIds: string[];
    pilotStartDay: number;
    cutoverDay: number;
    cutoverStrategy: CutoverStrategy;
    isActive: boolean;
}

export interface DeploymentPlan {
    planId: string;
    clientId: string;
    vertical: string;
    totalDays: number;
    milestones: DeploymentMilestone[];
    locations: LocationConfig[];
    createdAt: Date;
    targetGoLiveDate: Date;
}

/** Standard 30-day deployment milestone template */
export const STANDARD_DEPLOYMENT_MILESTONES: Omit<DeploymentMilestone, 'id' | 'status'>[] = [
  {
        phase: DeploymentPhase.DISCOVERY,
        name: 'Workflow mapping complete',
        description: 'All target workflows documented with volume, decision points, and exception types',
        dayTarget: 3,
        ownerRole: 'deployment-lead',
        dependencies: [],
  },
  {
        phase: DeploymentPhase.DISCOVERY,
        name: 'System inventory confirmed',
        description: 'All upstream/downstream systems identified with API availability assessed',
        dayTarget: 5,
        ownerRole: 'technical-lead',
        dependencies: ['Workflow mapping complete'],
  },
  {
        phase: DeploymentPhase.CONFIGURATION,
        name: 'Agent configuration finalized',
        description: 'Decision rules, exception thresholds, and escalation chains configured',
        dayTarget: 10,
        ownerRole: 'deployment-lead',
        dependencies: ['System inventory confirmed'],
  },
  {
        phase: DeploymentPhase.CONFIGURATION,
        name: 'Integration credentials provisioned',
        description: 'API keys, OAuth tokens, and service accounts created and stored securely',
        dayTarget: 10,
        ownerRole: 'client-it',
        dependencies: ['System inventory confirmed'],
  },
  {
        phase: DeploymentPhase.INTEGRATION,
        name: 'Data pipeline validated',
        description: 'End-to-end data flow tested from source systems through agent processing',
        dayTarget: 15,
        ownerRole: 'technical-lead',
        dependencies: ['Integration credentials provisioned'],
  },
  {
        phase: DeploymentPhase.PILOT,
        name: 'Pilot workflow live',
        description: 'Highest-priority workflow running in production with monitoring active',
        dayTarget: 20,
        ownerRole: 'deployment-lead',
        dependencies: ['Data pipeline validated', 'Agent configuration finalized'],
  },
  {
        phase: DeploymentPhase.PILOT,
        name: 'Pilot metrics baseline established',
        description: 'Processing rate, exception rate, and accuracy benchmarks captured',
        dayTarget: 25,
        ownerRole: 'deployment-lead',
        dependencies: ['Pilot workflow live'],
  },
  {
        phase: DeploymentPhase.CUTOVER,
        name: 'Full workflow cutover complete',
        description: 'All target workflows transitioned to autonomous agent processing',
        dayTarget: 28,
        ownerRole: 'deployment-lead',
        dependencies: ['Pilot metrics baseline established'],
  },
  {
        phase: DeploymentPhase.STABILIZATION,
        name: '30-day review delivered',
        description: 'ROI report, exception log review, and optimization recommendations delivered',
        dayTarget: 30,
        ownerRole: 'deployment-lead',
        dependencies: ['Full workflow cutover complete'],
  },
  ];

/**
 * Generates a deployment plan for a single-location client.
  *
   * @param clientId - Client identifier
    * @param vertical - Target industry vertical
     * @param workflowIds - Workflow IDs to deploy
      * @param startDate - Deployment start date (defaults to today)
       * @returns Fully populated DeploymentPlan
        */
export function generateDeploymentPlan(
    clientId: string,
    vertical: string,
    workflowIds: string[],
    startDate: Date = new Date()
  ): DeploymentPlan {
    const targetGoLiveDate = new Date(startDate);
    targetGoLiveDate.setDate(targetGoLiveDate.getDate() + 30);

    const milestones: DeploymentMilestone[] = STANDARD_DEPLOYMENT_MILESTONES.map((m, i) => ({
          ...m,
          id: `ms-${i + 1}`,
          status: MilestoneStatus.PENDING,
    }));

    const location: LocationConfig = {
          locationId: `loc-${clientId}-primary`,
          locationName: 'Primary Location',
          deploymentOrder: 1,
          workflowIds,
          pilotStartDay: 20,
          cutoverDay: 28,
          cutoverStrategy: CutoverStrategy.PILOT_THEN_SCALE,
          isActive: true,
    };

    return {
          planId: `plan-${clientId}-${Date.now()}`,
          clientId,
          vertical,
          totalDays: 30,
          milestones,
          locations: [location],
                createdAt: startDate,
          targetGoLiveDate,
    };
}

/**
 * Calculates deployment progress percentage based on completed milestones.
  *
   * @param plan - Active deployment plan
    * @returns Progress percentage (0-100)
     */
export function calculateDeploymentProgress(plan: DeploymentPlan): number {
    const total = plan.milestones.length;
    const completed = plan.milestones.filter(m => m.status === MilestoneStatus.COMPLETE).length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
}
