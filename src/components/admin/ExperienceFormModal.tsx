import React, { useState, useEffect } from 'react';
import { Experience } from '../../types';
import { X, Compass } from 'lucide-react';

interface ExperienceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exp: Experience) => void;
  initialExperience?: Experience | null;
}

export const ExperienceFormModal: React.FC<ExperienceFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialExperience,
}) => {
  const [formData, setFormData] = useState<Partial<Experience>>({
    position: '',
    organization: '',
    period: '',
    responsibilities: [],
    notes: '',
  });

  const [respText, setRespText] = useState('');

  useEffect(() => {
    if (initialExperience) {
      setFormData(initialExperience);
      setRespText(initialExperience.responsibilities ? initialExperience.responsibilities.join('\n') : '');
    } else {
      setFormData({
        position: '',
        organization: '',
        period: '',
        responsibilities: [],
        notes: '',
      });
      setRespText('Assisted with technical and product marketing\nPrepared digital layouts and supported activities');
    }
  }, [initialExperience, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.position?.trim() || !formData.organization?.trim()) return;

    const respList = respText
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const expToSave: Experience = {
      id: formData.id || '',
      position: formData.position.trim(),
      organization: formData.organization.trim(),
      period: formData.period?.trim() || 'Period',
      responsibilities: respList,
      notes: formData.notes?.trim() || '',
    };

    onSave(expToSave);
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
            <Compass className="w-4 h-4" /> {initialExperience ? 'Edit Career Milestone' : 'Add Experience Entry'}
          </div>
          <h2 className="text-2xl font-heading font-bold mt-1">
            {initialExperience ? initialExperience.position : 'Chapter 4 Experience Entry'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                Position / Role *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Marketing Intern — Technology Marketing"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                Organization / Context *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Grade 12 On-The-Job Training"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Time Period
            </label>
            <input
              type="text"
              placeholder="e.g. March 4–15, 2024"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Responsibilities (One per line)
            </label>
            <textarea
              rows={4}
              placeholder="Assisted with marketing electronics and technology products&#10;Prepared certificate layouts for fellow interns&#10;Supported promotional activities"
              value={respText}
              onChange={(e) => setRespText(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38] font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Accurate Framing & Reflection Notes
            </label>
            <textarea
              rows={2}
              placeholder="Honest description framing the experience without overstating it..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
              {initialExperience ? 'Update Milestone' : 'Save Experience'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
