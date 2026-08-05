import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const StatusCard = ({ status, prediction }) => {
  const getStatusConfig = () => {
    switch (status?.toUpperCase()) {
      case 'NORMAL':
        return {
          icon: ShieldCheck,
          color: "text-emerald-500",
          bgColor: "bg-emerald-500/10",
          borderColor: "border-emerald-500/20",
          description: "System cooling is optimal. No proactive actions needed."
        };
      case 'WARNING':
        return {
          icon: AlertTriangle,
          color: "text-amber-500",
          bgColor: "bg-amber-500/10",
          borderColor: "border-amber-500/20",
          description: "Ambient temperatures rising. Efficiency may decrease soon."
        };
      case 'CRITICAL':
        return {
          icon: AlertOctagon,
          color: "text-rose-500",
          bgColor: "bg-rose-500/10",
          borderColor: "border-rose-500/20",
          description: "Critical thermal threshold reached. Immediate cooling required."
        };
      default:
        return {
          icon: ShieldCheck,
          color: "text-primary",
          bgColor: "bg-primary/10",
          borderColor: "border-primary/20",
          description: "Retrieving system status..."
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={cn(
      "relative overflow-hidden glass rounded-[3rem] p-10 border shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-all duration-700",
      config.borderColor
    )}>
      {/* Decorative background glow */}
      <div className={cn(
        "absolute -top-32 -right-32 w-80 h-80 blur-[100px] rounded-full opacity-30 animate-pulse",
        config.bgColor
      )} />

      <div className="relative flex flex-col lg:flex-row items-center gap-12">
        <div className={cn(
          "p-8 rounded-[2rem] shadow-2xl transform transition-transform duration-700 hover:rotate-3",
          config.bgColor
        )}>
          <Icon className={cn("w-20 h-20", config.color)} />
        </div>

        <div className="flex-1 text-center lg:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-4">
            <h2 className="text-5xl font-black tracking-tightest leading-none">
              {status || "Initializing"}
            </h2>
            <div className={cn(
              "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm",
              config.bgColor, config.color, config.borderColor
            )}>
              Neural Forecast
            </div>
          </div>
          <p className="text-foreground/40 text-lg max-w-lg font-medium leading-relaxed">
            {config.description}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-black/5 dark:bg-white/5 rounded-[2rem] border border-primary/10 min-w-[200px] shadow-inner">
          <span className="text-[10px] font-black text-primary/30 uppercase tracking-[0.4em] mb-3">System Load Impact</span>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black text-foreground">{(prediction * 100).toFixed(1)}</span>
            <span className="text-xl font-bold text-primary/40">%</span>
          </div>
          <div className="mt-4 w-full h-1.5 bg-primary/5 rounded-full overflow-hidden">
            <div 
              className={cn("h-full transition-all duration-1000 ease-out", config.color.replace('text', 'bg'))}
              style={{ width: `${prediction * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
