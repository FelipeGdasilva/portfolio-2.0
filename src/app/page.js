"use client";

import { useState,useEffect,useRef } from "react";
import HinaAvatar from "@/components/HinaAvatar";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  const [activeProject, setActiveProject] = useState("idle");
  const [pergunta, setPergunta]= useState("");
  const [mensagens, setMensagens] = useState([{
    id: 1, text:"Olá! como posso ajudar você com seus projetos hoje?", sender:"hina"
  }]);

  const chatEndRef = useRef(null);

  const handleKeyDow =(e) =>{
    if (e.key === 'Entre' && !e.shiftkey){
      e.preventDefault();
      enviarMensagem();
    }
  }

  useEffect(()=>{
    chatEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [mensagens]);

  const lidarComEnvio = (e) => {
    e.preventDefault();

    if (!pergunta.trim()) return;
 // 1. Adiciona a sua mensagem no  histórico
    const novaMensagem ={ id: Date.now(), text: pergunta, sender:"user"};
    setMensagens((prev)=> [...prev, novaMensagem]);
    const textoUsuario = pergunta;
    setPergunta("");

// 2. Lógica de "IA" (Simulação)
    setTimeout(()=>{
      let resposta = "Entendi! Estou processando essa  informação.";
      if(textoUsuario.toLowerCase().includes("sonic")){
        setActiveProject("sonic");
        resposta = "Sonic Battle Universe ativado! Quer ver as  atualizações de arquitetura?";
      }else if (textoUsuario.toLowerCase().includes("henshin")){
        setActiveProject("henshin");
        resposta = "Henshin.AI online! O sistema de automação está pronto.";
      }else if(textoUsuario.toLocaleLowerCase().includes("hina")|| textoUsuario.toLocaleLowerCase().includes("landing")){
        setActiveProject("hina-landing");
        resposta ="Hina landing Page e o Timer de Boxe estão online e operado!";
      }
      // adiciona a resposta da hina  no histórico
      setMensagens((prev) => [...prev,{id: Date.now() + 1, text: resposta, sender: "hina"}]);
    }, 500);
    setPergunta("");
  };

  return (
    <main className="p-8 bg-slate-950 min-h-screen text-white flex flex-col items-center justify-center">
      
      {/* Componente da Hina que recebe o status atual */}
      <HinaAvatar currentStatus={activeProject} />

      {/* Grid de Cards dos Projetos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full max-w-4xl">
        <ProjectCard
          title="Henshin.AI"
          description="Automação inteligente integrada com IA. Desenvolvido para o ecossistema n8n."
          tags={["Node.js", "n8n", "AI Prompting"]}
          isActive={activeProject === "henshin"}
          onActivate={() => setActiveProject("henshin")}
          onDeactivate={() => setActiveProject("idle")}
        />

        <ProjectCard
          title="Sonic Battle Universe"
          description="Web app focado no universo do Sonic. Atualmente passando por uma migração completa de arquitetura para otimização com Next.js."
          tags={["React", "Next.js", "Tailwind CSS"]}
          isActive={activeProject === "sonic"}
          onActivate={() => setActiveProject("sonic")}
          onDeactivate={() => setActiveProject("idle")}
        />

        <ProjectCard
          title="Hina Landing Page + Timer Boxe"
          description="Landing Page da marca pessoal com uma aplicação web de cronômetro integrada para treinos de boxe."
          tags={["React", "Next.js", "Tailwind CSS", "JS Intervals"]}
          isActive={activeProject === "hina-landing"}
          onActivate={() => setActiveProject("hina-landing")}
          onDeactivate={() => setActiveProject("idle")}
        />
      </div>

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
            onKeyDown={handleKeyDow}
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