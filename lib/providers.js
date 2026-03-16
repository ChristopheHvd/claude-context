/**
 * AI Provider configurations.
 * Each provider defines how to build the request and parse the response.
 */

const PROVIDERS = {
  anthropic: {
    id: 'anthropic',
    name: 'Claude (Anthropic)',
    placeholder: 'sk-ant-...',
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
      return data.content[0].text;
    },
    parseError(data) {
      return data?.error?.message;
    },
  },

  openai: {
    id: 'openai',
    name: 'ChatGPT (OpenAI)',
    placeholder: 'sk-...',
    validate: (key) => key.startsWith('sk-'),
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
      return data.choices[0].message.content;
    },
    parseError(data) {
      return data?.error?.message;
    },
  },

  gemini: {
    id: 'gemini',
    name: 'Gemini (Google)',
    placeholder: 'AIza...',
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
      return data.candidates[0].content.parts[0].text;
    },
    parseError(data) {
      return data?.error?.message;
    },
  },

  perplexity: {
    id: 'perplexity',
    name: 'Perplexity',
    placeholder: 'pplx-...',
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
      return data.choices[0].message.content;
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
