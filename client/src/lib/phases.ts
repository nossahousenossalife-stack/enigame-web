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
    hint: 'Cano',
  },
  {
    id: 2,
    url: '/sacodogoleiro',
    title: 'FASE 2',
    question: '',
    answer: 'deluxe',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/fase2-allejo-gol-KLcHkcvwAvhRU4yWtyC6db.webp',
    hint: 'International..... ultima palavra',
  },
  {
    id: 3,
    url: '/hehehethankyou',
    title: 'FASE 3',
    question: '',
    answer: 'mercador',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/fase3-mercador-comum-KjeHrpgiRVfHeYs5KUJw2Z.webp',
    hint: 'stranger',
  },
  {
    id: 4,
    url: '/c4',
    title: 'FASE 4',
    question: '',
    answer: 'bomba patch',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/fase4-custom-cropped_e707ea8f.png',
    hint: 'É ruim',
  },
  {
    id: 5,
    url: '/ytb',
    title: 'FASE 5',
    question: '',
    answer: 'saria song',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/fase5-zelda-saria-final-4rCaRNTojs2o78XMAeTFFM.webp',
    hint: 'Base',
  },
  {
    id: 6,
    url: '/-r',
    title: 'FASE 6',
    question: '',
    answer: 'bowser',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/fase6-bowser-browsers-ahjvEXuGaL9m3XUHrqERuc.webp',
    hint: 'BOSS',
  },
  {
    id: 7,
    url: '/steamapp',
    title: 'FASE 7',
    question: '',
    answer: 'atreus',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/fase7-god-of-war-v4-Q7erZ629nCm7mBqcW5GUv5.webp',
    hint: 'filho',
  },
  {
    id: 8,
    url: '/matador',
    title: 'FASE 8',
    question: '',
    answer: 'origin',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/fase8-pyramid-head-egito-Nh9reS3g5RaiAtdgiG7x6P.webp',
    hint: 'My sacrifice',
  },
  // Fases 9-20 serão adicionadas conforme você enviar os dados
];

export const getPhaseByUrl = (url: string): Phase | undefined => {
  return phases.find((phase) => phase.url === url);
};

export const getPhaseById = (id: number): Phase | undefined => {
  return phases.find((phase) => phase.id === id);
};

export const normalizeAnswer = (answer: string): string => {
  return answer.toLowerCase().trim().replace(/[\s']/g, '');
};

export const checkAnswer = (userAnswer: string, correctAnswer: string): boolean => {
  const normalized = normalizeAnswer(userAnswer);
  const correctNormalized = normalizeAnswer(correctAnswer);
  
  // Para a Fase 5 (Saria's Song), aceitar múltiplas variações
  if (correctNormalized === 'sariasong') {
    return normalized === 'sariasong' || normalized === 'sariassong';
  }
  
  return normalized === correctNormalized;
};
