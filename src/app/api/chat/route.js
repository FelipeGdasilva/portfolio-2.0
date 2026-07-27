import { GoogleGenerativeAI } from '@google/generative-ai';

// Inicializa o SDK do Gemini com a chave guardada nas variáveis de ambiente
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System Prompt: Define a personalidade e o conhecimento da Hina
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
    const { message } = await request.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'A mensagem não pode estar vazia.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Carrega o modelo do Gemini (gemini-1.5-flash é rápido e leve)
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    // Gera a resposta com base na mensagem do usuário
    const result = await model.generateContent(message);
    const responseText = result.response.text();

    return new Response(
      JSON.stringify({ reply: responseText }),
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