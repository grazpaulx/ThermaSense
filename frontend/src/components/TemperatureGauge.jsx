import React from 'react';

const TemperatureGauge = ({ label, value, min = 0, max = 100, unit = "°C" }) => {
  const radius = 70;
  const stroke = 12;
  const normalizedValue = Math.min(Math.max(value, min), max);
  const percentage = ((normalizedValue - min) / (max - min)) * 100;
  
  // SVG arc math
  const circumference = 2 * Math.PI * radius;
  // We want a semi-circle (180 degrees) or slightly more (240 degrees)
  // Let's go with 240 degrees
  const angle = 240;
  const dashOffset = circumference - (percentage / 100) * (circumference * (angle / 360));
  const totalLength = circumference * (angle / 360);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-card/5 rounded-[2.5rem] border border-primary/10 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-primary/20 hover:-translate-y-2 group">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Glow behind the gauge */}
        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700" />
        
        <svg className="w-full h-full transform -rotate-[210deg]" viewBox="0 0 160 160">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="1" />
            </linearGradient>
          </defs>
          {/* Background Track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="transparent"
            className="text-primary/5"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - totalLength}
            strokeLinecap="round"
          />
          {/* Progress Track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="url(#gaugeGradient)"
            strokeWidth={stroke}
            fill="transparent"
            className="transition-all duration-1000 ease-out"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (percentage / 100) * totalLength}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center -mb-2">
          <span className="text-4xl font-black tracking-tighter text-foreground drop-shadow-sm">
            {normalizedValue.toFixed(1)}
            <span className="text-lg font-bold ml-1 opacity-40">{unit}</span>
          </span>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 mb-1">{label}</h3>
        <div className="h-1 w-8 bg-primary/20 rounded-full" />
      </div>
    </div>
  );
};

export default TemperatureGauge;
