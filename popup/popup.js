import { getHistory, analyzeHabits } from '../lib/historyAnalyzer.js';
import { buildContext, truncateForPrompt } from '../lib/contextBuilder.js';
import { generateProfile } from '../lib/aiClient.js';
import { recommendSkills } from '../lib/skillRecommender.js';
import { getAllProviders, getProvider } from '../lib/providers.js';

// ── DOM refs ──────────────────────────────────────────────────────────────
const screens = {
  settings: document.getElementById('screen-settings'),
  main:     document.getElementById('screen-main'),
  launched: document.getElementById('screen-launched'),
};

function showScreen(name) {
  for (const s of Object.values(screens)) s.classList.add('hidden');
  screens[name].classList.remove('hidden');
}

// ── Settings screen ───────────────────────────────────────────────────────
const selectProvider = document.getElementById('select-provider');
const apiKeyInput    = document.getElementById('api-key-input');
const btnSaveKey     = document.getElementById('btn-save-key');
const settingsError  = document.getElementById('settings-error');
const linkConsole    = document.getElementById('link-console');

// Populate provider dropdown
for (const p of getAllProviders()) {
  const opt = document.createElement('option');
  opt.value = p.id;
  opt.textContent = p.name;
  selectProvider.appendChild(opt);
}

function updateProviderUI(providerId) {
  const provider = getProvider(providerId);
  apiKeyInput.placeholder = provider.placeholder;
  linkConsole.href = provider.consoleUrl;
  linkConsole.textContent = `${provider.consoleLabel} →`;
  // Load stored key for this provider
  chrome.storage.local.get(`apiKey_${providerId}`).then(result => {
    apiKeyInput.value = result[`apiKey_${providerId}`] || '';
  });
}

selectProvider.addEventListener('change', () => {
  updateProviderUI(selectProvider.value);
});

btnSaveKey.addEventListener('click', async () => {
  const providerId = selectProvider.value;
  const provider = getProvider(providerId);
  const key = apiKeyInput.value.trim();
  if (!provider.validate(key)) {
    showError(settingsError, `Clé invalide pour ${provider.name}. Format attendu : ${provider.placeholder}`);
    return;
  }
  await chrome.storage.local.set({ [`apiKey_${providerId}`]: key, providerId });
  settingsError.classList.add('hidden');
  showScreen('main');
});

apiKeyInput.addEventListener('keydown', e => { if (e.key === 'Enter') btnSaveKey.click(); });

// ── Main screen ───────────────────────────────────────────────────────────
const btnSettings   = document.getElementById('btn-settings');
const selectDays    = document.getElementById('select-days');
const inputName     = document.getElementById('input-name');
const inputRole     = document.getElementById('input-role');
const mainError     = document.getElementById('main-error');
const btnGenerate   = document.getElementById('btn-generate');
const btnGenText    = document.getElementById('btn-generate-text');
const btnGenSpinner = document.getElementById('btn-generate-spinner');

btnSettings.addEventListener('click', () => {
  loadStoredSettings();
  showScreen('settings');
});

btnGenerate.addEventListener('click', async () => {
  mainError.classList.add('hidden');
  setGenerating(true);

  try {
    const { providerId } = await chrome.storage.local.get('providerId');
    const pid = providerId || 'anthropic';
    const keyResult = await chrome.storage.local.get(`apiKey_${pid}`);
    const apiKey = keyResult[`apiKey_${pid}`];
    if (!apiKey) { loadStoredSettings(); showScreen('settings'); return; }

    const days = Number(selectDays.value);
    const name = inputName.value.trim();
    const role = inputRole.value.trim();

    const { domains, peakHours, totalVisits } = await getHistory(days);
    const habits          = analyzeHabits(domains, peakHours);
    const context         = buildContext({ habits, peakHours, totalVisits, name, role, days });
    const topCategoryIds  = habits.categories.slice(0, 3).map(c => c.id);

    // Appel IA directement dans le popup (évite le problème de durée de vie du service worker MV3)
    const markdown = await generateProfile(truncateForPrompt(context), apiKey, pid);
    const skills   = recommendSkills(topCategoryIds);
    await chrome.storage.local.set({ lastResult: { markdown, skills, error: null } });

    // Ouvrir l'onglet résultat AVANT de fermer le popup
    await chrome.tabs.create({ url: chrome.runtime.getURL('results/results.html') });
    showScreen('launched');
    setTimeout(() => window.close(), 800);

  } catch (err) {
    showError(mainError, err.message || 'Une erreur est survenue.');
    setGenerating(false);
  }
});

function setGenerating(on) {
  btnGenerate.disabled = on;
  btnGenText.textContent = on ? 'Préparation…' : 'Générer mon profil';
  btnGenSpinner.classList.toggle('hidden', !on);
}

// ── Helpers ───────────────────────────────────────────────────────────────
function showError(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
}

async function loadStoredSettings() {
  const { providerId } = await chrome.storage.local.get('providerId');
  const pid = providerId || 'anthropic';
  selectProvider.value = pid;
  updateProviderUI(pid);
}

// ── Init ──────────────────────────────────────────────────────────────────
(async () => {
  const { providerId } = await chrome.storage.local.get('providerId');
  const pid = providerId || 'anthropic';
  const keyResult = await chrome.storage.local.get(`apiKey_${pid}`);
  const hasKey = !!keyResult[`apiKey_${pid}`];
  if (!hasKey) loadStoredSettings();
  showScreen(hasKey ? 'main' : 'settings');
})();
