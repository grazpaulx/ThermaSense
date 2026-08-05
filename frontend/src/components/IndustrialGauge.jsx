import React from 'react';
import { motion } from 'framer-motion';

const IndustrialGauge = ({ label, value, min = 0, max = 100, unit = "" }) => {
  const radius = 62;
  const stroke = 12; // Beefier for v4.1
  const normalizedValue = Math.min(Math.max(value, min), max);
  const percentage = ((normalizedValue - min) / (max - min)) * 100;
  
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;

  const isHot = value > 80;

  return (
    <div className={`flex flex-col items-center justify-center p-8 card-industrial relative group ${isHot ? 'neon-hot border-accent-red/40' : 'pulse-glow border-primary/20'}`}>
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke="var(--border)"
            strokeWidth={stroke}
            fill="transparent"
          />
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            stroke={isHot ? "var(--accent-red)" : "var(--primary)"}
            strokeWidth={stroke}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.5, ease: "circOut" }}
            strokeLinecap="butt"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-black data-mono transition-colors duration-500 ${isHot ? 'text-accent-red' : 'text-foreground'}`}>
            {normalizedValue.toFixed(0)}
            <span className="text-[10px] ml-1 opacity-60 font-black uppercase tracking-normal">{unit}</span>
          </span>
        </div>
      </div>
      <h3 className="mt-8 text-[11px] font-black uppercase tracking-[1em] text-foreground/60 transition-colors group-hover:text-primary">{label}</h3>
    </div>
  );
};

export default IndustrialGauge;
