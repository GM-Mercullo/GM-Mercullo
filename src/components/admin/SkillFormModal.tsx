import React, { useState, useEffect } from 'react';
import { SkillItem, SkillCategory } from '../../types';
import { X, Sparkles } from 'lucide-react';

interface SkillFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (skill: SkillItem) => void;
  initialSkill?: SkillItem | null;
}

export const SkillFormModal: React.FC<SkillFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSkill,
}) => {
  const [formData, setFormData] = useState<Partial<SkillItem>>({
    name: '',
    category: 'programming',
    description: '',
    practicalApplication: '',
  });

  useEffect(() => {
    if (initialSkill) {
      setFormData(initialSkill);
    } else {
      setFormData({
        name: '',
        category: 'programming',
        description: '',
        practicalApplication: '',
      });
    }
  }, [initialSkill, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.description?.trim()) return;

    const skillToSave: SkillItem = {
      id: formData.id || '',
      name: formData.name.trim(),
      category: (formData.category as SkillCategory) || 'programming',
      description: formData.description.trim(),
      practicalApplication: formData.practicalApplication?.trim() || '',
    };

    onSave(skillToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#F4E9C8] dark:bg-[#111D2B] text-[#302B22] dark:text-[#F0E8D5] border-2 border-[#B49A62] rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-[#75664B] dark:text-[#B7C1CC]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pb-3 border-b border-[#D8C697] dark:border-[#34475A] mb-4">
          <div className="flex items-center gap-2 text-xs font-heading text-[#702C38] dark:text-[#C5A66A] font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> {initialSkill ? 'Edit Skill Entry' : 'Inscribe Skill'}
          </div>
          <h2 className="text-2xl font-heading font-bold mt-1">
            {initialSkill ? initialSkill.name : 'Spellbook of Skills Entry'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Technology / Competency Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Wireshark & Packet Analysis"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as SkillCategory })}
              className="w-full px-3 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
            >
              <option value="programming">Programming & Software Development</option>
              <option value="networking">Networking Protocols & Analysis</option>
              <option value="cybersecurity">Cybersecurity & Defense</option>
              <option value="tools">Tools & Development Environments</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Accurate Technical Description *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Grounded description of what you can do (no fake 99% ratings)..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38] leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Practical Application (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Applied in NetworkLabApp for packet header inspection."
              value={formData.practicalApplication}
              onChange={(e) => setFormData({ ...formData, practicalApplication: e.target.value })}
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
              {initialSkill ? 'Update Skill' : 'Inscribe Skill'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
