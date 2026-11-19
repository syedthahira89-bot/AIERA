---
title: "Hugging Face leaderboards: how to read AI model rankings"
description: "How a famous AI scoreboard compared models fairly, what its six tests checked, and how to read any AI ranking wisely, explained simply."
pubDate: 2026-11-04
updatedDate: 2026-11-19
topic: "LLMs Decoded"
level: Beginner
cover: /images/cover-leaderboard.jpg
coverAlt: "A leaderboard illustration: a gold trophy above a podium for Model A, B and C, tags for Reasoning, Maths, Coding and Language, and a table ranking five models by made-up example scores from 92.4 down to 69.8."
takeaways:
  - "A leaderboard is a public scoreboard where AI models take the same tests, so scores can be compared fairly."
  - "Check what's being tested: a top maths score says little about writing a friendly email."
  - "The best model for you is the one that does well on your own task."
---

How do people decide which AI model is "best"? Often they check a **leaderboard**: a public scoreboard where AI models take the same tests, like a league table in sport.

One of the best known was Hugging Face's **Open LLM Leaderboard**. Its story shows why leaderboards are useful, and how to read them wisely.

## The big idea in one sentence

**A leaderboard is only fair if every model takes exactly the same test in exactly the same way.**

## What is Hugging Face?

Hugging Face runs a website, the Hugging Face Hub, where people share AI models, datasets and AI apps (which it calls Spaces). Hugging Face says it hosts millions of them, open for anyone to explore.

## Why the leaderboard was made

Hugging Face's team found it was nearly impossible to compare AI models fairly. Scores were published without the code to check them, and some used specially tuned prompts (the instructions given to the AI) to make a model look its best.

**Imagine a sports day** where every school times its own runners, with its own stopwatch, on its own track. You couldn't fairly compare the times.

So the team built one place where every model was tested **in exactly the same way**: the same questions, asked in the same order. Now the scores could be checked and compared.

It became very popular. Hugging Face says the first version was visited by more than **2 million** people over ten months, and around **300,000** community members used it every month. In June 2024 it was archived and replaced by a newer version.

## What it tested

The first version gave every model six tests. For each one, a higher score is better:

| Test | What it checks |
| --- | --- |
| AI2 Reasoning Challenge | Science questions from grade school |
| HellaSwag | Common sense: easy for people (about 95%), hard for models |
| MMLU | Knowledge across 57 subjects, from maths and US history to computer science and law |
| TruthfulQA | Whether the AI repeats false things often found online |
| Winogrande | Tricky common-sense puzzles |
| GSM8K | Maths word problems from primary school |

![Diagram of the six tests in the first Open LLM Leaderboard: AI2 Reasoning Challenge (grade-school science), HellaSwag (common-sense reasoning), MMLU (57 subjects, from maths to law), TruthfulQA (avoiding online falsehoods), Winogrande (tricky common-sense puzzles) and GSM8K (multi-step maths word problems). Every model got the same questions in the same order, so scores could be compared fairly.](/images/leaderboard-six-tests.jpg)

## How to read any leaderboard wisely

- **Check what's being tested.** A top maths score says little about writing a friendly email.
- **Look at the size of the gap.** Two models a tiny bit apart may be just as good for you.
- **Compare like with like.** Only compare scores from the same leaderboard, because the test setup matters.
- **Try it yourself.** The best model is the one that does well on *your* task.

> **Curious?** Search for "leaderboard" on [Hugging Face Spaces](https://huggingface.co/spaces?search=leaderboard) to see how many different scoreboards there are.

Want to go deeper? Our guide to [testing chatbots fairly](/blog/evaluating-llm-outputs/) explains why scores aren't the whole story.

## Sources & further reading

- Hugging Face, [*Open LLM Leaderboard: archived version*](https://huggingface.co/docs/leaderboards/open_llm_leaderboard/archive), on why it was created, what it tested and why it was replaced.
- Hugging Face, [*Hugging Face Hub documentation*](https://huggingface.co/docs/hub/index), on what the Hub hosts.
- [LLM evaluation made simple: how to test a chatbot fairly](/blog/evaluating-llm-outputs/)
