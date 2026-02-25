import { motion } from 'motion/react';
import { createPortal } from 'react-dom';
import { Project } from '../data/projects';
import { X, ExternalLink } from 'lucide-react';
import { Theme } from '../App';
import Markdown from 'react-markdown';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  theme: Theme;
}

export function ProjectModal({ project, onClose, theme }: ProjectModalProps) {
  // Sort slides by priority
  const sortedSlides = [...project.slides].sort((a, b) => a.priority - b.priority);

  return createPortal(
    <motion.div 
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal Container */}
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className={`relative w-full max-w-4xl max-h-full flex flex-col rounded-3xl overflow-hidden shadow-2xl border ${theme === 'night' ? 'bg-zinc-900/90 border-white/10' : 'bg-white/90 border-black/10'} backdrop-blur-2xl`}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="w-full h-full overflow-y-auto">
          {/* Header */}
          <div className={`p-8 md:p-12 pb-6 ${theme === 'night' ? 'text-white' : 'text-slate-900'}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${theme === 'night' ? 'bg-white/10 text-white/80' : 'bg-black/5 text-black/60'}`}>
                {project.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${project.status === 'completed' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'}`}>
                {project.status.replace('-', ' ')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{project.title}</h2>
            <div className={`prose max-w-none text-lg leading-relaxed ${theme === 'night' ? 'prose-invert text-zinc-400' : 'text-slate-600'}`}>
              <Markdown>{project.description}</Markdown>
            </div>
          </div>

          {/* Body Content */}
          <div className={`px-8 md:px-12 py-6 ${theme === 'night' ? 'text-zinc-300' : 'text-slate-700'}`}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-50">Context</h3>
            <div className={`prose max-w-none leading-relaxed mb-8 ${theme === 'night' ? 'prose-invert' : ''}`}>
              <Markdown>{project.context}</Markdown>
            </div>
            
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-50">Details</h3>
            <div className={`prose max-w-none leading-relaxed mb-8 ${theme === 'night' ? 'prose-invert' : ''}`}>
              <Markdown>{project.body}</Markdown>
            </div>
          </div>

          {/* Image Gallery (Vertical) */}
          <div className="flex flex-col gap-8 px-8 md:px-12 pb-12">
            {sortedSlides.map((slide) => (
              <div key={slide.id} className="flex flex-col gap-3">
                <div className="w-full bg-black/5 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
                  <img
                    src={slide.image}
                    alt={slide.caption}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className={`text-sm text-center ${theme === 'night' ? 'text-zinc-400' : 'text-slate-500'}`}>
                  {slide.caption}
                </p>
              </div>
            ))}
          </div>

          {/* Collaborators */}
          {project.collaborators && project.collaborators.length > 0 && (
            <div className={`px-8 md:px-12 py-8 border-t ${theme === 'night' ? 'border-white/10 text-white' : 'border-black/10 text-slate-900'}`}>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 opacity-50">Collaborators</h3>
              <div className="flex flex-wrap gap-4">
                {project.collaborators.map((collaborator, index) => (
                  <a
                    key={index}
                    href={collaborator.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${theme === 'night' ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'}`}
                  >
                    {collaborator.name}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}
