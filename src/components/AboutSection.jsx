import React from "react";

export function AboutSection() {
    return (
        <section className="w-full max-w-4xl mx-auto my-12 p-6 rounded-2xl bg-sky-900/60 border border-slate-800 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                <span>⚡</span>Sobre o Projeto & Desenvolvedor
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                            👨‍💻 Felipe | Fullstack Developer
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                            Desenvolvedor Fullstack com foco em criar soluções modernas e interativas utilizando{" "}
                            <strong>React, Next.js, JavaScript e automações inteligentes</strong>.
                        </p>
                        <p className="text-slate-300 text-sm leading-relaxed mb-6">
                            Especializado na construção de aplicações ricas em experiência de usuário (UI/UX) e na integração de sistemas dinâmicos.
                        </p>
                    </div>

                    {/* 📄 Botão de Download do Currículo */}
                    <div>
                        <a
                            href="/curriculo.pdf"
                            download="Curriculo_Felipe_Gomes.pdf"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600/10 text-purple-400 border border-purple-500/50 rounded-xl font-semibold text-sm hover:bg-purple-600 hover:text-white hover:border-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            {/* Ícone SVG do PDF */}
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="w-4 h-4" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                strokeWidth={2}
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                                />
                            </svg>
                            <span>Baixar Currículo (PDF)</span>
                        </a>
                    </div>
                </div>

                <div className="p-5 rounded-xl bg-purple-950/30 border border-purple-800/40 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-purple-300 mb-2 flex items-center gap-2">
                            🤖 Conheça Hina
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                            A <strong>Hina</strong> é a assistente virtual e copiloto deste portfólio. Ela foi projetada para interagir com os visitantes, responder perguntas sobre mim e navegar pelos projetos em tempo real.
                        </p>
                    </div>
                    <div>
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            Status: pronta para integrar API Gemini 🚀
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}