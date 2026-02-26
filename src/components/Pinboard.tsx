/* src/components/Pinboard.tsx */
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
      {/* (rest unchanged) */}
    </div>
  );
}
