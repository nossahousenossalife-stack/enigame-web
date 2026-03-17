import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Phase, checkAnswer } from '@/lib/phases';

interface PhaseComponentProps {
  phase: Phase;
  onCorrectAnswer: () => void;
}

export default function PhaseComponent({ phase, onCorrectAnswer }: PhaseComponentProps) {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Limpar o campo de resposta quando a fase mudar
  useEffect(() => {
    setAnswer('');
    setShowHint(false);
  }, [phase.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (checkAnswer(answer, phase.answer)) {
      toast.success('🎮 Resposta correta! Você avançou!');
      
      // Iniciar efeito de transição
      setIsTransitioning(true);
      
      // Aguardar a transição terminar antes de navegar
      setTimeout(() => {
        setIsTransitioning(false);
        onCorrectAnswer();
      }, 600);
    } else {
      toast.error('❌ Resposta incorreta. Tente novamente!');
      setAnswer('');
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-full gap-8 transition-all duration-600 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Pixel Disintegration Effect */}
      {isTransitioning && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-br from-cyan-400 to-magenta-500 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `pixelDisintegrate ${0.6 + Math.random() * 0.4}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.3}s`,
              }}
            />
          ))}
        </div>
      )}

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
            disabled={isTransitioning}
          />
        </div>

        <button
          type="submit"
          className="arcade-border p-3 bg-gray-900 text-lime-400 font-bold text-lg transition-all hover:shadow-lg hover:shadow-lime-400 arcade-neon-green disabled:opacity-50"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
          disabled={isTransitioning}
        >
          ENVIAR
        </button>
      </form>

      {/* Hint Button */}
      <button
        onClick={() => setShowHint(!showHint)}
        className="arcade-border p-2 bg-gray-900 text-fuchsia-500 font-mono text-sm transition-all hover:shadow-lg hover:shadow-fuchsia-500 arcade-neon-magenta disabled:opacity-50"
        disabled={isTransitioning}
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

      <style>{`
        @keyframes pixelDisintegrate {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
          }
        }
      `}</style>
    </div>
  );
}
