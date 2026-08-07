import React from "react";

const skills = [
  { name: "React", category: "Font-end" },
  { name: "Next.js", category: "Front-end" },
  { name: "JavaScript (ES6+)", category: "Linguagem" },
  { name: "Tailwind CSS3", category: "Styling" },
  { name: "HTML5 & CSS3", category: "Web Standards" },
  { name: "n8n & Automations", category: "Automação/ IA" },
  { name: "Git & GitHub", category: "Versioneamento" },
  { name: "Node.js", category: "Back-end" },
  { name: "Express", category: "Back-end" },
  { name: "Prisma ORM", category: "Database" },
  { name: "Docker", category: "Dev / Infra" },
  { name: "DBeaver", category: "Ferramentas/DB" },
  { name: "PostgreSQL", category: "Database" },
];

export default function TechSkills() {
  return (
    <section className="py-12 px-4 max-w-5xl max-auto">
      <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-purple-500 pl-3">
        Tecnologias & Ferramentas
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-gray-900/80 border border-gary-800 hover:border-purple-500 rounded-xl p-4 transition-all durantion-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] flex flex-col justify-center"
          >
            <span className=" text-xs text-purple-400 font-mono tracking-wider uppercase mb-1">
              {skill.category}
            </span>
            <h3 className="text-base font-semibold text-gray-100">
              {skill.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
