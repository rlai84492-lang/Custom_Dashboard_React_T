// ---------------------------------------------------------------------------
// CampSyte 2.0 — static mock data. Everything here simulates what would come
// from the CRM / Karix / RLAI backends in the real product.
// ---------------------------------------------------------------------------

export const DEMO_ACCOUNTS = [
  { id: 'superadmin', role: 'Superadmin', name: 'Titan Admin', initials: 'TA', email: 'superadmin@titan.co.in', desc: 'All brands, everything', brand: null, scope: 'ALL' },
  { id: 'brand-tw', role: 'Brand — Titan Watches', name: 'Megha P', initials: 'MP', email: 'brand.tw@titan.co.in', desc: 'Megha P', brand: 'TW', scope: 'BRAND' },
  { id: 'brand-mia', role: 'Brand — Mia', name: 'Krupa S', initials: 'KS', email: 'brand.mia@titan.co.in', desc: 'Krupa S', brand: 'MIA', scope: 'BRAND' },
  { id: 'brand-taneira', role: 'Brand — Taneira', name: 'Anita R', initials: 'AR', email: 'brand.taneira@titan.co.in', desc: 'Anita R', brand: 'TANEIRA', scope: 'BRAND' },
  { id: 'brand-eyeplus', role: 'Brand — Titan Eye+', name: 'Rahul M', initials: 'RM', email: 'brand.eyeplus@titan.co.in', desc: 'Rahul M', brand: 'EYEPLUS', scope: 'BRAND' },
  { id: 'campaign-coe', role: 'Campaign Team (CoE)', name: 'Campaign CoE', initials: 'CC', email: 'campaign@titan.co.in', desc: 'Cross-brand', brand: null, scope: 'CROSS' },
  { id: 'data-team', role: 'Data Team', name: 'Sanjay', initials: 'SJ', email: 'data@titan.co.in', desc: 'Sanjay', brand: null, scope: 'DATA' },
  { id: 'whitelisting', role: 'Whitelisting', name: 'Customer Centria', initials: 'CT', email: 'whitelist@titan.co.in', desc: 'Customer Centria', brand: null, scope: 'WHITELIST' },
  { id: 'deployment', role: 'Deployment Team', name: 'Karix ops', initials: 'KO', email: 'deploy@titan.co.in', desc: 'Karix ops', brand: null, scope: 'DEPLOY' },
];

export const BRANDS = {
  TW: { key: 'TW', name: 'Titan Watches', short: 'TW', color: '#0f172a', accent: '#0ea5e9' },
  MIA: { key: 'MIA', name: 'Mia', short: 'Mia', color: '#a855f7', accent: '#a855f7' },
  TANEIRA: { key: 'TANEIRA', name: 'Taneira', short: 'Taneira', color: '#db2777', accent: '#db2777' },
  EYEPLUS: { key: 'EYEPLUS', name: 'Titan Eye+', short: 'Eye+', color: '#0891b2', accent: '#0891b2' },
};

// ---------------------------------------------------------------------------
// Campaigns — Titan Watches (16, the primary demo brand) + Taneira (7, kept
// for the Taneira demo account) + Mia (3, so "brand-mia" never shows empty).
// ---------------------------------------------------------------------------

