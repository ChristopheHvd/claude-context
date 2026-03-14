// historyAnalyzer.js — Chrome Extension port of browserHistory.js
// Uses chrome.history API instead of SQLite

const BLACKLIST = new Set([
  'google.com',
  'google.fr',
  'accounts.google.com',
  'localhost',
  '127.0.0.1',
  'chrome-extension',
  'about',
  'chrome',
  'newtab',
  'settings',
]);

/**
 * Extracts hostname from a URL string, stripping leading "www.".
 * @param {string} url
 * @returns {string|null}
 */
function extractDomain(url) {
  if (!url) return null;
  if (url.startsWith('chrome://') || url.startsWith('about:')) return null;

  try {
    const parsed = new URL(url);
    let hostname = parsed.hostname;
    if (!hostname) return null;
    if (hostname.startsWith('www.')) hostname = hostname.slice(4);
    return hostname || null;
  } catch {
    return null;
  }
}

/**
 * @param {string} domain
 * @returns {boolean}
 */
function isDomainBlacklisted(domain) {
  if (!domain) return true;
  if (BLACKLIST.has(domain)) return true;
  if (domain.includes('chrome-extension')) return true;
  if (domain.startsWith('chrome')) return true;
  return false;
}

// Returns the median value of a numeric array (sorted copy).
function median(arr) {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

/**
 * Simplified quadrant classification (no duration data from chrome.history).
 * highFreq → core, lowFreq → reference
 */
function classifyDomain(domain, medianCount) {
  return domain.count > medianCount ? 'core' : 'reference';
}

const CATEGORIES = [
  {
    id: 'dev',
    name: 'Développement',
    keywords: [
      'github', 'gitlab', 'bitbucket', 'stackoverflow', 'npm', 'npmjs',
      'pypi', 'crates.io', 'pkg.go.dev', 'docker', 'hub.docker', 'vercel',
      'netlify', 'heroku', 'render.com', 'railway', 'fly.io', 'aws.amazon',
      'azure', 'cloud.google', 'cloudflare', 'digitalocean', 'supabase',
      'firebase', 'planetscale', 'neon.tech', 'turso', 'codepen', 'jsfiddle',
      'replit', 'codesandbox', 'stackblitz', 'vscode.dev', 'regex101',
      'swagger', 'postman', 'insomnia', 'devdocs', 'mdn', 'developer.mozilla',
    ],
  },
  {
    id: 'ai',
    name: 'IA & Automatisation',
    keywords: [
      'openai', 'chatgpt', 'anthropic', 'claude', 'gemini', 'mistral',
      'cohere', 'huggingface', 'replicate', 'together.ai', 'groq', 'perplexity',
      'midjourney', 'stability', 'runway', 'elevenlabs', 'n8n', 'zapier',
      'make.com', 'activepieces', 'langchain', 'llamaindex', 'flowise',
      'dify', 'cursor.sh', 'copilot', 'tabnine', 'phind', 'you.com',
    ],
  },
  {
    id: 'productivity',
    name: 'Productivité',
    keywords: [
      'notion', 'linear', 'jira', 'confluence', 'trello', 'asana', 'monday',
      'airtable', 'clickup', 'basecamp', 'todoist', 'obsidian', 'roamresearch',
      'logseq', 'craft.do', 'coda.io', 'fibery', 'height.app',
    ],
  },
  {
    id: 'communication',
    name: 'Communication',
    keywords: [
      'slack', 'discord', 'teams', 'zoom', 'meet.google', 'whereby',
      'loom', 'calendly', 'cal.com', 'gmail', 'outlook', 'mail.google',
      'telegram', 'whatsapp', 'signal', 'intercom', 'crisp', 'front',
    ],
  },
  {
    id: 'learning',
    name: 'Formation & Veille',
    keywords: [
      'youtube', 'udemy', 'coursera', 'pluralsight', 'egghead',
      'frontendmasters', 'medium', 'substack', 'hashnode', 'dev.to',
      'news.ycombinator', 'ycombinator', 'indiehackers', 'reddit',
      'producthunt', 'techcrunch', 'hbr.org', 'lemonde', 'lefigaro',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    keywords: [
      'stripe', 'paddle', 'paypal', 'brex', 'qonto', 'pennylane',
      'quickbooks', 'xero', 'hubspot', 'salesforce', 'pipedrive',
      'lemlist', 'hunter.io', 'apollo.io', 'close.com', 'typeform', 'tally',
    ],
  },
  {
    id: 'design',
    name: 'Design & Créatif',
    keywords: [
      'figma', 'canva', 'dribbble', 'behance', 'framer', 'webflow',
      'unsplash', 'pexels', 'icons8', 'fontawesome', 'coolors', 'adobe',
      'sketch', 'zeplin', 'spline',
    ],
  },
  {
    id: 'social',
    name: 'Réseaux sociaux',
    keywords: [
      'twitter', 'x.com', 'linkedin', 'instagram', 'facebook', 'tiktok',
      'bluesky', 'mastodon', 'threads', 'pinterest',
    ],
  },
];

/**
 * Fetches browser history via chrome.history API and returns aggregated domain data.
 * @param {number} days
 * @returns {Promise<{ domains: Array, peakHours: Object, totalVisits: number }>}
 */
export async function getHistory(days = 90) {
  const cutoffMs = Date.now() - days * 24 * 60 * 60 * 1000;

  const items = await chrome.history.search({
    text: '',
    maxResults: 10000,
    startTime: cutoffMs,
  });

  const domainData = new Map();
  const hourCounts = new Map();
  let totalVisits = 0;

  for (const item of items) {
    const domain = extractDomain(item.url);
    if (!domain || isDomainBlacklisted(domain)) continue;

    const visitCount = item.visitCount || 1;
    const lastVisit = item.lastVisitTime || Date.now();
    const hour = new Date(lastVisit).getHours();

    if (!domainData.has(domain)) {
      domainData.set(domain, { count: 0 });
    }
    domainData.get(domain).count += visitCount;
    totalVisits += visitCount;

    hourCounts.set(hour, (hourCounts.get(hour) ?? 0) + visitCount);
  }

  const domains = [...domainData.entries()]
    .map(([domain, { count }]) => ({ domain, count, totalMinutes: 0, avgMinutes: 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 100);

  const peakHours = {};
  for (const [hour, count] of hourCounts.entries()) {
    peakHours[String(hour)] = count;
  }

  return { domains, peakHours, totalVisits };
}

/**
 * Categorizes aggregated domains into behavioral buckets.
 * Adapted from V1 — no totalMinutes available, uses visitCount only.
 */
export function analyzeHabits(domains, peakHours) {
  const totalVisits = domains.reduce((s, d) => s + d.count, 0);

  const medianCount = median(domains.map(d => d.count));

  const buckets = new Map(CATEGORIES.map(c => [c.id, { meta: c, visits: 0, tools: [] }]));
  const uncategorizedDomains = [];

  for (const d of domains) {
    const quadrant = classifyDomain(d, medianCount);
    let matched = false;
    for (const cat of CATEGORIES) {
      if (cat.keywords.some(kw => d.domain.includes(kw))) {
        const b = buckets.get(cat.id);
        b.visits += d.count;
        b.tools.push({ ...d, quadrant });
        matched = true;
        break;
      }
    }
    if (!matched) uncategorizedDomains.push({ ...d, quadrant });
  }

  const categories = [...buckets.values()]
    .filter(b => b.visits > 0)
    .sort((a, b) => b.visits - a.visits)
    .map(b => {
      const tools = b.tools.sort((a, b) => b.count - a.count);
      const byQuadrant = { core: [], reference: [], deep: [], peripheral: [] };
      for (const t of tools) byQuadrant[t.quadrant].push(t);

      const topTools = [
        ...byQuadrant.core.slice(0, 3),
        ...byQuadrant.reference.slice(0, 3),
      ].slice(0, 5).map(t => ({
        domain: t.domain,
        quadrant: t.quadrant,
        visits: t.count,
        totalMinutes: 0,
        avgMinutes: 0,
      }));

      return {
        id: b.meta.id,
        name: b.meta.name,
        visits: b.visits,
        totalMinutes: 0,
        percentage: totalVisits > 0 ? Math.round((b.visits / totalVisits) * 100) : 0,
        topTools,
        coreCount:      byQuadrant.core.length,
        deepCount:      0,
        referenceCount: byQuadrant.reference.length,
      };
    });

  const totalCategorized = categories.reduce((s, c) => s + c.visits, 0);

  const uncategorized = uncategorizedDomains
    .filter(d => d.quadrant === 'core')
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map(d => d.domain);

  // Working pattern from peak hours
  const hourEntries = Object.entries(peakHours).map(([h, c]) => ({ h: Number(h), c }));
  const totalHourVisits = hourEntries.reduce((s, e) => s + e.c, 0);

  function shareForRange(start, end) {
    if (totalHourVisits === 0) return 0;
    const sum = hourEntries.filter(e => e.h >= start && e.h <= end).reduce((s, e) => s + e.c, 0);
    return Math.round((sum / totalHourVisits) * 100);
  }

  const morningShare   = shareForRange(6, 11);
  const afternoonShare = shareForRange(12, 16);
  const eveningShare   = shareForRange(17, 22);
  const nightShare     = shareForRange(23, 5);

  const periods = [
    { label: 'matin (6h-12h)',       share: morningShare },
    { label: 'après-midi (12h-17h)', share: afternoonShare },
    { label: 'soirée (17h-23h)',     share: eveningShare },
    { label: 'nuit',                 share: nightShare },
  ];
  const peakPeriod = [...periods].sort((a, b) => b.share - a.share)[0]?.label ?? 'inconnu';

  const topHours = [...hourEntries]
    .sort((a, b) => b.c - a.c)
    .slice(0, 3)
    .map(e => `${e.h}h`);

  return {
    categories,
    workingPattern: { morningShare, afternoonShare, eveningShare, nightShare, peakPeriod, topHours },
    uncategorized,
    totalCategorized,
    totalVisits,
    totalMinutes: 0,
  };
}
