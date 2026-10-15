import React from 'react';
import { Profile, Experience, Credential, Project, SkillItem } from '../../types';
import { X, Printer, Download, Mail, Code2, Globe, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  experiences: Experience[];
  credentials: Credential[];
  projects: Project[];
  skills: SkillItem[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  experiences,
  credentials,
  projects,
  skills,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="resume-modal-title" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#F4E9C8] text-[#302B22] border-2 border-[#B49A62] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(232, 217, 174, 0.4), transparent)'
        }}
      >
        {/* Top Controls Bar */}
        <div className="px-6 py-3.5 bg-[#E8D9AE] border-b border-[#D8C697] flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#702C38] text-[#F4E9C8] font-heading font-bold text-xs flex items-center justify-center">
              GM
            </div>
            <span id="resume-modal-title" className="font-heading font-bold text-sm text-[#702C38]">
              Professional Résumé — {profile.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-[#F4E9C8] border border-[#B49A62] text-xs font-heading font-semibold text-[#302B22] hover:bg-white flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5 text-[#702C38]" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close resume"
              className="p-1.5 rounded-full hover:bg-black/10 text-[#75664B] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Résumé Sheet */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 font-sans space-y-8 print:p-0 print:overflow-visible">
          
          {/* Header */}
          <div className="border-b-2 border-[#702C38] pb-6">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[#702C38] tracking-tight">
              {profile.name}
            </h1>
            <p className="text-base font-heading font-semibold text-[#526746] mt-0.5">
              {profile.headline}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#75664B]">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#702C38]" /> {profile.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-[#702C38]" /> github.com/GM-Mercullo
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#702C38]" /> linkedin.com/in/gm-mercullo
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-heading font-bold uppercase tracking-widest text-[#702C38] border-b border-[#D8C697] pb-1 mb-2">
              Professional Profile
            </h2>
            <p className="text-xs leading-relaxed text-[#302B22]">
              {profile.introduction} {profile.extendedBio}
            </p>
          </div>

          {/* Core Projects */}
          <div>
            <h2 className="text-xs font-heading font-bold uppercase tracking-widest text-[#702C38] border-b border-[#D8C697] pb-1 mb-3">
              Software & Networking Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-heading font-bold text-sm text-[#302B22]">
                      {proj.title} — <span className="font-normal italic text-xs text-[#75664B]">{proj.subtitle}</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#702C38]">
                      {proj.technologies.slice(0, 3).join(', ')}
                    </span>
                  </div>
                  <p className="text-xs text-[#75664B] mt-0.5 leading-relaxed">
                    {proj.description}
                  </p>
                  <ul className="mt-1 list-disc list-inside text-[11px] text-[#302B22] space-y-0.5">
                    {proj.mainFeatures.slice(0, 3).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Experience */}
          <div>
            <h2 className="text-xs font-heading font-bold uppercase tracking-widest text-[#702C38] border-b border-[#D8C697] pb-1 mb-3">
              Practical Experience & On-The-Job Training
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-heading font-bold text-sm text-[#302B22]">
                      {exp.position}
                    </span>
                    <span className="text-xs text-[#75664B] font-serif">{exp.period}</span>
                  </div>
                  <div className="text-xs font-semibold text-[#526746] mb-1">
                    {exp.organization}
                  </div>
                  <ul className="list-disc list-inside text-xs text-[#302B22] space-y-0.5">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Credentials */}
          <div>
            <h2 className="text-xs font-heading font-bold uppercase tracking-widest text-[#702C38] border-b border-[#D8C697] pb-1 mb-3">
              Certifications & Qualifications
            </h2>
            <div className="space-y-2">
              {credentials.map((cred) => (
                <div key={cred.id} className="flex items-baseline justify-between text-xs">
                  <div>
                    <span className="font-heading font-bold text-[#302B22]">{cred.name}</span>
                    <span className="text-[#75664B]"> — {cred.issuingPlatform}</span>
                  </div>
                  <span className="text-[#75664B] font-serif">{cred.completionDate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Summary */}
          <div>
            <h2 className="text-xs font-heading font-bold uppercase tracking-widest text-[#702C38] border-b border-[#D8C697] pb-1 mb-3">
              Technical Proficiencies
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-heading font-bold text-[#702C38] block mb-0.5">Software & Languages:</span>
                <span className="text-[#75664B]">Python, JavaScript, TypeScript, React, HTML5/CSS3, C/C++</span>
              </div>
              <div>
                <span className="font-heading font-bold text-[#526746] block mb-0.5">Networking Protocols:</span>
                <span className="text-[#75664B]">TCP/IP, OSI 7-Layer, Subnetting (CIDR/VLSM), Wireshark, DNS/DHCP</span>
              </div>
              <div>
                <span className="font-heading font-bold text-[#B49A62] block mb-0.5">Cybersecurity Foundations:</span>
                <span className="text-[#75664B]">Network Defense, Linux Hardening, Port Enumeration, Web Security (OWASP)</span>
              </div>
              <div>
                <span className="font-heading font-bold text-[#702C38] block mb-0.5">Tools & Systems:</span>
                <span className="text-[#75664B]">Git/GitHub, Linux/Bash, Scrcpy, Android ADB, Cisco Packet Tracer, VS Code</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
