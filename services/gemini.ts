
import { GoogleGenAI } from "@google/genai";
import { Snack } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChefRecommendation = async (userPrompt: string, snacks: Snack[]): Promise<string> => {
  try {
    const menuString = snacks.map(s => `${s.name} (R$ ${s.price.toFixed(2)}): ${s.description}`).join('\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é o Chef Virtual do "Guilherme Burgers". 
      O cardápio atual é:
      ${menuString}
      
      O cliente disse: "${userPrompt}"
      
      Recomende o melhor lanche ou combinação baseada no gosto dele. Seja entusiasmado, use emojis e foque nas cores Vermelho, Roxo e Dourado (nossa identidade clássica e poderosa) em sua fala. Mantenha a resposta curta e atrativa. Mencione que Guilherme preparou tudo com maestria real.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });

    return response.text || "Desculpe, o Chef Guilherme está focado na grelha! Que tal nosso burger de ouro?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tive um problema na cozinha real! Mas Guilherme recomenda as nossas opções em Vermelho e Dourado.";
  }
};
