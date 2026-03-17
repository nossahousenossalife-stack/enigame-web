import { useState } from 'react';
import { toast } from 'sonner';

interface Phase1Props {
  onCorrectAnswer: () => void;
}

export default function Phase1({ onCorrectAnswer }: Phase1Props) {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedAnswer = answer.toLowerCase().trim().replace(/\s+/g, '');
    const correctAnswer = 'mario';

    if (normalizedAnswer === correctAnswer) {
      toast.success('🎮 Resposta correta! Você avançou!');
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
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/fase1-kart-mario-54vf4ipchWCfcqzu6gr4qz.webp"
          alt="Enigma - Kart com interrogação"
          className="w-full h-auto scanlines"
        />
      </div>

      {/* Phase Info */}
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold arcade-neon-yellow mb-2" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          FASE 1
        </h1>
        <p className="arcade-neon-cyan text-lg md:text-xl">
          O que está faltando no Kart?
        </p>
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
            💡 Dica: Este personagem é o herói mais famoso da Nintendo!
          </p>
        </div>
      )}
    </div>
  );
}
