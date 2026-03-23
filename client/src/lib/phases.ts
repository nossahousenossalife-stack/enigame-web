export interface Phase {
  id: number;
  url: string;
  title: string;
  question: string;
  answer: string;
  imageUrl: string;
  hint: string;
  alternativeHints?: Array<{ keywords: string[]; message: string }>;
  audioUrl?: string;
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
    alternativeHints: [
      { keywords: ['mario kart', 'kart'], message: 'Somente o encanador' },
    ],
  },
  {
    id: 2,
    url: '/deluxe',
    title: 'FASE 2',
    question: '',
    answer: 'deluxe',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/fase2-allejo-gol-KLcHkcvwAvhRU4yWtyC6db.webp',
    hint: 'International..... ultima palavra',
    alternativeHints: [
      { keywords: ['futebol', 'soccer', 'international superstar soccer'], message: 'Mas qual? Na época do SNES' },
      { keywords: ['international superstar soccer', 'soccer'], message: 'Lembra da dica? Só preciso da última palavra' },
    ],
  },
  {
    id: 3,
    url: '/hehehethankyou',
    title: 'FASE 3',
    question: '',
    answer: 'mercador',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/k7m2p9x4_184ec8bc.webp',
    hint: 'stranger',
    alternativeHints: [
      { keywords: ['resident evil', 'leon', 'resident evil 4'], message: 'Somente o vendedor' },
    ],
  },
  {
    id: 4,
    url: '/c4',
    title: 'FASE 4',
    question: '',
    answer: 'bomba patch',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/fase4-custom-cropped_e707ea8f.png',
    hint: 'É ruim',
    alternativeHints: [
      { keywords: ['matrix'], message: 'Sério? Não cara. C4 é um tipo de?' },
    ],
  },
  {
    id: 5,
    url: '/ytb',
    title: 'FASE 5',
    question: '',
    answer: 'saria song',
    imageUrl: 'https://iili.io/qhf8E3g.png',
    hint: 'Base',
    alternativeHints: [
      { keywords: ['zelda', 'link', 'the legend of zelda', 'ocarina of time', 'ocarina'], message: 'É música para meus ouvidos' },
    ],
  },
  {
    id: 6,
    url: '/-r',
    title: 'FASE 6',
    question: '',
    answer: 'bowser',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/j3n8w5q1_22055136.webp',
    hint: 'BOSS',
    alternativeHints: [
      { keywords: ['navegador'], message: 'Boss em inglês é o que?' },
    ],
  },
  {
    id: 7,
    url: '/steamapp',
    title: 'FASE 7',
    question: '',
    answer: 'atreus',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/r6t1v9z3_06fef855.webp',
    hint: 'filho',
    alternativeHints: [
      { keywords: ['bolinha', 'circulo', 'god of war', 'gta', 'controle'], message: 'Não cara, Pelos Deuses' },
    ],
  },
  {
    id: 8,
    url: '/matador',
    title: 'FASE 8',
    question: '',
    answer: 'origins',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/fase8-pyramid-head-egito-Nh9reS3g5RaiAtdgiG7x6P.webp',
    hint: 'My sacrifice',
    alternativeHints: [
      { keywords: ['silent hill', 'piramid head', 'egito'], message: 'A banda dona dessa música tem no nome do game' },
    ],
  },
  {
    id: 9,
    url: '/eht',
    title: 'FASE 9',
    question: '',
    answer: 'the sims',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/b4h7m2c8_3cf4f3c4.webp',
    hint: 'Existem 4?',
    alternativeHints: [],
  },
  {
    id: 10,
    url: '/anéis',
    title: 'FASE 10',
    question: '',
    answer: 'tails',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/fase10-kurama-caldas-v3-FBvxt9FtPk33nUmssnN696.webp',
    hint: 'Esmeralda',
    alternativeHints: [
      { keywords: ['sonic'], message: 'Meu doce preferido é calda de chocolate' },
    ],
  },
  {
    id: 11,
    url: '/16',
    title: 'FASE 11',
    question: '',
    answer: 'agro',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/f9x2k5p7_b630d069.webp',
    hint: 'Ponto fraco',
    alternativeHints: [
      { keywords: ['celosia'], message: '...celosia é pop, celosia é tec' },
      { keywords: ['shadow of the colossus'], message: 'Shadow é pop, shadow é tec' },
      { keywords: ['16', 'boss', 'planta'], message: 'O número da fase é um boss, além de uma planta?' },
    ],
  },
  {
    id: 12,
    url: '/salvarcomo...',
    title: 'FASE 12',
    question: '',
    answer: 'mineirinho',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/acondroplasia-oFBewWg897suH2oiXjPxpe.webp',
    hint: 'goma de mascar',
    alternativeHints: [],
  },
  {
    id: 13,
    url: '/HEX',
    title: 'FASE 13',
    question: '',
    answer: 'donatello',
    imageUrl: 'https://iili.io/qwRJBPS.png',
    hint: 'Ele e mais 3',
    alternativeHints: [
      { keywords: ['raphael', 'rafael', 'leonardo', 'michelangelo', 'tartaruga ninja', 'tartaruga'], message: 'não, foca no bastão...lá ele!' },
    ],
  },
  {
    id: 14,
    url: '/+33',
    title: 'FASE 14',
    question: '',
    answer: 'clair obscur',
    imageUrl: 'https://iili.io/qw7fdNt.png',
    hint: 'Empilhadeira se usa muito nesse setor',
    audioUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/fase14-audio_32aa1376.mp3',
    alternativeHints: [
      { keywords: ['clair obscur expedition 33', 'expedition 33'], message: 'só quero as 2 primeiras palavras' },
    ],
  },
  {
    id: 15,
    url: '/a.cd.c',
    title: 'FASE 15',
    question: '',
    answer: 'epoch',
    imageUrl: 'https://iili.io/qw0YcR2.webp',
    hint: '12ka.c',
    alternativeHints: [
      { keywords: ['chrono trigger', 'cronos', 'crono', 'chrono'], message: 'Quase isso, me leve para viajar...' },
    ],
  },
  {
    id: 16,
    url: '/christophrudolff',
    title: 'FASE 16',
    question: '',
    answer: '47',
    imageUrl: 'https://iili.io/qNdjPTb.png',
    hint: '47',
    alternativeHints: [
      { keywords: ['hitman', 'pokemon'], message: 'AGENTE não esperava por isso = 2.209' },
    ],
  },
  {
    id: 17,
    url: '/erehrevoteg',
    title: 'FASE 17',
    question: '',
    answer: 'kool stuff',
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663409060469/VRbBdHgPGJv88rQk9Jnk3f/pasted_file_EQ4oY8_image_872ac2e1.png',
    hint: '1992',
    alternativeHints: [
      { keywords: ['mortal kombat'], message: 'Pra passar dessa fase, somente com macete' },
    ],
  },
  // Fases 18-20 serão adicionadas conforme você enviar os dados
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

export const checkAnswer = (userAnswer: string, correctAnswer: string, phaseId?: number): boolean => {
  const normalized = normalizeAnswer(userAnswer);
  const correctNormalized = normalizeAnswer(correctAnswer);
  
  // Para a Fase 5 (Saria's Song), aceitar múltiplas variações
  if (correctNormalized === 'sariasong') {
    return normalized === 'sariasong' || normalized === 'sariassong';
  }
  
  // Para a Fase 12 (Mineirinho), aceitar "Mineirinho Ultra Adventures"
  if (phaseId === 12 && correctNormalized === 'mineirinho') {
    return normalized === 'mineirinho' || normalized === 'mineirinhoultraadventures';
  }
  
  return normalized === correctNormalized;
};
