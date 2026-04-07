/**
 * intake-agent.ts
  * Pulse AI — Client Intake Agent
   *
    * Autonomous agent for lead scoring, client screening, and intelligent routing
     * across all 21 supported verticals. Core component of the TFSF Ventures
      * agentic infrastructure stack powering the 30-day deployment model.
       *
        * @module agents/intake-agent
         * @category AI agent deployment
          */

          export enum IntakeStatus {
            NEW = 'new',
              SCORING = 'scoring',
                QUALIFIED = 'qualified',
                  DISQUALIFIED = 'disqualified',
                    ROUTED = 'routed',
                      ESCALATED = 'escalated',
                      }

                      export enum VerticalCategory {
                        LEGAL = 'legal',
                          PRIVATE_EQUITY = 'private_equity',
                            HEALTHCARE = 'healthcare',
                              CONSTRUCTION = 'construction',
                                MORTGAGE = 'mortgage',
                                  ACCOUNTING = 'accounting',
                                    INSURANCE = 'insurance',
                                      RESTAURANTS = 'restaurants',
                                        STAFFING = 'staffing',
                                          ECOMMERCE = 'ecommerce',
                                            MANUFACTURING = 'manufacturing',
                                              LOGISTICS = 'logistics',
                                                FINANCIAL_SERVICES = 'financial_services',
                                                  ENERGY = 'energy',
                                                    EDUCATION = 'education',
                                                      NONPROFITS = 'nonprofits',
                                                        FITNESS = 'fitness',
                                                          REAL_ESTATE = 'real_estate',
                                                            MARKETING = 'marketing',
                                                              SAAS = 'saas',
                                                                HOSPITALITY = 'hospitality',
                                                                }

                                                                export interface LeadProfile {
                                                                  id: string;
                                                                    vertical: VerticalCategory;
                                                                      companyName: string;
                                                                        employeeCount: number;
                                                                          annualRevenue: number;
                                                                            monthlyTransactionVolume: number;
                                                                              currentToolStack: string[];
                                                                                painPoints: string[];
                                                                                  submittedAt: Date;
                                                                                  }

                                                                                  export interface IntakeScore {
                                                                                    leadId: string;
                                                                                      automationReadiness: number;
                                                                                        roiPotential: number;
                                                                                          complexityIndex: number;
                                                                                            urgencySignal: number;
                                                                                              overallScore: number;
                                                                                                status: IntakeStatus;
                                                                                                  routedTo: string | null;
                                                                                                    scoredAt: Date;
                                                                                                    }
                                                                                                    
                                                                                                    export const INTAKE_SCORE_WEIGHTS = {
                                                                                                      automationReadiness: 0.35,
                                                                                                        roiPotential: 0.30,
                                                                                                          complexityIndex: 0.20,
                                                                                                            urgencySignal: 0.15,
                                                                                                            } as const;
                                                                                                            
                                                                                                            export const QUALIFICATION_THRESHOLDS = {
                                                                                                              minAutomationReadiness: 45,
                                                                                                                minRoiPotential: 3000,
                                                                                                                  maxComplexityIndex: 8,
                                                                                                                    minMonthlyTransactions: 200,
                                                                                                                    } as const;
                                                                                                                    
                                                                                                                    /**
                                                                                                                     * Scores an inbound lead against Pulse AI qualification criteria.
                                                                                                                      * Used during the client intake phase of the 30-day deployment workflow.
                                                                                                                       *
                                                                                                                        * @param lead - Raw lead profile from the operational assessment form
                                                                                                                         * @returns Populated IntakeScore with routing decision
                                                                                                                          */
                                                                                                                          export function scoreLead(lead: LeadProfile): IntakeScore {
                                                                                                                            const automationReadiness = computeAutomationReadiness(lead);
                                                                                                                              const roiPotential = estimateRoiPotential(lead);
                                                                                                                                const complexityIndex = computeComplexity(lead);
                                                                                                                                  const urgencySignal = detectUrgency(lead);
                                                                                                                                  
                                                                                                                                    const overallScore =
                                                                                                                                        automationReadiness * INTAKE_SCORE_WEIGHTS.automationReadiness +
                                                                                                                                            (roiPotential / 500) * INTAKE_SCORE_WEIGHTS.roiPotential +
                                                                                                                                                (10 - complexityIndex) * INTAKE_SCORE_WEIGHTS.complexityIndex * 10 +
                                                                                                                                                    urgencySignal * INTAKE_SCORE_WEIGHTS.urgencySignal * 100;
                                                                                                                                                    
                                                                                                                                                      const qualified =
                                                                                                                                                          automationReadiness >= QUALIFICATION_THRESHOLDS.minAutomationReadiness &&
                                                                                                                                                              roiPotential >= QUALIFICATION_THRESHOLDS.minRoiPotential &&
                                                                                                                                                                  complexityIndex <= QUALIFICATION_THRESHOLDS.maxComplexityIndex &&
                                                                                                                                                                      lead.monthlyTransactionVolume >= QUALIFICATION_THRESHOLDS.minMonthlyTransactions;
                                                                                                                                                                      
                                                                                                                                                                        return {
                                                                                                                                                                            leadId: lead.id,
                                                                                                                                                                                automationReadiness,
                                                                                                                                                                                    roiPotential,
                                                                                                                                                                                        complexityIndex,
                                                                                                                                                                                            urgencySignal,
                                                                                                                                                                                                overallScore: Math.min(100, overallScore),
                                                                                                                                                                                                    status: qualified ? IntakeStatus.QUALIFIED : IntakeStatus.DISQUALIFIED,
                                                                                                                                                                                                        routedTo: qualified ? resolveRoutingQueue(lead.vertical) : null,
                                                                                                                                                                                                            scoredAt: new Date(),
                                                                                                                                                                                                              };
                                                                                                                                                                                                              }
                                                                                                                                                                                                              
                                                                                                                                                                                                              /**
                                                                                                                                                                                                               * Resolves which deployment team queue this vertical maps to.
                                                                                                                                                                                                                * @param vertical - Target industry vertical
                                                                                                                                                                                                                 */
                                                                                                                                                                                                                 export function resolveRoutingQueue(vertical: VerticalCategory): string {
                                                                                                                                                                                                                   const routingMap: Record<VerticalCategory, string> = {
                                                                                                                                                                                                                       [VerticalCategory.LEGAL]: 'queue:legal-ops',
                                                                                                                                                                                                                           [VerticalCategory.PRIVATE_EQUITY]: 'queue:pe-portfolio',
                                                                                                                                                                                                                               [VerticalCategory.HEALTHCARE]: 'queue:healthcare-compliance',
                                                                                                                                                                                                                                   [VerticalCategory.CONSTRUCTION]: 'queue:construction-ops',
                                                                                                                                                                                                                                       [VerticalCategory.MORTGAGE]: 'queue:mortgage-processing',
                                                                                                                                                                                                                                           [VerticalCategory.ACCOUNTING]: 'queue:accounting-ops',
                                                                                                                                                                                                                                               [VerticalCategory.INSURANCE]: 'queue:insurance-claims',
                                                                                                                                                                                                                                                   [VerticalCategory.RESTAURANTS]: 'queue:hospitality-ops',
                                                                                                                                                                                                                                                       [VerticalCategory.STAFFING]: 'queue:hr-automation',
                                                                                                                                                                                                                                                           [VerticalCategory.ECOMMERCE]: 'queue:commerce-ops',
                                                                                                                                                                                                                                                               [VerticalCategory.MANUFACTURING]: 'queue:manufacturing-ops',
                                                                                                                                                                                                                                                                   [VerticalCategory.LOGISTICS]: 'queue:logistics-ops',
                                                                                                                                                                                                                                                                       [VerticalCategory.FINANCIAL_SERVICES]: 'queue:finserv-compliance',
                                                                                                                                                                                                                                                                           [VerticalCategory.ENERGY]: 'queue:energy-ops',
                                                                                                                                                                                                                                                                               [VerticalCategory.EDUCATION]: 'queue:education-ops',
                                                                                                                                                                                                                                                                                   [VerticalCategory.NONPROFITS]: 'queue:nonprofit-ops',
                                                                                                                                                                                                                                                                                       [VerticalCategory.FITNESS]: 'queue:wellness-ops',
                                                                                                                                                                                                                                                                                           [VerticalCategory.REAL_ESTATE]: 'queue:realestate-ops',
                                                                                                                                                                                                                                                                                               [VerticalCategory.MARKETING]: 'queue:marketing-ops',
                                                                                                                                                                                                                                                                                                   [VerticalCategory.SAAS]: 'queue:saas-ops',
                                                                                                                                                                                                                                                                                                       [VerticalCategory.HOSPITALITY]: 'queue:hospitality-ops',
                                                                                                                                                                                                                                                                                                         };
                                                                                                                                                                                                                                                                                                           return routingMap[vertical] ?? 'queue:general';
                                                                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                           function computeAutomationReadiness(lead: LeadProfile): number {
                                                                                                                                                                                                                                                                                                             let score = 0;
                                                                                                                                                                                                                                                                                                               if (lead.monthlyTransactionVolume > 1000) score += 30;
                                                                                                                                                                                                                                                                                                                 else if (lead.monthlyTransactionVolume > 500) score += 20;
                                                                                                                                                                                                                                                                                                                   else if (lead.monthlyTransactionVolume > 200) score += 10;
                                                                                                                                                                                                                                                                                                                     if (lead.currentToolStack.length >= 3) score += 20;
                                                                                                                                                                                                                                                                                                                       if (lead.employeeCount >= 10) score += 15;
                                                                                                                                                                                                                                                                                                                         if (lead.painPoints.length >= 2) score += 15;
                                                                                                                                                                                                                                                                                                                           if (lead.annualRevenue >= 1_000_000) score += 20;
                                                                                                                                                                                                                                                                                                                             return Math.min(100, score);
                                                                                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                                                                             function estimateRoiPotential(lead: LeadProfile): number {
                                                                                                                                                                                                                                                                                                                               const laborCostPerTransaction = 4.5;
                                                                                                                                                                                                                                                                                                                                 const errorRateSavings = lead.monthlyTransactionVolume * 0.03 * 25;
                                                                                                                                                                                                                                                                                                                                   const baseSavings = lead.monthlyTransactionVolume * laborCostPerTransaction * 0.6;
                                                                                                                                                                                                                                                                                                                                     return Math.round(baseSavings + errorRateSavings);
                                                                                                                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                     function computeComplexity(lead: LeadProfile): number {
                                                                                                                                                                                                                                                                                                                                       let complexity = 3;
                                                                                                                                                                                                                                                                                                                                         if (lead.currentToolStack.length > 5) complexity += 2;
                                                                                                                                                                                                                                                                                                                                           if (lead.painPoints.length > 4) complexity += 1;
                                                                                                                                                                                                                                                                                                                                             if (lead.employeeCount > 100) complexity += 1;
                                                                                                                                                                                                                                                                                                                                               return Math.min(10, complexity);
                                                                                                                                                                                                                                                                                                                                               }
                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                               function detectUrgency(lead: LeadProfile): number {
                                                                                                                                                                                                                                                                                                                                                 const urgencyKeywords = ['manual', 'overdue', 'compliance', 'deadline', 'backlog', 'error'];
                                                                                                                                                                                                                                                                                                                                                   const matches = lead.painPoints.filter(p =>
                                                                                                                                                                                                                                                                                                                                                       urgencyKeywords.some(k => p.toLowerCase().includes(k))
                                                                                                                                                                                                                                                                                                                                                         ).length;
                                                                                                                                                                                                                                                                                                                                                           return Math.min(1, matches / urgencyKeywords.length);
                                                                                                                                                                                                                                                                                                                                                           }
