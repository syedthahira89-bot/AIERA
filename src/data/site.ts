export const SITE = {
  name: 'AIERA',
  url: 'https://aiera-ts.com',
  tagline: 'Learn how AI models actually work, one layer at a time.',
  description:
    'AIERA is a weekly blog for people who want more than headlines about AI. One track explains how models really work, with real numbers and small code you can run. The other shows how to live well with AI, for your health, your daily life and the planet.',
  email: 'hello@aiera.com',
    'AIERA is a weekly blog for people who want more than headlines about AI. Each piece explains one idea in machine learning with real numbers, small code you can run, and diagrams you can explore.',
  email: 'hello@aiera-ts.com',
  author: {
    name: 'Thahira S',
    bio: 'Tech futurist exploring how AI and machine learning can make everyday life healthier, more creative and more human.',
  },
  social: [
    { label: 'X', href: 'https://x.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'GitHub', href: 'https://github.com/' },
  ],
  // Paste your newsletter provider's form endpoint here (Buttondown, ConvertKit, Mailchimp...).
  // While empty, the signup form validates the address but does not send it anywhere.
  newsletterAction: '',
};

/** The two reading tracks. Every topic belongs to one. */
export const TRACKS = [
  { id: 'understand', name: 'Understand AI', blurb: 'How models work under the hood, explained with real numbers and small code you can run.' },
  { id: 'live', name: 'Live with AI', blurb: 'Using AI well in daily life: for your health, the planet and each other.' },
] as const;

export type TrackId = (typeof TRACKS)[number]['id'];

export const TOPICS = [
  { name: 'Language models', slug: 'llms', track: 'understand', blurb: 'Tokenizers, attention, training and evaluating large language models.' },
  { name: 'Computer vision', slug: 'computer-vision', track: 'understand', blurb: 'Convolutions, diffusion and how models learn to see.' },
  { name: 'Training & deployment', slug: 'training-and-deployment', track: 'understand', blurb: 'The math under every model, making training behave, rewards that backfire, and keeping models healthy after launch.' },
  { name: 'AI in everyday life', slug: 'ai-in-everyday-life', track: 'live', blurb: 'Where AI came from, and how it is quietly improving daily life for people and the planet.' },
  { name: 'Health & wellbeing', slug: 'health', track: 'live', blurb: 'What AI can and cannot do for your body and mind, from smartwatch alerts to medical screening.' },
  { name: 'Planet & nature', slug: 'planet', track: 'live', blurb: 'AI that forecasts floods, protects forests and wildlife, and cuts energy use, plus its own footprint.' },
  { name: 'Ethics & safety', slug: 'ethics', track: 'live', blurb: 'Bias, privacy, misinformation and keeping people in charge of the decisions that matter.' },
  { name: 'How-tos', slug: 'how-tos', track: 'live', blurb: 'Practical, beginner-friendly guides to getting real value from AI tools.' },
] as const;

export const topicsIn = (track: TrackId) => TOPICS.filter((t) => t.track === track);

/** Publishing rhythm: one article every Thursday, alternating between the two tracks. */
export const SCHEDULE = {
  day: 'Thursday',
  summary: 'A new article every Thursday, alternating between Understand AI and Live with AI.',
};

/**
 * The editorial calendar (see CONTENT_CALENDAR.md). Entries show as "coming soon" on topic pages,
 * in learning paths and on the home page. Once a post with the same title is published, its entry hides itself.
 */
export const UPCOMING = [
  { date: '2026-10-29', topic: 'Language models', title: 'Embeddings as coordinates for meaning' },
  { date: '2026-11-05', topic: 'Health & wellbeing', title: 'What your smartwatch\'s heart alerts can and cannot tell you' },
  { date: '2026-11-12', topic: 'Training & deployment', title: 'Backpropagation with a pencil' },
  { date: '2026-11-19', topic: 'Planet & nature', title: 'How AI forecasts floods a week ahead' },
  { date: '2026-11-26', topic: 'Training & deployment', title: 'Serving a model behind an API' },
  { date: '2026-12-03', topic: 'Ethics & safety', title: 'Why AI can be unfair, and how fairness gets tested' },
  { date: '2026-12-10', topic: 'Language models', title: 'Pretraining versus fine-tuning' },
  { date: '2026-12-17', topic: 'How-tos', title: 'Ask better questions: a beginner\'s guide to prompting' },
] satisfies { date: string; topic: (typeof TOPICS)[number]['name']; title: string }[];

/** Colour palettes for the header picker. Colours here are only for the swatches; the real tokens live in global.css. */
export const PALETTES = [
  { id: 'peach', name: 'Peach Glow', swatch: ['#FFF7F2', '#C2410C', '#0E7490'] },
  { id: 'aqua', name: 'Soft Aqua', swatch: ['#F4FAFB', '#0B7A8F', '#946016'] },
  { id: 'mint', name: 'Mint & Sunshine', swatch: ['#F5FAF6', '#0F7B5F', '#946010'] },
  { id: 'lavender', name: 'Lavender Dawn', swatch: ['#F7F5FF', '#5B3FD6', '#B83654'] },
] as const;

export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export const topicSlug = (name: string) => TOPICS.find((t) => t.name === name)?.slug ?? 'all';

/** A step is either a post id (links to it) or plain text (shown as coming soon). */
export const PATHS = [
  {
    title: 'Zero to neural networks',
    text: 'For readers comfortable with high-school algebra.',
    steps: ['gradient-descent-felt', 'Linear regression as a one-neuron network', 'validation-loss-rising', 'Backpropagation with a pencil', 'cnn-first-layer'],
  },
  {
    title: 'Understanding language models',
    text: 'From text to tokens to attention to evaluation.',
    steps: ['tokenizers-quirks', 'Embeddings as coordinates for meaning', 'attention-step-by-step', 'Pretraining versus fine-tuning', 'evaluating-llm-outputs'],
  },
  {
    title: 'Live better with AI',
    text: 'No technical background needed. Practical ways AI can help you, your health and the planet.',
    steps: ['ai-origins-everyday-life', 'Ask better questions: a beginner\'s guide to prompting', 'What your smartwatch\'s heart alerts can and cannot tell you', 'How AI forecasts floods a week ahead', 'Why AI can be unfair, and how fairness gets tested'],
  },
  {
    title: 'Machine learning in production',
    text: 'What changes once real users depend on your model.',
    steps: ['Versioning data alongside code', 'Serving a model behind an API', 'monitoring-drift', 'reward-hacking'],
  },
];

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export const readingMinutes = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 220));
