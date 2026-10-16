import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import { X, Sparkles } from 'lucide-react';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  initialProject?: Project | null;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProject,
}) => {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    subtitle: '',
    description: '',
    mainFeatures: [],
    technologies: [],
    githubUrl: '',
    demoUrl: '',
    imageUrl: '',
    mediaType: 'image',
    mediaAutoplay: false,
    mediaLoop: false,
    mediaPosterUrl: '',
    isFeatured: false,
    category: 'software',
    verifiedCapabilities: '',
  });

  const [featuresText, setFeaturesText] = useState('');
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (initialProject) {
      setFormData(initialProject);
      setFeaturesText(initialProject.mainFeatures ? initialProject.mainFeatures.join('\n') : '');
      setTechInput(initialProject.technologies ? initialProject.technologies.join(', ') : '');
    } else {
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        mainFeatures: [],
        technologies: ['Python', 'Networking'],
        githubUrl: 'https://github.com/GM-Mercullo/',
        demoUrl: '',
        imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=900',
        mediaType: 'image',
        mediaAutoplay: false,
        mediaLoop: false,
        mediaPosterUrl: '',
        isFeatured: false,
        category: 'software',
        verifiedCapabilities: '',
      });
      setFeaturesText('Interactive calculation algorithms\nModular architecture with verified capabilities');
      setTechInput('Python, Networking');
    }
  }, [initialProject, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.description?.trim()) return;

    const featuresList = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const techList = techInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const projectToSave: Project = {
      id: formData.id || '',
      title: formData.title.trim(),
      subtitle: formData.subtitle?.trim() || 'Software Project',
      description: formData.description.trim(),
      mainFeatures: featuresList,
      technologies: techList,
      githubUrl: formData.githubUrl?.trim() || 'https://github.com/GM-Mercullo',
      demoUrl: formData.demoUrl?.trim() || '',
      imageUrl: formData.imageUrl?.trim() || 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=900',
      mediaType: formData.mediaType || 'image',
      mediaAutoplay: Boolean(formData.mediaAutoplay),
      mediaLoop: Boolean(formData.mediaLoop),
      mediaPosterUrl: formData.mediaPosterUrl?.trim() || '',
      isFeatured: Boolean(formData.isFeatured),
      category: formData.category || 'software',
      verifiedCapabilities: formData.verifiedCapabilities?.trim() || '',
    };

    onSave(projectToSave);
    onClose();
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="project-modal-title" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#F4E9C8] dark:bg-[#111D2B] text-[#302B22] dark:text-[#F0E8D5] border-2 border-[#B49A62] rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-[#75664B] dark:text-[#B7C1CC]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pb-3 border-b border-[#D8C697] dark:border-[#34475A] mb-4">
          <div className="flex items-center gap-2 text-xs font-heading text-[#702C38] dark:text-[#C5A66A] font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> {initialProject ? 'Edit Application' : 'Add New Application'}
          </div>
          <h2 id="project-modal-title" className="text-2xl font-heading font-bold mt-1">
            {initialProject ? initialProject.title : 'Chapter 2 Project Entry'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto space-y-4 pr-1 font-sans text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                Project Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. NetworkLabApp"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                Subtitle
              </label>
              <input
                type="text"
                placeholder="e.g. Educational Subnet & Topology Simulator"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Project['category'] })}
                className="w-full px-3 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
              >
                <option value="networking">Networking Tool / Simulator</option>
                <option value="software">Software Media Application</option>
                <option value="tool">Android / System Ecosystem Tool</option>
                <option value="web">Web Application</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#702C38] focus:ring-0"
                />
                <span className="text-xs font-heading font-bold">
                  ⭐ Mark as Flagship Featured Project
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Description *
            </label>
            <textarea
              required
              rows={3}
              placeholder="What you built and why..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38] leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Main Features (One per line)
            </label>
            <textarea
              rows={3}
              placeholder="Interactive IPv4 subnetting calculator&#10;Packet encapsulation visualizer&#10;Topology simulation sandbox"
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38] font-mono text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                Verified Technologies (Comma separated)
              </label>
              <input
                type="text"
                placeholder="Python, Tkinter, Socket API, Networking"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38] font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                Featured Photo / Video URL
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.mediaType}
                  onChange={(e) => setFormData({ ...formData, mediaType: e.target.value as Project['mediaType'] })}
                  className="w-28 shrink-0 px-2 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
                >
                  <option value="image">Photo</option>
                  <option value="video">Video</option>
                </select>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38] font-mono text-xs"
              />
              </div>
              <p className="mt-1 text-[11px] text-[#75664B] dark:text-[#B7C1CC]">
                Share the individual Drive file as <strong>Anyone with the link</strong>. For videos, use a public Drive file link or a direct MP4/WebM/Ogg URL. A folder link cannot display media by itself.
              </p>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.mediaAutoplay)}
                    onChange={(e) => setFormData({ ...formData, mediaAutoplay: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="font-heading font-bold">Autoplay</span>
                </label>

                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.mediaLoop)}
                    onChange={(e) => setFormData({ ...formData, mediaLoop: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="font-heading font-bold">Loop</span>
                </label>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                    Poster Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="Optional poster image for videos (jpg/png)"
                    value={formData.mediaPosterUrl}
                    onChange={(e) => setFormData({ ...formData, mediaPosterUrl: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38] font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                GitHub Repository URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/GM-Mercullo/..."
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38] font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                Live Demonstration URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38] font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
              Verified Capabilities Summary
            </label>
            <input
              type="text"
              placeholder="e.g. Verified standalone application executing local subnetting and topology routing."
              value={formData.verifiedCapabilities}
              onChange={(e) => setFormData({ ...formData, verifiedCapabilities: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl focus:outline-none focus:border-[#702C38]"
            />
          </div>

          <div className="pt-4 border-t border-[#D8C697] dark:border-[#34475A] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project editor"
              className="px-4 py-2 rounded-xl bg-transparent border border-[#B49A62] text-xs font-heading"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-xs shadow"
            >
              {initialProject ? 'Save Changes' : 'Add Project to Great Hall'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
