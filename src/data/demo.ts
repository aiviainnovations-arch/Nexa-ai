/**
 * ALL demo content lives here. Nexa AI is a fictional product:
 * every number, name and file below is invented for the portfolio.
 * Edit freely. Components read from this file only.
 */
import type { IconName } from '../components/ui/Icon';

/* ------------------------------------------------------------------ */
/* Dashboard (AI Overview)                                            */
/* ------------------------------------------------------------------ */
export const overview = {
  range: 'Last 30 days',
  metrics: [
    { id: 'docs', label: 'Documents analyzed', value: 48210, suffix: '', delta: 12.4, trend: [12, 14, 13, 17, 19, 18, 23, 26, 25, 31, 34, 38] },
    { id: 'insights', label: 'Insights generated', value: 3847, suffix: '', delta: 8.1, trend: [20, 22, 21, 24, 23, 27, 26, 29, 31, 30, 34, 36] },
    { id: 'auto', label: 'Automations running', value: 126, suffix: '', delta: 4.0, trend: [8, 8, 9, 9, 10, 12, 12, 13, 14, 14, 15, 16] },
    { id: 'time', label: 'Time saved', value: 1204, suffix: ' hrs', delta: 18.2, trend: [10, 13, 15, 14, 18, 21, 24, 23, 28, 31, 35, 40] },
  ],
  insight: {
    text: 'Customer support response time decreased by 28% this month.',
    series: [42, 44, 41, 43, 40, 38, 39, 36, 34, 35, 32, 31, 30, 30],
    factors: [
      { label: 'Automatic ticket routing', share: 46 },
      { label: 'Suggested replies for repeat questions', share: 31 },
      { label: 'Faster escalation of billing issues', share: 23 },
    ],
  },
  recommendations: [
    { id: 'r1', text: 'Route billing tickets straight to the Tier 2 queue', impact: 'High impact' },
    { id: 'r2', text: 'Publish a refreshed onboarding guide for new accounts', impact: 'Medium impact' },
    { id: 'r3', text: 'Review 3 vendor contracts that renew within 30 days', impact: 'Time sensitive' },
  ],
  activity: [
    { time: '09:42', text: 'Weekly operations report generated', kind: 'report' },
    { time: '09:15', text: 'Anomaly flagged: refund requests up 3.1x', kind: 'alert' },
    { time: '08:58', text: '212 new tickets classified automatically', kind: 'auto' },
    { time: '08:30', text: 'Vendor_Agreement_Q3.pdf analyzed', kind: 'doc' },
  ] as { time: string; text: string; kind: 'report' | 'alert' | 'auto' | 'doc' }[],
  documents: [
    { name: 'Vendor_Agreement_Q3.pdf', fields: 14, flag: '1 clause to review' },
    { name: 'Invoice_2291.pdf', fields: 9, flag: null },
    { name: 'Support_Export_Sep.csv', fields: 22, flag: null },
  ] as { name: string; fields: number; flag: string | null }[],
  workflows: [
    { name: 'Ticket triage', state: 'running', meta: '1,284 runs today' },
    { name: 'Invoice extraction', state: 'running', meta: '96 runs today' },
    { name: 'Weekly operations report', state: 'scheduled', meta: 'Next: Mon 08:00' },
    { name: 'Churn risk alerts', state: 'paused', meta: 'Paused by admin' },
  ] as { name: string; state: 'running' | 'scheduled' | 'paused'; meta: string }[],
};

/* ------------------------------------------------------------------ */
/* Capabilities + solutions                                           */
/* ------------------------------------------------------------------ */
export const capabilities: { id: string; label: string; icon: IconName; text: string }[] = [
  { id: 'data', label: 'Data', icon: 'database', text: 'Connect warehouses, CRMs and inboxes.' },
  { id: 'documents', label: 'Documents', icon: 'file', text: 'Read contracts, invoices and reports.' },
  { id: 'analytics', label: 'Analytics', icon: 'chart', text: 'Trace every trend back to its cause.' },
  { id: 'insights', label: 'Insights', icon: 'sparkle', text: 'Plain-language findings with sources.' },
  { id: 'automation', label: 'Automation', icon: 'bolt', text: 'Turn findings into running workflows.' },
  { id: 'reports', label: 'Reports', icon: 'report', text: 'Structured summaries, on a schedule.' },
];

