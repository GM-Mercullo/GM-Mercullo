import React, { useState, useEffect } from 'react';
import { Credential } from '../../types';
import { X, Award } from 'lucide-react';

interface CredentialFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cred: Credential) => void;
  initialCredential?: Credential | null;
}

export const CredentialFormModal: React.FC<CredentialFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialCredential,
}) => {
  const [formData, setFormData] = useState<Partial<Credential>>({
    name: '',
    issuingPlatform: '',
    completionDate: '',
    verificationUrl: '',
    skillsLearned: [],
    description: '',
  });

  const [skillsText, setSkillsText] = useState('');

  useEffect(() => {
    if (initialCredential) {
      setFormData(initialCredential);
      setSkillsText(initialCredential.skillsLearned ? initialCredential.skillsLearned.join(', ') : '');
    } else {
      setFormData({
        name: '',
        issuingPlatform: 'Coursera & Google',
        completionDate: 'July 28, 2026',
        verificationUrl: 'https://coursera.org/verify/...',
        skillsLearned: [],
        description: '',
      });
      setSkillsText('Applied AI, Machine Learning Foundations');
    }
  }, [initialCredential, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.verificationUrl?.trim()) return;

    const skillsArray = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const credToSave: Credential = {
      id: formData.id || '',
      name: formData.name.trim(),
      issuingPlatform: formData.issuingPlatform?.trim() || 'Coursera',
      completionDate: formData.completionDate?.trim() || '2026',
      verificationUrl: formData.verificationUrl.trim(),
      skillsLearned: skillsArray,
      description: formData.description?.trim() || '',
    };

    onSave(credToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#F4E9C8] dark:bg-[#111D2B] text-[#302B22] dark:text-[#F0E8D5] border-2 border-[#B49A62] rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-[#75664B] dark:text-[#B7C1CC]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pb-3 border-b border-[#D8C697] dark:border-[#34475A] mb-4">
          <div className="flex items-center gap-2 text-xs font-heading text-[#702C38] dark:text-[#C5A66A] font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" /> {initialCredential ? 'Edit Qualification' : 'Add Credential'}
          </div>
          <h2 className="text-2xl font-heading font-bold mt-1">
            {initialCredential ? initialCredential.name : 'Chapter 5 Credential Entry'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Certificate / Credential Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Google AI Professional Certificate"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                Issuing Platform *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Coursera & Google"
                value={formData.issuingPlatform}
                onChange={(e) => setFormData({ ...formData, issuingPlatform: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                Completion Date
              </label>
              <input
                type="text"
                placeholder="e.g. July 28, 2026"
                value={formData.completionDate}
                onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Permanent Verification URL *
            </label>
            <input
              type="url"
              required
              placeholder="https://coursera.org/verify/professional-cert/..."
              value={formData.verificationUrl}
              onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38] font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Skills Learned (Comma separated)
            </label>
            <input
              type="text"
              placeholder="Applied AI, Machine Learning Foundations, Prompt Engineering"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Official credential details and curriculum highlights..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
            />
          </div>

          <div className="pt-4 border-t border-[#D8C697] dark:border-[#34475A] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-transparent border border-[#B49A62] text-xs font-heading"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-xs shadow"
            >
              {initialCredential ? 'Update Credential' : 'Save Credential'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
