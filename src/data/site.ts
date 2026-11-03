export const SITE = {
  name: 'AIERA',
  url: 'https://aiera-ts.com',
  tagline: 'Learn how AI models actually work, one layer at a time.',
  description:
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

export const TOPICS = [
  { name: 'Talking Machines', slug: 'talking-machines', blurb: 'How chatbots read, write and reason, from tokens to attention.' },
  { name: 'Eyes of AI', slug: 'eyes-of-ai', blurb: 'How machines learn to see, recognise and even create images.' },
  { name: 'Learning by Trying', slug: 'learning-by-trying', blurb: 'How AI learns from rewards and mistakes, and what can go wrong.' },
  { name: 'Numbers Behind the Magic', slug: 'numbers-behind-the-magic', blurb: 'The friendly maths that makes every AI model work.' },
  { name: 'How AI Learns', slug: 'how-ai-learns', blurb: 'What happens while a model trains, and how to keep it on track.' },
  { name: 'From Lab to Life', slug: 'from-lab-to-life', blurb: 'How AI leaves the lab and keeps working for real people.' },
  { name: 'AI & You', slug: 'ai-and-you', blurb: 'Where AI came from, and how it quietly makes daily life better for people and the planet.' },
] as const;

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
    title: 'Machine learning in production',
    text: 'What changes once real users depend on your model.',
    steps: ['Versioning data alongside code', 'Serving a model behind an API', 'monitoring-drift', 'reward-hacking'],
  },
];

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export const readingMinutes = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 220));
