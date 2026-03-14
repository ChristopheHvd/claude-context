# Context — Chrome Extension

**Génère un profil de contexte personnel depuis votre historique Chrome pour enrichir vos sessions IA.**

Context analyse vos habitudes de navigation, identifie vos domaines d'activité, et produit un profil Markdown structuré prêt à coller dans n'importe quel outil IA (Claude, ChatGPT, Cursor…). En bonus : une sélection de skills Claude Code adaptés à votre profil.

---

## Fonctionnement

1. L'extension lit votre historique Chrome via l'API `chrome.history`
2. Elle analyse les domaines visités, les fréquences, et les plages horaires actives
3. Elle envoie le contexte agrégé à Claude (API Anthropic) pour générer un profil structuré
4. Vous obtenez un fichier Markdown exportable + des recommandations de skills Claude Code

**Aucun serveur.** Tout tourne localement dans le popup Chrome.

---

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/ChristopheHvd/claude-context.git
cd claude-context
```

### 2. Charger l'extension dans Chrome

1. Ouvrir `chrome://extensions`
2. Activer le **Mode développeur** (en haut à droite)
3. Cliquer **"Charger l'extension non empaquetée"**
4. Sélectionner le dossier `claude-context`

L'icône ◈ apparaît dans la barre d'extensions.

---

## Configuration

Au premier lancement, l'extension demande une clé API Anthropic :

1. Aller sur [console.anthropic.com](https://console.anthropic.com/) pour obtenir une clé
2. Entrer la clé dans le champ (format `sk-ant-...`)
3. Cliquer **Enregistrer**

La clé est stockée localement dans `chrome.storage.local` — elle ne quitte jamais votre appareil.

---

## Utilisation

1. Cliquer sur l'icône ◈ dans Chrome
2. Choisir la **période d'analyse** (7 / 14 / 30 / 90 jours)
3. Renseigner optionnellement votre **nom** et **rôle**
4. Cliquer **Générer mon profil**

Un nouvel onglet s'ouvre avec :

- **Votre profil Markdown** (copier ou télécharger en `.md`)
- **Skills Claude Code recommandés** selon votre profil (développeur, design, business…)
- **Script d'installation** `install-skills.sh` à exécuter pour activer les skills

---

## Structure du profil généré

```markdown
## Identité professionnelle
## Stack & outils
## Rythme & style de travail
## Projets & focus actuels
## À retenir pour une IA
```

---

## Stack technique

| Composant | Technologie |
|-----------|------------|
| Extension | Chrome MV3 (Manifest V3) |
| Données | `chrome.history` API |
| Stockage | `chrome.storage.local` |
| IA | Claude Sonnet via `fetch` (Anthropic API) |
| Rendu Markdown | [marked.js](https://marked.js.org/) (bundlé localement, CSP MV3) |

---

## Structure des fichiers

```
context-extension/
├── manifest.json          # MV3, permissions: history, storage
├── popup/
│   ├── popup.html         # UI (settings → main → launched)
│   ├── popup.js           # Orchestration : history → Claude → résultats
│   └── popup.css
├── results/
│   ├── results.html       # Page de résultats
│   ├── results.js         # Rendu markdown + skills + téléchargements
│   └── results.css
├── lib/
│   ├── historyAnalyzer.js # chrome.history → domaines agrégés + catégories
│   ├── contextBuilder.js  # Formatage du contexte pour le prompt
│   ├── claudeClient.js    # Appel API Anthropic via fetch
│   └── skillRecommender.js # Catalogue statique → skills recommandés
├── vendor/
│   └── marked.min.js      # marked.js bundlé (CSP MV3 interdit les CDN)
└── icons/
    ├── 16.png
    ├── 48.png
    └── 128.png
```

---

## Licence

[MIT](LICENSE) — © 2026 Christophe Havard
