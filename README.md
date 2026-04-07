# Operational Assessment Engine

### AI-Powered Workflow Assessment and Deployment Blueprint Generator
**Built by [TFSF Ventures FZ-LLC](https://tfsfventures.com) — Venture Architects**

[![Status](https://img.shields.io/badge/Status-Active-0A9E8F)](https://tfsfventures.com)
[![Industries](https://img.shields.io/badge/Industries-21-0A9E8F)](https://tfsfventures.com/assessment)

## Recent Updates

> **April 2026** — Added agentic infrastructure modules, 21 industry verticals, and full scoring engine
>
> - `src/agents/intake-agent.ts` — Lead scoring, client screening, and intelligent routing across 21 verticals
> - `src/agents/compliance-agent.ts` — Multi-jurisdiction deadline tracking, escalation chains, and regulatory mapping
> - `src/utils/roi-calculator.ts` — Cost-per-task baseline, savings projections, and payback period calculations
> - `src/utils/deployment-config.ts` — 30-day deployment phase configuration, milestone tracking, and cutover logic
> - `src/config/ghost-architecture.ts` — Ghost Architecture client identity protection and data sanitization layer
> - `src/industries/` — 21 vertical-specific assessment modules with compliance mapping
> - `src/scoring/` — Full scoring engine: automation readiness, ROI projection, compliance risk, deployment priority, benchmarks
> - `src/templates/` — Blueprint generation, agent recommendation, timeline building, cost estimation
>
> **[Take the free Operational Intelligence Assessment →](https://tfsfventures.com/assessment)**
>
> **[TFSF Ventures FZ-LLC](https://tfsfventures.com)** — AI Agent Deployment | RAKEZ License 47013955

---

The engine powering TFSF Ventures' 19-dimension Operational Intelligence Assessment. Evaluates business workflows across multiple dimensions, scores automation readiness, generates agent deployment blueprints, and produces ROI projections — all within 24 hours of assessment completion.

Supports 21 industries with vertical-specific question routing, compliance requirement mapping, and industry-benchmarked scoring models.

---

## Supported Industries

| Vertical | Status | Compliance Modules |
|----------|--------|-------------------|
| Construction | Active | OSHA, bonding, lien tracking |
| Insurance | Active | State DOI, NAIC, claims compliance |
| Healthcare | Active | HIPAA, CMS, state licensing |
| Real Estate | Active | RESPA, state licensing, fair housing |
| Legal | Active | Bar rules, privilege (Heppner), conflicts |
| Financial Services | Active | SEC/FINRA, BSA/AML, fiduciary |
| Restaurants | Active | FDA, HACCP, health department |
| Staffing | Active | I-9, EEOC, state labor law |
| E-Commerce | Active | PCI-DSS, state sales tax, FTC |
| Manufacturing | Active | OSHA, EPA, quality management |
| SaaS | Active | SOC 2, GDPR, data residency |
| Accounting | Active | AICPA, SOX, PCAOB |
| Mortgage/Lending | Active | TILA, RESPA, state licensing |
| Nonprofits | Active | IRS 990, state registration, GAAP |
| Education | Active | FERPA, accreditation, state ED |
| Trucking/Logistics | Active | FMCSA, DOT, HOS compliance |
| Energy | Active | FERC, state PUC, environmental |
| Hospitality | Active | ADA, health/safety, liquor licensing |
| Dental/Veterinary | Active | HIPAA, state board, DEA (controlled) |
| Cleaning/Field Service | Active | OSHA, insurance, state licensing |
| Gym/Fitness | Active | Liability, ADA, membership regulations |

---

## Architecture

```
src/
├── agents/
│   ├── intake-agent.ts           # Lead scoring, client screening, intelligent routing
│   └── compliance-agent.ts       # Multi-jurisdiction deadline tracking, escalation chains
├── industries/
│   ├── types.ts              # Shared interfaces and supported industry definitions
│   ├── construction.ts       # Construction-specific questions and scoring
│   ├── insurance.ts          # Insurance workflow assessment
│   ├── healthcare.ts         # Healthcare with HIPAA compliance mapping
│   ├── realEstate.ts         # Real estate and property management assessment
│   ├── legal.ts              # Legal practice assessment
│   ├── financialServices.ts  # Financial services with SEC/FINRA mapping
│   ├── restaurants.ts        # Restaurant operations assessment
│   ├── staffing.ts           # Staffing and recruiting assessment
│   ├── ecommerce.ts          # E-commerce operations assessment
│   ├── manufacturing.ts      # Manufacturing and production assessment
│   ├── saas.ts               # SaaS operations assessment
│   ├── accounting.ts         # Accounting firm assessment
│   ├── mortgage.ts           # Mortgage and lending assessment
│   ├── nonprofits.ts         # Nonprofit operations assessment
│   ├── education.ts          # Education and EdTech assessment
│   ├── trucking.ts           # Trucking and logistics assessment
│   ├── energy.ts             # Energy and utilities assessment
│   ├── hospitality.ts        # Hospitality and hotel assessment
│   ├── dental.ts             # Dental and veterinary assessment
│   ├── cleaning.ts           # Cleaning and field service assessment
│   ├── fitness.ts            # Gym and fitness assessment
│   └── privateEquity.ts      # PE portfolio operations assessment
├── scoring/
│   ├── automationReadiness.ts    # Workflow automation readiness scorer
│   ├── roiProjection.ts         # ROI projection model with compound learning
│   ├── complianceRisk.ts        # Compliance risk evaluator with mitigation mapping
│   ├── deploymentPriority.ts    # Multi-workflow priority ranker
│   └── benchmarks.ts            # Industry benchmark data across 21 verticals
├── templates/
│   ├── blueprintGenerator.ts    # Deployment blueprint document generator
│   ├── agentRecommender.ts      # Agent type recommendation engine
│   ├── timelineBuilder.ts       # 30-day deployment timeline generator
│   └── costEstimator.ts         # Deployment cost estimation with pass-through
├── config/
│   ├── ghost-architecture.ts    # Ghost Architecture identity protection layer
│   ├── dimensions.ts            # 19-dimension configuration
│   ├── thresholds.ts            # Scoring thresholds per industry
│   └── compliance.ts            # Compliance requirement mapping
├── routes/
│   ├── assessment.ts            # Assessment submission and routing
│   ├── results.ts               # Results retrieval and formatting
│   └── analytics.ts             # Assessment analytics and tracking
└── utils/
    ├── roi-calculator.ts        # Cost-per-task baseline and savings projections
    └── deployment-config.ts     # 30-day deployment phase configuration
```

---

## The 19 Dimensions

The assessment evaluates business operations across 19 dimensions, grouped into four categories:

### Operational Efficiency (Dimensions 1-5)
1. **Workflow Volume** — Transaction count per workflow per month
2. **Process Complexity** — Number of decision points per workflow
3. **Exception Frequency** — Percentage of transactions requiring human judgment
4. **Cycle Time** — Average time from initiation to completion
5. **Error Rate** — Processing mistakes per 1,000 transactions

### Technology Readiness (Dimensions 6-10)
6. **System Inventory** — Number and type of software systems in the stack
7. **Integration Maturity** — API availability and data flow between systems
8. **Data Quality** — Completeness, accuracy, and accessibility of operational data
9. **Automation Baseline** — Existing automation (RPA, macros, scripts) in place
10. **Technical Debt** — Legacy systems, workarounds, and manual bridges

### Human Capital (Dimensions 11-14)
11. **Headcount Allocation** — FTEs dedicated to each workflow
12. **Skill Distribution** — Ratio of judgment work vs routine processing per role
13. **Training Overhead** — Time and cost to onboard new employees per workflow
14. **Turnover Impact** — Institutional knowledge loss risk per role

### Compliance and Risk (Dimensions 15-19)
15. **Regulatory Requirements** — Industry-specific compliance obligations per workflow
16. **Audit Readiness** — Current state of documentation and decision trail
17. **Authority Boundaries** — Defined approval thresholds and escalation paths
18. **Risk Exposure** — Financial and operational cost of compliance failures
19. **Jurisdictional Complexity** — Multi-state, multi-country regulatory requirements

---

## Scoring Model

Each dimension receives a score from 1-10 based on the assessment inputs. Scores are weighted by industry and workflow type to produce three outputs:

### Automation Readiness Score (0-100)
Measures how ready the workflow is for agent deployment. Factors: volume, exception rate, system maturity, data quality.

### ROI Projection
Estimates the financial return of deploying agents for this workflow. Factors: headcount cost, error cost, cycle time value, revenue impact.

### Deployment Priority Ranking
Ranks workflows by deployment priority when multiple workflows are assessed. The highest-scoring workflow deploys first.

---

## Blueprint Output

The assessment produces a deployment blueprint containing:

- **Executive Summary** — One-page overview of findings and recommendations
- **Workflow Analysis** — Per-workflow scoring across all 19 dimensions
- **Agent Recommendations** — Specific agent types recommended per workflow
- **Cost Estimate** — Initial deployment cost + ongoing monthly infrastructure
- **ROI Timeline** — Month-by-month projected ROI with break-even date
- **Deployment Sequence** — Recommended order for multi-workflow deployments
- **Compliance Requirements** — Industry-specific compliance considerations
- **Risk Assessment** — Deployment risks and mitigation strategies

Blueprint delivery: within 24 hours of assessment completion.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS |
| Backend | Vercel Edge Functions |
| Database | Supabase PostgreSQL |
| Email | Resend for blueprint delivery |
| Analytics | Custom event tracking with attribution |
| Auth | Supabase Auth with admin access controls |

---

## Environment Variables

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
NOTIFY_EMAIL=
ADMIN_ACCESS_KEY=
```

---

## About

Built and maintained by [TFSF Ventures FZ-LLC](https://tfsfventures.com), a UAE-headquartered venture architect (RAKEZ License 47013955) with 27 years in payments and software. The Operational Intelligence Assessment is the entry point for every TFSF client engagement — mapping workflows, identifying automation opportunities, and producing actionable deployment blueprints across 21 verticals with a 30-day deployment methodology.

Take the free assessment: [tfsfventures.com/assessment](https://tfsfventures.com/assessment)

**Contact:** s.foster@tfsf.io
