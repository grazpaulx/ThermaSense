import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const PredictiveForecast = ({ historicalData, prediction, isDark }) => {
  const lastPoint = historicalData[historicalData.length - 1] || { ambient: 24, cpu: 45, rpm: 65, time: 0 };
  
  const futureData = Array.from({ length: 11 }).map((_, i) => {
    const factor = i / 10;
    const trend = prediction > 0.75 ? 30 : (prediction > 0.5 ? 12 : -1.5);
    
    return {
      time: lastPoint.time + i,
      cpu: lastPoint.cpu + (trend * factor) + (Math.random() - 0.5) * 2,
      isFuture: true
    };
  });

  const combinedData = [...historicalData, ...futureData.slice(1)];
  const isFutureHot = futureData.some(d => d.cpu > 80);

  return (
    <div className="w-full h-full p-12 relative overflow-hidden flex flex-col no-underline">
      {/* Legend & Labels 4.1 */}
      <div className="flex flex-col gap-8 mb-12 relative z-10 no-underline">
        <div>
            <div className="flex items-center gap-3 mb-2">
                <div className={`w-2 h-2 rounded-full ${isFutureHot ? 'bg-accent-red pulse-glow' : 'bg-primary pulse-glow'}`} />
                <span className="text-[11px] font-black uppercase tracking-[1em] text-foreground/60">NEURAL THERMAL PROJECTION</span>
            </div>
            <h2 className="text-6xl font-black tracking-tighterest text-foreground uppercase italic leading-none no-underline">ANALYTICS.</h2>
        </div>

        {/* Legend: No Underline */}
        <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
                <div className="w-6 h-1 bg-primary rounded-full shadow-[0_0_8px_var(--primary)]" />
                <span className="text-[10px] font-black uppercase text-foreground/40 tracking-[0.2em]">Live Telemetry</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-6 h-1 border-t-4 border-dashed border-primary/40" />
                <span className="text-[10px] font-black uppercase text-foreground/40 tracking-[0.2em]">LSTM Prediction</span>
            </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={combinedData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="cyberArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isFutureHot ? "var(--accent-red)" : "var(--primary)"} stopOpacity={0.25}/>
                <stop offset="100%" stopColor="transparent" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor={isFutureHot ? "var(--accent-red)" : "var(--primary)"} />
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
            <XAxis hide dataKey="time" />
            <YAxis hide domain={['dataMin - 15', 'dataMax + 35']} />
            
            <Tooltip 
                cursor={{ stroke: 'var(--primary)', strokeWidth: 1, strokeDasharray: '4 4' }}
                contentStyle={{ 
                backgroundColor: 'var(--card-bg)', 
                borderRadius: '24px', 
                border: '1px solid var(--border)', 
                fontSize: '11px', 
                color: 'var(--foreground)',
                fontWeight: '900',
                padding: '16px',
                textTransform: 'uppercase',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                }}
            />

            <Area 
                type="monotone" 
                dataKey="cpu" 
                stroke="var(--primary)" 
                strokeWidth={7}
                fill="transparent" 
                data={historicalData}
                isAnimationActive={false}
            />

            <Area 
                type="monotone" 
                dataKey="cpu" 
                stroke="url(#lineGrad)" 
                strokeWidth={7}
                strokeDasharray="12 12"
                fill="url(#cyberArea)"
                data={futureData}
                isAnimationActive={true}
            />

            <ReferenceLine 
                x={lastPoint.time} 
                stroke="var(--border)" 
                label={{ position: 'top', value: 'LIVE SCAN', fill: 'var(--foreground)', opacity: 0.2, fontSize: 10, fontWeight: 900, dy: -20 }} 
            />
            </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PredictiveForecast;
