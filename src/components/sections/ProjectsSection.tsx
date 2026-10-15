import React, { useState } from 'react';
import { Project } from '../../types';
import { audioFx } from '../../utils/audioFx';
import {
  Sparkles,
  ExternalLink,
  Code2,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Network,
  Music,
  Smartphone,
  MessageSquare,
  Search,
  BookOpen
} from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  isAdmin: boolean;
  onOpenCreateModal: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  isAdmin,
  onOpenCreateModal,
  onEditProject,
  onDeleteProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Primary featured project (e.g., NetworkLabApp)
  const featuredProject = projects.find((p) => p.isFeatured) || projects[0];
  const supportingProjects = projects.filter((p) => p.id !== featuredProject?.id);

  const filteredSupporting = supportingProjects.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'networking': return <Network className="w-4 h-4 text-[#526746] dark:text-[#8CCBFF]" />;
      case 'software': return <Music className="w-4 h-4 text-[#702C38] dark:text-[#C5A66A]" />;
      case 'tool': return <Smartphone className="w-4 h-4 text-[#B49A62]" />;
      default: return <MessageSquare className="w-4 h-4 text-[#702C38] dark:text-[#8CCBFF]" />;
    }
  };

  return (
    <section id="projects" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-xs font-heading font-semibold text-[#702C38] dark:text-[#C5A66A] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Chapter 2 — The Great Hall
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#302B22] dark:text-[#F0E8D5]">
              Featured Applications & Tools
            </h2>
            <p className="text-sm font-sans text-[#75664B] dark:text-[#B7C1CC] mt-2 max-w-xl">
              Concrete evidence of what I can build—from packet-level educational networking tools to synchronized audio players and Android ecosystem utilities.
            </p>
          </div>

          {/* Admin Fast Action: Cast New Project */}
          {isAdmin && (
            <div className="mt-4 md:mt-0">
              <button
                onClick={onOpenCreateModal}
                className="px-4 py-2.5 rounded-xl bg-[#702C38] hover:bg-[#8A3645] border border-[#B49A62] text-[#F4E9C8] font-heading font-bold text-xs tracking-wider shadow flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4 text-[#B49A62]" />
                <span>Add New Project</span>
              </button>
            </div>
          )}
        </div>

        {/* PRIMARY FEATURED PROJECT: Larger Presentation (NetworkLabApp) */}
        {featuredProject && (
          <div className="mb-14">
            <div className="relative bg-[#E8D9AE]/60 dark:bg-[#111D2B] border-2 border-[#B49A62] rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Visual / Screenshot Column */}
                <div className="lg:col-span-6 relative min-h-[280px] lg:min-h-full bg-[#080F19] overflow-hidden border-b lg:border-b-0 lg:border-r border-[#D8C697] dark:border-[#34475A]">
                  <img
                    src={featuredProject.imageUrl}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#702C38] border border-[#B49A62] text-[#F4E9C8] text-xs font-heading font-bold tracking-wider shadow">
                    ⭐ Flagship Project
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg bg-[#080F19]/90 border border-[#34475A] text-xs text-[#F0E8D5] flex items-center gap-1.5 font-sans">
                    {getCategoryIcon(featuredProject.category)}
                    <span className="capitalize">{featuredProject.category} Educational Suite</span>
                  </div>
                </div>

                {/* Details Column */}
                <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-heading font-semibold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                      {featuredProject.subtitle}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#302B22] dark:text-[#F0E8D5]">
                      {featuredProject.title}
                    </h3>

                    <p className="text-sm font-sans text-[#75664B] dark:text-[#B7C1CC] mt-3 leading-relaxed">
                      {featuredProject.description}
                    </p>

                    {/* Verified Capabilities */}
                    {featuredProject.verifiedCapabilities && (
                      <div className="mt-3 p-3 rounded-xl bg-[#F4E9C8]/80 dark:bg-[#080F19]/80 border border-[#D8C697] dark:border-[#34475A] text-xs font-sans text-[#302B22] dark:text-[#F0E8D5]">
                        <span className="font-heading font-bold text-[#702C38] dark:text-[#C5A66A] block mb-0.5">
                          Verified Capabilities:
                        </span>
                        {featuredProject.verifiedCapabilities}
                      </div>
                    )}

                    {/* Main Features */}
                    <div className="mt-4 space-y-1.5">
                      <div className="text-xs font-heading font-bold uppercase tracking-wider text-[#302B22] dark:text-[#F0E8D5]">
                        Key Implementation Features:
                      </div>
                      <ul className="space-y-1">
                        {featuredProject.mainFeatures.map((feat, idx) => (
                          <li key={idx} className="text-xs font-sans text-[#75664B] dark:text-[#B7C1CC] flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#526746] dark:text-[#8CCBFF] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Verified Technologies */}
                    <div className="mt-5">
                      <div className="text-xs font-heading font-bold uppercase tracking-wider text-[#302B22] dark:text-[#F0E8D5] mb-2">
                        Verified Technologies:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {featuredProject.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-[#F4E9C8] dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] text-xs font-mono text-[#302B22] dark:text-[#F0E8D5]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-6 pt-4 border-t border-[#D8C697] dark:border-[#34475A] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {featuredProject.githubUrl && (
                        <a
                          href={featuredProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] text-xs font-heading font-bold flex items-center gap-1.5 transition-colors shadow"
                        >
                          <Code2 className="w-3.5 h-3.5" />
                          <span>Inspect GitHub Code</span>
                        </a>
                      )}

                      {featuredProject.demoUrl && (
                        <a
                          href={featuredProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-[#E8D9AE] dark:bg-[#080F19] border border-[#B49A62] text-[#302B22] dark:text-[#F0E8D5] hover:border-[#702C38] text-xs font-heading font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <span>Live Demonstration</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {isAdmin && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onEditProject(featuredProject)}
                          className="p-2 rounded-lg bg-[#F4E9C8] dark:bg-[#080F19] border border-[#B49A62] text-[#702C38] dark:text-[#C5A66A]"
                          title="Edit Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove "${featuredProject.title}"?`)) {
                              onDeleteProject(featuredProject.id);
                            }
                          }}
                          className="p-2 rounded-lg bg-[#F4E9C8] dark:bg-[#080F19] border border-red-500/50 text-red-500"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* SUPPORTING PROJECTS GRID (GMs-Kareoke, scrcpy-hub-app, NGLNiGM2) */}
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h3 className="font-heading font-bold text-xl text-[#302B22] dark:text-[#F0E8D5]">
              Supporting Applications & Utilities ({filteredSupporting.length})
            </h3>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-lg text-xs font-heading font-semibold transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#702C38] text-[#F4E9C8]'
                    : 'bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-[#75664B] dark:text-[#B7C1CC]'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setSelectedCategory('software')}
                className={`px-3 py-1 rounded-lg text-xs font-heading font-semibold transition-colors ${
                  selectedCategory === 'software'
                    ? 'bg-[#702C38] text-[#F4E9C8]'
                    : 'bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-[#75664B] dark:text-[#B7C1CC]'
                }`}
              >
                Software Media
              </button>
              <button
                onClick={() => setSelectedCategory('tool')}
                className={`px-3 py-1 rounded-lg text-xs font-heading font-semibold transition-colors ${
                  selectedCategory === 'tool'
                    ? 'bg-[#702C38] text-[#F4E9C8]'
                    : 'bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-[#75664B] dark:text-[#B7C1CC]'
                }`}
              >
                Ecosystem Tools
              </button>
              <button
                onClick={() => setSelectedCategory('web')}
                className={`px-3 py-1 rounded-lg text-xs font-heading font-semibold transition-colors ${
                  selectedCategory === 'web'
                    ? 'bg-[#702C38] text-[#F4E9C8]'
                    : 'bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-[#75664B] dark:text-[#B7C1CC]'
                }`}
              >
                Web Applications
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSupporting.map((project) => (
              <div
                key={project.id}
                className="group relative bg-[#F4E9C8]/90 dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] hover:border-[#B49A62] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden bg-black/40 border-b border-[#D8C697] dark:border-[#34475A]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-[#080F19]/90 border border-[#34475A] text-[11px] text-[#F0E8D5] flex items-center gap-1">
                    {getCategoryIcon(project.category)}
                    <span className="capitalize">{project.category}</span>
                  </div>

                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/80 p-1 rounded-lg border border-[#34475A]">
                      <button
                        onClick={() => onEditProject(project)}
                        className="p-1 hover:bg-white/10 text-[#C5A66A] rounded"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove "${project.title}"?`)) {
                            onDeleteProject(project.id);
                          }
                        }}
                        className="p-1 hover:bg-white/10 text-red-400 rounded"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-0.5">
                      {project.subtitle}
                    </div>
                    <h4 className="font-heading font-bold text-xl text-[#302B22] dark:text-[#F0E8D5]">
                      {project.title}
                    </h4>
                    <p className="text-xs font-sans text-[#75664B] dark:text-[#B7C1CC] mt-2 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features summary */}
                    <div className="mt-3 space-y-1">
                      {project.mainFeatures.slice(0, 2).map((feat, i) => (
                        <div key={i} className="text-[11px] font-sans text-[#75664B] dark:text-[#B7C1CC] flex items-start gap-1.5">
                          <span className="text-[#526746] dark:text-[#8CCBFF]">•</span>
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack & Actions */}
                  <div className="mt-5 pt-3 border-t border-[#D8C697] dark:border-[#34475A]">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-[#E8D9AE] dark:bg-[#080F19] text-[10px] font-mono text-[#302B22] dark:text-[#F0E8D5] border border-[#D8C697] dark:border-[#34475A]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-[#75664B] dark:text-[#B7C1CC]">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-heading font-bold text-[#702C38] dark:text-[#C5A66A] hover:underline flex items-center gap-1"
                        >
                          <Code2 className="w-3.5 h-3.5" /> View Repository
                        </a>
                      )}

                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-heading font-semibold text-[#526746] dark:text-[#8CCBFF] hover:underline flex items-center gap-1"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[11px] font-sans text-[#75664B] dark:text-[#B7C1CC] italic">
                          Local / CLI Verified
                        </span>
                      )}
                    </div>

                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
