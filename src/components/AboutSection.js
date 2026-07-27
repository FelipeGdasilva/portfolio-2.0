import React from "react";

export function AboutSection() {
    return (
        <section className="w-full max-w-4xl max-auto my-12 p-6 rounded-b-2xl bg-sky-900/60 border border-slate-800 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                <span>⚡</span>Sobre o Projeto & Desenvolvedor
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <h3 className=" text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    👨‍💻 Felipe | Fullstack Developer
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Desenvolvedor Fullstack com foco em criar soluções modernas e interativas utilizando
                    <strong>React, Next.js, JavaScript e automações inteligentes</strong>.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                    Especializado na construção de aplicações ricas em experiência de usuário (UI/UX) e na integração de sistemas dinâmicos.
                </p>
                </div>

                <div className="p-5 rounded-xl bg-purple-950/30 border border-purple-800/40">
                <h3 className="text-lg font-semibold text-purple-300 mb-2 flex items-center gap-2">
                    🤖 Conheça Hina
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    A <strong>Hina</strong> é a assistente virtual e copiloto deste portfólio. Ela foi projetada para interagir com os visitantes, responder perguntas sobre mim e navegar pelos projetos em tempo real.
                </p>
                <span className="inline-block px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                 Status: pronta para integrar API  Gemini 🚀
                </span>
                </div>
            </div>
        </section>
    )
}