const TW_CAMPAIGNS = [
  {
    id: 'a3f1c2e4-8b6d-4a91-9c3e-1f2a3b4c5d6e', name: 'GenZ First-Watch Stories', brand: 'TW', owner: 'Megha P', type: 'Engagement', tier: 'MAJOR',
    channels: ['WA', 'RCS'], base: null, delivered: null, deployDate: '2026-06-24', status: 'Base: With Data Team', aiAssisted: true,
    createdOn: '18 Jun 2026', shelfStart: '24 Jun 2026', shelfEnd: '20 Jul 2026', flagged: true,
    ids: { wa: 'TW-WA-710234', rcs: 'TW-RCS-710234' },
  },
  {
    id: 'b4a2d3f5-9c7e-4b02-8d4f-2a3b4c5d6e7f', name: 'Winback: 42k contacts going cold', brand: 'TW', owner: 'Megha P', type: 'Engagement', tier: 'MAJOR',
    channels: ['SMS', 'WA'], base: 42000, delivered: null, deployDate: '2026-06-20', status: 'Overdue', aiAssisted: true,
    createdOn: '10 Jun 2026', shelfStart: '20 Jun 2026', shelfEnd: '05 Jul 2026', flagged: true,
    ids: { sms: 'TW-SMS-420091', wa: 'TW-WA-420091' },
  },
  {
    id: 'c5b3e4a6-0d8f-4c13-9e5a-3b4c5d6e7f80', name: 'HV-Repeat-Women-West is hot', brand: 'TW', owner: 'Megha P', type: 'Engagement', tier: 'MAJOR',
    channels: ['WA', 'RCS'], base: 8200, delivered: null, deployDate: '2026-06-20', status: 'Overdue', aiAssisted: false,
    createdOn: '08 Jun 2026', shelfStart: '20 Jun 2026', shelfEnd: '30 Jun 2026', flagged: true,
    ids: { wa: 'TW-WA-882201', rcs: 'TW-RCS-882201' },
  },
  {
    id: 'd6c4f5b7-1e90-4d24-af6b-4c5d6e7f8091', name: 'HV-Repeat-Women-West is hot', brand: 'TW', owner: 'Megha P', type: 'Engagement', tier: 'MAJOR',
    channels: ['WA'], base: 5400, delivered: null, deployDate: '2026-06-20', status: 'Overdue', aiAssisted: false,
    createdOn: '08 Jun 2026', shelfStart: '20 Jun 2026', shelfEnd: '30 Jun 2026', flagged: true,
    ids: { wa: 'TW-WA-882202' },
  },
  {
    id: 'e7d5a6c8-2fa1-4e35-b07c-5d6e7f8091a2', name: 'HV-Repeat-Women-West is hot', brand: 'TW', owner: 'Megha P', type: 'Engagement', tier: 'MAJOR',
    channels: ['SMS', 'WA'], base: 6100, delivered: null, deployDate: '2026-06-19', status: 'Overdue', aiAssisted: false,
    createdOn: '07 Jun 2026', shelfStart: '19 Jun 2026', shelfEnd: '29 Jun 2026', flagged: true,
    ids: { sms: 'TW-SMS-882203', wa: 'TW-WA-882203' },
  },
  {
    id: 'f8e6b7d9-30b2-4f46-818d-6e7f8091a2b3', name: 'Weekend Walk-in Festival', brand: 'TW', owner: 'Megha P', type: 'Store', tier: 'MINOR',
    channels: ['SMS', 'WA', 'RCS'], base: 15600, delivered: null, deployDate: '2026-06-19', status: 'Overdue', aiAssisted: false,
    createdOn: '05 Jun 2026', shelfStart: '19 Jun 2026', shelfEnd: '21 Jun 2026', flagged: true,
    ids: { sms: 'TW-SMS-156044', wa: 'TW-WA-156044', rcs: 'TW-RCS-156044' },
  },
  {
    id: '09f7c8ea-41c3-4057-929e-7f8091a2b3c4', name: 'Weekend Walk-in Festival', brand: 'TW', owner: 'Megha P', type: 'Store', tier: 'MINOR',
    channels: ['SMS', 'WA'], base: null, delivered: null, deployDate: '2026-06-12', status: 'Cancelled', aiAssisted: false,
    createdOn: '29 May 2026', shelfStart: '12 Jun 2026', shelfEnd: '14 Jun 2026', flagged: false,
    ids: { sms: 'TW-SMS-156011', wa: 'TW-WA-156011' },
  },
  {
    id: '1a08d9fb-52d4-4168-a30f-8091a2b3c4d5', name: 'Weekend Watch Walk-in', brand: 'TW', owner: 'Megha P', type: 'Store', tier: 'MINOR',
    channels: ['WA'], base: null, delivered: null, deployDate: '2026-06-26', status: 'Draft', aiAssisted: true,
    createdOn: '20 Jun 2026', shelfStart: '26 Jun 2026', shelfEnd: '28 Jun 2026', flagged: false,
    ids: { wa: 'TW-WA-260077' },
  },
  {
    id: '2b19eafc-63e5-4279-b410-9a2b3c4d5e6f', name: 'Titan Watches — Birthday/Anniversary journey', brand: 'TW', owner: 'Krupa S', type: 'Engagement', tier: 'MAJOR',
    channels: ['SMS', 'WA', 'RCS'], base: 61200, delivered: 24880, deployDate: '2026-06-28', status: 'Base Approved', aiAssisted: true,
    createdOn: '02 Jun 2026', shelfStart: '28 Jun 2026', shelfEnd: '31 Dec 2026', flagged: false,
    ids: { sms: 'TW-SMS-612055', wa: 'TW-WA-612055', rcs: 'TW-RCS-612055' },
  },
  {
    id: '3c2a0b0d-74f6-438a-a521-0b3c4d5e6f70', name: 'Titan Watches — Birthday/Anniversary journey', brand: 'TW', owner: 'Krupa S', type: 'Engagement', tier: 'MAJOR',
    channels: ['WA'], base: null, delivered: null, deployDate: '2026-07-05', status: 'Draft', aiAssisted: true,
    createdOn: '25 Jun 2026', shelfStart: '05 Jul 2026', shelfEnd: '31 Dec 2026', flagged: false,
    ids: { wa: 'TW-WA-612056' },
  },
  {
    id: '4d3b1c1e-850a-449b-a632-1c4d5e6f7081', name: 'Premium Automatics Launch', brand: 'TW', owner: 'Megha P', type: 'Promotion', tier: 'MAJOR',
    channels: ['WA', 'EM'], base: 28900, delivered: null, deployDate: '2026-07-15', status: 'Base Approved', aiAssisted: false,
    createdOn: '20 Jun 2026', shelfStart: '15 Jul 2026', shelfEnd: '15 Aug 2026', flagged: false,
    ids: { wa: 'TW-WA-289033', em: 'TW-EM-289033' },
  },
  {
    id: '5e4c2d2f-961b-45ac-a743-2d5e6f708192', name: 'Exchange Mela — South', brand: 'TW', owner: 'Megha P', type: 'Store', tier: 'MINOR',
    channels: ['SMS', 'WA'], base: null, delivered: null, deployDate: '2026-07-18', status: 'Draft', aiAssisted: false,
    createdOn: '22 Jun 2026', shelfStart: '18 Jul 2026', shelfEnd: '25 Jul 2026', flagged: false,
    ids: { sms: 'TW-SMS-718099', wa: 'TW-WA-718099' },
  },
  {
    id: '6f5d3e30-a72c-46bd-a854-3e6f708192a3', name: 'Raksha Bandhan Early Bird', brand: 'TW', owner: 'Megha P', type: 'Promotion', tier: 'MAJOR',
    channels: ['WA', 'RCS'], base: null, delivered: null, deployDate: '2026-08-10', status: 'Draft', aiAssisted: true,
    createdOn: '26 Jun 2026', shelfStart: '10 Aug 2026', shelfEnd: '29 Aug 2026', flagged: false,
    ids: { wa: 'TW-WA-810012', rcs: 'TW-RCS-810012' },
  },
  {
    id: '7061e441-b83d-47ce-a965-4f708192a3b4', name: 'Diwali Mega Teaser', brand: 'TW', owner: 'Megha P', type: 'Promotion', tier: 'MAJOR',
    channels: ['WA', 'SMS', 'EM'], base: null, delivered: null, deployDate: '2026-08-25', status: 'Draft', aiAssisted: true,
    createdOn: '27 Jun 2026', shelfStart: '25 Aug 2026', shelfEnd: '05 Sep 2026', flagged: false,
    ids: { sms: 'TW-SMS-825144', wa: 'TW-WA-825144', em: 'TW-EM-825144' },
  },
  {
    id: '8172f552-c94e-48df-aa76-5081a2b3c4d5', name: "Father's Day Flash", brand: 'TW', owner: 'Megha P', type: 'Promotion', tier: 'MAJOR',
    channels: ['WA', 'SMS'], base: 33200, delivered: 31890, deployDate: '2026-06-21', status: 'Completed', aiAssisted: false,
    createdOn: '01 Jun 2026', shelfStart: '21 Jun 2026', shelfEnd: '22 Jun 2026', flagged: false,
    ids: { sms: 'TW-SMS-332077', wa: 'TW-WA-332077' },
  },
  {
    id: '92830663-da5f-49e0-ab87-61928374a5c6', name: 'Monsoon Service Reminder', brand: 'TW', owner: 'Megha P', type: 'Engagement', tier: 'MINOR',
    channels: ['SMS', 'WA'], base: null, delivered: null, deployDate: '2026-06-30', status: 'Draft', aiAssisted: false,
    createdOn: '28 Jun 2026', shelfStart: '30 Jun 2026', shelfEnd: '15 Jul 2026', flagged: false,
    ids: { sms: 'TW-SMS-063099', wa: 'TW-WA-063099' },
  },
];

