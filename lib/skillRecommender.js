// tier: 'indispensable' | 'interessante'
const SKILL_CATALOG = {
  dev: [
    {
      id: 'superpowers',
      tier: 'indispensable',
      name: 'Superpowers',
      description: 'TDD, plans d\'implémentation, code review automatisé',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/superpowers.md',
    },
    {
      id: 'claude-api',
      tier: 'indispensable',
      name: 'Claude API',
      description: 'Construire des apps avec le SDK Anthropic',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/claude-api.md',
    },
    {
      id: 'frontend-design',
      tier: 'interessante',
      name: 'Frontend Design',
      description: 'UI production-grade avec composants distinctifs',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/frontend-design.md',
    },
    {
      id: 'n8n',
      tier: 'interessante',
      name: 'n8n Workflows',
      description: 'Automatisations et pipelines de données',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/n8n.md',
    },
  ],
  ai: [
    {
      id: 'claude-api',
      tier: 'indispensable',
      name: 'Claude API',
      description: 'Construire des apps avec le SDK Anthropic',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/claude-api.md',
    },
    {
      id: 'superpowers',
      tier: 'indispensable',
      name: 'Superpowers',
      description: 'TDD, plans d\'implémentation, code review automatisé',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/superpowers.md',
    },
    {
      id: 'n8n',
      tier: 'interessante',
      name: 'n8n Workflows',
      description: 'Automatisations et pipelines de données',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/n8n.md',
    },
    {
      id: 'frontend-design',
      tier: 'interessante',
      name: 'Frontend Design',
      description: 'UI production-grade avec composants distinctifs',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/frontend-design.md',
    },
  ],
  design: [
    {
      id: 'frontend-design',
      tier: 'indispensable',
      name: 'Frontend Design',
      description: 'UI production-grade avec composants distinctifs',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/frontend-design.md',
    },
    {
      id: 'office-pptx',
      tier: 'interessante',
      name: 'Présentations',
      description: 'Créer et éditer des présentations .pptx',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/office-pptx.md',
    },
    {
      id: 'superpowers',
      tier: 'interessante',
      name: 'Superpowers',
      description: 'TDD, plans d\'implémentation, code review automatisé',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/superpowers.md',
    },
  ],
  business: [
    {
      id: 'seo',
      tier: 'indispensable',
      name: 'SEO',
      description: 'Audit SEO complet, schema, Core Web Vitals, GEO',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/seo.md',
    },
    {
      id: 'office-docx',
      tier: 'indispensable',
      name: 'Office Docs',
      description: 'Documents professionnels, contrats, rapports',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/office-docx.md',
    },
    {
      id: 'office-xlsx',
      tier: 'interessante',
      name: 'Spreadsheets',
      description: 'Automatisation de tableurs, formules avancées',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/office-xlsx.md',
    },
    {
      id: 'n8n',
      tier: 'interessante',
      name: 'n8n Workflows',
      description: 'Automatisations et pipelines de données',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/n8n.md',
    },
  ],
  productivity: [
    {
      id: 'office-xlsx',
      tier: 'indispensable',
      name: 'Spreadsheets',
      description: 'Automatisation de tableurs, formules avancées',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/office-xlsx.md',
    },
    {
      id: 'office-docx',
      tier: 'interessante',
      name: 'Office Docs',
      description: 'Documents professionnels, contrats, rapports',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/office-docx.md',
    },
    {
      id: 'n8n',
      tier: 'interessante',
      name: 'n8n Workflows',
      description: 'Automatisations et pipelines de données',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/n8n.md',
    },
  ],
  learning: [
    {
      id: 'superpowers',
      tier: 'indispensable',
      name: 'Superpowers',
      description: 'TDD, plans d\'implémentation, code review automatisé',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/superpowers.md',
    },
    {
      id: 'claude-api',
      tier: 'interessante',
      name: 'Claude API',
      description: 'Construire des apps avec le SDK Anthropic',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/claude-api.md',
    },
  ],
  communication: [
    {
      id: 'office-docx',
      tier: 'indispensable',
      name: 'Office Docs',
      description: 'Documents professionnels, contrats, rapports',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/office-docx.md',
    },
    {
      id: 'office-pptx',
      tier: 'interessante',
      name: 'Présentations',
      description: 'Créer et éditer des présentations .pptx',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/office-pptx.md',
    },
    {
      id: 'office-xlsx',
      tier: 'interessante',
      name: 'Spreadsheets',
      description: 'Automatisation de tableurs, formules avancées',
      rawUrl: 'https://raw.githubusercontent.com/anthropics/claude-code-skills/main/office-xlsx.md',
    },
  ],
};

/**
 * @param {string[]} categoryIds — top categories by visit count
 * @returns {Array<{ id, tier, name, description, rawUrl }>}
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
 * @param {Array<{ id, tier, name, description, rawUrl }>} skills
 * @returns {string}
 */
export function generateInstallScript(skills) {
  const lines = [
    '#!/bin/bash',
    '# Context — Recommended Claude Code Skills',
    `# Generated on ${new Date().toLocaleDateString()}`,
    '',
    'SKILLS_DIR="$HOME/.claude/skills"',
    'mkdir -p "$SKILLS_DIR"',
    '',
  ];

  const indispensable = skills.filter(s => s.tier === 'indispensable');
  const interessante  = skills.filter(s => s.tier !== 'indispensable');

  if (indispensable.length > 0) {
    lines.push('# ── Indispensables ──────────────────────');
    for (const skill of indispensable) {
      lines.push(`# ${skill.name}: ${skill.description}`);
      lines.push(`curl -fsSL "${skill.rawUrl}" -o "$SKILLS_DIR/${skill.id}.md" && echo "✓ ${skill.name}"`);
      lines.push('');
    }
  }

  if (interessante.length > 0) {
    lines.push('# ── Intéressantes ───────────────────────');
    for (const skill of interessante) {
      lines.push(`# ${skill.name}: ${skill.description}`);
      lines.push(`curl -fsSL "${skill.rawUrl}" -o "$SKILLS_DIR/${skill.id}.md" && echo "✓ ${skill.name}"`);
      lines.push('');
    }
  }

  lines.push('echo ""');
  lines.push('echo "Done! Restart Claude Code to activate skills."');
  return lines.join('\n');
}
