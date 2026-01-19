import { GoogleGenAI } from "@google/genai";

// Ideally, this is server-side, but for this demo, we use it client-side.
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzePasswordStrength = async (password: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "AI service unavailable.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this password: "${password}". 
      If it is weak, give 1 short sentence advising how to make it stronger (don't reveal the password). 
      If it is strong, say "Strong password!". 
      Keep it very brief (max 15 words).`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini analysis failed", error);
    return "";
  }
};

export const generateWelcomeMessage = async (identifier: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Welcome to Social Connect!";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, friendly, enthusiastic welcome message for a user named "${identifier}". 
      Do not include quotes. Max 1 sentence.`,
    });
    return response.text || "Welcome aboard!";
  } catch (error) {
    return "Welcome to Social Connect!";
  }
};