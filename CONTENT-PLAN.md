# AIERA-TS content plan

AIERA-TS has two pillars. Aim for roughly two "better life" posts for every "how it works" post.

| Pillar | Topics |
| --- | --- |
| **AI for a better life** | Smarter Living, Creative Freedom, The New Work Paradigm, AI & the Planet, Top 7 AI Tools for Everyone |
| **How AI works** | Chatbots & Language, Images & Learning, Agentic & Gen AI |

## Thursday feature

Every Thursday, one topic gets a **feature post**. Rotate through the topics so each one gets regular attention, giving the two newest topics (Agentic & Gen AI, Top 7 AI Tools for Everyone) a little extra love while they grow.

To make a post the feature, add `featured: true` to its front matter and remove that line from last week's feature. The feature shows in the large card at the top of the home page. If no post is marked, the newest post is shown there.

## 12-week plan (one post a week, published on Thursdays to match the newsletter)

| Week | Date | Topic | Title | Status |
| --- | --- | --- | --- | --- |
| 1 | Nov 3, 2026 | Creative Freedom | Can AI make you more creative? A friendly guide | ✅ Published (`ai-creativity-guide`) |
| 2 | Nov 3, 2026 | The New Work Paradigm | Will AI take my job? A calm, practical look | ✅ Published (`ai-and-your-job`) |
| 3 | Nov 3, 2026 | AI & the Planet | 5 ways AI is helping protect nature | ✅ Published (`ai-protecting-nature`) |
| ⭐ | Nov 5, 2026 | Agentic & Gen AI | Agentic AI explained: your new digital helper | ✅ Published, Thursday feature (`what-is-agentic-ai`) |
| 4 | Nov 5, 2026 | Top 7 AI Tools for Everyone | Top 7 free AI tools that make everyday life easier | ✅ Published (`top-7-ai-tools`), feature it on Nov 12 |
| 5 | Nov 19, 2026 | Chatbots & Language | What is a chatbot, really? A beginner's guide | Planned |
| 6 | Nov 26, 2026 | Smarter Living | How AI is helping doctors spot disease earlier | Planned |
| 7 | Dec 3, 2026 | Creative Freedom | Writing with AI: a friendly guide for bloggers and students | Planned |
| 8 | Dec 10, 2026 | The New Work Paradigm | 10 AI skills worth learning this year | Planned |
| 9 | Dec 17, 2026 | Chatbots & Language | Maps of meaning: how AI places words (embeddings) | Planned, fills a learning-path step |
| 10 | Dec 24, 2026 | Smarter Living | Using AI safely: a family guide to privacy | Planned |
| 11 | Dec 31, 2026 | Personal | How I use AI in my own week | Planned, written by Thahira |
| 12 | Jan 7, 2027 | AI & the Planet | Is AI good or bad for the environment? | Planned |

Weeks 1–3 launched together so that every topic has at least one article.

## Learning-path steps still to write

These are listed in `src/data/site.ts` under `PATHS` and appear on the site automatically once a post with that id exists:

- Drawing the best line: your first tiny model
- How a network learns from its mistakes, step by step
- Maps of meaning: how AI places words (week 9)
- From reading everything to being helpful
- Keeping track of the data behind a model
- Sharing your model so apps can use it

When you publish one, replace its plain-text name in `PATHS` with the new post's file name (without `.md`).

## Checklist for every new post

- [ ] Title under 60 characters, with the searchable term near the start
- [ ] Opens with a question or everyday situation
- [ ] One real-life example and, where it helps, a small worked example
- [ ] "Common questions" section
- [ ] "Sources & further reading" with links to the original pages
- [ ] Cover image with a written description (`coverAlt`)
- [ ] A personal sentence or two from Thahira, where it fits
- [ ] Friendly, curious tone, with no harsh or alarming language