const TANEIRA_CAMPAIGNS = [
  {
    id: 'cmp-navratri', name: 'Navratri Nine-Colours', brand: 'TANEIRA', owner: 'Anita R', type: 'Engagement', tier: 'MAJOR',
    channels: ['RCS', 'WA'], base: 461000, delivered: null, deployDate: '2026-07-02', status: 'Cancelled', aiAssisted: true,
    createdOn: '25 Jun 2026', shelfStart: '02 Jul 2026', shelfEnd: '15 Jul 2026', flagged: false,
    ids: { sms: 'TAN-SMS-461022', wa: 'TAN-WA-461022', rcs: 'TAN-RCS-461022' },
  },
  {
    id: 'cmp-silk-lovers', name: 'Silk Lovers Loyalty Preview', brand: 'TANEIRA', owner: 'Anita R', type: 'Engagement', tier: 'MAJOR',
    channels: ['WA'], base: null, delivered: null, deployDate: '2026-06-30', status: 'Draft', aiAssisted: false,
    createdOn: '24 Jun 2026', shelfStart: '30 Jun 2026', shelfEnd: '20 Jul 2026', flagged: true,
    ids: { wa: 'TAN-WA-330190' },
  },
  {
    id: 'cmp-onam', name: 'Onam Kasavu Collection', brand: 'TANEIRA', owner: 'Anita R', type: 'Promotion', tier: 'MAJOR',
    channels: ['WA', 'SMS'], base: 530000, delivered: null, deployDate: '2026-06-26', status: 'Base Approved', aiAssisted: false,
    createdOn: '16 Jun 2026', shelfStart: '26 Jun 2026', shelfEnd: '05 Sep 2026', flagged: true,
    ids: { sms: 'TAN-SMS-530041', wa: 'TAN-WA-530041' },
  },
  {
    id: 'cmp-footfall', name: 'Taneira — Footfall journey', brand: 'TANEIRA', owner: 'Anita R', type: 'Engagement', tier: 'MAJOR',
    channels: ['WA', 'RCS', 'SMS'], base: null, delivered: null, deployDate: '2026-06-20', status: 'Overdue', aiAssisted: true,
    createdOn: '13 Jun 2026', shelfStart: '20 Jun 2026', shelfEnd: '30 Jun 2026', flagged: true,
    ids: { sms: 'TAN-SMS-099182', wa: 'TAN-WA-099182', rcs: 'TAN-RCS-099182' },
  },
  {
    id: 'cmp-pilot', name: 'Pilot', brand: 'TANEIRA', owner: 'Anita R', type: 'Engagement', tier: 'MAJOR',
    channels: ['SMS', 'WA', 'RCS'], base: null, delivered: null, deployDate: '2026-06-15', status: 'Draft', aiAssisted: false,
    createdOn: '13 Jun 2026', shelfStart: '15 Jun 2026', shelfEnd: '30 Jul 2026', flagged: true,
    ids: { sms: 'TAN-SMS-430447', wa: 'TAN-WA-430447', rcs: 'TAN-RCS-430447' },
  },
  {
    id: 'cmp-wedding', name: 'Wedding Season Silk Edit', brand: 'TANEIRA', owner: 'Anita R', type: 'Promotion', tier: 'MAJOR',
    channels: ['SMS', 'WA', 'EM'], base: 823000, delivered: 328293, deployDate: '2026-06-12', status: 'Overdue', aiAssisted: false,
    createdOn: '02 Jun 2026', shelfStart: '12 Jun 2026', shelfEnd: '10 Jul 2026', flagged: true,
    ids: { sms: 'TAN-SMS-823881', wa: 'TAN-WA-823881', em: 'TAN-EM-823881' },
  },
  {
    id: 'cmp-mothers-day', name: "Mother's Day Capsule", brand: 'TANEIRA', owner: 'Anita R', type: 'Promotion', tier: 'MAJOR',
    channels: ['SMS', 'WA'], base: 218000, delivered: 214532, deployDate: '2026-05-07', status: 'Completed', aiAssisted: false,
    createdOn: '07 May 2026', shelfStart: '07 May 2026', shelfEnd: '20 May 2026', flagged: false,
    ids: { sms: 'TAN-SMS-218774', wa: 'TAN-WA-218774' },
  },
];

