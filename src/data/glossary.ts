/**
 * AIERA glossary. Each term has a friendly, plain-language definition and,
 * where one exists, the article that explains it (by post id).
 */
export interface GlossaryTerm {
  term: string;
  definition: string;
  article?: string;
  seeAlso?: string[];
}

export const GLOSSARY: GlossaryTerm[] = [
  { term: 'Adam', definition: 'A popular helper for training models that adjusts the step size for each setting on its own, a bit like a hiker taking careful steps on steep ground and longer strides on flat paths.', article: 'gradient-descent-felt', seeAlso: ['Gradient descent', 'Learning rate'] },
  { term: 'Algorithm', definition: 'A step-by-step set of instructions a computer follows to solve a problem, like a recipe.' },
  { term: 'Artificial intelligence (AI)', definition: 'Computer systems that do tasks that usually need human intelligence, such as understanding language, recognising images or making decisions.', article: 'ai-origins-everyday-life' },
  { term: 'AI winter', definition: 'A time when hopes for AI ran ahead of what computers could do, so interest and funding cooled off. There were two, in the 1970s and the late 1980s.', article: 'ai-origins-everyday-life' },
  { term: 'Attention', definition: 'The way a model decides which other words matter most for understanding each word. It is how AI works out that "it" means "the ball" in "The robot picked up the ball because it was light".', article: 'attention-step-by-step', seeAlso: ['Query, key and value', 'Transformer'] },
  { term: 'Benchmark', definition: 'A shared, published test used to compare AI models. Useful for broad comparisons, but not the whole story for your own task.', article: 'evaluating-llm-outputs', seeAlso: ['Test set'] },
  { term: 'Bias (in AI)', definition: 'When a model treats some groups of people less fairly than others, usually because of gaps or imbalances in the examples it learned from.', article: 'ai-origins-everyday-life' },
  { term: 'Byte-pair encoding', definition: 'A common way to build a chatbot’s vocabulary: start with tiny pieces of text and keep joining the pairs that appear together most often.', article: 'tokenizers-quirks', seeAlso: ['Token'] },
  { term: 'Classifier-free guidance', definition: 'A trick that helps image models follow your prompt more closely, by comparing their guesses with and without the prompt.', article: 'diffusion-noise-to-image' },
  { term: 'Computer vision', definition: 'AI that understands pictures and video, from spotting weeds on a farm to helping screen for eye disease.', article: 'cnn-first-layer' },
  { term: 'Concept drift', definition: 'When the meaning behind information changes over time, so a pattern a model learned starts to mean something different.', article: 'monitoring-drift', seeAlso: ['Data drift'] },
  { term: 'Convolution', definition: 'A small window, called a filter, that slides across a picture and checks every patch for a pattern such as an edge.', article: 'cnn-first-layer', seeAlso: ['Feature map'] },
  { term: 'Data drift', definition: 'When the kind of information coming into a model changes after launch, for example shopping habits during a holiday season.', article: 'monitoring-drift', seeAlso: ['Concept drift'] },
  { term: 'Deep learning', definition: 'Machine learning with neural networks that have many layers. It powers modern speech, image and language AI.', seeAlso: ['Neural network'] },
  { term: 'Diffusion model', definition: 'An image-making model that starts from pure static and tidies it up, a little at a time, until a picture appears.', article: 'diffusion-noise-to-image' },
  { term: 'Dropout', definition: 'A training technique that briefly switches off random parts of a network, encouraging it to learn general patterns instead of memorising.', article: 'validation-loss-rising', seeAlso: ['Overfitting'] },
  { term: 'Early stopping', definition: 'Keeping the version of a model from the moment it did best on new examples, before it started memorising.', article: 'validation-loss-rising' },
  { term: 'Embedding', definition: 'A list of numbers that represents a word or token, placing words with similar meanings close together, like points on a map of meaning.', article: 'attention-step-by-step' },
  { term: 'Feature map', definition: 'The picture a filter produces as it slides across an image. It glows wherever its pattern appears.', article: 'cnn-first-layer', seeAlso: ['Convolution'] },
  { term: 'Fine-tuning', definition: 'Giving an already-trained model extra lessons on a smaller, focused set of examples, so it becomes more helpful for a particular job.' },
  { term: 'Generative AI', definition: 'AI that creates something new, such as text, images, music or code.', seeAlso: ['Diffusion model', 'Large language model (LLM)'] },
  { term: 'Goodhart’s law', definition: 'The idea that when a measure becomes a target, it stops being a good measure. It explains why AI sometimes finds clever shortcuts.', article: 'ai-clever-shortcuts' },
  { term: 'Gradient', definition: 'The slope that tells a model which way to adjust its settings to make its answers a little better.', article: 'gradient-descent-felt' },
  { term: 'Gradient descent', definition: 'How most models learn: take a small step "downhill" toward better answers, check the slope again, and repeat.', article: 'gradient-descent-felt', seeAlso: ['Learning rate', 'Loss'] },
  { term: 'Hallucination', definition: 'When an AI system says something that sounds believable but isn’t true. A good reason to double-check important facts.', article: 'ai-origins-everyday-life' },
  { term: 'Human in the loop', definition: 'A design where people review or approve AI decisions, especially when the stakes are high.', article: 'ai-origins-everyday-life' },
  { term: 'Large language model (LLM)', definition: 'A model trained on huge amounts of text to understand and write language. ChatGPT, Claude and Gemini are examples.', article: 'tokenizers-quirks' },
  { term: 'Learning rate', definition: 'How big each learning step is. Too small and learning is slow; too big and the model bounces around without settling.', article: 'gradient-descent-felt' },
  { term: 'Loss', definition: 'A number that measures how far a model’s answers are from the right ones. Training tries to make it smaller.', article: 'gradient-descent-felt' },
  { term: 'Machine learning (ML)', definition: 'A way of building AI where the computer learns patterns from examples instead of following rules written by hand.' },
  { term: 'Mask', definition: 'In chatbots that write one word at a time, a mask lets each word look only at the words before it, so it never peeks ahead.', article: 'attention-step-by-step' },
  { term: 'Multi-head attention', definition: 'Running several attention "questions" side by side, so a model can track different relationships between words at the same time.', article: 'attention-step-by-step' },
  { term: 'Natural language processing (NLP)', definition: 'AI that works with human language, including translation, captions and chatbots.' },
  { term: 'Neural network', definition: 'A model made of many simple connected units, loosely inspired by neurons in the brain.', seeAlso: ['Deep learning'] },
  { term: 'Overfitting', definition: 'When a model memorises its practice examples instead of learning patterns that work on new ones.', article: 'validation-loss-rising' },
  { term: 'Query, key and value', definition: 'Three "name tags" each word gets inside a transformer: what it is looking for, what it offers, and what it shares if chosen.', article: 'attention-step-by-step', seeAlso: ['Attention'] },
  { term: 'Reinforcement learning', definition: 'Learning by trying: an AI takes actions, receives reward scores, and gradually learns which actions earn more.', article: 'ai-clever-shortcuts' },
  { term: 'Reward model', definition: 'A model that predicts which answers people would prefer, used to help fine-tune chatbots.', article: 'ai-clever-shortcuts' },
  { term: 'Softmax', definition: 'A step that turns a list of scores into percentages that add up to 100%.', article: 'attention-step-by-step' },
  { term: 'Specification gaming', definition: 'When an AI follows the exact wording of its goal in an unexpected way, like collecting points without finishing the race.', article: 'ai-clever-shortcuts' },
  { term: 'Test set', definition: 'A private set of questions kept aside to fairly check how well a model does on things it hasn’t practised.', article: 'evaluating-llm-outputs' },
  { term: 'Token', definition: 'A small piece of text, often a word or part of a word, that a chatbot reads and writes instead of individual letters.', article: 'tokenizers-quirks' },
  { term: 'Training data', definition: 'The examples a model learns from, such as labelled photos, recorded speech or text.' },
  { term: 'Transformer', definition: 'The design, introduced in 2017, that most modern chatbots are built on. Its key idea is attention.', article: 'attention-step-by-step' },
  { term: 'Turing test', definition: 'Alan Turing’s 1950 idea for judging machine intelligence: can a person tell a machine apart from a human in a text conversation?', article: 'ai-origins-everyday-life' },
  { term: 'Validation loss', definition: 'How well a model does on examples it has never seen while training. Watching it helps spot overfitting.', article: 'validation-loss-rising' },
  { term: 'Weight decay', definition: 'A gentle nudge during training that keeps a model’s settings small, encouraging simpler, more general answers.', article: 'validation-loss-rising' },
];

export const termId = (term: string) =>
  term.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
