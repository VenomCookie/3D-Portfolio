import React from "react";
import { motion } from "motion/react";
import { ViewState, Theme } from "../App";
import { Monitor } from "./Monitor";
import { Pinboard } from "./Pinboard";
import { Project } from "../data/projects";
import { config } from "../config";

interface SceneProps {
  view: ViewState;
  setView: (v: ViewState) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  onOpenProject: (p: Project) => void;
}

export function Scene({ view, setView, theme, setTheme, onOpenProject }: SceneProps) {
  const isNight = theme === "night";

  const cameraVariants = {
    room: { x: 0, y: -200, z: -1500, rotateX: -15, rotateY: 25 },
    computer: { x: 0, y: 145, z: 400, rotateX: 0, rotateY: 0 },
    pinboard: { x: 1000, y: 300, z: 200, rotateX: 0, rotateY: 0 },
  };

  return (
    <div
      className="viewport"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setView("room");
        }
      }}
    >
      <motion.div
        className="world"
        animate={view}
        variants={cameraVariants}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Back Wall */}
        <div
          className="object-3d flex"
          style={{
            width: 4000,
            height: 2000,
            left: -2000,
            top: -1000,
            transform: "translateZ(-1000px)",
            backgroundColor: "#f0ebe1",
          }}
        >
          <div className="absolute inset-0 bg-[#1a1817] transition-opacity duration-1000" style={{ opacity: isNight ? 1 : 0 }} />
          {/* Wall Panels (Wainscoting) */}
          <div className="absolute bottom-0 left-0 w-full h-[1000px] flex">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-1 h-full p-8 relative" style={{ borderTop: '4px solid #4a6274', backgroundColor: '#3a4f5e' }}>
                <div className="absolute inset-0 bg-[#2a3b47] border-t-[4px] border-[#3a4f5e] transition-opacity duration-1000" style={{ opacity: isNight ? 1 : 0 }} />
                <div className="w-full h-full border-[12px] rounded-sm relative z-10" style={{ borderColor: isNight ? '#1d2a33' : '#2c3d4a', boxShadow: isNight ? 'inset 0 0 20px rgba(0,0,0,0.5)' : 'inset 0 0 20px rgba(0,0,0,0.2)' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Wall (Window) */}
        <div
          className="object-3d"
          style={{
            width: 2000,
            height: 2000,
            left: -1000,
            top: -1000,
            transform: "translateX(2000px) rotateY(-90deg)",
            backgroundColor: "#d0d5db",
          }}
        >
          <div className="absolute inset-0 bg-[#0a0b10] transition-opacity duration-1000" style={{ opacity: isNight ? 1 : 0 }} />
          {/* Window Frame */}
          <div className="absolute inset-0 border-[40px] border-[#222]">
            {/* Skyline Image - Day */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage: `url("${config.windowView.dayImage}")`,
                opacity: isNight ? 0 : 0.8
              }}
            />
            {/* Skyline Image - Night */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage: `url("${config.windowView.nightImage}")`,
                opacity: isNight ? 0.8 : 0
              }}
            />
            {/* Window Mullions */}
            <div className="absolute top-0 left-1/3 w-[20px] h-full bg-[#222]" />
            <div className="absolute top-0 left-2/3 w-[20px] h-full bg-[#222]" />
          </div>
        </div>

        {/* Left Wall */}
        <div
          className="object-3d"
          style={{
            width: 2000,
            height: 2000,
            left: -1000,
            top: -1000,
            transform: "translateX(-2000px) rotateY(90deg)",
            backgroundColor: "#f0ebe1",
          }}
        >
          <div className="absolute inset-0 bg-[#1a1817] transition-opacity duration-1000" style={{ opacity: isNight ? 1 : 0 }} />
          {/* Wall Panels (Wainscoting) */}
          <div className="absolute bottom-0 left-0 w-full h-[1000px] flex">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-1 h-full p-8 relative" style={{ borderTop: '4px solid #4a6274', backgroundColor: '#3a4f5e' }}>
                <div className="absolute inset-0 bg-[#2a3b47] border-t-[4px] border-[#3a4f5e] transition-opacity duration-1000" style={{ opacity: isNight ? 1 : 0 }} />
                <div className="w-full h-full border-[12px] rounded-sm relative z-10" style={{ borderColor: isNight ? '#1d2a33' : '#2c3d4a', boxShadow: isNight ? 'inset 0 0 20px rgba(0,0,0,0.5)' : 'inset 0 0 20px rgba(0,0,0,0.2)' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Floor */}
        <div
          className="object-3d"
          style={{
            width: 4000,
            height: 3000,
            left: -2000,
            top: -1500,
            transform: "translateY(1000px) rotateX(90deg)",
            backgroundColor: "#8a8c8e",
          }}
        >
          <div className="absolute inset-0 bg-[#111] transition-opacity duration-1000" style={{ opacity: isNight ? 1 : 0 }} />
          {/* Rug */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2800px] h-[2000px] overflow-hidden"
            style={{
              backgroundColor: "#c2b8a3",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <div className="absolute inset-0 bg-[#222] transition-opacity duration-1000" style={{ opacity: isNight ? 1 : 0 }} />
          </div>
        </div>

        {/* Ceiling */}
        <div
          className="object-3d"
          style={{
            width: 4000,
            height: 3000,
            left: -2000,
            top: -1500,
            transform: "translateY(-1000px) rotateX(-90deg)",
            backgroundColor: "#f8fafc",
          }}
        >
          <div className="absolute inset-0 bg-[#0a0a0c] transition-opacity duration-1000" style={{ opacity: isNight ? 1 : 0 }} />
        </div>

        {/* Desk Group */}
        <div className="object-3d" style={{ transform: 'translateY(200px) translateZ(-400px)' }}>
          {/* Desk Shadow on floor */}
          <div className="object-3d transition-opacity duration-1000 pointer-events-none" style={{ width: 1900, height: 900, left: -950, top: -450, background: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)', transform: 'translateY(800px) rotateX(90deg) translateZ(-1px) translateX(-100px)', opacity: isNight ? 0.3 : 0.6 }} />
          
          {/* Desk Top - Oak Wood */}
          <div 
            className="object-3d" 
            style={{ 
              width: 1800, height: 800, left: -900, top: -400, 
              transform: 'rotateX(90deg)', 
              backgroundColor: '#b88655',
              borderRadius: '10px',
              boxShadow: 'inset 0 0 100px rgba(0,0,0,0.3)'
            }} 
          />
          {/* Desk Front Edge */}
          <div className="object-3d" style={{ width: 1800, height: 60, left: -900, top: -30, transform: 'translateZ(400px)', backgroundColor: '#96683c' }} />
          {/* Desk Back Edge */}
          <div className="object-3d" style={{ width: 1800, height: 60, left: -900, top: -30, transform: 'translateZ(-400px) rotateY(180deg)', backgroundColor: '#96683c' }} />
          {/* Desk Right Edge */}
          <div className="object-3d" style={{ width: 800, height: 60, left: -400, top: -30, transform: 'translateX(900px) rotateY(90deg)', backgroundColor: '#96683c' }} />
          {/* Desk Left Edge */}
          <div className="object-3d" style={{ width: 800, height: 60, left: -400, top: -30, transform: 'translateX(-900px) rotateY(-90deg)', backgroundColor: '#96683c' }} />
          {/* Desk Bottom */}
          <div className="object-3d" style={{ width: 1800, height: 800, left: -900, top: -400, transform: 'translateY(30px) rotateX(-90deg)', backgroundColor: '#754d29' }} />
          
          {/* Left Panel */}
          <div className="object-3d" style={{ width: 700, height: 770, left: -350, top: 30, transform: 'translateX(-870px) translateZ(0px) rotateY(90deg)', backgroundColor: '#8c5e35' }} />
          <div className="object-3d" style={{ width: 700, height: 770, left: -350, top: 30, transform: 'translateX(-930px) translateZ(0px) rotateY(-90deg)', backgroundColor: '#8c5e35' }} />
          <div className="object-3d" style={{ width: 60, height: 770, left: -30, top: 30, transform: 'translateX(-900px) translateZ(350px)', backgroundColor: '#754d29' }} />
          <div className="object-3d" style={{ width: 60, height: 770, left: -30, top: 30, transform: 'translateX(-900px) translateZ(-350px) rotateY(180deg)', backgroundColor: '#754d29' }} />
          
          {/* Right Panel */}
          <div className="object-3d" style={{ width: 700, height: 770, left: -350, top: 30, transform: 'translateX(870px) translateZ(0px) rotateY(-90deg)', backgroundColor: '#8c5e35' }} />
          <div className="object-3d" style={{ width: 700, height: 770, left: -350, top: 30, transform: 'translateX(930px) translateZ(0px) rotateY(90deg)', backgroundColor: '#8c5e35' }} />
          <div className="object-3d" style={{ width: 60, height: 770, left: -30, top: 30, transform: 'translateX(900px) translateZ(350px)', backgroundColor: '#754d29' }} />
          <div className="object-3d" style={{ width: 60, height: 770, left: -30, top: 30, transform: 'translateX(900px) translateZ(-350px) rotateY(180deg)', backgroundColor: '#754d29' }} />
          
          {/* Back Panel */}
          <div className="object-3d" style={{ width: 1740, height: 600, left: -870, top: 30, transform: 'translateZ(-200px)', backgroundColor: '#8c5e35' }} />
          <div className="object-3d" style={{ width: 1740, height: 600, left: -870, top: 30, transform: 'translateZ(-240px) rotateY(180deg)', backgroundColor: '#754d29' }} />
        </div>

        {/* Chair - Moved further back so it doesn't block the screen */}
        <div className="object-3d" style={{ transform: 'translateX(-200px) translateY(400px) translateZ(600px) rotateY(20deg)' }}>
          {/* Shadow on floor */}
          <div className="object-3d transition-opacity duration-1000 pointer-events-none" style={{ width: 500, height: 500, left: -250, top: -250, background: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)', transform: 'translateY(600px) rotateX(90deg) translateZ(-1px) translateX(-150px)', opacity: isNight ? 0.2 : 0.5 }} />
          
          {/* Seat Top */}
          <div className="object-3d" style={{ width: 400, height: 400, left: -200, top: -200, transform: 'translateY(-20px) rotateX(90deg)', background: '#222', borderRadius: '40px', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)' }} />
          {/* Seat Bottom */}
          <div className="object-3d" style={{ width: 400, height: 400, left: -200, top: -200, transform: 'translateY(20px) rotateX(-90deg)', background: '#111', borderRadius: '40px' }} />
          {/* Seat Front Edge */}
          <div className="object-3d" style={{ width: 400, height: 40, left: -200, top: -20, transform: 'translateZ(200px)', background: '#1a1a1a', borderRadius: '10px' }} />
          {/* Seat Back Edge */}
          <div className="object-3d" style={{ width: 400, height: 40, left: -200, top: -20, transform: 'translateZ(-200px) rotateY(180deg)', background: '#1a1a1a', borderRadius: '10px' }} />
          {/* Seat Left Edge */}
          <div className="object-3d" style={{ width: 400, height: 40, left: -200, top: -20, transform: 'translateX(-200px) rotateY(-90deg)', background: '#1a1a1a', borderRadius: '10px' }} />
          {/* Seat Right Edge */}
          <div className="object-3d" style={{ width: 400, height: 40, left: -200, top: -20, transform: 'translateX(200px) rotateY(90deg)', background: '#1a1a1a', borderRadius: '10px' }} />

          {/* Backrest Front */}
          <div className="object-3d" style={{ width: 360, height: 500, left: -180, top: -500, transform: 'translateZ(-180px) rotateX(10deg)', background: '#222', borderRadius: '40px 40px 10px 10px', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)' }} />
          {/* Backrest Back */}
          <div className="object-3d" style={{ width: 360, height: 500, left: -180, top: -500, transform: 'translateZ(-220px) rotateX(10deg) rotateY(180deg)', background: '#111', borderRadius: '40px 40px 10px 10px' }} />
          {/* Backrest Top Edge */}
          <div className="object-3d" style={{ width: 360, height: 40, left: -180, top: -20, transform: 'translateY(-500px) translateZ(-200px) rotateX(100deg)', background: '#1a1a1a', borderRadius: '10px' }} />
          {/* Backrest Left Edge */}
          <div className="object-3d" style={{ width: 40, height: 500, left: -20, top: -500, transform: 'translateX(-180px) translateZ(-200px) rotateY(-90deg) rotateX(10deg)', background: '#1a1a1a', borderRadius: '10px' }} />
          {/* Backrest Right Edge */}
          <div className="object-3d" style={{ width: 40, height: 500, left: -20, top: -500, transform: 'translateX(180px) translateZ(-200px) rotateY(90deg) rotateX(10deg)', background: '#1a1a1a', borderRadius: '10px' }} />

          {/* Left Armrest */}
          <div className="object-3d" style={{ width: 20, height: 150, left: -10, top: -150, transform: 'translateX(-210px) translateZ(0px)', background: '#111' }} />
          <div className="object-3d" style={{ width: 40, height: 250, left: -20, top: -125, transform: 'translateX(-210px) translateY(-150px) translateZ(0px) rotateX(90deg)', background: '#222', borderRadius: '20px' }} />

          {/* Right Armrest */}
          <div className="object-3d" style={{ width: 20, height: 150, left: -10, top: -150, transform: 'translateX(210px) translateZ(0px)', background: '#111' }} />
          <div className="object-3d" style={{ width: 40, height: 250, left: -20, top: -125, transform: 'translateX(210px) translateY(-150px) translateZ(0px) rotateX(90deg)', background: '#222', borderRadius: '20px' }} />

          {/* Base/Pole */}
          <div className="object-3d" style={{ width: 40, height: 380, left: -20, top: 20, background: '#111' }} />
          {/* Wheels Base */}
          <div className="object-3d" style={{ width: 400, height: 40, left: -200, top: -20, transform: 'translateY(400px) rotateX(90deg)', background: '#222', borderRadius: '20px' }} />
          <div className="object-3d" style={{ width: 40, height: 400, left: -20, top: -200, transform: 'translateY(400px) rotateX(90deg)', background: '#222', borderRadius: '20px' }} />
        </div>

        {/* Notebook */}
        <div className="object-3d group cursor-pointer" style={{ transform: 'translateX(-400px) translateY(200px) translateZ(100px)' }}>
          {/* Shadow */}
          <div className="object-3d transition-opacity duration-1000 pointer-events-none" style={{ width: 200, height: 260, left: -100, top: -130, background: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)', transform: 'rotateX(90deg) translateZ(-1px) translateX(-40px)', opacity: isNight ? 0.1 : 0.4 }} />
          <div className="object-3d transition-transform duration-300 group-hover:translate-y-[-10px] group-hover:rotate-z-[5deg]">
            {/* Pages */}
            <div className="object-3d" style={{ width: 180, height: 240, left: -90, top: -120, background: '#f8fafc', borderRadius: '4px 12px 12px 4px', transform: 'rotateX(90deg) translateZ(2px)', boxShadow: '2px 2px 10px rgba(0,0,0,0.2)' }} />
            <div className="object-3d" style={{ width: 180, height: 240, left: -90, top: -120, background: '#e2e8f0', borderRadius: '4px 12px 12px 4px', transform: 'rotateX(90deg) translateZ(0px)' }} />
            <div className="object-3d" style={{ width: 180, height: 240, left: -90, top: -120, background: '#cbd5e1', borderRadius: '4px 12px 12px 4px', transform: 'rotateX(90deg) translateZ(-2px)' }} />
            {/* Cover */}
            <div className="object-3d" style={{ width: 185, height: 245, left: -92.5, top: -122.5, background: '#1e293b', borderRadius: '4px 12px 12px 4px', transform: 'rotateX(90deg) translateZ(-4px)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }} />
            {/* Spine */}
            <div className="object-3d" style={{ width: 10, height: 245, left: -95, top: -122.5, background: '#0f172a', borderRadius: '4px 0 0 4px', transform: 'rotateX(90deg) translateZ(-1px)' }} />
            {/* Bookmark */}
            <div className="object-3d" style={{ width: 10, height: 260, left: 20, top: -120, background: '#ef4444', transform: 'rotateX(90deg) translateZ(3px)' }} />
          </div>
        </div>

        {/* Pen Holder */}
        <div className="object-3d" style={{ transform: 'translateX(-300px) translateY(200px) translateZ(-200px)' }}>
          {/* Shadow */}
          <div className="object-3d transition-opacity duration-1000 pointer-events-none" style={{ width: 100, height: 100, left: -50, top: -50, background: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)', transform: 'rotateX(90deg) translateZ(-1px) translateX(-40px)', opacity: isNight ? 0.1 : 0.5 }} />
          {/* Holder Body (Cylinder approximation) */}
          <div className="object-3d" style={{ width: 60, height: 80, left: -30, top: -80, background: '#334155', borderRadius: '10px', transform: 'translateZ(30px)' }} />
          <div className="object-3d" style={{ width: 60, height: 80, left: -30, top: -80, background: '#1e293b', borderRadius: '10px', transform: 'translateZ(-30px) rotateY(180deg)' }} />
          <div className="object-3d" style={{ width: 60, height: 80, left: -30, top: -80, background: '#0f172a', borderRadius: '10px', transform: 'translateX(-30px) rotateY(-90deg)' }} />
          <div className="object-3d" style={{ width: 60, height: 80, left: -30, top: -80, background: '#475569', borderRadius: '10px', transform: 'translateX(30px) rotateY(90deg)' }} />
          {/* Holder Bottom */}
          <div className="object-3d" style={{ width: 60, height: 60, left: -30, top: -30, background: '#0f172a', transform: 'translateY(0px) rotateX(90deg)', borderRadius: '10px' }} />
          
          {/* Pens */}
          {/* Pen 1 */}
          <div className="object-3d group cursor-pointer" style={{ transform: 'translateX(-10px) translateY(-40px) translateZ(10px) rotateX(15deg) rotateZ(-10deg)' }}>
            <div className="object-3d transition-transform duration-200 group-hover:translate-y-[-20px]">
              <div className="object-3d" style={{ width: 8, height: 100, left: -4, top: -50, background: '#eab308', borderRadius: '4px' }} />
              <div className="object-3d" style={{ width: 8, height: 20, left: -4, top: -50, background: '#111', borderRadius: '4px 4px 0 0' }} />
            </div>
          </div>
          {/* Pen 2 */}
          <div className="object-3d group cursor-pointer" style={{ transform: 'translateX(15px) translateY(-40px) translateZ(-10px) rotateX(-10deg) rotateZ(15deg)' }}>
            <div className="object-3d transition-transform duration-200 group-hover:translate-y-[-20px]">
              <div className="object-3d" style={{ width: 8, height: 100, left: -4, top: -50, background: '#ef4444', borderRadius: '4px' }} />
              <div className="object-3d" style={{ width: 8, height: 20, left: -4, top: -50, background: '#111', borderRadius: '4px 4px 0 0' }} />
            </div>
          </div>
          {/* Pen 3 */}
          <div className="object-3d group cursor-pointer" style={{ transform: 'translateX(0px) translateY(-40px) translateZ(-15px) rotateX(-20deg) rotateZ(0deg)' }}>
            <div className="object-3d transition-transform duration-200 group-hover:translate-y-[-20px]">
              <div className="object-3d" style={{ width: 8, height: 100, left: -4, top: -50, background: '#3b82f6', borderRadius: '4px' }} />
              <div className="object-3d" style={{ width: 8, height: 20, left: -4, top: -50, background: '#111', borderRadius: '4px 4px 0 0' }} />
            </div>
          </div>
        </div>

        {/* Interactive Mouse */}
        <motion.div 
          className="object-3d cursor-pointer" 
          initial={{ x: 300, y: 200, z: 200, rotateY: 0 }}
          whileHover={{ x: 280, y: 200, z: 180, rotateY: -15 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Shadow */}
          <div className="object-3d transition-opacity duration-1000 pointer-events-none" style={{ width: 80, height: 120, left: -40, top: -60, background: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)', transform: 'rotateX(90deg) translateZ(-1px) translateX(-20px)', opacity: isNight ? 0.1 : 0.4 }} />
          <div className="object-3d" style={{ width: 60, height: 100, left: -30, top: -50, background: '#111', borderRadius: '30px', transform: 'rotateX(90deg)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
            <div className="absolute top-[15px] left-1/2 -translate-x-1/2 w-[4px] h-[15px] bg-[#333] rounded-full" />
            <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[30px] h-[40px] bg-white/5 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
          </div>
        </motion.div>

        {/* Big Floor Plant (Monstera/Ficus style) */}
        <div className="object-3d" style={{ transform: 'translateX(1400px) translateY(1000px) translateZ(-600px)' }}>
          {/* Shadow on floor */}
          <div className="object-3d transition-opacity duration-1000 pointer-events-none" style={{ width: 500, height: 500, left: -250, top: -250, background: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)', transform: 'rotateX(90deg) translateZ(-1px) translateX(-200px)', opacity: isNight ? 0.1 : 0.6 }} />
          
          {/* Large Pot */}
          <div className="object-3d" style={{ width: 300, height: 400, left: -150, top: -400, background: '#e5e5e5', borderRadius: '20px 20px 150px 150px', transform: 'translateZ(150px)', boxShadow: 'inset -20px -20px 50px rgba(0,0,0,0.2)' }} />
          <div className="object-3d" style={{ width: 300, height: 400, left: -150, top: -400, background: '#d4d4d4', borderRadius: '20px 20px 150px 150px', transform: 'translateZ(-150px) rotateY(180deg)' }} />
          <div className="object-3d" style={{ width: 300, height: 400, left: -150, top: -400, background: '#a3a3a3', borderRadius: '20px 20px 150px 150px', transform: 'translateX(-150px) rotateY(-90deg)' }} />
          <div className="object-3d" style={{ width: 300, height: 400, left: -150, top: -400, background: '#f5f5f5', borderRadius: '20px 20px 150px 150px', transform: 'translateX(150px) rotateY(90deg)' }} />
          {/* Soil */}
          <div className="object-3d" style={{ width: 300, height: 300, left: -150, top: -150, background: '#1a110c', transform: 'translateY(-380px) rotateX(90deg)', borderRadius: '50%' }} />
          
          {/* Main Stems */}
          <div className="object-3d" style={{ width: 20, height: 600, left: -10, top: -900, background: '#2f4f4f', borderRadius: '10px', transform: 'rotateZ(5deg) rotateX(5deg)' }} />
          <div className="object-3d" style={{ width: 16, height: 500, left: -8, top: -800, background: '#355e3b', borderRadius: '10px', transform: 'rotateZ(-10deg) rotateX(-5deg)' }} />
          <div className="object-3d" style={{ width: 12, height: 400, left: -6, top: -700, background: '#4a7c59', borderRadius: '10px', transform: 'rotateZ(15deg) rotateX(10deg)' }} />

          {/* Large Leaves */}
          <div className="object-3d" style={{ width: 200, height: 250, left: -100, top: -1000, background: '#1e4d2e', borderRadius: '100px 100px 20px 100px', transform: 'translateZ(50px) rotateX(40deg) rotateZ(-20deg)', boxShadow: 'inset -10px -10px 30px rgba(0,0,0,0.3)' }} />
          <div className="object-3d" style={{ width: 180, height: 220, left: -90, top: -950, background: '#2d6a4f', borderRadius: '100px 100px 100px 20px', transform: 'translateZ(-80px) rotateX(-30deg) rotateZ(30deg)' }} />
          <div className="object-3d" style={{ width: 220, height: 280, left: -110, top: -850, background: '#1b4332', borderRadius: '100px 20px 100px 100px', transform: 'translateX(-100px) rotateY(-40deg) rotateZ(-40deg)' }} />
          <div className="object-3d" style={{ width: 190, height: 240, left: -95, top: -750, background: '#40916c', borderRadius: '20px 100px 100px 100px', transform: 'translateX(120px) rotateY(50deg) rotateZ(25deg)' }} />
          <div className="object-3d" style={{ width: 160, height: 200, left: -80, top: -650, background: '#52b788', borderRadius: '100px', transform: 'translateZ(120px) rotateX(60deg) rotateZ(-10deg)' }} />
          <div className="object-3d" style={{ width: 150, height: 180, left: -75, top: -550, background: '#2d6a4f', borderRadius: '100px', transform: 'translateZ(-100px) rotateX(-50deg) rotateZ(15deg)' }} />
        </div>

        {/* Lamp (Clickable) */}
        <div
          className="object-3d cursor-pointer group"
          onClick={(e) => {
            e.stopPropagation();
            setTheme(isNight ? "day" : "night");
          }}
          style={{
            width: 150,
            height: 150,
            left: -75,
            top: -75,
            transform: "translateX(-400px) translateY(200px) translateZ(-600px) rotateX(90deg)",
            background: "#333",
            borderRadius: "50%",
            boxShadow: isNight ? "0 0 100px 50px rgba(255, 200, 100, 0.5)" : "0 0 0px 0px rgba(255, 200, 100, 0)",
          }}
        >
          {/* Shadow */}
          <div className="absolute inset-0 rounded-full transition-opacity duration-1000 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)', transform: 'translateZ(-1px) translateX(-40px)', opacity: isNight ? 0.1 : 0.5 }} />
          <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors" />
        </div>
        <div
          className="object-3d pointer-events-none"
          style={{
            width: 20,
            height: 200,
            left: -10,
            top: -100,
            transform: "translateX(-400px) translateY(100px) translateZ(-600px)",
            background: "#444",
          }}
        />
        <div
          className="object-3d pointer-events-none"
          style={{
            width: 100,
            height: 80,
            left: -50,
            top: -40,
            transform: "translateX(-400px) translateY(0px) translateZ(-600px) rotateX(-30deg)",
            background: "#222",
            borderRadius: "50% 50% 0 0",
          }}
        >
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80px] h-[20px]"
            style={{
              backgroundColor: isNight ? "#ffddaa" : "#eee",
              boxShadow: isNight ? "0 50px 100px 50px rgba(255, 200, 100, 0.8)" : "0 50px 0px 0px rgba(255, 200, 100, 0)",
            }}
          />
        </div>

        {/* Monitor Shadow */}
        <div className="object-3d transition-opacity duration-1000 pointer-events-none" style={{ width: 800, height: 200, left: -400, top: -100, background: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)', transform: 'translateX(-50px) translateY(200px) translateZ(-600px) rotateX(90deg)', opacity: isNight ? 0.2 : 0.6 }} />

        <Monitor
          isActive={view === "computer"}
          onClick={(e) => {
            e.stopPropagation();
            setView("computer");
          }}
          theme={theme}
          onOpenProject={onOpenProject}
        />

        <Pinboard
          isActive={view === "pinboard"}
          onClick={(e) => {
            e.stopPropagation();
            setView("pinboard");
          }}
          theme={theme}
          onOpenProject={onOpenProject}
        />

      </motion.div>
    </div>
  );
}
