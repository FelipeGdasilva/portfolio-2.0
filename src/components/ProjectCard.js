"use client";

import Image from "next/image";

export default function ProjectCard({ 
  title, 
  description, 
  tags, 
  imageSrc, 
  isActive, 
  onActivate, 
  onDeactivate 
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
      </div>
    </div>
  );
}