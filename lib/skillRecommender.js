// tier: 'indispensable' | 'interessante'
const SKILL_CATALOG = {
  dev: [
    {
      id: 'superpowers',
      tier: 'indispensable',
      name: 'Superpowers',
      description: 'TDD, plans d\'implémentation, code review automatisé',
      url: 'https://github.com/anthropics/claude-plugins-official/tree/main/plugins/superpowers',
    },
    {
      id: 'claude-api',
      tier: 'indispensable',
      name: 'Claude API',
      description: 'Construire des apps avec le SDK Anthropic',
      url: 'https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-code-setup',
    },
    {
      id: 'frontend-design',
      tier: 'interessante',
      name: 'Frontend Design',
      description: 'UI production-grade avec composants distinctifs',
      url: 'https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design',
    },
    {
      id: 'n8n',
      tier: 'interessante',
      name: 'n8n Workflows',
      description: 'Automatisations et pipelines de données',
      url: 'https://github.com/czlonkowski/n8n-skills',
    },
  ],
  ai: [
    {
      id: 'claude-api',
      tier: 'indispensable',
      name: 'Claude API',
      description: 'Construire des apps avec le SDK Anthropic',
      url: 'https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-code-setup',
    },
    {
      id: 'superpowers',
      tier: 'indispensable',
      name: 'Superpowers',
      description: 'TDD, plans d\'implémentation, code review automatisé',
      url: 'https://github.com/anthropics/claude-plugins-official/tree/main/plugins/superpowers',
    },
    {
      id: 'n8n',
      tier: 'interessante',
      name: 'n8n Workflows',
      description: 'Automatisations et pipelines de données',
      url: 'https://github.com/czlonkowski/n8n-skills',
    },
    {
      id: 'frontend-design',
      tier: 'interessante',
      name: 'Frontend Design',
      description: 'UI production-grade avec composants distinctifs',
      url: 'https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design',
    },
  ],
  design: [
    {
      id: 'frontend-design',
      tier: 'indispensable',
      name: 'Frontend Design',
      description: 'UI production-grade avec composants distinctifs',
      url: 'https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design',
    },
    {
      id: 'office-pptx',
      tier: 'interessante',
      name: 'Présentations',
      description: 'Créer et éditer des présentations .pptx',
      url: 'https://github.com/jeremylongshore/claude-code-plugins-plus-skills',
    },
    {
      id: 'superpowers',
      tier: 'interessante',
      name: 'Superpowers',
      description: 'TDD, plans d\'implémentation, code review automatisé',
      url: 'https://github.com/anthropics/claude-plugins-official/tree/main/plugins/superpowers',
    },
  ],
  business: [
    {
      id: 'seo',
      tier: 'indispensable',
      name: 'SEO',
      description: 'Audit SEO complet, schema, Core Web Vitals, GEO',
      url: 'https://github.com/jeremylongshore/claude-code-plugins-plus-skills',
    },
    {
      id: 'office-docx',
      tier: 'indispensable',
      name: 'Office Docs',
      description: 'Documents professionnels, contrats, rapports',
      url: 'https://github.com/jeremylongshore/claude-code-plugins-plus-skills',
    },
    {
      id: 'office-xlsx',
      tier: 'interessante',
      name: 'Spreadsheets',
      description: 'Automatisation de tableurs, formules avancées',
      url: 'https://github.com/jeremylongshore/claude-code-plugins-plus-skills',
    },
    {
      id: 'n8n',
      tier: 'interessante',
      name: 'n8n Workflows',
      description: 'Automatisations et pipelines de données',
      url: 'https://github.com/czlonkowski/n8n-skills',
    },
  ],
  productivity: [
    {
      id: 'office-xlsx',
      tier: 'indispensable',
      name: 'Spreadsheets',
      description: 'Automatisation de tableurs, formules avancées',
      url: 'https://github.com/jeremylongshore/claude-code-plugins-plus-skills',
    },
    {
      id: 'office-docx',
      tier: 'interessante',
      name: 'Office Docs',
      description: 'Documents professionnels, contrats, rapports',
      url: 'https://github.com/jeremylongshore/claude-code-plugins-plus-skills',
    },
    {
      id: 'n8n',
      tier: 'interessante',
      name: 'n8n Workflows',
      description: 'Automatisations et pipelines de données',
      url: 'https://github.com/czlonkowski/n8n-skills',
    },
  ],
  learning: [
    {
      id: 'superpowers',
      tier: 'indispensable',
      name: 'Superpowers',
      description: 'TDD, plans d\'implémentation, code review automatisé',
      url: 'https://github.com/anthropics/claude-plugins-official/tree/main/plugins/superpowers',
    },
    {
      id: 'claude-api',
      tier: 'interessante',
      name: 'Claude API',
      description: 'Construire des apps avec le SDK Anthropic',
      url: 'https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-code-setup',
    },
  ],
  communication: [
    {
      id: 'office-docx',
      tier: 'indispensable',
      name: 'Office Docs',
      description: 'Documents professionnels, contrats, rapports',
      url: 'https://github.com/jeremylongshore/claude-code-plugins-plus-skills',
    },
    {
      id: 'office-pptx',
      tier: 'interessante',
      name: 'Présentations',
      description: 'Créer et éditer des présentations .pptx',
      url: 'https://github.com/jeremylongshore/claude-code-plugins-plus-skills',
    },
    {
      id: 'office-xlsx',
      tier: 'interessante',
      name: 'Spreadsheets',
      description: 'Automatisation de tableurs, formules avancées',
      url: 'https://github.com/jeremylongshore/claude-code-plugins-plus-skills',
    },
  ],
};

