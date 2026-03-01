'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles, Terminal, Maximize2, Settings2, Play, Loader2, Square, Monitor, Tablet, Smartphone } from 'lucide-react';
import Markdown from 'react-markdown';
import { useFlowStore } from '@/store/flow-store';
import { useAppStore } from '@/store/app-store';

export function StudioView() {
  const { messages, startFlow, flowState, previewCode, stopFlow, deviceMode, setDeviceMode } = useFlowStore();
  const { chatInput, setChatInput } = useAppStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!chatInput.trim() || flowState === 'running') return;
    const userMsg = chatInput;
    setChatInput('');
    await startFlow(userMsg);
  };

  const getIframeWidth = () => {
    switch (deviceMode) {
      case 'mobile': return 'w-[375px]';
      case 'tablet': return 'w-[768px]';
      case 'desktop': default: return 'w-full';
    }
  };

  return (
    <div className="flex h-full gap-6">
      {/* Left Column: Chat & Blueprint */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-1/3 flex flex-col gap-4"
      >
        <div className="flex-1 bg-surface rounded-[2.5rem] border border-border p-6 flex flex-col shadow-lg overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center border border-border">
                <Sparkles size={16} className="text-clay" />
              </div>
              <h2 className="text-lg font-bold">Creative Chat</h2>
            </div>
            {flowState === 'running' && (
              <button onClick={stopFlow} className="p-2 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors">
                <Square size={14} />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col gap-2 ${msg.role === 'user' ? 'self-end' : 'self-start'}`}>
                <div className={`px-4 py-3 text-sm max-w-[90%] ${
                  msg.role === 'user' 
                    ? 'bg-background border border-border rounded-2xl rounded-tr-sm self-end' 
                    : msg.role === 'system'
                    ? 'bg-transparent border border-border rounded-2xl text-text-secondary self-start font-mono text-xs'
                    : 'bg-moss/20 border border-moss/30 rounded-2xl rounded-tl-sm self-start'
                }`}>
                  <div className="markdown-body prose prose-invert prose-sm max-w-none prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-xl">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                </div>
              </div>
            ))}
            {flowState === 'running' && (
              <div className="self-start bg-moss/20 border border-moss/30 rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-[90%] flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-moss" />
                <span className="text-text-secondary">Processing flow...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="mt-4 relative">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe your vision..." 
              className="w-full bg-background border border-border rounded-full py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-clay/50 transition-colors text-text-primary placeholder:text-text-secondary"
              disabled={flowState === 'running'}
            />
            <button 
              onClick={handleSend}
              disabled={flowState === 'running' || !chatInput.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-clay rounded-full flex items-center justify-center hover:bg-[#A34629] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} className="text-white ml-1" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Live Preview */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 bg-surface rounded-[3rem] border border-border flex flex-col shadow-lg overflow-hidden relative"
      >
        {/* Preview Toolbar */}
        <div className="h-14 border-b border-border flex items-center justify-between px-6 bg-background/50">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="text-xs font-mono text-text-secondary flex items-center gap-2">
              <Terminal size={14} />
              <span>Preview Build: {flowState === 'completed' ? 'Ready' : flowState === 'running' ? 'Building...' : 'Idle'}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-background rounded-full p-1 border border-border">
            <button 
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-full transition-colors ${deviceMode === 'desktop' ? 'bg-surface text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <Monitor size={14} />
            </button>
            <button 
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded-full transition-colors ${deviceMode === 'tablet' ? 'bg-surface text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <Tablet size={14} />
            </button>
            <button 
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-full transition-colors ${deviceMode === 'mobile' ? 'bg-surface text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <Smartphone size={14} />
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-background relative overflow-hidden flex items-center justify-center">
          {previewCode ? (
            <div className={`h-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${getIframeWidth()}`}>
              <iframe 
                srcDoc={previewCode} 
                className="w-full h-full border-none bg-white" 
                title="Live Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          ) : (
            <>
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--border)_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="relative z-10 w-full max-w-2xl text-center">
                <h1 className="text-6xl font-bold font-sans tracking-tight mb-4">
                  Nature is the <br/>
                  <span className="font-serif italic text-clay font-normal">Algorithm.</span>
                </h1>
                <p className="text-text-secondary max-w-md mx-auto">
                  Biological optimization through the lens of high-fidelity diagnostics.
                </p>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