export const teams = [
  {
    id: 'support', label: 'Customer support',
    question: 'Why did billing tickets rise last week?',
    uses: ['data', 'analytics', 'insights', 'automation'],
    steps: ['Reads ticket history and CRM notes', 'Groups tickets by root cause', 'Routes repeat issues to the right queue'],
    outcome: { value: 28, suffix: '%', label: 'faster first response in the demo scenario' },
  },
  {
    id: 'ops', label: 'Operations',
    question: 'Which vendors are behind on delivery?',
    uses: ['data', 'documents', 'analytics', 'reports'],
    steps: ['Compares delivery dates with contract terms', 'Flags vendors trending late', 'Drafts the weekly supplier report'],
    outcome: { value: 6, suffix: ' hrs', label: 'saved each week on manual reporting' },
  },
  {
    id: 'finance', label: 'Finance',
    question: 'Which invoices do not match their purchase orders?',
    uses: ['documents', 'insights', 'automation', 'reports'],
    steps: ['Extracts amounts and terms from each invoice', 'Matches them to purchase orders', 'Sends mismatches for approval'],
    outcome: { value: 94, suffix: '%', label: 'of invoice fields extracted without edits' },
  },
  {
    id: 'product', label: 'Product',
    question: 'What are customers asking for most this quarter?',
    uses: ['data', 'analytics', 'insights', 'reports'],
    steps: ['Reads feedback across support and surveys', 'Clusters requests into themes', 'Ranks themes by account impact'],
    outcome: { value: 12, suffix: ' themes', label: 'surfaced from 8,400 conversations' },
  },
];

/* ------------------------------------------------------------------ */
/* Interactive workspace scenarios                                    */
/* ------------------------------------------------------------------ */
export type Scenario = {
  id: string;
  chip: string;
  prompt: string;
  steps: string[];
  summary: string;
  trends: { label: string; value: string; up: boolean; good: boolean; note: string }[];
  anomalies: { title: string; detail: string }[];
  recs: string[];
  side: { title: string; kpis: { l: string; v: string }[]; series: number[]; tag: string };
};

export const scenarios: Scenario[] = [
  {
    id: 'customers',
    chip: "Analyze this month's customer data",
    prompt: "Analyze this month's customer data.",
    steps: ['Connecting 6 data sources', 'Reading 8,412 support conversations', 'Comparing against last month'],
    summary:
      'Customer activity is up 9% month over month and satisfaction held steady at 4.6 out of 5. Most growth came from the new onboarding flow, while billing questions grew fastest.',
    trends: [
      { label: 'New accounts', value: '+12%', up: true, good: true, note: 'Driven by referral sign-ups' },
      { label: 'Billing questions', value: '+34%', up: true, good: false, note: 'Mostly invoice date confusion' },
      { label: 'Self-serve resolution', value: '+19%', up: true, good: true, note: 'Help center and suggested replies' },
    ],
    anomalies: [{ title: 'Refund requests spiked on Sep 12', detail: '3.1x the daily average, right after a pricing page change.' }],
    recs: ['Clarify invoice dates in billing settings', 'Route refund requests to a dedicated queue', 'Share onboarding results with the product team'],
    side: { title: 'Customer health', kpis: [{ l: 'Satisfaction', v: '4.6 / 5' }, { l: 'Active accounts', v: '2,940' }, { l: 'Churn risk', v: '3.2%' }], series: [30, 32, 31, 35, 34, 38, 37, 41, 44, 43, 47, 50], tag: '6 sources' },
  },
  {
    id: 'anomalies',
    chip: 'Find unusual patterns in support tickets',
    prompt: 'Which support tickets look unusual this month?',
    steps: ['Scanning 8,412 tickets', 'Modeling normal daily volume', 'Ranking outliers by impact'],
    summary:
      'Three patterns stand out. Refund requests spiked on Sep 12, one enterprise account opened four times its usual volume, and login errors clustered on a single browser version.',
    trends: [
      { label: 'Refund requests', value: '3.1x', up: true, good: false, note: 'Single-day spike, now normal' },
      { label: 'Login errors', value: '+58%', up: true, good: false, note: 'Concentrated on one browser build' },
      { label: 'Duplicate tickets', value: '-22%', up: false, good: true, note: 'After auto-merge was enabled' },
    ],
    anomalies: [
      { title: 'Acme Logistics (demo): 4x ticket volume', detail: 'Opened 61 tickets in 3 days, all about one integration.' },
      { title: 'Login errors on one browser version', detail: '87% of failures share the same build number.' },
    ],
    recs: ['Open an incident for the browser-specific login error', 'Assign a named contact to the high-volume account', 'Add the Sep 12 pricing change to the release log'],
    side: { title: 'Ticket health', kpis: [{ l: 'Outliers found', v: '3' }, { l: 'Tickets scanned', v: '8,412' }, { l: 'Confidence', v: 'High' }], series: [22, 21, 23, 22, 24, 23, 58, 31, 26, 24, 25, 23], tag: 'Ticket system' },
  },
  {
    id: 'report',
    chip: 'Draft the September operations report',
    prompt: 'Draft the September operations report.',
    steps: ['Collecting metrics from 4 systems', 'Comparing against targets', 'Writing the summary'],
    summary:
      'Operations finished September at 96% of target. On-time delivery improved to 93%, and two vendors account for most late shipments. The full report is ready to review and share.',
    trends: [
      { label: 'On-time delivery', value: '93%', up: true, good: true, note: 'Up from 89% in August' },
      { label: 'Cost per order', value: '-4.2%', up: false, good: true, note: 'Lower freight costs' },
      { label: 'Late shipments', value: '38', up: false, good: true, note: 'Two vendors cause 71% of them' },
    ],
    anomalies: [{ title: 'Warehouse B processing time up 17%', detail: 'Started the week of Sep 16, after a shift schedule change.' }],
    recs: ['Review delivery terms with the two late vendors', 'Compare Warehouse B shift patterns with Warehouse A', 'Schedule this report to send every Monday'],
    side: { title: 'Operations summary', kpis: [{ l: 'Target reached', v: '96%' }, { l: 'On-time delivery', v: '93%' }, { l: 'Report sections', v: '6' }], series: [60, 62, 61, 66, 70, 69, 74, 78, 80, 84, 88, 93], tag: '4 systems' },
  },
];

