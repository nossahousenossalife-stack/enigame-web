export interface Phase {
  id: number;
  url: string;
  title: string;
  question: string;
  answer: string;
  imageUrl: string;
  hint: string;
}

export const phases: Phase[] = [
  {
    id: 1,
    url: '/atrasdoarmario',
    title: 'FASE 1',
    question: 'Essa é o tutorial',
    answer: 'mario',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/fase1-kart-mario-54vf4ipchWCfcqzu6gr4qz.webp',
    hint: 'Este personagem é o herói mais famoso da Nintendo!',
  },
  {
    id: 2,
    url: '/sacodogoleiro',
    title: 'FASE 2',
    question: 'Qual é o nome deste jogo?',
    answer: 'supersidekicks',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/fase2-super-sidekicks-v3-9s5DAxbiN84vTrQtLNvsri.webp',
    hint: 'Do meio campo não vale',
  },
  {
    id: 3,
    url: '/hehehethankyou',
    title: 'FASE 3',
    question: '',
    answer: 'mercador',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/fase3-mercador-c9aswU3No4tN4tEigGQN3q.webp',
    hint: 'stranger',
  },
  // Fases 4-20 serão adicionadas conforme você enviar os dados
];

export const getPhaseByUrl = (url: string): Phase | undefined => {
  return phases.find((phase) => phase.url === url);
};

export const getPhaseById = (id: number): Phase | undefined => {
  return phases.find((phase) => phase.id === id);
};

export const normalizeAnswer = (answer: string): string => {
  return answer.toLowerCase().trim().replace(/\s+/g, '');
};

export const checkAnswer = (userAnswer: string, correctAnswer: string): boolean => {
  return normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer);
};
