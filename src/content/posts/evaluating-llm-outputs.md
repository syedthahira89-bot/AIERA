---
title: "LLM evaluation made simple: how to test a chatbot fairly"
description: "Measuring a chatbot's answers is trickier than it looks. Here are simple, fair ways to test AI and trust the results."
pubDate: 2026-08-27
topic: "LLMs Decoded"
level: Advanced
cover: /images/cover-testing-chatbots.jpg
coverAlt: "A chat message bubble with an arrow pointing to a checklist with ticks for Accurate, Clear, Helpful and Kind."
takeaways:
  - "Public benchmarks are useful, but they can't show how well a model does on your task."
  - "Build a small, private test set of real examples with clear good answers."
  - "If AI grades AI, watch for its preferences for answer order, longer answers and its own answers."
---

How would you grade an essay, a poem or a helpful explanation? There's rarely one right answer. That's exactly the challenge when we test chatbots, and it's why careful, fair testing is such an interesting part of AI.

## Why well-known tests aren't the whole story

Popular AI tests, often called **benchmarks**, are published online so everyone can compare results. But AI models learn from enormous amounts of online text, which can include those very tests. A high score might partly reflect familiarity rather than real skill.

Benchmarks are still useful for broad comparisons. They just can't tell you how well a model will do on *your* particular task.

## Build your own small test set

A great habit is to build your own set of questions:

1. Gather **real examples** from the task you care about, including the tricky and unusual ones.
2. **Write down what a good answer looks like** for each.
3. **Keep the set private.** Don't use it in prompts or training, so it stays a fair test.

## When AI helps grade AI

Using one model to grade another saves a lot of time, but a 2023 study of AI graders found a few habits worth knowing about:

- **Order preference:** they may favour whichever answer they read first. Shuffle the order, or grade both orders and average the results.
- **Length preference:** they may favour longer answers. Ask them to judge specific qualities, like accuracy or clarity, instead of overall impressions.
- **Self-preference:** they may favour answers written by themselves.

Before relying on an AI grader, compare its scores with a sample of human ratings, and check again whenever you change its instructions.

## Something to think about

If you were testing a chatbot to help with your own work or studies, what are five questions you'd want it to answer well? Writing them down is the first step to a great test set.

## Sources & further reading

- Zheng et al., [*Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena*](https://arxiv.org/abs/2306.05685) (2023), which studies the position, verbosity and self-enhancement biases of AI graders.
- Related: [reward hacking, decoded](/blog/ai-clever-shortcuts/), on why measures can drift from goals.
- Related: [Hugging Face leaderboards: how to read AI model rankings](/blog/hugging-face-leaderboard/), on what public scoreboards can and can't tell you.
