function buildPrompt(context) {
  const date = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const { summary, habits, totalVisits } = context;

  const nameRoleLine = [summary.name, summary.role].filter(Boolean).join(' — ');

  const quadrantLabel = { core: 'cœur', reference: 'référence rapide', deep: 'lecture approfondie', peripheral: 'périphérique' };
  const categoriesSection = habits && habits.categories.length > 0
    ? habits.categories.map(c => {
        const toolLines = c.topTools.map(t =>
          `    • ${t.domain} [${quadrantLabel[t.quadrant]}] — ${t.visits} visites`
        ).join('\n');
        return `- **${c.name}** (${c.percentage}% des visites)\n${toolLines}`;
      }).join('\n')
    : '(aucune donnée de navigation)';

  const wp = habits?.workingPattern;
  const patternSection = wp
    ? `Pic dominant : ${wp.peakPeriod} | Heures de pointe : ${wp.topHours.join(', ')} | Matin ${wp.morningShare}% / Après-midi ${wp.afternoonShare}% / Soir ${wp.eveningShare}%`
    : '(aucune donnée)';

  const uncatSection = habits?.uncategorized?.length > 0
    ? `Autres domaines notables : ${habits.uncategorized.join(', ')}`
    : '';

  return `Tu es un expert en analyse de comportements numériques.

Voici les données comportementales d'un utilisateur sur ${summary.days} jours (${totalVisits} visites).
Légende quadrants : [cœur] = outil fréquemment visité | [réf] = consultation moins fréquente

${nameRoleLine ? `Utilisateur déclaré : ${nameRoleLine}` : ''}

DONNÉES D'ACTIVITÉ
${categoriesSection}

RYTHME DE TRAVAIL
${patternSection}${uncatSection ? '\n' + uncatSection : ''}

---

Génère UNIQUEMENT le document markdown ci-dessous, sans texte avant ni après.

Ce document a deux fonctions : être agréable à lire pour l'humain, ET servir de contexte riche à injecter dans une IA.
Pour qu'il soit utile à une IA, il doit être factuel, dense en signal, et éviter le remplissage.
Chaque section doit apporter quelque chose qu'une IA ne pourrait pas deviner sans ce document.

---

# Profil de contexte — ${nameRoleLine || 'Utilisateur'} · ${date}

## Identité professionnelle
[2-3 phrases denses : rôle précis, secteur, niveau de séniorité, mode de travail dominant (solo/équipe/builder/manager). Utilise les habitudes comme signal — un dev qui passe 40% de son temps sur GitHub et Supabase n'est pas un PM.]

## Stack & outils
[Tableau avec une ligne par catégorie significative. Pour chaque ligne, nomme les outils ET décris brièvement l'usage déduit du quadrant.]

| Catégorie | Outils | Usage déduit |
|-----------|--------|--------------|
[remplis uniquement les catégories présentes dans les données]

## Rythme & style de travail
[4-6 bullets courts et factuels. Inclure : horaires actifs, intensité (sessions longues vs courtes), fréquence de réunions déduite, autonomie vs collaboration. Chaque bullet = 1 signal concret.]

## Projets & focus actuels
[3-5 bullets : thèmes déduits des outils dominants. Sois précis plutôt que générique — "développement d'une app Node.js avec intégration LLM" > "travail sur un projet tech".]

## À retenir pour une IA
[5-8 bullets : les faits les plus utiles à une IA pour personnaliser ses réponses. Ex : niveau d'expertise technique, préférences de communication, contraintes connues, domaines de veille active. C'est la section la plus importante — sois spécifique.]
`;
}

/**
 * @param {object} context
 * @param {string} apiKey
 * @returns {Promise<string>}
 */
export async function generateProfile(context, apiKey) {
  const prompt = buildPrompt(context);

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  return data.content[0].text;
}
