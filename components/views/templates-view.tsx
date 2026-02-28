'use client';

import { motion } from 'motion/react';
import { FileText, Plus, Search, SlidersHorizontal } from 'lucide-react';

export function TemplatesView() {
  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FileText className="text-clay" />
            Prompt Templates
          </h2>
          <p className="text-text-secondary text-sm mt-1">Structured DNA for creative generation.</p>
        </div>
        <button className="px-4 py-2 bg-clay hover:bg-[#A34629] text-white rounded-full text-sm font-medium transition-colors flex items-center gap-2">
          <Plus size={16} />
          New Template
        </button>
      </div>

      <div className="flex items-center gap-4 bg-surface rounded-2xl border border-white/5 p-2">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search templates..." 
            className="w-full bg-transparent border-none pl-12 pr-4 py-2 text-sm focus:outline-none"
          />
        </div>
        <div className="w-px h-6 bg-white/10" />
        <button className="p-2 text-text-secondary hover:text-white transition-colors flex items-center gap-2 text-sm px-4">
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Cinematic Dark Mode', category: 'Aesthetic', version: 'v1.2' },
            { name: 'B2B SaaS Premium', category: 'Industry', version: 'v2.0' },
            { name: 'GSAP Scroll Sequence', category: 'Animation', version: 'v1.0' },
            { name: 'Brutalist Portfolio', category: 'Aesthetic', version: 'v3.1' },
            { name: 'E-commerce Luxury', category: 'Industry', version: 'v1.5' },
            { name: 'Micro-interactions Pack', category: 'Interaction', version: 'v2.2' },
          ].map((template, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-surface rounded-[2rem] border border-white/5 p-6 hover:border-white/20 transition-all cursor-pointer flex flex-col h-48"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-text-secondary uppercase tracking-widest">{template.category}</span>
                <span className="text-xs font-mono bg-white/5 px-2 py-1 rounded-md">{template.version}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-clay transition-colors">{template.name}</h3>
              <p className="text-sm text-text-secondary mt-auto">System prompt module for injecting specific creative constraints.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
