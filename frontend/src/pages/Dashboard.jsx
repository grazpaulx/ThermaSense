import React from 'react';
import IndustrialGauge from '../components/IndustrialGauge';
import PredictiveForecast from '../components/PredictiveForecast';
import InferenceCard from '../components/InferenceCard';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap, Server } from 'lucide-react';

const Dashboard = ({ history, currentResult, status, isDark }) => {
  const currentStep = history[history.length - 1] || { ambient: 24, cpu: 45, rpm: 65, coolant: 88, latency: 12 };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-10 flex flex-col gap-10"
    >
      {/* 4-GAUGE TOP ROW: 100% Occupancy */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        <IndustrialGauge label="AIR" value={currentStep.ambient} unit="°C" />
        <IndustrialGauge label="CORE" value={currentStep.cpu} unit="°C" />
        <IndustrialGauge label="FAN" value={currentStep.rpm} unit="RPM" />
        <IndustrialGauge label="COOLANT" value={currentStep.coolant} unit="L/M" />
      </div>

      {/* MAIN INTELLIGENCE STAGE */}
      <div className="grid grid-cols-12 gap-10 items-stretch">
        <div className="col-span-12 xl:col-span-8 flex flex-col h-full">
           <div className="flex-1 card-industrial p-0 overflow-hidden">
                <PredictiveForecast historicalData={history} prediction={currentResult.prediction} isDark={isDark} />
           </div>
        </div>
        
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-10">
           <InferenceCard status={status} prediction={currentResult.prediction} />
           
           {/* SYSTEM HEALTH MODULE (New for v4.1 Gap Filling) */}
           <div className="card-industrial p-10 flex-1 flex flex-col gap-8 relative overflow-hidden group">
              <div className="flex justify-between items-center">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground/40">SYSTEM HEALTH</h4>
                 <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
              
              <div className="grid grid-cols-2 gap-8 flex-1">
                  <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-black text-foreground/20 uppercase tracking-tighterest leading-none">PUMP EFFICIENCY</span>
                      <span className="data-mono text-xl font-bold">94.2%</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-black text-foreground/20 uppercase tracking-tighterest leading-none">NODE LOAD</span>
                    <span className="data-mono text-xl font-bold">LOW</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-black text-foreground/20 uppercase tracking-tighterest leading-none">MTBF EST.</span>
                    <span className="data-mono text-xl font-bold">12800H</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-black text-foreground/20 uppercase tracking-tighterest leading-none">AI VALIDITY</span>
                    <span className="data-mono text-xl font-bold">99.8%</span>
                  </div>
              </div>

              <div className="pt-8 border-t border-[var(--border)] flex items-center gap-4 opacity-30">
                 <Server className="w-4 h-4" />
                 <span className="text-[9px] font-mono tracking-widest uppercase">CLUSTER: ALPHA-SEQ-14</span>
              </div>
           </div>
        </div>
      </div>

      {/* BOTTOM ROW: LOGS & LATENCY */}
      <div className="grid grid-cols-12 gap-10">
         <div className="col-span-12 xl:col-span-5 card-industrial p-10 flex flex-col gap-6 h-[220px]">
             <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">DATA SYNC LATENCY</h4>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                    <span className="text-[10px] font-mono text-primary">{currentStep.latency}ms</span>
                </div>
             </div>
             <div className="flex-1 flex items-end gap-1">
                {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${20 + Math.random() * 60}%` }}
                        className="flex-1 bg-primary/20 rounded-t-sm"
                    />
                ))}
             </div>
         </div>

         <div className="col-span-12 xl:col-span-7 card-industrial p-10 flex items-center justify-between group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5"><Zap className="w-24 h-24" /></div>
            <div className="flex-1 space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-primary" />
                  <span className="text-[11px] font-black uppercase tracking-widest leading-none">Optimization Directive</span>
                </div>
                <p className="text-sm font-bold opacity-50 uppercase leading-snug tracking-tighter max-w-2xl italic">
                  "Recursive thermal balancing active. Pump pressure auto-scaling initialized based on 10-step neural projection."
                </p>
            </div>
            <div className="flex gap-10 border-l border-[var(--border)] pl-12 relative z-10">
                <div className="flex flex-col items-center">
                    <span className="data-mono text-3xl font-bold">12.8</span>
                    <span className="text-[9px] font-black uppercase text-foreground/20">PSI</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="data-mono text-3xl font-bold">98%</span>
                    <span className="text-[9px] font-black uppercase text-foreground/20">UPTIME</span>
                </div>
            </div>
         </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
