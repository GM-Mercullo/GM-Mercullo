import React, { useState, useEffect } from 'react';
import { LearningEntry, LearningType } from '../../types';
import { X, Sparkles } from 'lucide-react';

interface LearningFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: LearningEntry) => void;
  initialEntry?: LearningEntry | null;
}

export const LearningFormModal: React.FC<LearningFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialEntry,
}) => {
  const [formData, setFormData] = useState<Partial<LearningEntry>>({
    type: 'milestone',
    title: '',
    description: '',
    date: '',
    tags: [],
  });

  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (initialEntry) {
      setFormData(initialEntry);
      setTagsInput(initialEntry.tags ? initialEntry.tags.join(', ') : '');
    } else {
      setFormData({
        type: 'milestone',
        title: '',
        description: '',
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        tags: [],
      });
      setTagsInput('Learning, Problem Solving');
    }
  }, [initialEntry, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.description?.trim()) return;

    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const entryToSave: LearningEntry = {
      id: formData.id || '',
      type: (formData.type as LearningType) || 'milestone',
      title: formData.title.trim(),
      description: formData.description.trim(),
      date: formData.date?.trim() || 'Current',
      tags: tagsArray,
    };

    onSave(entryToSave);
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
            <Sparkles className="w-4 h-4" /> {initialEntry ? 'Edit Growth Record' : 'Record Growth Entry'}
          </div>
          <h2 className="text-2xl font-heading font-bold mt-1">
            {initialEntry ? initialEntry.title : 'Chapter 7 Patronus Forest Entry'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                Entry Nature / Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as LearningType })}
                className="w-full px-3 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
              >
                <option value="milestone">Project Milestone</option>
                <option value="technology">New Technology Explored</option>
                <option value="problem-solved">Important Problem Solved</option>
                <option value="improvement">Application Improvement</option>
                <option value="goal">Future Technical Goal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                Date / Timeframe
              </label>
              <input
                type="text"
                placeholder="e.g. October 2026 or Current Focus"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Headline Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Eliminating Lyric Desync in GMs-Kareoke"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38] font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Description & Outcome *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Explain the challenge faced, how you reasoned through it, and what you learned..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38] leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              placeholder="Audio, Performance, Latency, Debugging"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
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
              {initialEntry ? 'Update Record' : 'Record in Patronus Forest'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
