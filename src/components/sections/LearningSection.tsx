import React from 'react';
import { LearningEntry, LearningType } from '../../types';
import {
  Sparkles,
  Milestone,
  Cpu,
  Wrench,
  TrendingUp,
  Target,
  Plus,
  Edit2,
  Trash2,
  Calendar
} from 'lucide-react';

interface LearningSectionProps {
  learningEntries: LearningEntry[];
  isAdmin: boolean;
  onOpenCreateModal: () => void;
  onEditEntry: (entry: LearningEntry) => void;
  onDeleteEntry: (id: string) => void;
}

const TYPE_CONFIG: Record<LearningType, { label: string; icon: React.ReactNode; color: string }> = {
  milestone: {
    label: "Project Milestone",
    icon: <Milestone className="w-4 h-4 text-[#702C38] dark:text-[#C5A66A]" />,
    color: "border-[#702C38] dark:border-[#C5A66A]"
  },
  technology: {
    label: "Technology Explored",
    icon: <Cpu className="w-4 h-4 text-[#526746] dark:text-[#8CCBFF]" />,
    color: "border-[#526746] dark:border-[#8CCBFF]"
  },
  'problem-solved': {
    label: "Problem Solved",
    icon: <Wrench className="w-4 h-4 text-[#B49A62]" />,
    color: "border-[#B49A62]"
  },
  improvement: {
    label: "App Improvement",
    icon: <TrendingUp className="w-4 h-4 text-[#702C38] dark:text-[#8CCBFF]" />,
    color: "border-[#702C38]"
  },
  goal: {
    label: "Future Goal",
    icon: <Target className="w-4 h-4 text-[#526746] dark:text-[#C5A66A]" />,
    color: "border-[#526746]"
  }
};

export const LearningSection: React.FC<LearningSectionProps> = ({
  learningEntries,
  isAdmin,
  onOpenCreateModal,
  onEditEntry,
  onDeleteEntry,
}) => {
  return (
    <section id="learning" className="py-24 relative z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-xs font-heading font-semibold text-[#702C38] dark:text-[#C5A66A] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Chapter 7 — The Patronus Forest
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#302B22] dark:text-[#F0E8D5]">
              Continuing Growth & Problem-Solving
            </h2>
            <p className="text-sm font-sans text-[#75664B] dark:text-[#B7C1CC] mt-2 max-w-xl">
              While completed projects present what I built, this clearing chronicles how I grow: milestones achieved, tricky bugs conquered, and technical goals ahead.
            </p>
          </div>

          {isAdmin && (
            <div className="mt-4 sm:mt-0">
              <button
                onClick={onOpenCreateModal}
                className="px-4 py-2 rounded-xl bg-[#702C38] hover:bg-[#8A3645] border border-[#B49A62] text-[#F4E9C8] font-heading font-bold text-xs tracking-wider shadow flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-[#B49A62]" />
                <span>Add Growth Entry</span>
              </button>
            </div>
          )}
        </div>

        {/* Learning Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {learningEntries.map((entry) => {
            const typeInfo = TYPE_CONFIG[entry.type] || TYPE_CONFIG.milestone;

            return (
              <div
                key={entry.id}
                className="bg-[#F4E9C8]/90 dark:bg-[#111D2B] border-l-4 border border-[#D8C697] dark:border-[#34475A] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                style={{ borderLeftColor: typeInfo.color.includes('border-[#') ? typeInfo.color.split('border-')[1].replace(/\[|\]/g, '') : undefined }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-[#E8D9AE] dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A]">
                        {typeInfo.icon}
                      </span>
                      <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A]">
                        {typeInfo.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-sans text-[#75664B] dark:text-[#B7C1CC] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#B49A62]" /> {entry.date}
                      </span>

                      {isAdmin && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onEditEntry(entry)}
                            className="p-1 hover:bg-black/5 dark:hover:bg-white/10 text-[#702C38] dark:text-[#C5A66A] rounded"
                            title="Edit"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove "${entry.title}"?`)) {
                                onDeleteEntry(entry.id);
                              }
                            }}
                            className="p-1 hover:bg-black/5 dark:hover:bg-white/10 text-red-500 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#302B22] dark:text-[#F0E8D5] mt-1">
                    {entry.title}
                  </h3>

                  <p className="text-xs font-sans text-[#75664B] dark:text-[#B7C1CC] mt-2 leading-relaxed">
                    {entry.description}
                  </p>
                </div>

                {entry.tags && entry.tags.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-[#D8C697] dark:border-[#34475A] flex flex-wrap gap-1.5">
                    {entry.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-[#E8D9AE] dark:bg-[#080F19] text-[10px] font-mono text-[#302B22] dark:text-[#F0E8D5] border border-[#D8C697] dark:border-[#34475A]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
