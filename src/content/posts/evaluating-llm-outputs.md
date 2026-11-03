---
title: "How do we know if a chatbot is doing well? A friendly guide to testing AI"
description: "Measuring a chatbot's answers is trickier than it looks. Here are simple, fair ways to test AI and trust the results."
pubDate: 2026-08-27
topic: "Talking Machines"
level: Advanced
---

How would you grade an essay, a poem or a helpful explanation? There's rarely one right answer. That's exactly the challenge when we test chatbots, and it's why careful, fair testing is such an interesting part of AI.

## Why well-known tests aren't the whole story

Popular AI tests, often called **benchmarks**, are published online so everyone can compare results. But AI models learn from enormous amounts of online text, which can include those very tests. A high score might partly reflect familiarity rather than real skill.

Benchmarks are still useful for broad comparisons. They just can't tell you how well a model will do on *your* particular task.

## Build your own small test set

A wonderful habit is to create your own set of questions:

1. Gather **100 to 300 real examples** from the task you care about, including the tricky and unusual ones.
2. **Write down what a good answer looks like** for each.
3. **Keep the set private.** Don't use it in prompts or training, so it stays a fair test.

## When AI helps grade AI

Using one model to grade another saves a lot of time, but AI graders have a few habits worth knowing about:

- **Order preference:** they may favour whichever answer they read first. Shuffle the order, or grade both orders and average the results.
- **Length preference:** they may favour longer answers. Ask them to judge specific qualities, like accuracy or clarity, instead of overall impressions.
- **Style preference:** they may favour writing that sounds like their own.

Before relying on an AI grader, compare its scores with a sample of human ratings, and check again whenever you change its instructions.

## Something to think about

If you were testing a chatbot to help with your own work or studies, what are five questions you'd want it to answer well? Writing them down is the first step to a great test set.
