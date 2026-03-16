/**
 * AI Provider configurations.
 * Each provider defines how to build the request and parse the response.
 */

const PROVIDERS = {
  anthropic: {
    id: 'anthropic',
    name: 'Claude (Anthropic)',
    placeholder: 'sk-ant-...',
    consoleUrl: 'https://console.anthropic.com/',
    consoleLabel: 'Obtenir une clé Anthropic',
    validate: (key) => key.startsWith('sk-ant-'),
    model: 'claude-sonnet-4-6',
    endpoint: 'https://api.anthropic.com/v1/messages',
    buildRequest(prompt, apiKey, model) {
      return {
        url: this.endpoint,
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
          'content-type': 'application/json',
        },
        body: {
          model,
          max_tokens: 2048,
          messages: [{ role: 'user', content: prompt }],
        },
      };
    },
    parseResponse(data) {
      const text = data?.content?.[0]?.text;
      if (!text) throw new Error('Réponse Anthropic inattendue : contenu vide');
      return text;
    },
    parseError(data) {
      return data?.error?.message;
    },
  },

  openai: {
    id: 'openai',
    name: 'ChatGPT (OpenAI)',
    placeholder: 'sk-...',
    consoleUrl: 'https://platform.openai.com/api-keys',
    consoleLabel: 'Obtenir une clé OpenAI',
    validate: (key) => key.startsWith('sk-') && !key.startsWith('sk-ant-'),
    model: 'gpt-4o',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    buildRequest(prompt, apiKey, model) {
      return {
        url: this.endpoint,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'content-type': 'application/json',
        },
        body: {
          model,
          max_tokens: 2048,
          messages: [{ role: 'user', content: prompt }],
        },
      };
    },
    parseResponse(data) {
      const text = data?.choices?.[0]?.message?.content;
      if (!text) throw new Error('Réponse OpenAI inattendue : contenu vide');
      return text;
    },
    parseError(data) {
      return data?.error?.message;
    },
  },

  gemini: {
    id: 'gemini',
    name: 'Gemini (Google)',
    placeholder: 'AIza...',
    consoleUrl: 'https://aistudio.google.com/apikey',
    consoleLabel: 'Obtenir une clé Google AI',
    validate: (key) => key.startsWith('AIza'),
    model: 'gemini-2.0-flash',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/',
    buildRequest(prompt, apiKey, model) {
      return {
        url: `${this.endpoint}${model}:generateContent?key=${apiKey}`,
        headers: {
          'content-type': 'application/json',
        },
        body: {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 2048 },
        },
      };
    },
    parseResponse(data) {
      // API key is passed as URL param — this is Google's documented approach
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Réponse Gemini inattendue : contenu vide');
      return text;
    },
    parseError(data) {
      return data?.error?.message;
    },
  },

  perplexity: {
    id: 'perplexity',
    name: 'Perplexity',
    placeholder: 'pplx-...',
    consoleUrl: 'https://www.perplexity.ai/settings/api',
    consoleLabel: 'Obtenir une clé Perplexity',
    validate: (key) => key.startsWith('pplx-'),
    model: 'sonar',
    endpoint: 'https://api.perplexity.ai/chat/completions',
    buildRequest(prompt, apiKey, model) {
      return {
        url: this.endpoint,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'content-type': 'application/json',
        },
        body: {
          model,
          max_tokens: 2048,
          messages: [{ role: 'user', content: prompt }],
        },
      };
    },
    parseResponse(data) {
      const text = data?.choices?.[0]?.message?.content;
      if (!text) throw new Error('Réponse Perplexity inattendue : contenu vide');
      return text;
    },
    parseError(data) {
      return data?.error?.message;
    },
  },
};

export const PROVIDER_IDS = Object.keys(PROVIDERS);

export function getProvider(id) {
  const provider = PROVIDERS[id];
  if (!provider) throw new Error(`Provider inconnu : ${id}`);
  return provider;
}

export function getAllProviders() {
  return Object.values(PROVIDERS);
}
