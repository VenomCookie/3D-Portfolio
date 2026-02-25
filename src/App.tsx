import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { TopBar } from './components/TopBar';
import { Scene } from './components/Scene';
import { ProjectModal } from './components/ProjectModal';
import { Project } from './data/projects';

export type ViewState = 'room' | 'computer' | 'pinboard';
export type Theme = 'day' | 'night';

export default function App() {
  const [view, setView] = useState<ViewState>('room');
  const [theme, setTheme] = useState<Theme>('day');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeProject) setActiveProject(null);
        else if (view !== 'room') setView('room');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, activeProject]);

  return (
    <div className={`w-full h-screen overflow-hidden ${theme === 'night' ? 'dark bg-slate-900' : 'bg-slate-100'}`}>
      <TopBar view={view} setView={setView} theme={theme} setTheme={setTheme} />
      
      <Scene 
        view={view} 
        setView={setView} 
        theme={theme} 
        setTheme={setTheme}
        onOpenProject={setActiveProject} 
      />

      <AnimatePresence>
        {activeProject && (
          <ProjectModal 
            project={activeProject} 
            onClose={() => setActiveProject(null)} 
            theme={theme}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
