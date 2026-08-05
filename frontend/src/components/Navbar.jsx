import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, LayoutDashboard, History, Activity, Sun, Moon } from 'lucide-react';

const Navbar = ({ isSpiking, toggleSpike, isDark, toggleDark }) => {
  return (
    <nav className="card-industrial mx-10 mt-10 px-10 py-5 flex justify-between items-center relative z-[1001] border-none shadow-none bg-background/50 backdrop-blur-3xl">
      {/* BRANDING: No Underline, Aligned Icon + Text (v4.1) */}
      <div className="flex items-center gap-4 cursor-pointer">
        <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner rotate-3">
            <Shield className="w-6 h-6" />
        </div>
        <span className="text-2xl font-black tracking-tighterest uppercase text-foreground italic leading-none no-underline">
          ThermaSense
        </span>
      </div>

      {/* NAVIGATION: Clean no-underline links */}
      <div className="flex items-center gap-6">
        <NavLink to="/" className={({ isActive }) => `nav-link no-underline ${isActive ? 'active' : ''}`}>
           <span className="flex items-center gap-2">
             <LayoutDashboard className="w-4 h-4" /> DASHBOARD
           </span>
        </NavLink>
        <NavLink to="/audit" className={({ isActive }) => `nav-link no-underline ${isActive ? 'active' : ''}`}>
           <span className="flex items-center gap-2">
             <History className="w-4 h-4" /> AUDIT LOG
           </span>
        </NavLink>
      </div>

      {/* CONTROLS: Structured & Tighter */}
      <div className="flex items-center gap-6 border-l border-[var(--border)] pl-8">
        <button 
           onClick={toggleSpike}
           className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 flex items-center gap-3 border ${isSpiking ? 'bg-accent-red text-white border-accent-red glow-red transform scale-105' : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'}`}
        >
           <Activity className={`w-3 h-3 ${isSpiking ? 'animate-bounce' : ''}`} />
           {isSpiking ? "ABORT SPIKE" : "TRIGGER SPIKE"}
        </button>

        <button 
           onClick={toggleDark}
           className="w-10 h-10 rounded-2xl flex items-center justify-center hover:bg-white/5 transition-all text-foreground/40"
        >
           {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
