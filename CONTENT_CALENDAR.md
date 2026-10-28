# AIERA content calendar

**Rhythm:** one new article every **Thursday**, alternating between the two tracks:

- **Understand AI**: how models work, with real numbers and small code you can run.
- **Live with AI**: practical, people-first articles on daily life, health, the planet, ethics and how-tos.

The newsletter goes out the same day.

## Next eight weeks

| Date | Track | Topic | Working title |
| --- | --- | --- | --- |
| Thu Oct 29, 2026 | Understand AI | Language models | Embeddings as coordinates for meaning |
| Thu Nov 5, 2026 | Live with AI | Health & wellbeing | What your smartwatch's heart alerts can and cannot tell you |
| Thu Nov 12, 2026 | Understand AI | Training & deployment | Backpropagation with a pencil |
| Thu Nov 19, 2026 | Live with AI | Planet & nature | How AI forecasts floods a week ahead |
| Thu Nov 26, 2026 | Understand AI | Training & deployment | Serving a model behind an API |
| Thu Dec 3, 2026 | Live with AI | Ethics & safety | Why AI can be unfair, and how fairness gets tested |
| Thu Dec 10, 2026 | Understand AI | Language models | Pretraining versus fine-tuning |
| Thu Dec 17, 2026 | Live with AI | How-tos | Ask better questions: a beginner's guide to prompting |

## Weekly routine

| Day | Task |
| --- | --- |
| Friday | Pick next week's article from the table, outline it |
| Monday | First draft (`draft: true` in front matter) |
| Tuesday | Edit, fact-check sources, make the cover image and write `coverAlt` |
| Wednesday | Add new terms to `src/data/glossary.ts`, set `draft: false`, open a pull request |
| Thursday | Merge, so Netlify publishes it, and send the newsletter |

## Checklist for every article

- `pubDate` is the Thursday it goes out.
- `topic` is one of the topics in `src/data/site.ts`.
- Has a `cover` and a descriptive `coverAlt`.
- The title matches the `UPCOMING` entry exactly, so the "coming soon" notice is replaced by the live article.
- New jargon is defined in the glossary.

When the table above runs low, add the next weeks here and to `UPCOMING` in `src/data/site.ts`.
