"use client";

import Image from "next/image";

export default function ProjectCard({
  title,
  description,
  tags,
  imageSrc,
  githubUrl,
  demoUrl,
  isActive,
  onActivate,
  onDeactivate,
}) {
  return (
    <div
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      className={`rounded-xl transition-all duration-300 group overflow-hidden cursor-pointer ${
        isActive
          ? "bg-slate-900/90 border-2 border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.3)]"
          : "bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
      }`}
    >
      {/* Container da Capa do Projeto */}
      {imageSrc && (
        <div className="relative w-full h-48 overflow-hidden bg-slate-950">
          <Image
            src={imageSrc}
            alt={`Capa do projeto ${title}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
      )}

      {/* Conteúdo Interno */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
          {title}
        </h3>

        <p className="text-slate-300 text-sm mt-2 leading-relaxed">
          {description}
        </p>

        {/* Tags */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-purple-950/60 text-purple-300 px-2.5 py-1 rounded-md border border-purple-900/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {(githubUrl || demoUrl) && (
          <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-800/60">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}

            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors flex items-center gap-1"
              >
                <span>Ver Projeto</span>
                <span>↗</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
