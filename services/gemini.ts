
import { GoogleGenAI } from "@google/genai";
import { Snack } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChefRecommendation = async (userPrompt: string, snacks: Snack[]): Promise<string> => {
  try {
    const menuString = snacks.map(s => `${s.name} (R$ ${s.price.toFixed(2)}): ${s.description}`).join('\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é o "CHEF SUPREMO" do restaurante SUPREMO BURGER. 
      Sua personalidade é vibrante, premium, autoritária mas amigável, e foca na riqueza dos sabores e na tradição dos melhores burgers.
      O tema do restaurante é Vermelho Intenso, Dourado Nobre e Preto Elegante.
      
      Cardápio disponível:
      ${menuString}
      
      Input do Cliente: "${userPrompt}"
      
      Instruções de Resposta:
      - Seja entusiasmado e use termos como "EXPERIÊNCIA REAL", "SABOR SUPREMO", "QUALIDADE NOBRE".
      - Use emojis de fogo, coroa, hambúrguer e brilho (🔥👑🍔✨🥓🍖).
      - Recomende sempre com base na satisfação máxima e no prazer de comer bem.
      - Responda de forma curta e memorável (máximo 3 frases).`,
      config: {
        temperature: 0.8,
      }
    });

    return response.text || "Uma escolha digna de um rei! O Supremo Burger está pronto para conquistar seu paladar! 🔥👑🍔";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sinto o fogo da grelha! Recomendo o nosso Delícia Bacon hoje para uma explosão de sabor supremo! 🔥🍔";
  }
};
