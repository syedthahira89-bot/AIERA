export const SITE = {
  name: 'AIERA-TS',
  url: 'https://aiera-ts.com',
  tagline: 'The bright side of AI, explained simply.',
  description:
    'AIERA-TS is a friendly weekly blog about how AI is making life healthier, more creative and more human, and how it actually works, explained in plain language.',
  email: 'aiera.blog@gmail.com',
  author: {
    name: 'Thahira S',
    bio: 'Tech futurist exploring how AI and machine learning can make everyday life healthier, more creative and more human.',
  },
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thahira-syed-2827ba426/' },
  ],
  // Paste your newsletter provider's form endpoint here. Examples:
  //   Buttondown: 'https://buttondown.com/api/emails/embed-subscribe/YOUR-USERNAME'
  //   Mailchimp:  the form "action" URL from Audience > Signup forms > Embedded form
  // While empty, the signup form validates the address but does not send it anywhere.
  newsletterAction: 'https://buttondown.com/api/emails/embed-subscribe/aiera',
  // Google Search Console: choose "URL prefix", pick the "HTML tag" method and paste only the
  // content="..." value here, e.g. 'AbC123xyz'. While empty, no tag is added.
  googleSiteVerification: '',
  // Analytics (e.g. Plausible): paste the full snippet the provider gives you, script tags included.
  // While empty, no analytics script loads.
  analyticsSnippet: '',
};

/** The two content pillars. Every topic belongs to one. */
export const PILLARS = [
  { id: 'better-life', name: 'AI for a better life', blurb: 'How AI is making everyday life healthier, more creative, more balanced and kinder to the planet.' },
  { id: 'how-it-works', name: 'How AI works', blurb: 'The ideas behind the tools, explained simply, with friendly examples and small experiments to try.' },
] as const;

export const TOPICS = [
  { name: 'Everyday AI', slug: 'everyday-ai', pillar: 'better-life', blurb: 'Practical ways AI is improving health, home life and everyday productivity.' },
  { name: 'Creative AI', slug: 'creative-ai', pillar: 'better-life', blurb: 'AI as a creative co-pilot for writing, design, music and ideas, in your own voice.' },
  { name: 'Future of Work', slug: 'future-of-work', pillar: 'better-life', blurb: 'How AI is reshaping jobs and careers, and how to grow with the change.' },
  { name: 'AI for the Planet', slug: 'ai-for-the-planet', pillar: 'better-life', blurb: 'How AI is helping protect forests, wildlife, farmland and the climate.' },
  { name: 'AI Toolkit', slug: 'ai-toolkit', pillar: 'better-life', blurb: 'Hand-picked AI tools anyone can use to save time, learn and create.' },
  { name: 'LLMs Decoded', slug: 'llms-decoded', pillar: 'how-it-works', blurb: 'How large language models read and write text, and how to check their answers.' },
  { name: 'ML Fundamentals', slug: 'ml-fundamentals', pillar: 'how-it-works', blurb: 'How models learn, how they see and create images, and how they stay reliable after launch.' },
  { name: 'Agents & GenAI', slug: 'agents-and-genai', pillar: 'how-it-works', blurb: 'Generative AI and AI agents: how they create, plan and get tasks done for you.' },
] as const;

/** Colour palettes for the header picker. Colours here are only for the swatches; the real tokens live in global.css. */
export const PALETTES = [
  { id: 'forest', name: 'Forest & Gold', swatch: ['#F6F8F1', '#17603C', '#C9A227'] },
  { id: 'peach', name: 'Peach Glow', swatch: ['#FFF7F2', '#C2410C', '#0E7490'] },
  { id: 'aqua', name: 'Soft Aqua', swatch: ['#F4FAFB', '#0B7A8F', '#946016'] },
  { id: 'mint', name: 'Mint & Sunshine', swatch: ['#F5FAF6', '#0F7B5F', '#946010'] },
  { id: 'lavender', name: 'Lavender Dawn', swatch: ['#F7F5FF', '#5B3FD6', '#B83654'] },
] as const;

export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export const topicSlug = (name: string) => TOPICS.find((t) => t.name === name)?.slug ?? 'all';

/** A step is a post id. Plain-text steps are planned articles: they stay hidden until a post with that id exists. */
export const PATHS = [
  {
    title: 'Your first steps into AI',
    text: 'A gentle start. If you remember a little school maths, you are ready.',
    steps: ['gradient-descent-felt', 'Drawing the best line: your first tiny model', 'validation-loss-rising', 'How a network learns from its mistakes, step by step', 'cnn-first-layer'],
  },
  {
    title: 'How chatbots think',
    text: 'Follow a sentence from your keyboard all the way through a chatbot.',
    steps: ['tokenizers-quirks', 'Maps of meaning: how AI places words', 'attention-step-by-step', 'From reading everything to being helpful', 'evaluating-llm-outputs'],
  },
  {
    title: 'AI out in the world',
    text: 'What it takes to keep AI helpful once real people rely on it.',
    steps: ['Keeping track of the data behind a model', 'Sharing your model so apps can use it', 'monitoring-drift', 'ai-clever-shortcuts'],
  },
];

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export const readingMinutes = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 220));
