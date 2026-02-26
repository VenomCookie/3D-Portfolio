import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Theme } from '../App';
import { Project, projects } from '../data/projects';
import { Lightbulb, Code, Play, ArrowLeft, Filter, Grid, X } from 'lucide-react';

interface PinboardProps {
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
  theme: Theme;
  onOpenProject: (p: Project) => void;
}

type FilterType = 'All' | '#UI' | '#3D' | '#Sketches';

export function Pinboard({ isActive, onClick, theme, onOpenProject }: PinboardProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [expandedNote, setExpandedNote] = useState<number | null>(null);

  const handleFilterClick = (e: React.MouseEvent, filter: FilterType) => {
    e.stopPropagation();
    setActiveFilter(filter);
  };

  const handleNoteClick = (e: React.MouseEvent, noteId: number) => {
    e.stopPropagation();
    setExpandedNote(noteId);
  };

  const closeExpandedNote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNote(null);
  };

  const isVisible = (tags: FilterType[]) => {
    if (activeFilter === 'All') return true;
    return tags.includes(activeFilter);
  };

  return (
    <div 
      className="object-3d interactive cursor-pointer group"
      style={{
        width: 1200, height: 1000, left: -600, top: -500,
        transform: 'translateX(-1000px) translateY(-200px) translateZ(-980px)',
      }}
      onClick={onClick}
    >
      {/* Dark Board Frame */}
      <div 
        className={`w-full h-full rounded-2xl border-[4px] border-[#222] relative transition-shadow duration-500 overflow-hidden bg-[#0f111a] ${isActive ? 'shadow-[0_0_50px_rgba(255,255,255,0.1)]' : ''}`}
        style={{
          boxShadow: isActive ? '0 0 50px rgba(255,255,255,0.1)' : (theme === 'night' ? '-20px 20px 40px rgba(0,0,0,0.5)' : '-40px 40px 60px rgba(0,0,0,0.4)')
        }}
      >
        {/* Corkboard Texture */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay" 
          style={{ 
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cork-board.png")',
            backgroundRepeat: 'repeat'
          }} 
        />
        
        {/* Dot Grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className={`w-full h-full absolute inset-0 ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          
          {/* Header */}
          <div className="absolute top-12 left-12">
            <div className="flex items-center gap-2 bg-blue-900/30 text-blue-500 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 w-fit">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              LIVE BOARD
            </div>
            <h1 className="text-6xl font-black text-white mb-4 tracking-tight">Works in <span className="text-blue-600">Progress</span></h1>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">A raw collection of current experiments, rough sketches, and unfinished thoughts.</p>
          </div>

          {/* Filters */}
          <div className="absolute top-24 right-12 flex gap-3 z-10">
            {(['All', '#UI', '#3D', '#Sketches'] as FilterType[]).map((filter) => (
              <button 
                key={filter}
                onClick={(e) => handleFilterClick(e, filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter 
                    ? 'bg-white/10 text-white' 
                    : 'bg-transparent border border-white/10 text-gray-400 hover:bg-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {/* Card 1: Animation Engine */}
            {isVisible(['#UI', '#3D']) && (
              <motion.div 
                key="card-1"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05, zIndex: 20 }} 
                onClick={(e) => handleNoteClick(e, 1)}
                className="absolute top-[280px] left-[40px] w-[280px] bg-white p-4 pb-6 shadow-2xl rotate-[-2deg] cursor-pointer"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm" style={{ transform: 'rotate(2deg)' }} />
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" className="w-full h-[240px] object-cover mb-4" alt="Code" />
                <h3 className="text-black font-bold text-lg">Animation Engine</h3>
                <p className="text-gray-500 text-xs mt-1">Prototype v0.4 • React Three Fiber</p>
              </motion.div>
            )}

            {/* Card 2: The Napkin Idea */}
            {isVisible(['#Sketches']) && (
              <motion.div 
                key="card-2"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05, zIndex: 20 }} 
                onClick={(e) => handleNoteClick(e, 2)}
                className="absolute top-[220px] left-[340px] w-[260px] h-[260px] bg-[#eab308] p-6 shadow-xl rotate-[1deg] flex flex-col justify-between cursor-pointer"
              >
                <p className="text-black font-medium text-xl leading-snug">"How can we make data visualization feel more organic without losing precision?"</p>
                <div className="flex justify-between items-end border-t border-black/10 pt-4 mt-4">
                  <span className="text-black/60 text-xs font-bold tracking-widest uppercase">The Napkin Idea</span>
                  <Lightbulb className="w-4 h-4 text-black/60" />
                </div>
              </motion.div>
            )}

            {/* Card 3: Project Alpha */}
            {isVisible(['#Sketches', '#UI']) && (
              <motion.div 
                key="card-3"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05, zIndex: 20 }} 
                onClick={(e) => handleNoteClick(e, 3)}
                className="absolute top-[200px] left-[620px] w-[280px] bg-white p-4 pb-6 shadow-2xl rotate-[3deg] cursor-pointer"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm" style={{ transform: 'rotate(-1deg)' }} />
                <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop" className="w-full h-[240px] object-cover mb-4" alt="Sketch" />
                <h3 className="text-black font-bold text-lg">Project Alpha</h3>
                <p className="text-gray-500 text-xs mt-1">Initial Sketches • 2 days ago</p>
              </motion.div>
            )}

            {/* Card 4: Code Snippet */}
            {isVisible(['#UI']) && (
              <motion.div 
                key="card-4"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05, zIndex: 20 }} 
                onClick={(e) => handleNoteClick(e, 4)}
                className="absolute top-[200px] left-[920px] w-[240px] bg-[#1e1e2e] rounded-xl p-5 shadow-2xl border border-white/5 cursor-pointer"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-gray-500 text-[10px] font-mono">component.tsx</span>
                </div>
                <pre className="text-[10px] font-mono leading-relaxed text-gray-300">
                  <span className="text-purple-400">const</span> <span className="text-blue-400">Card</span> = () <span className="text-purple-400">=&gt;</span> {'{\n'}
                  {'  '}<span className="text-purple-400">return</span> {'(\n'}
                  {'    '}&lt;<span className="text-green-400">motion.div</span>{'\n'}
                  {'      animate={{\n'}
                  {'        scale: '}<span className="text-orange-400">1.1</span>{'\n'}
                  {'      }}\n'}
                  {'    />\n'}
                  {'  )\n'}
                  {'}'}
                </pre>
                <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                  <span className="text-white text-xs font-medium">Motion Study</span>
                  <Code className="w-3 h-3 text-gray-500" />
                </div>
              </motion.div>
            )}

            {/* Card 5: Neon Palette */}
            {isVisible(['#UI']) && (
              <motion.div 
                key="card-5"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05, zIndex: 20 }} 
                onClick={(e) => handleNoteClick(e, 5)}
                className="absolute top-[600px] left-[40px] w-[260px] bg-white p-4 pb-6 shadow-2xl rotate-[1deg] cursor-pointer"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm" style={{ transform: 'rotate(-2deg)' }} />
                <div className="w-full h-[220px] mb-4 bg-gradient-to-br from-orange-400 via-pink-500 to-blue-600" />
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-black font-bold text-lg">Neon Palette</h3>
                    <p className="text-gray-500 text-xs mt-1">Design System • V2</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-blue-600" />
                </div>
              </motion.div>
            )}

            {/* Card 6: TO-DO */}
            {isVisible(['#UI', '#3D']) && (
              <motion.div 
                key="card-6"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05, zIndex: 20 }} 
                onClick={(e) => handleNoteClick(e, 6)}
                className="absolute top-[500px] left-[340px] w-[240px] h-[260px] bg-[#ef4444] p-6 shadow-xl rotate-[-2deg] text-white cursor-pointer"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-white/80 text-xs font-bold tracking-widest uppercase">To-Do</span>
                  <div className="w-2 h-2 rounded-full bg-white/50" />
                </div>
                <ul className="space-y-4 font-medium text-lg">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white" /> Fix z-index bug</li>
                  <li className="flex items-center gap-3 text-white/50 line-through"><div className="w-1.5 h-1.5 rounded-full bg-white/50" /> Update hero img</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white" /> Refactor API</li>
                </ul>
              </motion.div>
            )}

            {/* Card 7: Video Player */}
            {isVisible(['#3D']) && (
              <motion.div 
                key="card-7"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05, zIndex: 20 }} 
                onClick={(e) => handleNoteClick(e, 7)}
                className="absolute top-[500px] left-[610px] w-[550px] h-[320px] bg-[#111] rounded-xl shadow-2xl overflow-hidden border border-white/10 group cursor-pointer"
              >
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Abstract 3D" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white text-xs font-medium">0:15</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expanded Note Modal */}
          <AnimatePresence>
            {expandedNote && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md z-40 flex items-center justify-center"
                onClick={closeExpandedNote}
              >
                <motion.div 
                  initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                  className="bg-[#1e1e2e] p-8 rounded-2xl max-w-2xl w-full mx-8 shadow-2xl border border-white/10 relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={closeExpandedNote}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <h2 className="text-3xl font-bold text-white mb-4">Expanded View</h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    This is a detailed view of the selected note. In a full implementation, this would show the complete contents, high-resolution images, or playable video for note #{expandedNote}.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Action Bar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center bg-[#1e1e2e] rounded-full p-1.5 shadow-2xl border border-white/10 z-50">
            <button 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
              onClick={(e) => { e.stopPropagation(); onClick(e); }}
            >
              <ArrowLeft className="w-4 h-4" /> Back to Desk
            </button>
            <div className="w-px h-6 bg-white/10 mx-2" />
            <button 
              className="p-2.5 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
              onClick={(e) => { e.stopPropagation(); setActiveFilter('All'); }}
            >
              <Filter className="w-4 h-4" />
            </button>
            <button 
              className="p-2.5 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5 mr-1"
              onClick={(e) => { e.stopPropagation(); setActiveFilter('All'); }}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
