import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Trash2, ShieldCheck } from 'lucide-react';

const AuditLog = ({ logs }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-10 transition-all duration-700 no-underline"
    >
      <div className="card-industrial min-h-[80vh] flex flex-col p-12 no-underline">
        {/* Header: No Underlines (v4.1) */}
        <div className="flex justify-between items-center mb-16 no-underline">
            <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <FileText className="w-7 h-7" />
                </div>
                <div>
                   <h2 className="text-5xl font-black uppercase tracking-tighterest italic text-foreground leading-none mb-2 no-underline">HISTORICAL AUDIT.</h2>
                   <span className="text-[11px] font-black uppercase tracking-[0.8em] text-foreground/20">Sequential Optimization Integrity</span>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <button className="px-8 py-3 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary/20 transition-all no-underline">
                    EXPORT DATA
                </button>
            </div>
        </div>

        {/* Professional Log Table */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
            <table className="w-full text-left border-separate border-spacing-y-4">
                <thead className="sticky top-0 bg-card z-20">
                    <tr className="text-[11px] font-black uppercase tracking-widest text-foreground/20">
                        <th className="px-8 py-4">TIMESTAMP</th>
                        <th className="px-8 py-4">PROTOCOL LOG</th>
                        <th className="px-8 py-4">AI CLASSIFICATION</th>
                        <th className="px-8 py-4 text-right">NODE SECURITY</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5 no-underline">
                    {logs.map((log, i) => (
                        <motion.tr 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.02 }}
                            key={i} 
                            className="group hover:bg-white/5 transition-all text-xs no-underline"
                        >
                            <td className="px-8 py-8 data-mono font-bold text-primary">{log.time}</td>
                            <td className="px-8 py-8 font-bold text-foreground/40 italic uppercase tracking-tighter leading-none no-underline">
                                "{log.event.split(':')[1] || "System sequence verification success."}"
                            </td>
                            <td className="px-8 py-8 font-black uppercase tracking-widest no-underline">
                                <span className={`px-4 py-2 rounded-lg text-[10px] ${log.event.includes('CRITICAL') ? 'bg-accent-red/10 text-accent-red' : log.event.includes('WARNING') ? 'bg-accent-amber/10 text-accent-amber' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                    {log.event.split(':')[0]}
                                </span>
                            </td>
                            <td className="px-8 py-8 text-right font-mono opacity-20 no-underline whitespace-nowrap">
                                <span className="flex items-center justify-end gap-2">
                                    0x{((i + 140) * 1234).toString(16).toUpperCase()}
                                    <ShieldCheck className="w-3 h-3" />
                                </span>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Industrial Footer Detail */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex justify-between items-center opacity-20">
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">ThermaSense Core v4.1 Intelligence</span>
            <div className="flex items-center gap-10">
                <span className="text-[10px] font-mono tracking-widest">MD5_CHECKSUM: A2-4F-E1-BC</span>
                <span className="text-[10px] font-mono tracking-widest">TIMESTAMP: {new Date().getFullYear()}</span>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuditLog;
