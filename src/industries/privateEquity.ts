/**
 * privateEquity.ts
  * Pulse AI — Private Equity Operations Assessment Module
   *
    * Assessment configuration for PE/private equity vertical. Covers portfolio
     * operations monitoring, fund administration, LP reporting, due diligence
      * automation, and deal flow management across portfolio companies.
       *
        * @module industries/privateEquity
         * @category PE portfolio operations, AI agent deployment
          */

          export enum PEWorkflowType {
            PORTFOLIO_MONITORING = 'portfolio_monitoring',
              DUE_DILIGENCE = 'due_diligence',
                LP_REPORTING = 'lp_reporting',
                  FUND_ADMINISTRATION = 'fund_administration',
                    DEAL_FLOW = 'deal_flow',
                      VALUE_CREATION = 'value_creation',
                        EXIT_PREPARATION = 'exit_preparation',
                        }

                        export interface PEAssessmentDimension {
                          id: string;
                            workflowType: PEWorkflowType;
                              question: string;
                                weight: number;
                                  automationPotential: number;
                                    complianceFlags: string[];
                                    }

                                    export interface PEWorkflowScore {
                                      workflowType: PEWorkflowType;
                                        automationReadiness: number;
                                          dataQuality: number;
                                            systemMaturity: number;
                                              complianceRisk: number;
                                                roiPotential: number;
                                                  compositeScore: number;
                                                    priorityRank: number;
                                                      recommendedAgents: string[];
                                                      }

                                                      /** Compliance requirements for PE/financial services operations */
                                                      export const PE_COMPLIANCE_REQUIREMENTS = {
                                                        federal: ['SEC-IA', 'SEC-17A-3', 'SEC-17A-4', 'FINRA-4511', 'BSA-AML', 'ERISA'],
                                                          reporting: ['LP-AGREEMENT', 'ILPA-STANDARDS', 'GAAP-ASC-820'],
                                                            international: ['AIFMD', 'GDPR', 'CRS-FATCA'],
                                                              audit: ['SSAE-18', 'SOC-2', 'PCAOB'],
                                                              } as const;

                                                              /** Standard PE assessment dimensions */
                                                              export const PE_ASSESSMENT_DIMENSIONS: PEAssessmentDimension[] = [
                                                                {
                                                                    id: 'pe-pm-001',
                                                                        workflowType: PEWorkflowType.PORTFOLIO_MONITORING,
                                                                            question: 'How frequently does your team manually compile portfolio company KPIs into a consolidated report?',
                                                                                weight: 0.18,
                                                                                    automationPotential: 0.88,
                                                                                        complianceFlags: ['SEC-IA'],
                                                                                          },
                                                                                            {
                                                                                                id: 'pe-pm-002',
                                                                                                    workflowType: PEWorkflowType.PORTFOLIO_MONITORING,
                                                                                                        question: 'What is your current cycle time from portfolio company data submission to GP review completion?',
                                                                                                            weight: 0.15,
                                                                                                                automationPotential: 0.82,
                                                                                                                    complianceFlags: [],
                                                                                                                      },
                                                                                                                        {
                                                                                                                            id: 'pe-dd-001',
                                                                                                                                workflowType: PEWorkflowType.DUE_DILIGENCE,
                                                                                                                                    question: 'How many team hours are spent on document review per deal during initial due diligence?',
                                                                                                                                        weight: 0.20,
                                                                                                                                            automationPotential: 0.75,
                                                                                                                                                complianceFlags: ['BSA-AML'],
                                                                                                                                                  },
                                                                                                                                                    {
                                                                                                                                                        id: 'pe-dd-002',
                                                                                                                                                            workflowType: PEWorkflowType.DUE_DILIGENCE,
                                                                                                                                                                question: 'Do you use standardized diligence checklists, and are they enforced systematically?',
                                                                                                                                                                    weight: 0.12,
                                                                                                                                                                        automationPotential: 0.90,
                                                                                                                                                                            complianceFlags: [],
                                                                                                                                                                              },
                                                                                                                                                                                {
                                                                                                                                                                                    id: 'pe-lp-001',
                                                                                                                                                                                        workflowType: PEWorkflowType.LP_REPORTING,
                                                                                                                                                                                            question: 'How many hours per quarter are spent preparing LP capital account statements?',
                                                                                                                                                                                                weight: 0.22,
                                                                                                                                                                                                    automationPotential: 0.85,
                                                                                                                                                                                                        complianceFlags: ['LP-AGREEMENT', 'ILPA-STANDARDS', 'GAAP-ASC-820'],
                                                                                                                                                                                                          },
                                                                                                                                                                                                            {
                                                                                                                                                                                                                id: 'pe-lp-002',
                                                                                                                                                                                                                    workflowType: PEWorkflowType.LP_REPORTING,
                                                                                                                                                                                                                        question: 'How many manual touchpoints are required to produce your quarterly investor letter?',
                                                                                                                                                                                                                            weight: 0.13,
                                                                                                                                                                                                                                automationPotential: 0.70,
                                                                                                                                                                                                                                    complianceFlags: ['SEC-IA'],
                                                                                                                                                                                                                                      },
                                                                                                                                                                                                                                      ];
                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                      /**
                                                                                                                                                                                                                                       * Scores a PE workflow based on assessment inputs.
                                                                                                                                                                                                                                        * Agent recommendations are returned based on composite score and workflow type.
                                                                                                                                                                                                                                         *
                                                                                                                                                                                                                                          * @param workflowType - The PE workflow being assessed
                                                                                                                                                                                                                                           * @param inputs - Raw dimension scores from assessment responses (0-10 per dimension)
                                                                                                                                                                                                                                            * @returns PEWorkflowScore with composite score and agent recommendations
                                                                                                                                                                                                                                             */
                                                                                                                                                                                                                                             export function scorePEWorkflow(
                                                                                                                                                                                                                                               workflowType: PEWorkflowType,
                                                                                                                                                                                                                                                 inputs: Record<string, number>
                                                                                                                                                                                                                                                 ): PEWorkflowScore {
                                                                                                                                                                                                                                                   const dimensions = PE_ASSESSMENT_DIMENSIONS.filter(d => d.workflowType === workflowType);
                                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                                     let weightedScore = 0;
                                                                                                                                                                                                                                                       let totalWeight = 0;
                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                         for (const dim of dimensions) {
                                                                                                                                                                                                                                                             const rawScore = inputs[dim.id] ?? 5;
                                                                                                                                                                                                                                                                 weightedScore += rawScore * dim.weight * dim.automationPotential;
                                                                                                                                                                                                                                                                     totalWeight += dim.weight;
                                                                                                                                                                                                                                                                       }
                                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                         const compositeScore = totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 10) : 50;
                                                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                                           return {
                                                                                                                                                                                                                                                                               workflowType,
                                                                                                                                                                                                                                                                                   automationReadiness: compositeScore,
                                                                                                                                                                                                                                                                                       dataQuality: inputs['data_quality'] ?? 60,
                                                                                                                                                                                                                                                                                           systemMaturity: inputs['system_maturity'] ?? 55,
                                                                                                                                                                                                                                                                                               complianceRisk: inputs['compliance_risk'] ?? 40,
                                                                                                                                                                                                                                                                                                   roiPotential: compositeScore * 850,
                                                                                                                                                                                                                                                                                                       compositeScore,
                                                                                                                                                                                                                                                                                                           priorityRank: compositeScore >= 70 ? 1 : compositeScore >= 50 ? 2 : 3,
                                                                                                                                                                                                                                                                                                               recommendedAgents: resolvePEAgentRecommendations(workflowType, compositeScore),
                                                                                                                                                                                                                                                                                                                 };
                                                                                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                                 function resolvePEAgentRecommendations(
                                                                                                                                                                                                                                                                                                                   workflowType: PEWorkflowType,
                                                                                                                                                                                                                                                                                                                     score: number
                                                                                                                                                                                                                                                                                                                     ): string[] {
                                                                                                                                                                                                                                                                                                                       const recommendations: Record<PEWorkflowType, string[]> = {
                                                                                                                                                                                                                                                                                                                           [PEWorkflowType.PORTFOLIO_MONITORING]: ['data-aggregation-agent', 'kpi-monitoring-agent', 'anomaly-detection-agent'],
                                                                                                                                                                                                                                                                                                                               [PEWorkflowType.DUE_DILIGENCE]: ['document-agent', 'compliance-agent', 'intake-agent'],
                                                                                                                                                                                                                                                                                                                                   [PEWorkflowType.LP_REPORTING]: ['reporting-agent', 'document-agent', 'billing-agent'],
                                                                                                                                                                                                                                                                                                                                       [PEWorkflowType.FUND_ADMINISTRATION]: ['billing-agent', 'compliance-agent', 'reporting-agent'],
                                                                                                                                                                                                                                                                                                                                           [PEWorkflowType.DEAL_FLOW]: ['intake-agent', 'document-agent', 'scoring-agent'],
                                                                                                                                                                                                                                                                                                                                               [PEWorkflowType.VALUE_CREATION]: ['monitoring-agent', 'exception-handler', 'reporting-agent'],
                                                                                                                                                                                                                                                                                                                                                   [PEWorkflowType.EXIT_PREPARATION]: ['document-agent', 'compliance-agent', 'reporting-agent'],
                                                                                                                                                                                                                                                                                                                                                     };
                                                                                                                                                                                                                                                                                                                                                       const all = recommendations[workflowType] ?? [];
                                                                                                                                                                                                                                                                                                                                                         return score >= 60 ? all : all.slice(0, 2);
                                                                                                                                                                                                                                                                                                                                                         }