const MIA_CAMPAIGNS = [
  {
    id: 'cmp-mia-solitaire', name: 'Solitaire Edit — Everyday Luxe', brand: 'MIA', owner: 'Krupa S', type: 'Promotion', tier: 'MAJOR',
    channels: ['WA', 'EM'], base: 94200, delivered: null, deployDate: '2026-07-08', status: 'Draft', aiAssisted: true,
    createdOn: '24 Jun 2026', shelfStart: '08 Jul 2026', shelfEnd: '31 Jul 2026', flagged: true,
    ids: { wa: 'MIA-WA-942001', em: 'MIA-EM-942001' },
  },
  {
    id: 'cmp-mia-office', name: 'Office-to-Evening Studs', brand: 'MIA', owner: 'Krupa S', type: 'Engagement', tier: 'MINOR',
    channels: ['WA'], base: 41500, delivered: null, deployDate: '2026-06-22', status: 'Overdue', aiAssisted: false,
    createdOn: '10 Jun 2026', shelfStart: '22 Jun 2026', shelfEnd: '02 Jul 2026', flagged: true,
    ids: { wa: 'MIA-WA-415005' },
  },
  {
    id: 'cmp-mia-anniversary', name: 'Mia — Anniversary Gifting Wave', brand: 'MIA', owner: 'Krupa S', type: 'Engagement', tier: 'MAJOR',
    channels: ['SMS', 'WA'], base: 60700, delivered: 22110, deployDate: '2026-06-05', status: 'Base Approved', aiAssisted: true,
    createdOn: '28 May 2026', shelfStart: '05 Jun 2026', shelfEnd: '31 Dec 2026', flagged: false,
    ids: { sms: 'MIA-SMS-607099', wa: 'MIA-WA-607099' },
  },
];

export const CAMPAIGNS = [...TW_CAMPAIGNS, ...TANEIRA_CAMPAIGNS, ...MIA_CAMPAIGNS];

export const OCCASIONS = [
  { name: "Father's Day", date: '21 Jun', relevance: 55 },
  { name: 'Titan Brand Day', date: '27 Jul', relevance: 40 },
  { name: 'World Photography Day', date: '20 Aug', relevance: 15 },
  { name: 'Raksha Bandhan', date: '29 Aug', relevance: 75 },
  { name: 'Onam', date: '05 Sep', relevance: 90 },
];

export const CAMPAIGN_DETAIL_TABS = [
  { key: 'details', label: 'Details', step: 1, stepLabel: 'Create' },
  { key: 'basecount', label: 'Base Count', step: 2, stepLabel: 'Base Count' },
  { key: 'segments', label: 'Segments', step: 2, stepLabel: 'Base Count' },
  { key: 'creative', label: 'Creative', step: 3, stepLabel: 'Creative' },
  { key: 'approvals', label: 'Approvals', step: 3, stepLabel: 'Creative' },
  { key: 'whitelisting', label: 'Whitelisting', step: 4, stepLabel: 'Whitelisting' },
  { key: 'deployment', label: 'Deployment', step: 5, stepLabel: 'Deployment' },
  { key: 'performance', label: 'Performance', step: 6, stepLabel: 'Performance' },
];

