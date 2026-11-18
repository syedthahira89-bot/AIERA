---
title: "Hugging Face leaderboards: how to read AI model rankings"
description: "How Hugging Face's Open LLM Leaderboard compared AI models fairly, what it tested, and how to read any AI leaderboard wisely."
pubDate: 2026-11-04
topic: "LLMs Decoded"
level: Beginner
cover: /images/cover-leaderboard.jpg
coverAlt: "A leaderboard illustration: a gold trophy above a podium for Model A, B and C, tags for Reasoning, Maths, Coding and Language, and a table ranking five models by made-up example scores from 92.4 down to 69.8."
takeaways:
  - "Hugging Face's Open LLM Leaderboard tested every model the same way, on six benchmarks, so scores could be compared fairly."
  - "Check what's being tested: a top maths score says little about writing a friendly email."
  - "Small score gaps may not matter for you, so try a model on your own task before choosing."
---
Have you ever wondered how people decide which AI model is "best"? Often, they check a **leaderboard**: a public scoreboard where models take the same tests. One of the best known is Hugging Face's **Open LLM Leaderboard**, and its story shows both why leaderboards are useful and how to read them wisely.

## What is Hugging Face?

Hugging Face is a website where people share and collaborate on AI models, datasets and demos (which it calls Spaces). Anyone can browse it and try many models in the browser.

## Why the Open LLM Leaderboard was created

According to Hugging Face, its team found it nearly impossible to compare published language models fairly. Scores in papers and marketing releases often came without code to reproduce them, and some used carefully tuned prompts to give their model the best chance.

So the team built a place where models were tested **in exactly the same way**: the same questions, asked in the same order. That made the results reproducible and comparable.

It caught on. Hugging Face says its first version was visited by more than **2 million** people over ten months, and around **300,000** community members used it each month, for example to find strong open models and to compare their own work. It was archived and replaced by a newer version in June 2024.

## What it tested

The first version scored models on six benchmarks:

| Benchmark | What it tests |
| --- | --- |
| AI2 Reasoning Challenge | Grade-school science questions |
| HellaSwag | Common-sense reasoning, easy for people (about 95%) but hard for models |
| MMLU | Knowledge across 57 subjects, including maths, US history, computer science and law |
| TruthfulQA | Whether a model repeats falsehoods commonly found online |
| Winogrande | Tricky common-sense reasoning puzzles |
| GSM8K | Multi-step maths word problems from primary school |

For every test, a higher score is better. Hugging Face chose them to cover a variety of reasoning and general knowledge.

![Diagram of the six tests in the first Open LLM Leaderboard: AI2 Reasoning Challenge (grade-school science), HellaSwag (common-sense reasoning), MMLU (57 subjects, from maths to law), TruthfulQA (avoiding online falsehoods), Winogrande (tricky common-sense puzzles) and GSM8K (multi-step maths word problems). Every model got the same questions in the same order, so scores could be compared fairly.](/images/leaderboard-six-tests.jpg)

## How to read a leaderboard wisely

- **Check what's being tested.** A top score on maths word problems says little about writing a friendly email.
- **Look at the size of the gap.** Models a fraction of a point apart may be equally good for you.
- **Remember the setup matters.** The whole point of this leaderboard was that the same test setup was used for every model, so compare scores from the same leaderboard, not from different sources.
- **Try it yourself.** The best model is the one that works well for *your* task.

> Curious? Search for "leaderboard" on [Hugging Face Spaces](https://huggingface.co/spaces?search=leaderboard) and see how many different scoreboards there are.

Want to go deeper? Our guide to [testing chatbots fairly](/blog/evaluating-llm-outputs/) explains why scores aren't the whole story.

## Sources & further reading

- Hugging Face, [*Open LLM Leaderboard: archived version*](https://huggingface.co/docs/leaderboards/open_llm_leaderboard/archive), on why it was created, what it tested and why it was replaced.
- [LLM evaluation made simple: how to test a chatbot fairly](/blog/evaluating-llm-outputs/)
