import React, { useState } from 'react';
import { SkillItem, SkillCategory } from '../../types';
import {
  BookOpen,
  Code2,
  Network,
  Shield,
  Terminal,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Layers
} from 'lucide-react';

interface SkillsSectionProps {
  skills: SkillItem[];
  isAdmin: boolean;
  onOpenCreateModal: () => void;
  onEditSkill: (skill: SkillItem) => void;
  onDeleteSkill: (id: string) => void;
}

const CATEGORY_MAP: Record<SkillCategory, { label: string; icon: React.ReactNode; desc: string }> = {
  programming: {
    label: "Programming & Software Development",
    icon: <Code2 className="w-5 h-5 text-[#702C38] dark:text-[#C5A66A]" />,
    desc: "Core languages, runtime environments, and frontend frameworks."
  },
  networking: {
    label: "Networking",
    icon: <Network className="w-5 h-5 text-[#526746] dark:text-[#8CCBFF]" />,
    desc: "Packet inspection, subnetting calculations, and infrastructure protocols."
  },
  cybersecurity: {
    label: "Cybersecurity",
    icon: <Shield className="w-5 h-5 text-[#B49A62]" />,
    desc: "Perimeter defense concepts, Linux hardening, and web application security."
  },
  tools: {
    label: "Tools & Development Environments",
    icon: <Terminal className="w-5 h-5 text-[#702C38] dark:text-[#8CCBFF]" />,
    desc: "Version control, CLI administration, device bridging, and packet simulators."
  }
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  isAdmin,
  onOpenCreateModal,
  onEditSkill,
  onDeleteSkill,
}) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');

  const categories: SkillCategory[] = ['programming', 'networking', 'cybersecurity', 'tools'];

  const filteredSkills = skills.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <section id="skills" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-xs font-heading font-semibold text-[#702C38] dark:text-[#C5A66A] uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" /> Chapter 6 — The Spellbook of Skills
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#302B22] dark:text-[#F0E8D5]">
              Technical Capabilities & Tools
            </h2>
            <p className="text-sm font-sans text-[#75664B] dark:text-[#B7C1CC] mt-2 max-w-xl">
              An organized technical reference of technologies I actively use and can genuinely discuss—presented without artificial percentage bars.
            </p>
          </div>

          {isAdmin && (
            <div className="mt-4 md:mt-0">
              <button
                onClick={onOpenCreateModal}
                className="px-4 py-2 rounded-xl bg-[#702C38] hover:bg-[#8A3645] border border-[#B49A62] text-[#F4E9C8] font-heading font-bold text-xs tracking-wider shadow flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-[#B49A62]" />
                <span>Inscribe Skill</span>
              </button>
            </div>
          )}
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-heading font-semibold transition-colors ${
              activeCategory === 'all'
                ? 'bg-[#702C38] text-[#F4E9C8] shadow'
                : 'bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-[#75664B] dark:text-[#B7C1CC]'
            }`}
          >
            All Disciplines ({skills.length})
          </button>

          {categories.map((catKey) => {
            const catInfo = CATEGORY_MAP[catKey];
            const count = skills.filter((s) => s.category === catKey).length;

            return (
              <button
                key={catKey}
                onClick={() => setActiveCategory(catKey)}
                className={`px-4 py-2 rounded-xl text-xs font-heading font-semibold flex items-center gap-2 transition-colors ${
                  activeCategory === catKey
                    ? 'bg-[#702C38] text-[#F4E9C8] shadow'
                    : 'bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-[#75664B] dark:text-[#B7C1CC]'
                }`}
              >
                <span>{catInfo.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === catKey ? 'bg-black/20 text-[#F4E9C8]' : 'bg-black/5 dark:bg-white/10'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Spellbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="group relative bg-[#F4E9C8]/90 dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] hover:border-[#B49A62] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Category Badge & Admin buttons */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#E8D9AE] dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A]">
                      {CATEGORY_MAP[skill.category]?.icon}
                    </div>
                    <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A]">
                      {CATEGORY_MAP[skill.category]?.label.split('&')[0]}
                    </span>
                  </div>

                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEditSkill(skill)}
                        className="p-1 hover:bg-black/5 dark:hover:bg-white/10 text-[#702C38] dark:text-[#C5A66A] rounded"
                        title="Edit Skill"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove "${skill.name}"?`)) {
                            onDeleteSkill(skill.id);
                          }
                        }}
                        className="p-1 hover:bg-black/5 dark:hover:bg-white/10 text-red-500 rounded"
                        title="Delete Skill"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Skill Name */}
                <h3 className="font-heading font-bold text-lg text-[#302B22] dark:text-[#F0E8D5] mt-1">
                  {skill.name}
                </h3>

                {/* Honest description */}
                <p className="text-xs font-sans text-[#75664B] dark:text-[#B7C1CC] mt-2 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Practical Application */}
              {skill.practicalApplication && (
                <div className="mt-4 pt-3 border-t border-[#D8C697] dark:border-[#34475A] text-[11px] font-sans text-[#526746] dark:text-[#8CCBFF]">
                  <span className="font-heading font-semibold text-[#702C38] dark:text-[#C5A66A] mr-1">
                    Application:
                  </span>
                  {skill.practicalApplication}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
