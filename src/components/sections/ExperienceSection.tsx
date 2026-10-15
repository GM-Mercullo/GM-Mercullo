import React from 'react';
import { Experience } from '../../types';
import { Compass, Calendar, CheckCircle2, Plus, Edit2, Trash2, Award } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: Experience[];
  isAdmin: boolean;
  onOpenCreateModal: () => void;
  onEditExperience: (exp: Experience) => void;
  onDeleteExperience: (id: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  isAdmin,
  onOpenCreateModal,
  onEditExperience,
  onDeleteExperience,
}) => {
  return (
    <section id="experience" className="py-24 relative z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-xs font-heading font-semibold text-[#702C38] dark:text-[#C5A66A] uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" /> Chapter 4 — The Path So Far
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#302B22] dark:text-[#F0E8D5]">
              Real Practical Experience
            </h2>
            <p className="text-sm font-sans text-[#75664B] dark:text-[#B7C1CC] mt-2 max-w-lg">
              An honest, accurate chronology of professional on-the-job training and foundational responsibilities.
            </p>
          </div>

          {isAdmin && (
            <div className="mt-4 sm:mt-0">
              <button
                onClick={onOpenCreateModal}
                className="px-4 py-2 rounded-xl bg-[#702C38] hover:bg-[#8A3645] border border-[#B49A62] text-[#F4E9C8] font-heading font-bold text-xs tracking-wider shadow flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-[#B49A62]" />
                <span>Add Career Milestone</span>
              </button>
            </div>
          )}
        </div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-[#D8C697] dark:border-[#34475A] ml-4 sm:ml-6 space-y-8">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-6 sm:pl-8 group">
              
              {/* Timeline Wax Node */}
              <div className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full bg-[#702C38] border-2 border-[#B49A62] flex items-center justify-center text-[#F4E9C8] text-[10px] font-heading font-bold shadow">
                {index + 1}
              </div>

              {/* Experience Card */}
              <div className="bg-[#F4E9C8]/90 dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] hover:border-[#B49A62] rounded-2xl p-6 sm:p-7 shadow-sm transition-all">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-[#302B22] dark:text-[#F0E8D5]">
                      {exp.position}
                    </h3>
                    <div className="text-sm font-sans font-semibold text-[#702C38] dark:text-[#C5A66A] mt-0.5">
                      {exp.organization}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#E8D9AE] dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] text-xs font-sans text-[#75664B] dark:text-[#B7C1CC]">
                      <Calendar className="w-3.5 h-3.5 text-[#702C38] dark:text-[#C5A66A]" />
                      <span>{exp.period}</span>
                    </span>

                    {isAdmin && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onEditExperience(exp)}
                          className="p-1.5 rounded-lg bg-[#E8D9AE] dark:bg-[#080F19] border border-[#B49A62] text-[#702C38] dark:text-[#C5A66A]"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove "${exp.position}"?`)) {
                              onDeleteExperience(exp.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-[#E8D9AE] dark:bg-[#080F19] border border-red-500/50 text-red-500"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div className="mt-4 space-y-2">
                  <div className="text-xs font-heading font-bold uppercase tracking-wider text-[#302B22] dark:text-[#F0E8D5]">
                    Demonstrated Responsibilities:
                  </div>
                  <ul className="space-y-1.5">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="text-xs font-sans text-[#75664B] dark:text-[#B7C1CC] flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#526746] dark:text-[#8CCBFF] shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Framing Note */}
                {exp.notes && (
                  <div className="mt-4 pt-3 border-t border-[#D8C697] dark:border-[#34475A] text-xs font-sans text-[#75664B] dark:text-[#B7C1CC] italic">
                    {exp.notes}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
