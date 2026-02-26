/* src/components/Monitor.tsx */
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

      {/* (rest unchanged) */}
    </div>
  );

  return (
    <>
      <div 
        className="object-3d interactive cursor-pointer group"
        style={{
          width: 720, height: 450, left: -360, top: -225,
          transform: 'translateX(0px) translateY(75px) translateZ(220px)',
        }}
        onClick={onClick}
      >
        {/* (rest unchanged) */}
        {isFullscreen && createPortal(
          <div className="fixed inset-0 z-[9999] bg-black">
            {screenContent}
          </div>,
          document.body
        )}
      </div>
    </>
  );
}
  );
}
