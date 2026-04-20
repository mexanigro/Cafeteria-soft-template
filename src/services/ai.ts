import { GoogleGenAI } from '@google/genai';

const MODEL = 'gemini-3-flash-preview';

function getGeminiApiKey(): string | undefined {
  const key = process.env.GEMINI_API_KEY;
  return typeof key === 'string' && key.trim().length > 0 ? key.trim() : undefined;
}

export function hasGeminiApiKey(): boolean {
  return getGeminiApiKey() !== undefined;
}

export async function fetchDrinkRecommendation(
  userInput: string,
  buildPrompt: (input: string) => string,
  fallbacks: { onError: string; onEmpty: string },
): Promise<string> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    return fallbacks.onError;
  }
  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = buildPrompt(userInput);
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });
    const text = response.text?.trim();
    return text && text.length > 0 ? text : fallbacks.onEmpty;
  } catch {
    return fallbacks.onError;
  }
}

export type GeminiChatHandle = {
  sendMessage: (message: string) => Promise<string>;
};

export function createGeminiChat(systemInstruction: string): GeminiChatHandle | null {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    return null;
  }
  const ai = new GoogleGenAI({ apiKey });
  const chat = ai.chats.create({
    model: MODEL,
    config: {
      systemInstruction,
    },
  });
  return {
    sendMessage: async (message: string) => {
      const response = await chat.sendMessage({ message });
      const text = response.text?.trim();
      return text && text.length > 0 ? text : '';
    },
  };
}