/**
 * @param {string[]} categoryIds — top categories by visit count
 * @returns {Array<{ id, tier, name, description, url }>}
 */
export function recommendSkills(categoryIds) {
  const seen = new Set();
  const indispensable = [];
  const interessante  = [];

  for (const catId of categoryIds.slice(0, 3)) {
    for (const skill of (SKILL_CATALOG[catId] || [])) {
      if (seen.has(skill.id)) continue;
      seen.add(skill.id);
      if (skill.tier === 'indispensable') {
        if (indispensable.length < 3) indispensable.push(skill);
      } else {
        if (interessante.length < 4) interessante.push(skill);
      }
    }
  }

  return [...indispensable, ...interessante];
}

/**
 * @param {Array<{ id, tier, name, description, url }>} skills
 * @returns {string}
 */
export function generateInstallScript(skills) {
  const lines = [
    '#!/bin/bash',
    '# My AI Context — Recommended Claude Code Skills',
    `# Generated on ${new Date().toLocaleDateString()}`,
    '',
    '# Visit the links below to install each skill:',
    '',
  ];

  const indispensable = skills.filter(s => s.tier === 'indispensable');
  const interessante  = skills.filter(s => s.tier !== 'indispensable');

  if (indispensable.length > 0) {
    lines.push('# ── Indispensables ──────────────────────');
    for (const skill of indispensable) {
      lines.push(`# ${skill.name}: ${skill.description}`);
      lines.push(`# → ${skill.url}`);
      lines.push(`echo "Install ${skill.name}: ${skill.url}"`);
      lines.push('');
    }
  }

  if (interessante.length > 0) {
    lines.push('# ── Intéressantes ───────────────────────');
    for (const skill of interessante) {
      lines.push(`# ${skill.name}: ${skill.description}`);
      lines.push(`# → ${skill.url}`);
      lines.push(`echo "Install ${skill.name}: ${skill.url}"`);
      lines.push('');
    }
  }

  lines.push('echo ""');
  lines.push('echo "Visit the links above to install each skill in Claude Code."');
  return lines.join('\n');
}
