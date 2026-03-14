import { generateInstallScript } from '../lib/skillRecommender.js';

const resultMdEl    = document.getElementById('result-markdown');
const skillsAside   = document.getElementById('skills-aside');
const tierIndisp    = document.getElementById('tier-indispensable');
const tierInteress  = document.getElementById('tier-interessante');
const listIndisp    = document.getElementById('skills-list-indispensable');
const listInteress  = document.getElementById('skills-list-interessante');
const btnCopy       = document.getElementById('btn-copy');
const btnDlMd       = document.getElementById('btn-download-md');
const btnDlSh       = document.getElementById('btn-download-sh');
const copyFeedback  = document.getElementById('copy-feedback');

let currentMarkdown = '';
let currentSkills   = [];

// ── Load results from storage ─────────────────────────────────────────────
(async () => {
  const { lastResult } = await chrome.storage.local.get('lastResult');
  if (!lastResult) {
    resultMdEl.innerHTML = '<p style="color:#888">Aucun résultat trouvé. Générez un profil depuis l\'extension.</p>';
    return;
  }

  if (lastResult.error) {
    resultMdEl.innerHTML = `<p style="color:#f87171"><strong>Erreur lors de l'analyse :</strong><br>${esc(lastResult.error)}</p>`;
    return;
  }

  currentMarkdown = lastResult.markdown;
  currentSkills   = lastResult.skills || [];

  // Render markdown
  resultMdEl.innerHTML = marked.parse(currentMarkdown);

  // Render skills split by tier
  const indispensable = currentSkills.filter(s => s.tier === 'indispensable');
  const interessante  = currentSkills.filter(s => s.tier !== 'indispensable');

  if (indispensable.length > 0) {
    for (const skill of indispensable) listIndisp.appendChild(makeSkillItem(skill));
    tierIndisp.classList.remove('hidden');
    skillsAside.classList.remove('hidden');
  }

  if (interessante.length > 0) {
    for (const skill of interessante) listInteress.appendChild(makeSkillItem(skill));
    tierInteress.classList.remove('hidden');
    skillsAside.classList.remove('hidden');
  }

  // Update page title
  document.title = `Context — ${new Date().toLocaleDateString('fr-FR')}`;
})();

function makeSkillItem(skill) {
  const li = document.createElement('li');
  li.className = 'skill-item';
  li.innerHTML = `
    <span class="skill-name">${esc(skill.name)}</span>
    <span class="skill-desc">${esc(skill.description)}</span>
  `;
  return li;
}

// ── Actions ───────────────────────────────────────────────────────────────
btnCopy.addEventListener('click', async () => {
  await navigator.clipboard.writeText(currentMarkdown);
  copyFeedback.classList.remove('hidden');
  setTimeout(() => copyFeedback.classList.add('hidden'), 2000);
});

btnDlMd.addEventListener('click', () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  download(`context-${date}.md`, currentMarkdown, 'text/markdown');
});

btnDlSh.addEventListener('click', () => {
  download('install-skills.sh', generateInstallScript(currentSkills), 'text/x-sh');
});

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
