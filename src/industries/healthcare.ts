/**
 * healthcare.ts
  * Pulse AI — Healthcare Industry Assessment Module
   *
    * Vertical-specific assessment questions, scoring weights, and compliance
     * requirements for healthcare organizations deploying autonomous agents.
      * Covers medical practices, dental offices, veterinary clinics,
       * home health agencies, mental health practices, and medical billing companies.
        *
         * Compliance modules: HIPAA, CMS/MACRA, state licensing, OSHA healthcare,
          * patient scheduling automation, revenue cycle management, clinical
           * documentation workflows, and prior authorization processing.
            *
             * @module industries/healthcare
              * @category operational assessment, AI agent deployment, compliance monitoring
               */
  complianceFrameworks: ['HIPAA', 'CMS', 'state_licensing', 'OSHA_healthcare'],

  questions: [
    {
      id: 'health_01',
      dimension: 'workflow_volume',
      text: 'How many patient encounters does your organization process per month?',
      type: 'range',
      options: ['Under 500', '500-2,000', '2,000-10,000', '10,000+'],
      weight: 1.2,
    },
    {
      id: 'health_02',
      dimension: 'process_complexity',
      text: 'How many steps are involved in your patient intake and onboarding process?',
      type: 'range',
      options: ['3-5 steps', '6-10 steps', '11-15 steps', '15+ steps'],
      weight: 1.1,
    },
    {
      id: 'health_03',
      dimension: 'exception_frequency',
      text: 'What percentage of insurance claims require manual intervention or rework?',
      type: 'range',
      options: ['Under 10%', '10-25%', '25-40%', '40%+'],
      weight: 1.4,
    },
    {
      id: 'health_04',
      dimension: 'cycle_time',
      text: 'What is your average time from claim submission to payment receipt?',
      type: 'duration',
      options: ['Under 14 days', '14-30 days', '30-60 days', '60+ days'],
      weight: 1.3,
    },
    {
      id: 'health_05',
      dimension: 'error_rate',
      text: 'What is your first-pass claim denial rate?',
      type: 'range',
      options: ['Under 5%', '5-10%', '10-20%', '20%+'],
      weight: 1.5,
    },
    {
      id: 'health_06',
      dimension: 'system_inventory',
      text: 'Which systems do you currently use for practice management and EHR?',
      type: 'multi_select',
      options: ['Epic', 'Cerner', 'athenahealth', 'Kareo', 'DrChrono', 'AdvancedMD', 'Dentrix', 'Open Dental', 'Cornerstone (vet)', 'Other'],
      weight: 1.0,
    },
    {
      id: 'health_07',
      dimension: 'compliance_complexity',
      text: 'How many regulatory frameworks must your organization comply with?',
      type: 'multi_select',
      options: ['HIPAA', 'Medicare/CMS', 'Medicaid (state)', 'OSHA', 'State licensing', 'DEA (controlled substances)', 'Joint Commission', 'Other'],
      weight: 1.3,
    },
    {
      id: 'health_08',
      dimension: 'headcount_allocation',
      text: 'How many FTEs handle billing, scheduling, and administrative operations?',
      type: 'range',
      options: ['1-3', '4-8', '9-15', '15+'],
      weight: 1.3,
    },
    {
      id: 'health_09',
      dimension: 'data_quality',
      text: 'How often do patient records have incomplete or inconsistent data?',
      type: 'frequency',
      options: ['Rarely (<5%)', 'Sometimes (5-15%)', 'Often (15-30%)', 'Frequently (30%+)'],
      weight: 1.1,
    },
    {
      id: 'health_10',
      dimension: 'risk_exposure',
      text: 'What is the estimated annual cost of denied claims, late filings, and compliance incidents?',
      type: 'range',
      options: ['Under $25K', '$25K-$100K', '$100K-$500K', '$500K+'],
      weight: 1.4,
    },
  ],

  complianceRequirements: [
    {
      framework: 'HIPAA',
      description: 'Health Insurance Portability and Accountability Act — patient data protection',
      agentCapability: 'All agents operate within HIPAA-compliant infrastructure with PHI access controls, audit logging, and data isolation between practice locations',
      automationLevel: 'auto_resolve',
    },
    {
      framework: 'CMS',
      description: 'Centers for Medicare and Medicaid Services billing and documentation requirements',
      agentCapability: 'Billing agents validate claims against CMS requirements before submission, flagging documentation gaps and coding inconsistencies',
      automationLevel: 'assisted',
    },
    {
      framework: 'state_licensing',
      description: 'State-level healthcare licensing and practice requirements',
      agentCapability: 'Compliance agent tracks provider licensing status, renewal deadlines, and continuing education requirements per state',
      automationLevel: 'auto_resolve',
    },
    {
      framework: 'OSHA_healthcare',
      description: 'Healthcare-specific occupational safety requirements',
      agentCapability: 'Safety compliance agent monitors bloodborne pathogen training, hazardous waste handling, and workplace injury reporting',
      automationLevel: 'assisted',
    },
  ],

  scoringOverrides: {
    exception_frequency: 1.4,
    error_rate: 1.5,
    compliance_complexity: 1.3,
    risk_exposure: 1.4,
    data_quality: 1.1,
  },

  agentRecommendations: [
    'Revenue Cycle Agent — Automates charge capture, coding validation, claim submission, denial management, and payment posting',
    'Patient Scheduling Agent — Optimizes provider utilization, manages waitlists, reduces no-show rates through automated reminders',
    'Prior Authorization Agent — Handles authorization requests, tracks approval status, and escalates denials for clinical review',
    'Patient Intake Agent — Automates new patient registration, insurance verification, and medical history collection',
    'Compliance Monitoring Agent — Tracks HIPAA compliance, licensing renewals, and CMS documentation requirements',
    'Billing Exception Agent — Handles denied claims, identifies denial patterns, and automates appeal preparation',
  ],
};
