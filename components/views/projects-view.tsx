'use client';

import { motion } from 'motion/react';
import { FolderKanban, Plus, Clock, ArrowRight } from 'lucide-react';

export function ProjectsView() {
  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FolderKanban className="text-clay" />
            Projects
          </h2>
          <p className="text-text-secondary text-sm mt-1">Manage your creative workspaces.</p>
        </div>
        <button className="px-4 py-2 bg-clay hover:bg-[#A34629] text-white rounded-full text-sm font-medium transition-colors flex items-center gap-2">
          <Plus size={16} />
          New Project
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Nura Health Landing', status: 'Active', updated: '2 hours ago', flows: 12 },
            { name: 'Fintech Dashboard v2', status: 'Paused', updated: '3 days ago', flows: 45 },
            { name: 'AI Studio Marketing', status: 'Completed', updated: '1 week ago', flows: 8 },
            { name: 'E-commerce Redesign', status: 'Active', updated: '4 hours ago', flows: 22 },
          ].map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-surface rounded-[2rem] border border-white/5 p-6 hover:border-white/20 transition-all cursor-pointer flex flex-col h-56 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex justify-between items-start mb-4">
                <span className={`text-xs font-mono uppercase tracking-widest px-2 py-1 rounded-md ${
                  project.status === 'Active' ? 'bg-moss/20 text-moss border border-moss/30' :
                  project.status === 'Completed' ? 'bg-white/10 text-white border border-white/20' :
                  'bg-white/5 text-text-secondary border border-white/10'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <h3 className="relative z-10 text-xl font-bold mb-2 group-hover:text-clay transition-colors">{project.name}</h3>
              
              <div className="relative z-10 mt-auto flex flex-col gap-2 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>Updated {project.updated}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FolderKanban size={14} />
                  <span>{project.flows} Flows Generated</span>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <div className="w-10 h-10 rounded-full bg-clay flex items-center justify-center text-white">
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
