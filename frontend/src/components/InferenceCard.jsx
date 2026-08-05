import React from 'react';
import { AlertTriangle, ShieldAlert, ShieldCheck, Activity, Cpu, Wind, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

const InferenceCard = ({ status, prediction }) => {
  const isCritical = status?.toUpperCase() === 'CRITICAL';
  const isWarning = status?.toUpperCase() === 'WARNING';

  const StateIcon = isCritical ? AlertTriangle : isWarning ? ShieldAlert : ShieldCheck;
  const statusColor = isCritical ? 'text-accent-red' : isWarning ? 'text-accent-amber' : 'text-primary';

  // AI-Centric Water Cooling Recommendations
  const getRecommendation = () => {
    if (isCritical) return "EMERGENCY BYPASS: Engaging auxiliary secondary loop. Thermal overload detected. Shift cluster load immediately.";
    if (isWarning) return "BOOST ACTIVE: Increasing chilled water flow rate (+15%). Optimizing pump pressure for heat dissipation.";
    return "FLOW OPTIMAL: Intelligent valve control active. Monitoring electrolyte levels and pump efficiency.";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative glass-ai rounded-[3.5rem] p-10 flex flex-col items-center justify-center text-center transition-all duration-1000 ${isCritical ? 'critical-breach-glow border-accent-red/50' : ''}`}
    >
      <div className={`p-6 rounded-[2rem] mb-6 shadow-2xl relative ${isCritical ? 'bg-accent-red/10' : isWarning ? 'bg-accent-amber/10' : 'bg-primary/10'}`}>
        <StateIcon className={`w-20 h-20 ${statusColor} ${isCritical ? 'animate-pulse' : ''}`} />
      </div>

      <h2 className={`text-6xl font-black tracking-tighterest uppercase leading-none mb-4 italic ${statusColor}`}>
        {status}
      </h2>
      
      <p className="text-foreground/60 font-black tracking-[0.4em] uppercase text-[9px] mb-8 flex items-center gap-3">
        Neural Status Report
      </p>

      {/* Suggested Action Box */}
      <div className={`w-full p-6 rounded-2xl glass-ai mb-8 text-left border-l-4 ${isCritical ? 'border-accent-red' : isWarning ? 'border-accent-amber' : 'border-primary'}`}>
          <div className="flex items-center gap-3 mb-2 opacity-40">
              <Activity className="w-3 h-3" />
              <span className="text-[8px] font-black uppercase tracking-widest">AI Recommended Action</span>
          </div>
          <p className="text-[11px] font-bold leading-relaxed text-foreground/80 uppercase">
             "{getRecommendation()}"
          </p>
      </div>

      <div className="w-full flex items-center justify-around py-6 border-t border-white/5 opacity-80">
        <div className="flex flex-col">
            <span className={`text-2xl font-black ${statusColor}`}>{(prediction * 100).toFixed(1)}%</span>
            <span className="text-[8px] font-black uppercase text-foreground/20 tracking-tighterest mt-1">Impact Probability</span>
        </div>
        <div className="flex flex-col">
            <span className="text-2xl font-black text-foreground">0.98<span className="text-sm opacity-20">x</span></span>
            <span className="text-[8px] font-black uppercase text-foreground/20 tracking-tighterest mt-1">Confidence Node</span>
        </div>
      </div>
    </motion.div>
  );
};

export default InferenceCard;
