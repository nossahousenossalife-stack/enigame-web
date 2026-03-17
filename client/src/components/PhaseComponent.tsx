import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Phase, checkAnswer } from '@/lib/phases';

interface PhaseComponentProps {
  phase: Phase;
  onCorrectAnswer: () => void;
}

export default function PhaseComponent({ phase, onCorrectAnswer }: PhaseComponentProps) {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const konamiSequence = useRef<string[]>([]);

  // Konami Code: Cima, Cima, Baixo, Baixo, Esquerda, Direita, Esquerda, Direita, B, A
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  // Limpar o campo de resposta quando a fase mudar
  useEffect(() => {
    setAnswer('');
    setShowHint(false);
    konamiSequence.current = [];
  }, [phase.id]);

  // Detectar Konami Code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      
      // Adicionar tecla à sequência
      konamiSequence.current.push(key);
      
      // Manter apenas os últimos 10 comandos
      if (konamiSequence.current.length > 10) {
        konamiSequence.current.shift();
      }

      // Verificar se o Konami Code foi digitado
      if (konamiSequence.current.length === 10) {
        const isKonamiCode = konamiCode.every((key, index) => {
          const userKey = konamiSequence.current[index];
          if (key === 'b' || key === 'a') {
            return userKey.toLowerCase() === key;
          }
          return userKey === key;
        });

        if (isKonamiCode && phase.id === 2) {
          toast.success('🎮 KONAMI CODE ATIVADO! Resposta revelada: deluxe');
          setAnswer('deluxe');
          konamiSequence.current = [];
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (checkAnswer(answer, phase.answer)) {
      toast.success('🎎 Resposta correta! Você avançou!');
      onCorrectAnswer();
    } else {
      toast.error('❌ Resposta incorreta. Tente novamente!');
      setAnswer('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full gap-8">

      {/* Enigma Image */}
      <div className="arcade-border p-4 bg-gray-900 max-w-2xl w-full">
        <img
          src={phase.imageUrl}
          alt={`Enigma - ${phase.title}`}
          className="w-full h-auto scanlines"
        />
      </div>

      {/* Phase Info */}
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold arcade-neon-yellow mb-2" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          {phase.title}
        </h1>
        {phase.question && (
          <p className="arcade-neon-cyan text-lg md:text-xl">
            {phase.question}
          </p>
        )}
      </div>

      {/* Answer Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md gap-4 flex flex-col">
        <div className="arcade-border p-4 bg-gray-900">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Digite sua resposta..."
            className="w-full bg-gray-800 text-lime-400 font-mono p-3 border-2 border-lime-400 focus:outline-none arcade-neon-green"
            autoFocus
          />
        </div>

        <button
          type="submit"
          className="arcade-border p-3 bg-gray-900 text-lime-400 font-bold text-lg transition-all hover:shadow-lg hover:shadow-lime-400 arcade-neon-green"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          ENVIAR
        </button>
      </form>

      {/* Hint Button */}
      <button
        onClick={() => setShowHint(!showHint)}
        className="arcade-border p-2 bg-gray-900 text-fuchsia-500 font-mono text-sm transition-all hover:shadow-lg hover:shadow-fuchsia-500 arcade-neon-magenta"
      >
        {showHint ? 'Ocultar Dica' : 'Mostrar Dica'}
      </button>

      {/* Hint */}
      {showHint && (
        <div className="arcade-border p-4 bg-gray-900 max-w-md text-center">
          <p className="arcade-neon-magenta text-sm md:text-base">
            💡 Dica: {phase.hint}
          </p>
        </div>
      )}


    </div>
  );
}
