/**
 * legal.ts
  * Pulse AI — Legal Industry Assessment Module
   *
    * Vertical-specific assessment questions, scoring weights, and compliance
     * requirements for law firms and legal practices deploying autonomous agents.
      * Covers solo practitioners, small and mid-size law firms, legal departments,
       * immigration practices, personal injury firms, and corporate law groups.
        *
         * Compliance modules: bar rules, attorney-client privilege, conflict checking,
          * trust account reconciliation (IOLTA), court filing deadline tracking,
           * client intake automation, and engagement letter management.
            *
             * @module industries/legal
              * @category operational assessment, AI agent deployment, law firm automation
               */
  complianceFrameworks: ['bar_rules', 'privilege_heppner', 'conflicts', 'trust_accounting', 'court_deadlines'],

  questions: [
    {
      id: 'legal_01',
      dimension: 'workflow_volume',
      text: 'How many new client matters does your firm open per month?',
      type: 'range',
      options: ['Under 10', '10-50', '50-200', '200+'],
      weight: 1.1,
    },
    {
      id: 'legal_02',
      dimension: 'process_complexity',
      text: 'How many steps are in your client intake process from initial contact to engagement letter?',
      type: 'range',
      options: ['3-5 steps', '6-10 steps', '11-15 steps', '15+ steps'],
      weight: 1.2,
    },
    {
      id: 'legal_03',
      dimension: 'exception_frequency',
      text: 'How often do conflict checks require manual review beyond automated database screening?',
      type: 'frequency',
      options: ['Rarely (<5%)', 'Sometimes (5-15%)', 'Often (15-30%)', 'Frequently (30%+)'],
      weight: 1.3,
    },
    {
      id: 'legal_04',
      dimension: 'cycle_time',
      text: 'What is your average time from client inquiry to engagement letter execution?',
      type: 'duration',
      options: ['Same day', '1-3 days', '4-7 days', '7+ days'],
      weight: 1.4,
    },
    {
      id: 'legal_05',
      dimension: 'error_rate',
      text: 'In the last 12 months, how many statute of limitations or court filing deadlines were at risk of being missed?',
      type: 'range',
      options: ['None', '1-2', '3-5', '5+'],
      weight: 1.8, // Highest weight — missed deadlines = malpractice
    },
    {
      id: 'legal_06',
      dimension: 'system_inventory',
      text: 'Which practice management and billing systems do you use?',
      type: 'multi_select',
      options: ['Clio', 'MyCase', 'PracticePanther', 'Smokeball', 'CosmoLex', 'LEAP', 'PCLaw', 'QuickBooks', 'Excel/Manual', 'Other'],
      weight: 1.0,
    },
    {
      id: 'legal_07',
      dimension: 'compliance_complexity',
      text: 'How many state bar jurisdictions does your firm operate in?',
      type: 'range',
      options: ['1', '2-3', '4-8', '8+'],
      weight: 1.2,
    },
    {
      id: 'legal_08',
      dimension: 'headcount_allocation',
      text: 'How many paralegals and administrative staff handle intake, billing, and case management?',
      type: 'range',
      options: ['1-2', '3-5', '6-10', '10+'],
      weight: 1.3,
    },
  ],

  complianceRequirements: [
    {
      framework: 'bar_rules',
      description: 'State bar rules of professional conduct governing AI use in legal practice',
      agentCapability: 'All agent actions logged with attorney supervision verification. Agents do not provide legal advice — they handle operational workflows under attorney oversight.',
      automationLevel: 'assisted',
    },
    {
      framework: 'privilege_heppner',
      description: 'Attorney-client privilege considerations per United States v. Heppner (SDNY, Feb 2026) — AI-generated communications in legal matters may be discoverable',
      agentCapability: 'Agents flag all communications that may touch privileged matters. Privilege-sensitive workflows route through attorney review before any external communication.',
      automationLevel: 'escalated', // Always human review for privilege
    },
    {
      framework: 'conflicts',
      description: 'Conflict of interest checking across all matters and parties',
      agentCapability: 'Automated conflict screening against firm database with human review for complex or ambiguous relationships',
      automationLevel: 'assisted',
    },
    {
      framework: 'trust_accounting',
      description: 'IOLTA and client trust account management per state bar requirements',
      agentCapability: 'Trust accounting agent tracks deposits, disbursements, and reconciliation with automated three-way reconciliation and exception flagging',
      automationLevel: 'assisted',
    },
    {
      framework: 'court_deadlines',
      description: 'Court filing deadlines and statute of limitations tracking',
      agentCapability: 'Deadline agent calculates filing deadlines per jurisdiction, provides redundant notifications (30/14/7/3/1 day), and escalates approaching deadlines to responsible attorney',
      automationLevel: 'auto_resolve',
    },
  ],

  scoringOverrides: {
    error_rate: 1.8, // Missed deadlines = malpractice exposure
    compliance_complexity: 1.3,
    cycle_time: 1.4,
  },

  agentRecommendations: [
    'Client Intake Agent — Qualifies prospects, collects case information, runs conflict checks, routes to appropriate practice area',
    'Deadline Management Agent — Tracks all court filing deadlines and statutes of limitations with redundant notifications and escalation',
    'Document Automation Agent — Generates standard documents from templates, tracks versions, manages document assembly workflows',
    'Billing Agent — Tracks attorney time entries, generates invoices, manages collections, handles trust accounting reconciliation',
    'Conflict Check Agent — Screens new matters against firm database, flags potential conflicts, routes ambiguous results for attorney review',
    'Client Communication Agent — Handles status update requests, appointment scheduling, and document requests without consuming paralegal hours',
  ],
};
