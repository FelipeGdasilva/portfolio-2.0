"use client";

import { useState, useEffect, useRef } from "react";
import HinaAvatar from "@/components/HinaAvatar";
import ProjectCard from "@/components/ProjectCard";
import TechSkills from '@/components/TechSkills'; 

export default function Home() {
  const [activeProject, setActiveProject] = useState("idle");
  const [pergunta, setPergunta] = useState("");
  const [mensagens, setMensagens] = useState([
    {
      id: 1,
      text: "Olá! Como posso ajudar você com seus projetos hoje?",
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
      // 2. Chamada real para a API do Gemini via backend
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
      } else if (textoBaixo.includes("hina") || textoBaixo.includes("landing")) {
        setActiveProject("hina-landing");
      }

      // 4. Exibe no chat a resposta REAL gerada pelo Gemini
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
      
      {/* Componente da Hina que recebe o status atual */}
      <HinaAvatar currentStatus={activeProject} />

        {/* Grid de Cards dos Projetos */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full max-w-4xl">
  <ProjectCard
    title="Henshin.AI"
    description="Assistente e automação inteligente com fluxos n8n, webhooks e IA generativa com resiliência contra falhas de execução."
    tags={["Node.js", "Express", "n8n", "Gemini API"]}
    isActive={activeProject === "henshin"}
    onActivate={() => setActiveProject("henshin")}
    onDeactivate={() => setActiveProject("idle")}
  />

  <ProjectCard
    title="Sonic Battle Universe"
    description="Aplicação web temática com alta performance visual, refatoração em Clean Code, SEO aprimorado e migração para Next.js."
    tags={["React", "Next.js", "TypeScript", "Tailwind CSS"]}
    isActive={activeProject === "sonic"}
    onActivate={() => setActiveProject("sonic")}
    onDeactivate={() => setActiveProject("idle")}
  />

  <ProjectCard
    title="Hina Arena"
    description="SPA de produtividade para treino de boxe. Controla ciclos de rounds (Foco/Descanso) 100% offline com Hook Customizado (useTimer)."
    tags={["Next.js", "TypeScript", "Tailwind CSS"]}
    isActive={activeProject === "hina-landing"}
    onActivate={() => setActiveProject("hina-landing")}
    onDeactivate={() => setActiveProject("idle")}
  />
</div>

    <TechSkills />

      {/* Seção do Chat Controlado */}
      <div className="w-full max-w-md mx-auto mt-8 px-4"> 
        <div className="flex flex-col gap-4 w-full max-w-md max-auto mb-4 p-4">
          {mensagens.map((msg) => (
            <div key={msg.id} className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-purple-600 self-end' : 'bg-slate-700 self-start'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          ))}
          <div ref={chatEndRef}/>
        </div>
        <form onSubmit={lidarComEnvio} className="flex items-center gap-2 bg-slate-800/80 border border-purple-900/40 rounded-xl p-2 shadow-lg">
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