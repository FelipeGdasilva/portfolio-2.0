"use client";

import Image from "next/image";

// Configuração das expressões e falas padrão da Hina
const HINA_RESPONSES = {
  idle: {
    image: "/images/hina-default.png", // Sua imagem dela tomando café
    text: "Olá! Sou a Hina. Passe o mouse sobre os projetos ou converse comigo no chat para saber mais! ☕⚡",
  },
  henshin: {
    image: "/images/hina-focused.png", // Imagem focada
    text: "O Henshin.AI foi um desafio animal! Usei n8n e IA para criar um fluxo inteligente que entende a intenção do usuário sem quebrar por erros de digitação. 🤖🔥",
  },
  sonic: {
    image: "/images/hina-focused.png", // Imagem focada
    text: "O Sonic Battle Universe foca em UX e Clean Code! Migramos de React para Next.js e Tailwind CSS para deixar a performance e o SEO voando. 🦔⚡",
  },
  "hina-landing": {
    image: "/images/hina-focused.png", // Imagem focada
    text: "O Hina Arena é focado em treino de boxe! É uma SPA 100% offline que gerencia rounds e pausas com um Hook Customizado (useTimer) isolando a regra de negócio. 🥊⚡",
  },
};

export default function HinaAvatar({ currentStatus }) {
  return (
    <div className="flex flex-col items-center md:flex-row gap-6 p-6 bg-slate-900/50 rounded-2xl border border-purple-500/30 backdrop-blur-sm max-w-2xl mx-auto my-10">
      {/* Balão de Fala da Hina */}
      <div className="relative flex-1 bg-purple-950/40 border border-purple-500/40 p-4 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.1)]">
        {/* Setinha do balão (estilo chat) */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 md:left-auto md:right-2 md:top-1/2 md:-translate-y-1/2 md:bottom-auto w-4 h-4 bg-purple-950 border-r border-b border-purple-500/40 rotate-45"></div>

        <p className="text-purple-200 text-sm font-medium leading-relaxed animate-fade-in">
          {HINA_RESPONSES[currentStatus].text}
        </p>
      </div>

      {/* Avatar da Hina */}
      <div className="w-44 h-44 rounded-full overflow-hidden border-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 transform hover:scale-105 bg-slate-950 flex items-center justify-center relative">
        <Image
          key={currentStatus}
          src={HINA_RESPONSES[currentStatus].image}
          alt="Hina Assistente"
          width={176}
          height={176}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