/* ------------------------------------------------------------------ */
/* Features                                                           */
/* ------------------------------------------------------------------ */
export const features = [
  { id: 'analysis', title: 'AI analysis', text: 'Turn long threads, exports and dashboards into a few clear findings.' },
  { id: 'automation', title: 'Smart automation', text: 'Build workflows from plain instructions and watch them run.' },
  { id: 'documents', title: 'Document intelligence', text: 'Pull terms, dates and amounts out of contracts and invoices.' },
  { id: 'realtime', title: 'Real-time insights', text: 'Follow key metrics as they move and get told when something breaks pattern.' },
  { id: 'reporting', title: 'AI reporting', text: 'Generate structured reports that cite the data behind every line.' },
  { id: 'team', title: 'Team workspace', text: 'Share questions, findings and reports in one place your team already trusts.' },
] as const;

/* ------------------------------------------------------------------ */
/* Workflow                                                           */
/* ------------------------------------------------------------------ */
export const workflowSteps = [
  { n: '01', id: 'connect', title: 'Connect', short: 'Link your sources', text: 'Link warehouses, documents, inboxes and tools. Nothing to migrate, nothing to rebuild.' },
  { n: '02', id: 'analyze', title: 'Analyze', short: 'Read across everything', text: 'Nexa reads across every source at once and finds the patterns worth your attention.' },
  { n: '03', id: 'understand', title: 'Understand', short: 'Get clear findings', text: 'Findings arrive as plain-language insights, each one linked to the evidence behind it.' },
  { n: '04', id: 'act', title: 'Act', short: 'Turn findings into work', text: 'Turn any insight into an automation, alert or report in one step.' },
];

export const sources = ['Data warehouse', 'CRM', 'Support desk', 'Shared drive', 'Team inbox'];

/* ------------------------------------------------------------------ */
/* Analytics                                                          */
/* ------------------------------------------------------------------ */
export type RangeKey = '7D' | '30D' | '90D';
export const analytics: Record<
  RangeKey,
  {
    labels: string[];
    current: number[];
    previous: number[];
    bars: { label: string; value: number }[];
    kpis: { id: string; label: string; value: number; decimals: number; suffix: string; delta: number; good: boolean }[];
  }
