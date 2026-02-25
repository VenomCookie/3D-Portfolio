import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Theme } from '../App';
import { Project, projects } from '../data/projects';
import { Folder, X, Wifi, Battery, Search, User, Briefcase, Camera, Gamepad2, Archive, Plus, Smile, Mail, FileText, Settings, Droplet, Cpu, Leaf, Home, Lightbulb, Linkedin, Code } from 'lucide-react';
import { config } from '../config';

interface MonitorProps {
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
  theme: Theme;
  onOpenProject: (p: Project) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Droplet,
  Cpu,
  Leaf,
  Home,
  Lightbulb,
  Archive,
  Folder,
  Briefcase,
  Camera,
  Gamepad2
};

const colorMap = [
  'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
];

export function Monitor({ isActive, onClick, theme, onOpenProject }: MonitorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCodeInfo, setShowCodeInfo] = useState(false);
  const [time, setTime] = useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (!isActive) {
      setIsFullscreen(false);
    }
  }, [isActive]);

  const handleScreenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isActive) {
      onClick(e);
    } else if (!isFullscreen) {
      setIsFullscreen(true);
    }
  };

  const screenContent = (
    <div 
      className={`w-full h-full relative ${isActive || isFullscreen ? 'pointer-events-auto' : 'pointer-events-none'} bg-[#0f111a] text-white overflow-hidden`}
      onClick={handleScreenClick}
    >
      {/* Wallpaper */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 bg-cover bg-center" 
        style={{
          backgroundImage: `url("${config.desktop.wallpaperUrl}")`,
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Top Bar */}
      <div className="h-8 bg-black/20 backdrop-blur-md flex items-center justify-between px-4 text-xs font-medium text-white/80 border-b border-white/5">
        <div className="flex items-center gap-4">
          <span className="font-bold text-white">LiquidOS</span>
          {isFullscreen && (
            <span 
              className="cursor-pointer hover:text-white transition-colors text-white/50 bg-white/10 px-2 py-0.5 rounded"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
            >
              Exit Fullscreen
            </span>
          )}
          <span className="cursor-pointer hover:text-white transition-colors">File</span>
          <span className="cursor-pointer hover:text-white transition-colors">Edit</span>
          <span className="cursor-pointer hover:text-white transition-colors">View</span>
          <span className="cursor-pointer hover:text-white transition-colors">Window</span>
          <span className="cursor-pointer hover:text-white transition-colors">Help</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4" />
          <Search className="w-3.5 h-3.5" />
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-2.5 h-2.5" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center pt-16 h-[calc(100%-2rem)] overflow-y-auto pb-32">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Yousuf</h1>
        <p className="text-white/50 text-sm mb-16">Design Engineering at Imperial College</p>

        {/* App Grid */}
        <div className="grid grid-cols-4 gap-x-12 gap-y-12 max-w-4xl">
          {projects.map((project, i) => {
            const Icon = iconMap[project.icon] || Folder;
            const colorClass = colorMap[i % colorMap.length];
            return (
              <div key={project.id} className="flex flex-col items-center gap-4 cursor-pointer group" onClick={(e) => { e.stopPropagation(); onOpenProject(project); }}>
                <div className={`w-24 h-24 rounded-3xl border flex items-center justify-center transition-all shadow-xl relative ${colorClass} hover:scale-105 hover:brightness-110 backdrop-blur-md`}>
                  {project.status === 'in-progress' && <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-[#0f111a]" />}
                  <Icon className="w-10 h-10 opacity-80" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium mb-1">{project.title}</div>
                  <div className="text-[9px] font-bold tracking-widest text-white/40 uppercase">{project.category}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dock */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 h-16 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl px-4 flex items-center gap-4 shadow-2xl">
        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:-translate-y-1 transition-transform relative">
          <Smile className="w-6 h-6 text-white" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/50 rounded-full" />
        </div>
        <div className="w-px h-8 bg-white/10 mx-1" />
        <a href={`mailto:${config.contact.email}`} className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:-translate-y-1 transition-transform block">
          <Mail className="w-6 h-6 text-white" />
        </a>
        <a href="https://linkedin.com/in/yousuf-shb" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#0077b5] rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:-translate-y-1 transition-transform block">
          <Linkedin className="w-6 h-6 text-white" />
        </a>
        <div 
          className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:-translate-y-1 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            setShowCodeInfo(true);
          }}
        >
          <Settings className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Code Info Modal */}
      <AnimatePresence>
        {showCodeInfo && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] bg-[#1a1d27] border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Window Header */}
            <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group/close" onClick={() => setShowCodeInfo(false)}>
                  <X className="w-2 h-2 text-black/50 opacity-0 group-hover/close:opacity-100" />
                </button>
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-white/80 text-sm font-medium flex items-center gap-2"><Code className="w-4 h-4" /> About This Site</span>
              <div className="w-12" />
            </div>
            
            {/* Window Body */}
            <div className="p-6 text-white/80 text-sm leading-relaxed">
              <p className="mb-4">
                This portfolio is built using a custom 3D engine created entirely with standard web technologies—no WebGL or Three.js.
              </p>
              <p className="mb-4">
                <strong>Tech Stack:</strong>
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li><strong>React</strong> for component architecture and state management.</li>
                <li><strong>Tailwind CSS</strong> for styling and utility classes.</li>
                <li><strong>Framer Motion</strong> for fluid animations and camera movements.</li>
                <li><strong>CSS 3D Transforms</strong> (<code>rotateX</code>, <code>rotateY</code>, <code>translateZ</code>) to construct the 3D environment directly in the DOM.</li>
              </ul>
              <p>
                By leveraging hardware-accelerated CSS transforms, the site achieves a lightweight, performant 3D experience without the overhead of a full WebGL canvas.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <div 
        className="object-3d cursor-pointer group"
        style={{
          width: 720, height: 450, left: -360, top: -225,
          transform: 'translateY(-145px) translateZ(-600px)',
        }}
        onClick={onClick}
      >
        {/* Pro Display XDR Stand */}
        <div className="absolute bottom-[-140px] left-1/2 -translate-x-1/2 w-32 h-40 bg-gradient-to-b from-[#e5e5e5] to-[#a3a3a3] dark:from-[#525252] dark:to-[#262626]" style={{ transform: 'translateZ(-40px) rotateX(5deg)' }} />
        <div className="absolute bottom-[-140px] left-1/2 -translate-x-1/2 w-48 h-3 bg-[#a3a3a3] dark:bg-[#262626] rounded-t-sm" style={{ transform: 'translateZ(10px)' }} />
        {/* Stand hinge mechanism */}
        <div className="absolute bottom-[0px] left-1/2 -translate-x-1/2 w-24 h-24 bg-[#d4d4d4] dark:bg-[#404040] rounded-full" style={{ transform: 'translateZ(-45px)' }} />

        {/* Monitor Body - Pro Display XDR has very thin bezels */}
        <div 
          className={`w-full h-full rounded-xl border-[8px] border-[#111] overflow-hidden relative transition-shadow duration-500 ${isActive ? 'shadow-[0_20px_100px_rgba(0,0,0,0.5)] monitor-glow' : ''} bg-black`}
          style={{
            boxShadow: isActive ? '0 20px 100px rgba(0,0,0,0.5)' : (theme === 'night' ? '-20px 20px 40px rgba(0,0,0,0.5)' : '-40px 40px 60px rgba(0,0,0,0.4)')
          }}
        >
          {!isFullscreen && screenContent}
        </div>
      </div>

      {isFullscreen && createPortal(
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50"
        >
          {screenContent}
        </motion.div>, 
        document.body
      )}
    </>
  );
}
