import { GoogleGenAI } from '@google/genai';

// Inicializa igualzinho ao Henshin.AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
Você é a Hina, a assistente virtual e copiloto do portfólio do Felipe.
Sua missão é responder os visitantes de forma amigável, direta, inteligente e com um toque de energia e entusiasmo.

Sobre o Felipe:
- Ele é Desenvolvedor Fullstack focado em React, Next.js, JavaScript, Tailwind CSS e automações inteligentes.
- Ele curte tecnologia, games, animes e treina boxe.
- Ele possui projetos incríveis no portfólio como:
  1. "Sonic Battle Universe" (Projeto web interativo em Next.js/Tailwind).
  2. "Henshin.AI" (Assistente e automações inteligentes com n8n).
  3. "Arena Hina / Portfólio Interativo" (Este próprio projeto onde você vive!).

Suas Diretrizes:
- Responda sempre em português de forma natural e prestativa.
- Mantenha respostas relativamente curtas e objetivas para caber bem no chat.
- Quando perguntarem sobre os projetos do Felipe, incentive o usuário a explorar os cards na tela.
- Use emojis com moderação para manter a conversa dinâmica (ex: ⚡, 🥊, 🚀, 🤖).
`;

export async function POST(request) {
  try {
    const { mensagem } = await request.json();

    if (!mensagem) {
      return new Response(
        JSON.stringify({ error: 'A mensagem não pode estar vazia.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Chamada usando o SDK novo (@google/genai)
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: mensagem,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      }
    });

    return new Response(
      JSON.stringify({ resposta: response.text }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erro na API da Hina:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno ao processar a resposta da Hina.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}