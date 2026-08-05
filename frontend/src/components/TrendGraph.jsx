import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrendGraph = ({ data }) => {
  return (
    <div className="w-full h-[300px] industrial-glass rounded-3xl p-6 relative overflow-hidden">
      <div className="absolute top-4 left-4 flex items-center gap-2 mb-4">
        <div className="w-1.5 h-6 bg-primary rounded-full transition-all duration-300" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40">Temporal Analysis Stream</h3>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data} margin={{ top: 40, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAmbient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2c666e" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2c666e" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorCPU" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e9c46a" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#e9c46a" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorRPM" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e76f51" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#e76f51" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis hide dataKey="time" />
          <YAxis hide domain={[0, 100]} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(240, 237, 238, 0.9)', 
              borderRadius: '20px', 
              border: 'none', 
              fontSize: '10px', 
              color: '#2c666e',
              fontWeight: '900',
              textTransform: 'uppercase'
            }} 
            itemStyle={{ color: '#2c666e' }}
          />
          <Area 
            type="monotone" 
            dataKey="ambient" 
            stroke="#2c666e" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorAmbient)" 
            isAnimationActive={false}
          />
          <Area 
            type="monotone" 
            dataKey="cpu" 
            stroke="#e9c46a" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorCPU)" 
            isAnimationActive={false}
          />
          <Area 
            type="monotone" 
            dataKey="rpm" 
            stroke="#e76f51" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorRPM)" 
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="flex justify-center gap-10 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-[9px] font-black uppercase text-foreground/40">Ambient</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-amber" />
          <span className="text-[9px] font-black uppercase text-foreground/40">CPU</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-red" />
          <span className="text-[9px] font-black uppercase text-foreground/40">Fan RPM</span>
        </div>
      </div>
    </div>
  );
};

export default TrendGraph;
