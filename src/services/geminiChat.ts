import { GoogleGenerativeAI } from '@google/generative-ai';

const DEFAULT_MODEL = 'gemini-2.0-flash';

export function getGeminiModelName(): string {
  return (import.meta.env.VITE_GEMINI_MODEL ?? DEFAULT_MODEL).trim() || DEFAULT_MODEL;
}

/** Returns null if API key missing. Caller keeps the session for multi-turn replies. */
export function startGeminiSiteChat(siteFacts: string) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
  if (!apiKey) return null;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: getGeminiModelName(),
    systemInstruction: `You are a concise, warm assistant for visitors of this business website. Answer ONLY using the FACTS below. If something is not in the facts (prices not listed, live availability, off-menu specials), say you do not have that detail and suggest using the phone number or email in FACTS, or visiting the Visit Us / Location section on the site.

Stay helpful and brief (usually 2–5 sentences). Match the user's language when possible.

FACTS:
${siteFacts}`,
  });

  return model.startChat({
    generationConfig: {
      maxOutputTokens: 1024,
      temperature: 0.7,
    },
  });
}
