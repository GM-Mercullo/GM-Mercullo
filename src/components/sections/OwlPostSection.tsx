import React, { useState } from 'react';
import { storage } from '../../services/storageService';
import { audioFx } from '../../utils/audioFx';
import { contactMessageSchema } from '../../lib/validation';
import { Mail, Send, CheckCircle2, Code2, Globe, ExternalLink, Sparkles, Feather } from 'lucide-react';

export const OwlPostSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successSent, setSuccessSent] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactMessageSchema.safeParse({ senderName, senderEmail, subject, message });
    if (!result.success) {
      setSubmitError(result.error.issues[0]?.message || 'Please check your message.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    audioFx.playPaperRustle();

    try {
      await storage.submitMessage({
        senderName: senderName.trim(),
        senderEmail: senderEmail.trim(),
        subject: subject.trim() || 'Inquiry from GM Mercullo Portfolio',
        message: message.trim(),
      });

      audioFx.playAlohomora();
      setSuccessSent(true);

      setSenderName('');
      setSenderEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'The owl could not deliver your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D9AE] dark:bg-[#111D2B] border border-[#D8C697] dark:border-[#34475A] text-xs font-heading font-semibold text-[#702C38] dark:text-[#C5A66A] uppercase tracking-wider mb-2">
            <Feather className="w-3.5 h-3.5" /> Chapter 8 — Owl Post
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#302B22] dark:text-[#F0E8D5]">
            Have a good idea in mind?
          </h2>
          <p className="text-sm font-sans text-[#75664B] dark:text-[#B7C1CC] mt-2 max-w-lg mx-auto">
            Whether discussing an upcoming project, a networking challenge, or an internship opportunity, I am always open to conversation.
          </p>
        </div>

        {/* Contact Parchment Envelope Card */}
        <div 
          className="relative bg-[#F4E9C8] dark:bg-[#111D2B] border-2 border-[#B49A62] rounded-3xl p-6 sm:p-10 shadow-lg overflow-hidden"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(232, 217, 174, 0.4), transparent)'
          }}
        >
          {/* Top Wax Seal Ornament */}
          <div className="flex justify-center -mt-2 mb-6">
            <div className="w-14 h-14 rounded-full bg-[#702C38] border-2 border-[#B49A62] shadow-[0_4px_15px_rgba(112,44,56,0.5)] flex items-center justify-center text-[#F4E9C8] font-heading font-bold text-lg select-none">
              GM
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Direct Contact Info Details */}
            <div className="md:col-span-5 space-y-6">
              <div>
                <h3 className="font-heading font-bold text-xl text-[#302B22] dark:text-[#F0E8D5]">
                  Get In Touch Directly
                </h3>
                <p className="text-xs font-sans text-[#75664B] dark:text-[#B7C1CC] mt-1 leading-relaxed">
                  No puzzles or mazes—feel free to reach out via direct email or connect through professional networks.
                </p>
              </div>

              {/* Direct Email Card */}
              <a
                href="mailto:gmmercullo99@gmail.com"
                className="p-4 rounded-xl bg-[#E8D9AE]/70 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] hover:border-[#702C38] dark:hover:border-[#C5A66A] flex items-center gap-3.5 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-[#702C38]/10 text-[#702C38] dark:text-[#C5A66A] group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#75664B] dark:text-[#B7C1CC]">
                    Direct Email
                  </div>
                  <div className="text-sm font-sans font-semibold text-[#302B22] dark:text-[#F0E8D5] truncate group-hover:text-[#702C38] dark:group-hover:text-[#8CCBFF]">
                    gmmercullo99@gmail.com
                  </div>
                </div>
              </a>

              {/* GitHub Link */}
              <a
                href="https://github.com/GM-Mercullo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#E8D9AE]/70 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] hover:border-[#702C38] dark:hover:border-[#C5A66A] flex items-center gap-3.5 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-[#702C38]/10 text-[#702C38] dark:text-[#C5A66A] group-hover:scale-105 transition-transform">
                  <Code2 className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#75664B] dark:text-[#B7C1CC]">
                    GitHub Profile
                  </div>
                  <div className="text-sm font-sans font-semibold text-[#302B22] dark:text-[#F0E8D5] truncate group-hover:text-[#702C38] dark:group-hover:text-[#8CCBFF]">
                    github.com/GM-Mercullo
                  </div>
                </div>
              </a>

              {/* LinkedIn Link */}
              <a
                href="https://www.linkedin.com/in/gm-mercullo-160a41438/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#E8D9AE]/70 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] hover:border-[#702C38] dark:hover:border-[#C5A66A] flex items-center gap-3.5 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-[#702C38]/10 text-[#702C38] dark:text-[#C5A66A] group-hover:scale-105 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#75664B] dark:text-[#B7C1CC]">
                    LinkedIn Connection
                  </div>
                  <div className="text-sm font-sans font-semibold text-[#302B22] dark:text-[#F0E8D5] truncate group-hover:text-[#702C38] dark:group-hover:text-[#8CCBFF]">
                    linkedin.com/in/gm-mercullo
                  </div>
                </div>
              </a>
            </div>

            {/* Letter Inscription Form */}
            <div className="md:col-span-7">
              {successSent ? (
                <div className="p-8 text-center bg-[#E8D9AE]/80 dark:bg-[#080F19] rounded-2xl border border-[#B49A62] space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#526746]/20 border border-[#526746] flex items-center justify-center text-[#526746] dark:text-[#8CCBFF]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-xl text-[#702C38] dark:text-[#C5A66A]">
                    The Owl Has Taken Flight!
                  </h4>
                  <p className="text-xs font-sans text-[#75664B] dark:text-[#B7C1CC]">
                  Your message was delivered successfully. I will review and reply to your email address posthaste.
                  </p>
                  <button
                    onClick={() => setSuccessSent(false)}
                    className="mt-2 text-xs font-heading font-bold text-[#702C38] dark:text-[#C5A66A] underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
                  {submitError && (
                    <div role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-700 dark:text-red-300">
                      {submitError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Elena Vance"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl text-[#302B22] dark:text-[#F0E8D5] placeholder-[#75664B]/60 dark:placeholder-[#B7C1CC]/40 focus:outline-none focus:border-[#702C38] dark:focus:border-[#C5A66A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. elena@example.com"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl text-[#302B22] dark:text-[#F0E8D5] placeholder-[#75664B]/60 dark:placeholder-[#B7C1CC]/40 focus:outline-none focus:border-[#702C38] dark:focus:border-[#C5A66A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Collaboration on NetworkLabApp"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl text-[#302B22] dark:text-[#F0E8D5] placeholder-[#75664B]/60 dark:placeholder-[#B7C1CC]/40 focus:outline-none focus:border-[#702C38] dark:focus:border-[#C5A66A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#702C38] dark:text-[#C5A66A] mb-1">
                      Your Message / Inquiry *
                    </label>
                    <textarea
                      required
                      minLength={10}
                      maxLength={5000}
                      rows={4}
                      placeholder="Write your note, question, or proposal..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#E8D9AE]/60 dark:bg-[#080F19] border border-[#D8C697] dark:border-[#34475A] rounded-xl text-[#302B22] dark:text-[#F0E8D5] placeholder-[#75664B]/60 dark:placeholder-[#B7C1CC]/40 focus:outline-none focus:border-[#702C38] dark:focus:border-[#C5A66A] leading-relaxed"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-decorative italic text-[#75664B] dark:text-[#B7C1CC]">
                      Delivered securely to the Admin chamber
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-[#702C38] hover:bg-[#8A3645] text-[#F4E9C8] font-heading font-bold text-xs tracking-wider shadow flex items-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5 text-[#B49A62]" />
                      <span>{isSubmitting ? 'Summoning Owl...' : 'Seal & Dispatch'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
