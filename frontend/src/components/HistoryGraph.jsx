import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const HistoryGraph = ({ data }) => {
  return (
    <div className="w-full h-[120px] glass-ai rounded-[2rem] p-6 relative overflow-hidden">
      <div className="absolute top-4 left-6 z-10">
         <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground/30">History Trail</h3>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
          <XAxis hide dataKey="time" />
          <YAxis hide domain={[0, 100]} />
          <Area 
            type="stepAfter" 
            dataKey="cpu" 
            stroke="var(--primary)" 
            strokeWidth={2}
            fill="rgba(0, 242, 255, 0.05)" 
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryGraph;
