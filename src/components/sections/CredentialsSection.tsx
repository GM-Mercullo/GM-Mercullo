import React from 'react';
import { Credential } from '../../types';
import { Award, ExternalLink, Calendar, Plus, Edit2, Trash2, CheckCircle } from 'lucide-react';

interface CredentialsSectionProps {
  credentials: Credential[];
  isAdmin: boolean;
  onOpenCreateModal: () => void;
  onEditCredential: (cred: Credential) => void;
  onDeleteCredential: (id: string) => void;
}

export const CredentialsSection: React.FC<CredentialsSectionProps> = ({
  credentials,
  isAdmin,
  onOpenCreateModal,
  onEditCredential,
  onDeleteCredential,
}) => {
  return (
    <section id="credentials" className="py-24 relative z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-xs font-heading font-semibold text-[#702C38] dark:text-[#C5A66A] uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" /> Chapter 5 — Credentials & Achievements
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#302B22] dark:text-[#F0E8D5]">
              Verified Qualifications
            </h2>
            <p className="text-sm font-sans text-[#75664B] dark:text-[#B7C1CC] mt-2 max-w-lg">
              Official industry certifications and completed learning paths backed by permanent cryptographic verification links.
            </p>
          </div>

          {isAdmin && (
            <div className="mt-4 sm:mt-0">
              <button
                onClick={onOpenCreateModal}
                className="px-4 py-2 rounded-xl bg-[#702C38] hover:bg-[#8A3645] border border-[#B49A62] text-[#F4E9C8] font-heading font-bold text-xs tracking-wider shadow flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-[#B49A62]" />
                <span>Add Credential</span>
              </button>
            </div>
          )}
        </div>

        {/* Credentials Grid */}
        <div className="space-y-5">
          {credentials.map((cred) => (
            <div
              key={cred.id}
              className="bg-[#F4E9C8]/90 dark:bg-[#111D2B] border-2 border-[#D8C697] dark:border-[#34475A] hover:border-[#B49A62] rounded-2xl p-6 sm:p-8 shadow-sm transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#702C38]/10 dark:bg-[#080F19] border border-[#B49A62] flex items-center justify-center text-[#702C38] dark:text-[#C5A66A] shrink-0">
                    <Award className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A]">
                      Issued by {cred.issuingPlatform}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#302B22] dark:text-[#F0E8D5] mt-0.5">
                      {cred.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-xs font-sans text-[#75664B] dark:text-[#B7C1CC] mt-1">
                      <Calendar className="w-3.5 h-3.5 text-[#B49A62]" />
                      <span>Completed: {cred.completionDate}</span>
                    </div>

                    {cred.description && (
                      <p className="text-xs font-sans text-[#75664B] dark:text-[#B7C1CC] mt-3 leading-relaxed max-w-xl">
                        {cred.description}
                      </p>
                    )}

                    {/* Skills Learned */}
                    {cred.skillsLearned && cred.skillsLearned.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {cred.skillsLearned.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-md bg-[#E8D9AE] dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] text-xs font-sans text-[#302B22] dark:text-[#F0E8D5]"
                          >
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Verification CTA & Admin buttons */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#D8C697] dark:border-[#34475A]">
                  <a
                    href={cred.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-xs flex items-center gap-1.5 shadow transition-colors"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEditCredential(cred)}
                        className="p-1.5 rounded-lg bg-[#E8D9AE] dark:bg-[#080F19] border border-[#B49A62] text-[#702C38] dark:text-[#C5A66A]"
                        title="Edit Credential"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove "${cred.name}"?`)) {
                            onDeleteCredential(cred.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-[#E8D9AE] dark:bg-[#080F19] border border-red-500/50 text-red-500"
                        title="Delete Credential"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
