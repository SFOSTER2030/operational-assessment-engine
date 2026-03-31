/**
 * Construction Industry Assessment Module
 *
 * Vertical-specific questions, scoring weights, and compliance
 * requirements for construction companies deploying AI agents.
 *
 * Covers: general contractors, commercial construction firms,
 * specialty subcontractors, and construction management companies.
 */

import { IndustryModule, AssessmentQuestion, ComplianceRequirement } from './types';

export const constructionModule: IndustryModule = {
  id: 'construction',
  name: 'Construction',
  description: 'AI agent deployment assessment for construction companies',
  complianceFrameworks: ['OSHA', 'bonding', 'lien_tracking', 'prevailing_wage'],

  questions: [
    {
      id: 'const_01',
      dimension: 'workflow_volume',
      text: 'How many active projects does your company manage simultaneously?',
      type: 'range',
      options: ['1-5', '6-15', '16-30', '30+'],
      weight: 1.2,
    },
    {
      id: 'const_02',
      dimension: 'process_complexity',
      text: 'How many subcontractors do you coordinate per typical project?',
      type: 'range',
      options: ['1-5', '6-15', '16-30', '30+'],
      weight: 1.1,
    },
    {
      id: 'const_03',
      dimension: 'exception_frequency',
      text: 'How often do change orders require manual processing and re-estimation?',
      type: 'frequency',
      options: ['Rarely', 'Monthly', 'Weekly', 'Daily'],
      weight: 1.3,
    },
    {
      id: 'const_04',
      dimension: 'cycle_time',
      text: 'What is your average bid preparation time from RFP to submission?',
      type: 'duration',
      options: ['1-3 days', '4-7 days', '1-2 weeks', '2+ weeks'],
      weight: 1.4,
    },
    {
      id: 'const_05',
      dimension: 'error_rate',
      text: 'How frequently do estimating errors result in project cost overruns?',
      type: 'frequency',
      options: ['Rarely (<5%)', 'Sometimes (5-15%)', 'Often (15-30%)', 'Frequently (30%+)'],
      weight: 1.5,
    },
    {
      id: 'const_06',
      dimension: 'system_inventory',
      text: 'Which project management systems do you currently use?',
      type: 'multi_select',
      options: ['Procore', 'PlanGrid', 'Buildertrend', 'CoConstruct', 'Sage', 'QuickBooks', 'Excel/Manual', 'Other'],
      weight: 1.0,
    },
    {
      id: 'const_07',
      dimension: 'compliance_complexity',
      text: 'How many jurisdictions do you operate across with different prevailing wage and licensing requirements?',
      type: 'range',
      options: ['1', '2-3', '4-8', '8+'],
      weight: 1.2,
    },
    {
      id: 'const_08',
      dimension: 'headcount_allocation',
      text: 'How many FTEs handle estimating, bidding, and project administration?',
      type: 'range',
      options: ['1-2', '3-5', '6-10', '10+'],
      weight: 1.3,
    },
  ],

  complianceRequirements: [
    {
      framework: 'OSHA',
      description: 'Occupational Safety and Health Administration compliance tracking',
      agentCapability: 'Safety compliance monitoring agent tracks incident reports, training certifications, and site inspection schedules',
      automationLevel: 'assisted', // Human review required for incident classification
    },
    {
      framework: 'bonding',
      description: 'Performance and payment bond management',
      agentCapability: 'Bond tracking agent monitors bond requirements per project, expiration dates, and renewal deadlines',
      automationLevel: 'auto_resolve',
    },
    {
      framework: 'lien_tracking',
      description: 'Mechanic\'s lien deadline tracking across jurisdictions',
      agentCapability: 'Lien deadline agent tracks filing deadlines per jurisdiction, generates notices, and escalates approaching deadlines',
      automationLevel: 'auto_resolve',
    },
    {
      framework: 'prevailing_wage',
      description: 'Davis-Bacon and state prevailing wage compliance',
      agentCapability: 'Payroll compliance agent validates wage rates against prevailing wage schedules by jurisdiction and trade',
      automationLevel: 'assisted',
    },
  ],

  scoringOverrides: {
    // Construction companies get higher weight on bid processing and estimating
    cycle_time: 1.4,
    error_rate: 1.5,
    // Lower weight on system maturity since many construction firms use basic tools
    integration_maturity: 0.8,
  },

  agentRecommendations: [
    'Bid Processing Agent — Automates quantity takeoffs, subcontractor pricing aggregation, and bid compilation',
    'Estimating Agent — Cross-references historical project data with current material and labor costs',
    'Change Order Agent — Processes change orders, recalculates project costs, and routes for approval',
    'Safety Compliance Agent — Tracks OSHA requirements, training certifications, and inspection schedules',
    'Subcontractor Coordination Agent — Manages subcontractor communication, scheduling, and payment tracking',
    'Lien Deadline Agent — Tracks mechanic\'s lien deadlines across jurisdictions with automated notice generation',
  ],
};
