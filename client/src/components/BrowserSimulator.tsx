import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';

interface BrowserSimulatorProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export default function BrowserSimulator({
  currentPath,
  onNavigate,
  children,
}: BrowserSimulatorProps) {
  const [urlInput, setUrlInput] = useState(`www.enigame.com.br${currentPath}`);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setUrlInput(`www.enigame.com.br${currentPath}`);
  }, [currentPath]);

  const handleUrlSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = urlInput.replace('www.enigame.com.br', '').trim() || '/';
      onNavigate(input);
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col arcade-border border-t-4 border-l-4 border-r-4">
      {/* Browser Chrome */}
      <div className="bg-gray-900 border-b-2 border-cyan-400 p-3 scanlines">
        {/* Navigation Bar */}
        <div className="flex items-center gap-2 mb-3">
          <button
            className="p-2 hover:bg-gray-800 border border-cyan-400 arcade-neon-cyan transition-all hover:shadow-lg hover:shadow-cyan-400"
            title="Voltar"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="p-2 hover:bg-gray-800 border border-cyan-400 arcade-neon-cyan transition-all hover:shadow-lg hover:shadow-cyan-400"
            title="Avançar"
          >
            <ChevronRight size={20} />
          </button>
          <button
            className="p-2 hover:bg-gray-800 border border-cyan-400 arcade-neon-cyan transition-all hover:shadow-lg hover:shadow-cyan-400"
            title="Recarregar"
          >
            <RotateCw size={20} />
          </button>
        </div>

        {/* URL Bar */}
        <div className="bg-gray-800 border-2 border-cyan-400 p-2 arcade-border">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={handleUrlSubmit}
            className="w-full bg-gray-800 text-lime-400 font-mono text-sm focus:outline-none arcade-neon-green"
            style={{
              textShadow: '0 0 10px #00ff00, 0 0 20px #00ff00',
            }}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-black scanlines p-6">
        {children}
      </div>
    </div>
  );
}