export const AUDIT_TRAIL = {
  'a3f1c2e4-8b6d-4a91-9c3e-1f2a3b4c5d6e': [
    { actor: 'Titan Admin', action: 'Created — GenZ First-Watch Stories', time: '18 Jun, 10:02 am' },
    { actor: 'Megha P', action: 'Sent to Data Team for base count', time: '19 Jun, 04:20 pm' },
  ],
  'b4a2d3f5-9c7e-4b02-8d4f-2a3b4c5d6e7f': [
    { actor: 'Titan Admin', action: 'Created — Winback: 42k contacts going cold', time: '10 Jun, 09:14 am' },
    { actor: 'Megha P', action: 'Base count approved — 42,000', time: '14 Jun, 02:05 pm' },
    { actor: 'Sanjay', action: 'Flagged: deploy window passed', time: '20 Jun, 06:00 am' },
  ],
  '2b19eafc-63e5-4279-b410-9a2b3c4d5e6f': [
    { actor: 'Krupa S', action: 'Created — Titan Watches — Birthday/Anniversary journey', time: '02 Jun, 08:15 am' },
    { actor: 'Sanjay', action: 'Base count approved — 61,200', time: '10 Jun, 06:12 pm' },
    { actor: 'Krupa S', action: 'Creative approved — Anniversary Classic', time: '18 Jun, 06:12 pm' },
    { actor: 'Campaign CoE', action: 'Finalize approved', time: '27 Jun, 06:12 pm' },
  ],
  'cmp-pilot': [{ actor: 'Titan Admin', action: 'Created — Pilot', time: '13 Jun, 05:23 am' }],
  'cmp-footfall': [
    { actor: 'Titan Admin', action: 'Created — Taneira — Footfall journey', time: '13 Jun, 04:10 am' },
    { actor: 'Anita R', action: 'Base Count approved', time: '15 Jun, 09:40 am' },
    { actor: 'Krupa S', action: 'Creative approved', time: '17 Jun, 11:02 am' },
  ],
  'cmp-wedding': [
    { actor: 'Anita R', action: 'Created — Wedding Season Silk Edit', time: '02 Jun, 08:15 am' },
    { actor: 'Rahul M', action: 'Base Count approved', time: '15 Jun, 06:12 pm' },
    { actor: 'Krupa S', action: 'Creative approved', time: '16 Jun, 06:12 pm' },
    { actor: 'Campaign CoE', action: 'Finalize approved', time: '13 Jun, 06:12 pm' },
  ],
};

export const JOURNEYS = [
  {
    id: 'jr-birthday-anniversary', name: 'Titan Watches — Birthday/Anniversary journey', steps: 9, status: 'launched', ai: true, campaignId: '2b19eafc-63e5-4279-b410-9a2b3c4d5e6f',
    nodes: [
      { id: 'n1', type: 'TRIGGER', title: 'Anniversary date − 7 days', x: 30, y: 170 },
      { id: 'n2', type: 'WHATSAPP', title: 'Teaser: something timeless…', x: 290, y: 170 },
      { id: 'n3', type: 'WAIT', title: 'Wait 2 days', x: 560, y: 170 },
      { id: 'n4', type: 'WHATSAPP', title: 'Personalized offer reveal + CTA', x: 800, y: 170 },
      { id: 'n5', type: 'BRANCH', title: 'Claimed gift?', x: 1070, y: 170 },
      { id: 'n6', type: 'BRANCH', title: 'RCS eligible?', x: 290, y: 30 },
      { id: 'n7', type: 'WHATSAPP', title: 'Reminder — 48h left', x: 620, y: 330 },
    ],
    edges: [['n1', 'n2'], ['n2', 'n3'], ['n3', 'n4'], ['n4', 'n5']],
  },
  { id: 'jr-genz-first-watch', name: 'GenZ First-Watch Stories', steps: 6, status: 'draft', ai: true, campaignId: 'a3f1c2e4-8b6d-4a91-9c3e-1f2a3b4c5d6e', nodes: [], edges: [] },
  { id: 'jr-winback', name: 'Winback: 42k contacts going cold', steps: 7, status: 'draft', ai: true, campaignId: 'b4a2d3f5-9c7e-4b02-8d4f-2a3b4c5d6e7f', nodes: [], edges: [] },
];

export const SEGMENTS = [
  { id: 'seg-ready', name: 'Ready-to-buy upgraders', ctr: 18.9, count: 3525, pref: 'WA', bestHour: '10:00', desc: 'High purchase propensity, active in last 90 days', tag: 'Premium offer, direct CTA' },
  { id: 'seg-churn', name: 'High-value at churn risk', ctr: 12.9, count: 5734, pref: 'WA', bestHour: '10:00', desc: 'Premium band + churn risk ≥ 60% — save them now', tag: 'Loyalty perk / early access' },
  { id: 'seg-rich-media', name: 'Rich-media responders', ctr: 12.7, count: 11515, pref: 'RCS', bestHour: '10:00', desc: 'Prefer RCS — under-served by SMS-heavy sends', tag: 'RCS carousel campaign' },
  { id: 'seg-gifting', name: 'Gifting window', ctr: 11.0, count: 11750, pref: 'WA', bestHour: '10:00', desc: 'Bought 320–400 days ago — anniversary of purchase approaching', tag: 'Gift-framing campaign' },
  { id: 'seg-evening', name: 'Evening engagers', ctr: 10.2, count: 22372, pref: 'WA', bestHour: '21:00', desc: 'Best send hour 18:00–21:00 — usually messaged at 10 AM', tag: 'Shift send window to evening' },
];

