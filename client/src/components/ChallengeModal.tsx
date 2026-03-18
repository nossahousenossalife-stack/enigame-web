import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface ChallengeModalProps {
  onYes: () => void;
  onNo: () => void;
}

export function ChallengeModal({ onYes, onNo }: ChallengeModalProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const fullText = `Parabéns...Você que chegou até aqui mostrou seu valor, porém saiba que à partir daqui suas habilidades serão provadas, o tutorial já passou. Será muito mais difícil, e só os mais fortes irão adiante. Você está pronto?`;

  // Tocar som enigmático ao abrir o modal
  useEffect(() => {
    const audio = new Audio('data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==');
    // Criar um som enigmático com Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }, []);

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, fullText]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <audio ref={audioRef} />
      <div className="bg-gray-900 border-2 border-cyan-500 p-8 max-w-2xl w-full mx-4 rounded-lg shadow-2xl shadow-cyan-500/50">
        <div className="min-h-64 flex flex-col justify-between">
          <div className="text-cyan-400 font-mono text-lg leading-relaxed mb-8">
            {displayedText}
            {!isComplete && <span className="animate-pulse">_</span>}
          </div>

          {isComplete && (
            <div className="flex gap-4 justify-center animate-in fade-in">
              <Button
                onClick={onYes}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 text-lg"
              >
                SIM
              </Button>
              <Button
                onClick={onNo}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 text-lg"
              >
                NÃO
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
