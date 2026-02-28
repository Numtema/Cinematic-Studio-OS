'use client';

import { useAppStore } from '@/store/app-store';
import { useFlowStore } from '@/store/flow-store';
import { motion } from 'motion/react';
import { ChevronDown, Zap, Download, Loader2 } from 'lucide-react';

export function TopBar() {
  const { isSidebarCollapsed } = useAppStore();
  const { flowState, activeNode, exportBuild } = useFlowStore();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        left: isSidebarCollapsed ? 112 : 300 
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-4 right-8 z-40 h-16 bg-surface/80 backdrop-blur-xl border border-white/5 rounded-full px-6 flex items-center justify-between shadow-lg"
    >
      {/* Left section: Project selector & Status */}
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-white transition-colors">
          <span className="opacity-50">Project:</span>
          <span>Nura Health Landing</span>
          <ChevronDown size={14} className="opacity-50" />
        </button>

        <div className="h-4 w-px bg-white/10" />

        <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
          <div className={`w-2 h-2 rounded-full ${flowState === 'running' ? 'bg-clay animate-pulse shadow-[0_0_8px_#CC5833]' : 'bg-moss shadow-[0_0_8px_#2E4036]'}`} />
          <span>{flowState === 'running' ? 'SYSTEM PROCESSING' : 'SYSTEM OPERATIONAL'}</span>
        </div>
      </div>

      {/* Right section: Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs font-mono text-text-secondary">
          {flowState === 'running' ? <Loader2 size={12} className="text-clay animate-spin" /> : <Zap size={12} className="text-clay" />}
          <span>NODE: {activeNode ? activeNode : 'IDLE'}</span>
        </div>

        <button 
          onClick={exportBuild}
          disabled={flowState !== 'completed'}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-clay hover:bg-[#A34629] text-white text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(204,88,51,0.3)] disabled:opacity-50 disabled:pointer-events-none"
        >
          <Download size={14} />
          <span>Export Build</span>
        </button>
      </div>
    </motion.header>
  );
}
