export const SITE = {
  name: 'AIERA',
  url: 'https://aiera.com',
  tagline: 'Learn how AI models actually work, one layer at a time.',
  description:
    'AIERA is a weekly blog for people who want more than headlines about AI. Each piece explains one idea in machine learning with real numbers, small code you can run, and diagrams you can explore.',
  email: 'hello@aiera.com',
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
  { name: 'LLMs', slug: 'llms', blurb: 'Tokenizers, attention, training and evaluating large language models.' },
  { name: 'Computer vision', slug: 'computer-vision', blurb: 'Convolutions, diffusion and how models learn to see.' },
  { name: 'Reinforcement learning', slug: 'reinforcement-learning', blurb: 'Agents, rewards and what goes wrong when you optimize hard.' },
  { name: 'Math foundations', slug: 'math-foundations', blurb: 'The calculus, linear algebra and probability under every model.' },
  { name: 'Training', slug: 'training', blurb: 'Losses, overfitting, regularization and making training behave.' },
  { name: 'MLOps', slug: 'mlops', blurb: 'Shipping, serving and monitoring models in production.' },
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
