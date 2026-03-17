import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import BrowserSimulator from '@/components/BrowserSimulator';
import PhaseComponent from '@/components/PhaseComponent';
import Footer from '@/components/Footer';
import { phases, getPhaseByUrl } from '@/lib/phases';
import { toast } from 'sonner';

export default function Home() {
  const [location, setLocation] = useLocation();
  const [currentPhase, setCurrentPhase] = useState<typeof phases[0] | null>(null);
  const [phaseNotFound, setPhaseNotFound] = useState(false);

  // Parse current path from location
  useEffect(() => {
    const path = location || '/';
    
    if (path === '/' || path === '') {
      setCurrentPhase(null);
      setPhaseNotFound(false);
    } else {
      const phase = getPhaseByUrl(path);
      if (phase) {
        setCurrentPhase(phase);
        setPhaseNotFound(false);
      } else {
        setCurrentPhase(null);
        setPhaseNotFound(true);
      }
    }
  }, [location]);

  const handleNavigate = (path: string) => {
    setLocation(path);
  };

  const handlePhaseComplete = () => {
    toast.success('🎉 Fase concluída! Próxima fase em breve...');
    // Aqui você pode adicionar a navegação para a próxima fase
    setTimeout(() => {
      setLocation('/proxima-fase');
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserSimulator currentPath={location} onNavigate={handleNavigate}>
        {!currentPhase && !phaseNotFound && (
          <div className="flex flex-col items-center justify-center min-h-full gap-8">
            <div className="text-center">
              <h1
                className="text-4xl md:text-6xl font-bold arcade-neon-cyan mb-4 glitch"
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                ENIGAME
              </h1>
              <p className="arcade-neon-yellow text-lg md:text-2xl mb-8">
                Desafios de Videogame
              </p>
            </div>

            <div className="arcade-border p-8 bg-gray-900 max-w-2xl text-center">
              <p className="arcade-neon-green text-base md:text-lg mb-6">
                Bem-vindo ao Enigame! Um jogo de enigmas inspirado em NotPron,
                focado em videogames clássicos.
              </p>
              <p className="arcade-neon-cyan text-sm md:text-base mb-6">
                Responda corretamente ou altere a URL para avançar de fase.
              </p>
            </div>

            <button
              onClick={() => setLocation('/atrasdoarmario')}
              className="arcade-border p-4 bg-gray-900 text-lime-400 font-bold text-xl transition-all hover:shadow-lg hover:shadow-lime-400 arcade-neon-green"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              COMEÇAR
            </button>
          </div>
        )}

        {currentPhase && (
          <PhaseComponent phase={currentPhase} onCorrectAnswer={handlePhaseComplete} />
        )}

        {phaseNotFound && (
          <div className="flex flex-col items-center justify-center min-h-full gap-8">
            <h1
              className="text-4xl md:text-6xl font-bold arcade-neon-magenta"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              404
            </h1>
            <p className="arcade-neon-cyan text-lg md:text-2xl text-center">
              Fase não encontrada!
            </p>
            <button
              onClick={() => setLocation('/')}
              className="arcade-border p-4 bg-gray-900 text-lime-400 font-bold text-lg transition-all hover:shadow-lg hover:shadow-lime-400 arcade-neon-green"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              VOLTAR AO MENU
            </button>
          </div>
        )}
      </BrowserSimulator>
      <Footer />
    </div>
  );
}
