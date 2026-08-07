"use client";

import { useState, useEffect, useRef } from "react";
import HinaAvatar from "@/components/HinaAvatar";
import ProjectCard from "@/components/ProjectCard";
import TechSkills from "@/components/TechSkills";
import { AboutSection } from "@/components/AboutSection";
import Image from "next/image";

export default function Home() {
  const [activeProject, setActiveProject] = useState("idle");
  const [pergunta, setPergunta] = useState("");
  const [mensagens, setMensagens] = useState([
    {
      id: 1,
      text: "Olá! Sou a Hina, assistente virtual do Felipe. Posso te apresentar os projetos dele, falar sobre as tecnologias que ele domina ou fornecer os links de contato. Como posso te ajudar a conhecer o trabalho do Felipe hoje?",
      sender: "hina",
    },
  ]);

  const chatEndRef = useRef(null);

  // Permite enviar com 'Enter' mantendo 'Shift + Enter' para quebras de linha
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      lidarComEnvio(e);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const lidarComEnvio = async (e) => {
    e.preventDefault();

    if (!pergunta.trim()) return;

    // 1. Adiciona a mensagem do usuário no histórico e limpa o input
    const novaMensagem = { id: Date.now(), text: pergunta, sender: "user" };
    setMensagens((prev) => [...prev, novaMensagem]);

    const textoUsuario = pergunta;
    setPergunta("");

    try {
      // 2. Chamada real para a API da Hina via backend
      const respostaAPI = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mensagem: textoUsuario }),
      });

      const data = await respostaAPI.json();

      if (!respostaAPI.ok) {
        throw new Error(data.error || "Erro na API da Hina");
      }

      // 3. Troca do Card de Projeto na tela com base no assunto falado
      const textoBaixo = textoUsuario.toLowerCase();
      if (textoBaixo.includes("sonic")) {
        setActiveProject("sonic");
      } else if (textoBaixo.includes("henshin")) {
        setActiveProject("henshin");
      } else if (
        textoBaixo.includes("hina") ||
        textoBaixo.includes("landing")
      ) {
        setActiveProject("hina-landing");
      }

      // 4. Exibe no chat a resposta REAL gerada pela Hina
      setMensagens((prev) => [
        ...prev,
        { id: Date.now() + 1, text: data.resposta, sender: "hina" },
      ]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setMensagens((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Ops! Tive um problema de conexão com meus sistemas. Tente novamente em instantes! 😅",
          sender: "hina",
        },
      ]);
    }
  };

  return (
    <main className="p-8 bg-slate-950 min-h-screen text-white flex flex-col items-center justify-center">
      {/* Seção de Redes / Contato Direto */}
      <div className="flex items-center gap-4 mt-6">
        <a
          href="https://www.linkedin.com/in/felipe-gomes-silva-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 hover:bg-blue-600/30 hover:text-white transition-all text-sm font-semibold"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          LinkedIn
        </a>

        <a
          href="https://github.com/FelipeGdasilva"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all text-sm font-semibold"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>

      <div className="fixed bottom-0 left-0 pointer-events-none z-0  hidden md:block opacity-25 hover:opacity-40 transition-opacity duration-500">
        <Image
          src="/images/Hina-Avatar.png"
          alt="Hina Avatar Background"
          width={350}
          height={350}
          className="object-contain -ml-6 -mb-4"
          priority
        />
      </div>

      <AboutSection />

      {/* Componente da Hina que recebe o status atual */}
      <HinaAvatar currentStatus={activeProject} />

      {/* Grid de Cards dos Projetos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full max-w-4xl">
        <ProjectCard
          title="Henshin.AI"
          description="Assistente e automação inteligente com fluxos n8n, webhooks e IA generativa com resiliência contra falhas de execução."
          tags={["Node.js", "Express", "n8n", "Gemini API"]}
          githubUrl="https://github.com/FelipeGdasilva/Henshin.AI"
          isActive={activeProject === "henshin"}
          imageSrc="/images/henshin.ai.png"
          onActivate={() => setActiveProject("henshin")}
          onDeactivate={() => setActiveProject("idle")}
        />

        <ProjectCard
          title="Sonic Battle Universe"
          description="Aplicação web temática com alta performance visual, refatoração em Clean Code, SEO aprimorado e migração para Next.js."
          tags={["React", "Next.js", "TypeScript", "Tailwind CSS"]}
          githubUrl="https://github.com/FelipeGdasilva/Sonic-Battle-Universe"
          isActive={activeProject === "sonic"}
          onActivate={() => setActiveProject("sonic")}
          imageSrc="/images/sonic-battle-universe.png"
          onDeactivate={() => setActiveProject("idle")}
        />

        <ProjectCard
          title="Hina Arena"
          description="SPA de produtividade para treino de boxe. Controla ciclos de rounds (Foco/Descanso) 100% offline com Hook Customizado (useTimer)."
          tags={["Next.js", "TypeScript", "Tailwind CSS"]}
          githubUrl="https://github.com/FelipeGdasilva/hina-landing-page"
          demoUrl="https://hina-landing-page.vercel.app/"
          isActive={activeProject === "hina-landing"}
          imageSrc="/images/hina-arena.png"
          onActivate={() => setActiveProject("hina-landing")}
          onDeactivate={() => setActiveProject("idle")}
        />
      </div>

      <TechSkills />

      {/* Seção do Chat Controlado */}
      <div className="w-full max-w-md mx-auto mt-8 px-4">
        <div className="flex flex-col gap-4 w-full max-w-md max-auto mb-4 p-4">
          {mensagens.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg ${msg.sender === "user" ? "bg-purple-600 self-end" : "bg-slate-700 self-start"}`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form
          onSubmit={lidarComEnvio}
          className="flex items-center gap-2 bg-slate-800/80 border border-purple-900/40 rounded-xl p-2 shadow-lg"
        >
          <input
            type="text"
            placeholder="Pergunte algo para Hina..."
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white placeholder-purple-300/50 focus:outline-none px-2"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Enviar
          </button>
        </form>
      </div>
    </main>
  );
}
