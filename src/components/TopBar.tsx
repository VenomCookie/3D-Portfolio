import React from 'react';
import { ViewState, Theme } from '../App';
import { Monitor, LayoutDashboard, Home, Moon, Sun } from 'lucide-react';

interface TopBarProps {
  view: ViewState;
  setView: (v: ViewState) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
}

export function TopBar({ view, setView, theme, setTheme }: TopBarProps) {
  const isNight = theme === 'night';

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 p-2 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl">
      <NavButton 
        active={view === 'room'} 
        onClick={() => setView('room')} 
        icon={<Home className="w-5 h-5" />} 
        label="Room" 
        isNight={isNight}
      />
      <NavButton 
        active={view === 'computer'} 
        onClick={() => setView('computer')} 
        icon={<Monitor className="w-5 h-5" />} 
        label="Computer" 
        isNight={isNight}
      />
      <NavButton 
        active={view === 'pinboard'} 
        onClick={() => setView('pinboard')} 
        icon={<LayoutDashboard className="w-5 h-5" />} 
        label="Pinboard" 
        isNight={isNight}
      />
      
      <div className="w-px h-6 bg-black/10 dark:bg-white/20 mx-2" />
      
      <button
        onClick={() => setTheme(isNight ? 'day' : 'night')}
        className={`p-3 rounded-xl transition-all ${isNight ? 'text-yellow-400 hover:bg-white/10' : 'text-slate-700 hover:bg-black/5'}`}
      >
        {isNight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </button>
    </div>
  );
}

function NavButton({ active, onClick, icon, label, isNight }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, isNight: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active 
          ? (isNight ? 'bg-white/20 text-white shadow-lg' : 'bg-black/10 text-black shadow-lg')
          : (isNight ? 'text-white/60 hover:bg-white/10 hover:text-white' : 'text-black/60 hover:bg-black/5 hover:text-black')
      }`}
    >
      {icon}
      <span className="hidden sm:block">{label}</span>
    </button>
  );
}