const names = ['Ishaan', 'Anita', 'Aditya', 'Riya', 'Kavya', 'Aarav', 'Aadhya', 'Nikhil', 'Ananya', 'Rohan', 'Karan', 'Sudhir', 'Manish', 'Pooja', 'Lakshmi', 'Bhavesh', 'Kabir', 'Anika'];
const states = ['Karnataka', 'Kerala', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Gujarat', 'Delhi'];
const channelsList = ['WA', 'RCS', 'SMS', 'EM'];
function seededRand(seed) { let x = Math.sin(seed) * 10000; return x - Math.floor(x); }

export const CUSTOMERS = Array.from({ length: 60 }).map((_, i) => {
  const r1 = seededRand(i * 3.1), r2 = seededRand(i * 7.7), r3 = seededRand(i * 11.3);
  return {
    id: `cust-${i}`,
    name: names[i % names.length],
    phone: `+91 9XXXX ${10000 + Math.floor(r1 * 89999)}`.slice(0, 15),
    state: states[i % states.length],
    band: r2 > 0.6 ? 'Premium' : r2 > 0.3 ? 'Gold' : 'Silver',
    buyPropensity: Math.round(40 + r1 * 60),
    churnRisk: Math.round(r2 * 100),
    channel: channelsList[i % channelsList.length],
    bestHour: `${8 + (i % 13)}:00`,
    ltv: Math.round(5 + r3 * 35),
    lastPurchase: Math.round(10 + r1 * 350),
  };
});

export const LIBRARY_TEMPLATES = [
  { id: 'tpl-birthday-premium', name: 'Birthday Premium', category: 'birthday', zones: 5, brand: 'TW', icon: 'cake' },
  { id: 'tpl-anniversary-classic', name: 'Anniversary Classic', category: 'anniversary', zones: 5, brand: 'TW', icon: 'celebration' },
  { id: 'tpl-wedding-gift-edit', name: 'Wedding Gift Edit', category: 'wedding', zones: 4, brand: 'TW', icon: 'gift' },
];

export const TEMPLATE_ZONES = {
  'tpl-birthday-premium': ['Customer first name', 'Birth month collection image', 'Personalized discount %', 'Store locator link', 'CTA button label'],
  'tpl-anniversary-classic': ['Customer first name', 'Anniversary years (optional)', 'Rings / celebration art', 'Offer percentage', 'CTA button label'],
  'tpl-wedding-gift-edit': ['Customer first name', 'Curated gift image', 'Offer percentage', 'CTA button label'],
};

// 40 personalized "Anniversary Classic" creatives generated by the Creative
// Agent for the Titan Watches — Birthday/Anniversary journey campaign.
const ASSET_NAMES = [
  'Badhri', 'Azruddin', 'Sathaiah', 'Aadhya', 'Piyush', 'Bhavesh', 'Sanjay', 'Rahul', 'Anita', 'Krupa',
  'Megha', 'Manish', 'Deepa', 'Suresh', 'Lakshmi', 'Vivaan', 'Saanvi', 'Anika', 'Reyansh', 'Navya',
  'Arjun', 'Myra', 'Aditya', 'Tanvi', 'Ishaan', 'Riya', 'Kavya', 'Aarav', 'Nikhil', 'Ananya',
  'Rohan', 'Karan', 'Sudhir', 'Pooja', 'Kabir', 'Meera', 'Yash', 'Tara', 'Diya', 'Zara',
];
export const GENERATED_ASSETS = ASSET_NAMES.map((name, i) => ({
  id: `asset-${i + 1}`,
  customerName: name,
  brand: 'TW',
  templateId: 'tpl-anniversary-classic',
  campaignId: '2b19eafc-63e5-4279-b410-9a2b3c4d5e6f',
  offer: 'Enjoy up to 20% off this week',
  body: 'A celebration this special deserves something timeless. Discover the anniversary edit, curated just for you.',
  cta: 'CLAIM YOUR GIFT →',
  generatedOn: `${20 + (i % 8)} Jun 2026`,
}));

export const CALENDAR_MONTHS = ['JUN', 'JUL', 'AUG', 'SEP'];

export const CAMPGROUND_WELCOME = `Welcome to Campground ✨ — your AI campaign workspace. Tell me an objective and a budget, e.g. "increase store footfalls in the South zone this month, budget ₹8L" — I'll bring the Audience, Journey and Creative agents in as needed. Every idea I propose becomes a real draft campaign that enters your normal approval workflow.`;

export const CAMPGROUND_SUGGESTIONS = [
  { label: 'Increase footfalls', prompt: 'increase store footfalls in the South zone this month, budget ₹8L' },
  { label: 'Find audiences', prompt: 'which cohorts should I target for a festive offer?' },
  { label: 'Simulate', prompt: 'what if I send an offer to 80k contacts?' },
  { label: 'Winback', prompt: 're-engage customers going cold' },
];

export const PREDICTIVE_INSIGHTS = [
  {
    id: 'pi-anomaly', kind: 'ANOMALY', title: 'Watchdog: WA delivery pacing on "Winback: 42k contacts going cold"',
    body: 'Delivery is at 91% of sent after the latest window — monitoring. If it persists 2 more windows I will recommend a channel rebalance.',
  },
  {
    id: 'pi-nba', kind: 'NEXT BEST ACTION', title: 'HV-Repeat-Women-West ready for a rich-media resend',
    body: 'Cohort engaged 2+ times in 60 days but is still Overdue on RCS. Early-access play predicted CTR 12.7%.',
  },
];

export const FATIGUE_METER = { contactable: 976000, total: 1188000, resting: 212000 };

export const ANALYTICS_PERFORMANCE = {
  'cmp-wedding': {
    sent: 340200, deliveryRate: 96.5, openRate: 73.0, clickRate: 21.3, callbacks: 1572, storeVisits: 1419, catalogueViews: 4542, spend: 79900,
    channelBreakdown: [
      { channel: 'Email', sent: 113400, delivered: 109431, read: 78349, clicked: 14346, cost: 5500 },
      { channel: 'SMS', sent: 113400, delivered: 109431, read: 81047, clicked: 18179, cost: 19700 },
      { channel: 'WhatsApp', sent: 113400, delivered: 109431, read: 80219, clicked: 18420, cost: 54700 },
    ],
  },
  "8172f552-c94e-48df-aa76-5081a2b3c4d5": {
    sent: 65192, deliveryRate: 97.9, openRate: 81.2, clickRate: 24.6, callbacks: 612, storeVisits: 980, catalogueViews: 2210, spend: 22400,
    channelBreakdown: [
      { channel: 'SMS', sent: 33200, delivered: 32544, read: 24001, clicked: 6890, cost: 8900 },
      { channel: 'WhatsApp', sent: 31992, delivered: 31346, read: 27109, clicked: 8845, cost: 13500 },
    ],
  },
  '2b19eafc-63e5-4279-b410-9a2b3c4d5e6f': {
    sent: 61200, deliveryRate: 94.1, openRate: 68.4, clickRate: 19.9, callbacks: 340, storeVisits: 511, catalogueViews: 3390, spend: 18100,
    channelBreakdown: [
      { channel: 'SMS', sent: 20400, delivered: 19210, read: 13890, clicked: 3402, cost: 4100 },
      { channel: 'WhatsApp', sent: 20400, delivered: 19340, read: 15201, clicked: 4560, cost: 9500 },
      { channel: 'RCS', sent: 20400, delivered: 18820, read: 14109, clicked: 4109, cost: 4500 },
    ],
  },
};

const leadNames = ['Aarav Iyer', 'Kavya Sharma', 'Riya Iyer', 'Kabir Joshi', 'Bhavesh Rao', 'Aadhya Patel', 'Nikhil Nair', 'Anika Patel', 'Lakshmi Gupta', 'Pooja Rao', 'Rohan Mehta', 'Sneha Kulkarni', 'Devansh Shah', 'Meera Pillai', 'Arjun Nair', 'Isha Reddy', 'Yash Malhotra', 'Tara Menon', 'Vivaan Rao', 'Diya Kapoor', 'Kiaan Bose', 'Zara Khan', 'Reyansh Verma', 'Myra Chatterjee'];
const leadTypes = ['Callback', 'Store Visit', 'Catalogue'];
const collections = ['MENS', 'WOMENS', '—'];
const leadStatuses = ['NEW', 'CONTACTED', 'CONVERTED'];
const leadCampaigns = [
  { name: 'GenZ First-Watch Stories', brand: 'TW' },
  { name: 'Winback: 42k contacts going cold', brand: 'TW' },
  { name: 'Weekend Walk-in Festival', brand: 'TW' },
  { name: 'Titan Watches — Birthday/Anniversary journey', brand: 'TW' },
  { name: 'Wedding Season Silk Edit', brand: 'TANEIRA' },
  { name: 'Onam Kasavu Collection', brand: 'TANEIRA' },
  { name: 'Mia — Anniversary Gifting Wave', brand: 'MIA' },
];

export const LEADS = leadNames.map((name, i) => {
  const r = seededRand(i * 5.7);
  const camp = leadCampaigns[i % leadCampaigns.length];
  return {
    id: `lead-${i}`,
    name,
    phone: `+91 ${80000 + Math.floor(r * 19999)} ${10000 + Math.floor(seededRand(i * 9.2) * 89999)}`.slice(0, 17),
    type: leadTypes[i % leadTypes.length],
    collection: collections[i % collections.length],
    campaign: camp.name,
    brand: camp.brand,
    status: leadStatuses[Math.floor(r * leadStatuses.length)],
    created: `${19 + (i % 5)}d ago`,
  };
});

export const REPORTS_APPROVALS = [
  { campaign: 'Wedding Season Silk Edit', brand: 'Taneira', events: 4, created: '02 Jun' },
  { campaign: "Mother's Day Capsule", brand: 'Taneira', events: 1, created: '07 May' },
  { campaign: 'Onam Kasavu Collection', brand: 'Taneira', events: 1, created: '16 Jun' },
  { campaign: 'Silk Lovers Loyalty Preview', brand: 'Taneira', events: 0, created: '24 Jun' },
  { campaign: 'Navratri Nine-Colours', brand: 'Taneira', events: 0, created: '25 Jun' },
  { campaign: 'Pilot', brand: 'Taneira', events: 0, created: '13 Jun' },
  { campaign: 'Taneira — Footfall journey', brand: 'Taneira', events: 0, created: '13 Jun' },
];

export const APPROVAL_AUDIT = [
  { when: '27 Jun, 06:12 pm', stage: 'FINALIZE', decision: 'APPROVED', actor: 'Campaign CoE', comment: '—' },
  { when: '18 Jun, 06:12 pm', stage: 'CREATIVE', decision: 'APPROVED', actor: 'Krupa S', comment: '—' },
  { when: '14 Jun, 02:05 pm', stage: 'BASE COUNT', decision: 'APPROVED', actor: 'Megha P', comment: '—' },
  { when: '10 Jun, 06:12 pm', stage: 'BASE COUNT', decision: 'APPROVED', actor: 'Sanjay', comment: '—' },
  { when: '23 Jun, 06:12 pm', stage: 'BASE COUNT', decision: 'APPROVED', actor: 'Anita R', comment: '—' },
  { when: '20 Jun, 06:12 pm', stage: 'BASE COUNT', decision: 'APPROVED', actor: 'Rahul M', comment: '—' },
  { when: '17 Jun, 06:12 pm', stage: 'CREATIVE', decision: 'APPROVED', actor: 'Krupa S', comment: '—' },
  { when: '16 Jun, 06:12 pm', stage: 'BASE COUNT', decision: 'APPROVED', actor: 'Krupa S', comment: '—' },
  { when: '15 Jun, 06:12 pm', stage: 'BASE COUNT', decision: 'APPROVED', actor: 'Megha P', comment: '—' },
  { when: '13 Jun, 06:12 pm', stage: 'FINALIZE', decision: 'APPROVED', actor: 'Campaign CoE', comment: '—' },
];

export const ACTIVITY_FEED = [
  { type: 'LEAD', text: 'Sudhir Khan selected Men\'s Collection' },
  { type: 'LEAD', text: 'Manish Sharma clicked the offer' },
  { type: 'LEAD', text: 'Ishaan Patel selected Women\'s Collection' },
  { type: 'LEAD', text: 'Nikhil Singh viewed catalogue' },
  { type: 'STYLE', text: 'Ananya Singh clicked the offer' },
  { type: 'LEAD', text: 'Karan Kumar clicked the offer' },
  { type: 'READ', text: 'Rohan Singh selected Men\'s Collection' },
  { type: 'STYLE', text: 'Ishaan Sharma clicked the offer' },
];

export const NOTIFICATIONS = [
  { id: 1, title: 'Base count sent to Data Team', body: 'GenZ First-Watch Stories base count was sent to Sanjay for processing.', time: '2h ago' },
  { id: 2, title: 'Campaign overdue', body: 'Winback: 42k contacts going cold has passed its deploy date.', time: '5h ago' },
  { id: 3, title: 'Creative approved', body: 'Titan Watches — Birthday/Anniversary journey creative approved by Krupa S.', time: '1d ago' },
];

// ---------------------------------------------------------------------------
// Campaign-detail sub-tab reference data (Base Count / Segments / Creative /
// Approvals / Whitelisting / Deployment) — generic, static, reused across
// campaigns the way the real Data Team / Whitelisting / Deployment tooling
// would surface a consistent template regardless of which campaign it's for.
// ---------------------------------------------------------------------------

export const BASE_COUNT_ROWS = [
  { tg: 'HV-Repeat-Women-West', state: 'Maharashtra', gender: 'Female', band: 'Premium', rcs: 'Eligible', count: 18420, status: 'pending' },
  { tg: 'HV-Repeat-Women-West', state: 'Gujarat', gender: 'Female', band: 'Gold', rcs: 'Eligible', count: 12310, status: 'pending' },
  { tg: 'GenZ-First-Watch', state: 'Karnataka', gender: 'Male', band: 'Silver', rcs: 'Not eligible', count: 24110, status: 'approved' },
  { tg: 'GenZ-First-Watch', state: 'Tamil Nadu', gender: 'Female', band: 'Silver', rcs: 'Eligible', count: 19870, status: 'approved' },
  { tg: 'Winback-Cold-42k', state: 'Delhi', gender: 'Male', band: 'Gold', rcs: 'Eligible', count: 15200, status: 'pending' },
  { tg: 'Winback-Cold-42k', state: 'Telangana', gender: 'Female', band: 'Premium', rcs: 'Not eligible', count: 9830, status: 'flagged' },
];

export const BASE_COUNT_COMMENTS = [
  { author: 'Sanjay (Data Team)', text: '@Megha the STATE=Gujarat rows are pending DND scrub — ETA today EOD.', time: '2 hours ago' },
  { author: 'Megha P', text: '@Sanjay ok — please flag me the moment RCS eligibility finishes for the West cohort.', time: '1 hour ago' },
  { author: 'Sanjay (Data Team)', text: 'Uploaded revised TG base — 3 rows moved to approved, 2 still pending compliance review.', time: '32 minutes ago' },
];

export const CREATIVE_COPY_IDEAS = [
  'Your first Titan is waiting. Step into iconic style — flat 15% off, this week only.',
  "GenZ doesn't wait. Neither should your wrist. Discover Titan's first-watch collection →",
  'Time to make it official — your first real watch, made for main-character energy.',
  'A celebration this special deserves something timeless. Enjoy up to 20% off this week.',
];

export const DEPLOYMENT_CHECKLIST_TEMPLATE = [
  { key: 'base', label: 'Base count approved' },
  { key: 'creative', label: 'Creative saved & Brand Guardian checked' },
  { key: 'whitelisting', label: 'Sender IDs / RCS agent whitelisted' },
  { key: 'suppression', label: 'DND & frequency-cap suppression applied' },
  { key: 'window', label: 'Send window within shelf life' },
];
