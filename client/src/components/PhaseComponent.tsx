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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Konami Code: Cima, Cima, Baixo, Baixo, Esquerda, Direita, Esquerda, Direita, B, A
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  // Limpar o campo de resposta quando a fase mudar e gerenciar áudio
  useEffect(() => {
    setAnswer('');
    setShowHint(false);
    konamiSequence.current = [];

    // Parar áudio anterior se existir
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    // Se a fase tem áudio, criar e reproduzir em loop
    if (phase.audioUrl) {
      const audio = new Audio(phase.audioUrl);
      audio.volume = 0.3; // Volume em 30%
      audio.loop = true; // Ativar loop
      audioRef.current = audio;
      // Aguardar um pouco para garantir que o áudio está pronto
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch((err) => console.log('Erro ao reproduzir áudio:', err));
        }
      }, 100);
    }

    return () => {
      // Parar áudio ao sair da fase
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [phase.id, phase.audioUrl]);

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

    if (checkAnswer(answer, phase.answer, phase.id)) {
      // Parar áudio ao avançar de fase
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
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
        // Mostrar dica condicional como popup modal
        setAlternativeHintMessage(foundAlternativeHint);
        // Fechar popup após 5 segundos
        setTimeout(() => setAlternativeHintMessage(null), 5000);
      } else {
        toast.error('❌ Resposta incorreta. Tente novamente!');
      }
      setAnswer('');
    }
  };

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  // Fechar modal ao clicar fora
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setAlternativeHintMessage(null);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-black text-white overflow-hidden p-4">
      {/* Audio player invisível para a Fase 14 */}
      {phase.audioUrl && (
        <audio
          ref={audioRef}
          src={phase.audioUrl}
          loop={false}
          style={{ display: 'none' }}
        />
      )}
      {/* Header */}
      <div className="text-center py-2 mb-2">
        <h1 className="text-lg md:text-xl font-bold arcade-neon-yellow" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          {phase.title}
        </h1>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col items-center justify-start overflow-y-auto pt-20">
        
        {/* Imagem - Tamanho ampliado */}
        <div className="arcade-border p-2 bg-gray-900 mb-4" style={{ maxWidth: '90vw', maxHeight: '60vh', width: '100%' }}>
          <img
            src={phase.imageUrl}
            alt={`Enigma - ${phase.title}`}
            className="w-full h-full object-contain scanlines"
          />
        </div>

        {/* Pergunta se existir */}
        {phase.question && (
          <div className="text-center mb-3 max-w-sm">
            <p className="arcade-neon-cyan text-sm">
              {phase.question}
            </p>
          </div>
        )}

        {/* Answer Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-sm">
          <div className="arcade-border p-2 bg-gray-900">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Digite sua resposta..."
              className="w-full bg-gray-800 text-lime-400 font-mono p-2 border-2 border-lime-400 focus:outline-none arcade-neon-green text-xs"
              autoFocus
            />
          </div>

          <div className="flex gap-2 w-full">
            <button
              type="submit"
              className="flex-1 arcade-border p-2 bg-gray-900 text-lime-400 font-bold text-xs transition-all hover:shadow-lg hover:shadow-lime-400 arcade-neon-green"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              ENVIAR
            </button>
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="flex-1 arcade-border p-2 bg-gray-900 text-fuchsia-500 font-mono text-xs transition-all hover:shadow-lg hover:shadow-fuchsia-500 arcade-neon-magenta"
            >
              {showHint ? 'Ocultar' : 'Dica'}
            </button>
          </div>
        </form>

        {/* Hint */}
        {showHint && (
          <div className="arcade-border p-3 bg-gray-900 text-center mt-6 mb-4 max-w-md">
            <p className="arcade-neon-magenta text-sm md:text-base">
              💡 {phase.hint}
            </p>
          </div>
        )}

        {/* Modal para Dica Condicional */}
        {alternativeHintMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 pt-40" onClick={handleModalClick}>
            <div className="arcade-border p-6 bg-gray-900 text-center max-w-lg w-11/12">
              <p className="arcade-neon-cyan text-base md:text-lg">
                💬 {alternativeHintMessage}
              </p>
            </div>
          </div>
        )}
        
        {/* Link para Fase 11 - Fora do quadrado de dica */}
        {showHint && phase.id === 11 && (
          <div className="mt-3 max-w-sm text-center">
            <a
              href="https://veiling.com.br/wp-content/uploads/2025/06/celosia-cristata-683f1639bb911.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 text-xs hover:underline cursor-pointer select-all inline-block"
            >
              https://veiling.com.br/wp-content/uploads/2025/06/celosia-cristata-683f1639bb911.jpg
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
