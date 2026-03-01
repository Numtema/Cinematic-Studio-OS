'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Plus, Search, SlidersHorizontal, X, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store/app-store';

const TEMPLATES = [
  { 
    id: '1', 
    name: 'Cinematic Dark Mode', 
    category: 'Aesthetic', 
    version: 'v1.2',
    description: 'Injects a premium, dark-themed aesthetic with high contrast, subtle noise overlays, and dramatic typography. Perfect for high-end product launches or creative portfolios.',
    prompt: 'Design a cinematic landing page with a dark theme. Use a noise overlay, dramatic serif typography for headings, and high-contrast neon accents. Ensure smooth scroll animations and a premium feel.'
  },
  { 
    id: '2', 
    name: 'B2B SaaS Premium', 
    category: 'Industry', 
    version: 'v2.0',
    description: 'Structured layout for B2B software products. Focuses on clear value propositions, trust signals, feature grids, and clean, trustworthy typography.',
    prompt: 'Create a premium B2B SaaS landing page. Include a hero section with a clear value proposition, a logo cloud for social proof, a bento-grid feature section, and a clear call-to-action. Use a clean, trustworthy color palette.'
  },
  { 
    id: '3', 
    name: 'GSAP Scroll Sequence', 
    category: 'Animation', 
    version: 'v1.0',
    description: 'Adds complex, scroll-linked animations using GSAP ScrollTrigger. Ideal for storytelling experiences where elements reveal themselves dynamically as the user scrolls.',
    prompt: 'Build a storytelling landing page heavily reliant on GSAP ScrollTrigger. Elements should fade in, scale, or slide based on scroll position. Include pinned sections and parallax effects.'
  },
  { 
    id: '4', 
    name: 'Brutalist Portfolio', 
    category: 'Aesthetic', 
    version: 'v3.1',
    description: 'Raw, unpolished aesthetic with oversized typography, harsh borders, and high-energy colors. Best for creative agencies or experimental designers.',
    prompt: 'Design a brutalist portfolio. Use oversized, bold sans-serif typography, thick borders, neon accent colors on a stark background, and marquee text animations.'
  },
  { 
    id: '5', 
    name: 'E-commerce Luxury', 
    category: 'Industry', 
    version: 'v1.5',
    description: 'Minimalist layout designed to let product photography shine. Features subtle interactions, elegant serif fonts, and spacious layouts.',
    prompt: 'Create a luxury e-commerce product page. Use a minimalist layout, elegant serif typography, subtle hover interactions on product images, and a sticky "Add to Cart" bar.'
  },
  { 
    id: '6', 
    name: 'Micro-interactions Pack', 
    category: 'Interaction', 
    version: 'v2.2',
    description: 'Focuses on the small details: magnetic buttons, custom cursors, hover reveals, and satisfying click states to elevate the overall feel.',
    prompt: 'Enhance this interface with premium micro-interactions. Add magnetic hover effects to all buttons, a custom cursor that changes state over clickable elements, and smooth spring animations for all state changes.'
  },
];

export function TemplatesView() {
  const [selectedTemplate, setSelectedTemplate] = useState<typeof TEMPLATES[0] | null>(null);
  const { setChatInput, setActiveView } = useAppStore();

  const handleUseTemplate = (template: typeof TEMPLATES[0]) => {
    setChatInput(template.prompt);
    setActiveView('studio');
  };

  return (
    <div className="h-full flex flex-col gap-6 relative">
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

      <div className="flex items-center gap-4 bg-surface rounded-2xl border border-border p-2">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search templates..." 
            className="w-full bg-transparent border-none pl-12 pr-4 py-2 text-sm focus:outline-none text-text-primary placeholder:text-text-secondary"
          />
        </div>
        <div className="w-px h-6 bg-border" />
        <button className="p-2 text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 text-sm px-4">
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedTemplate(template)}
              className="group bg-surface rounded-[2rem] border border-border p-6 hover:border-clay/50 transition-all cursor-pointer flex flex-col h-48 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-clay/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-text-secondary uppercase tracking-widest">{template.category}</span>
                <span className="text-xs font-mono bg-background border border-border px-2 py-1 rounded-md text-text-secondary">{template.version}</span>
              </div>
              <h3 className="relative z-10 text-lg font-bold mb-2 group-hover:text-clay transition-colors">{template.name}</h3>
              <p className="relative z-10 text-sm text-text-secondary mt-auto line-clamp-2">{template.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Template Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-border rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-clay to-moss" />
              
              <button 
                onClick={() => setSelectedTemplate(null)}
                className="absolute top-6 right-6 text-text-secondary hover:text-text-primary transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-clay bg-clay/10 px-3 py-1.5 rounded-md uppercase tracking-widest border border-clay/20">
                  {selectedTemplate.category}
                </span>
                <span className="text-xs font-mono text-text-secondary bg-background border border-border px-3 py-1.5 rounded-md">
                  {selectedTemplate.version}
                </span>
              </div>

              <h3 className="text-3xl font-bold mb-4 font-serif">{selectedTemplate.name}</h3>
              
              <div className="mb-8">
                <h4 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-2">Purpose & Use Case</h4>
                <p className="text-text-primary leading-relaxed">{selectedTemplate.description}</p>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-2">Prompt DNA</h4>
                <div className="bg-background border border-border rounded-xl p-4 font-mono text-sm text-text-primary/80 leading-relaxed">
                  {selectedTemplate.prompt}
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={() => handleUseTemplate(selectedTemplate)}
                  className="px-6 py-3 bg-clay hover:bg-[#A34629] text-white rounded-full font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(204,88,51,0.3)]"
                >
                  Use Template in Studio
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
