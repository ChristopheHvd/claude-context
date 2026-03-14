import { generateProfile } from './lib/claudeClient.js';
import { recommendSkills } from './lib/skillRecommender.js';

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type !== 'GENERATE') return;

  (async () => {
    try {
      const markdown = await generateProfile(msg.context, msg.apiKey);
      const skills   = recommendSkills(msg.topCategoryIds || []);
      await chrome.storage.local.set({ lastResult: { markdown, skills, error: null } });
    } catch (err) {
      await chrome.storage.local.set({
        lastResult: { markdown: null, skills: [], error: err.message || 'Erreur inconnue' },
      });
    }

    chrome.tabs.create({ url: chrome.runtime.getURL('results/results.html') });
  })();
});