> = {
  '7D': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    current: [212, 236, 224, 268, 281, 259, 302],
    previous: [176, 181, 190, 187, 201, 196, 204],
    bars: [{ label: 'Billing', value: 74 }, { label: 'Login', value: 52 }, { label: 'Setup', value: 41 }, { label: 'Export', value: 28 }, { label: 'Other', value: 19 }],
    kpis: [
      { id: 'res', label: 'Automated resolutions', value: 1782, decimals: 0, suffix: '', delta: 17.6, good: true },
      { id: 'rt', label: 'Median response time', value: 6.4, decimals: 1, suffix: ' min', delta: -28, good: true },
      { id: 'esc', label: 'Escalation rate', value: 8.2, decimals: 1, suffix: '%', delta: -1.4, good: true },
    ],
  },
  '30D': {
    labels: ['Aug 24', 'Aug 27', 'Aug 30', 'Sep 2', 'Sep 5', 'Sep 8', 'Sep 11', 'Sep 14', 'Sep 17', 'Sep 20'],
    current: [820, 860, 905, 890, 940, 1010, 1045, 1100, 1080, 1160],
    previous: [760, 775, 790, 802, 795, 830, 846, 861, 870, 882],
    bars: [{ label: 'Billing', value: 312 }, { label: 'Login', value: 221 }, { label: 'Setup', value: 176 }, { label: 'Export', value: 121 }, { label: 'Other', value: 84 }],
    kpis: [
      { id: 'res', label: 'Automated resolutions', value: 9410, decimals: 0, suffix: '', delta: 21.3, good: true },
      { id: 'rt', label: 'Median response time', value: 6.9, decimals: 1, suffix: ' min', delta: -28, good: true },
      { id: 'esc', label: 'Escalation rate', value: 8.8, decimals: 1, suffix: '%', delta: 0.6, good: false },
    ],
  },
  '90D': {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'],
    current: [2400, 2510, 2620, 2580, 2760, 2890, 3010, 3120, 3240, 3360, 3480, 3620],
    previous: [2300, 2330, 2390, 2380, 2450, 2470, 2540, 2560, 2610, 2640, 2700, 2730],
    bars: [{ label: 'Billing', value: 940 }, { label: 'Login', value: 690 }, { label: 'Setup', value: 520 }, { label: 'Export', value: 360 }, { label: 'Other', value: 250 }],
    kpis: [
      { id: 'res', label: 'Automated resolutions', value: 34650, decimals: 0, suffix: '', delta: 32.5, good: true },
      { id: 'rt', label: 'Median response time', value: 7.4, decimals: 1, suffix: ' min', delta: -35, good: true },
      { id: 'esc', label: 'Escalation rate', value: 9.1, decimals: 1, suffix: '%', delta: -2.2, good: true },
    ],
  },
};

export const analyticsRecs = [
  { title: 'Move billing questions to an automated flow', tag: 'High impact', detail: 'Billing is the largest ticket category and 81% follow a repeat pattern.' },
  { title: 'Add a setup checklist to the first-login screen', tag: 'Medium impact', detail: 'Setup tickets peak within 48 hours of sign-up.' },
  { title: 'Alert the team when login errors pass 40 per hour', tag: 'Quick win', detail: 'Would have caught the Sep 12 issue about 3 hours sooner.' },
];

/* ------------------------------------------------------------------ */
/* Security / trust (design concepts only, no certifications claimed) */
/* ------------------------------------------------------------------ */
export const trust: { id: string; title: string; text: string; icon: IconName }[] = [
  { id: 'access', title: 'Role-based access', text: 'Every workspace, source and report can be scoped to the people who need it.', icon: 'key' },
  { id: 'api', title: 'API ready', text: 'Every screen is backed by an endpoint, so Nexa can sit inside your existing tools.', icon: 'code' },
  { id: 'realtime', title: 'Real-time processing', text: 'New data is read as it arrives, so insights reflect what is happening now.', icon: 'activity' },
  { id: 'scale', title: 'Scalable architecture', text: 'Designed to grow from one team to a whole organization without a rebuild.', icon: 'layers' },
  { id: 'secure', title: 'Secure by design', text: 'Least-privilege access and clear audit trails are part of the design from the first screen.', icon: 'shield' },
];

export const aivaServices = ['AI products', 'SaaS dashboards', '3D web experiences', 'Custom business platforms'];
