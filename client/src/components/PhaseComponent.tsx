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
  const [alternativeHintMessage, setAlternativeHintMessage] = useState<string | null>(null);
  const konamiSequence = useRef<string[]>([]);

  // Konami Code: Cima, Cima, Baixo, Baixo, Esquerda, Direita, Esquerda, Direita, B, A
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  // Limpar o campo de resposta quando a fase mudar
  useEffect(() => {
    setAnswer('');
    setShowHint(false);
    setAlternativeHintMessage(null);
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
      setAlternativeHintMessage(null);
      onCorrectAnswer();
    } else {
      // Verificar se há dicas alternativas
      const userAnswerLower = answer.toLowerCase().trim();
      let foundAlternativeHint = null;

      if (phase.alternativeHints) {
        for (const altHint of phase.alternativeHints) {
          for (const keyword of altHint.keywords) {
            if (userAnswerLower.includes(keyword.toLowerCase())) {
              foundAlternativeHint = altHint.message;
              break;
            }
          }
          if (foundAlternativeHint) break;
        }
      }

      if (foundAlternativeHint) {
        setAlternativeHintMessage(foundAlternativeHint);
      } else {
        toast.error('❌ Resposta incorreta. Tente novamente!');
        setAlternativeHintMessage(null);
      }
      setAnswer('');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-black text-white overflow-hidden">
      {/* Header com título e fase */}
      <div className="text-center py-3 border-b-2 border-lime-400">
        <h1 className="text-xl md:text-2xl font-bold arcade-neon-yellow" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          {phase.title}
        </h1>
      </div>

      {/* Conteúdo Principal - Flex para distribuir espaço */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-hidden">
        {/* Imagem - Esquerda */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="arcade-border p-2 bg-gray-900 w-full h-full flex items-center justify-center">
            <img
              src={phase.imageUrl}
              alt={`Enigma - ${phase.title}`}
              className="w-full h-full object-contain scanlines"
            />
          </div>
        </div>

        {/* Formulário e Dicas - Direita */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-3">
          {/* Pergunta se existir */}
          {phase.question && (
            <div className="text-center">
              <p className="arcade-neon-cyan text-sm md:text-base">
                {phase.question}
              </p>
            </div>
          )}

          {/* Balão de Dica Alternativa - ACIMA da caixa */}
          {alternativeHintMessage && (
            <div className="arcade-border p-3 bg-gray-900 text-center">
              <p className="arcade-neon-cyan text-xs md:text-sm">
                💬 {alternativeHintMessage}
              </p>
            </div>
          )}

          {/* Answer Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="arcade-border p-2 bg-gray-900">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Digite sua resposta..."
                className="w-full bg-gray-800 text-lime-400 font-mono p-2 border-2 border-lime-400 focus:outline-none arcade-neon-green text-sm"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="arcade-border p-2 bg-gray-900 text-lime-400 font-bold text-sm transition-all hover:shadow-lg hover:shadow-lime-400 arcade-neon-green"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              ENVIAR
            </button>
          </form>

          {/* Dica e Botões */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex-1 arcade-border p-2 bg-gray-900 text-fuchsia-500 font-mono text-xs transition-all hover:shadow-lg hover:shadow-fuchsia-500 arcade-neon-magenta"
            >
              {showHint ? 'Ocultar' : 'Dica'}
            </button>
          </div>

          {/* Hint */}
          {showHint && (
            <div className="arcade-border p-2 bg-gray-900 text-center">
              <p className="arcade-neon-magenta text-xs md:text-sm">
                💡 {phase.hint}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
