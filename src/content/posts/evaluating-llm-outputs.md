---
title: "LLM evaluation made simple: how to test a chatbot fairly"
description: "How do you test a chatbot fairly when there's no single right answer? Simple ways to check AI answers, and the habits to watch when AI grades AI."
pubDate: 2026-08-27
updatedDate: 2026-11-19
topic: "LLMs Decoded"
level: Advanced
cover: /images/cover-testing-chatbots.jpg
coverAlt: "A chat message bubble with an arrow pointing to a checklist with ticks for Accurate, Clear, Helpful and Kind."
takeaways:
  - "Public tests are useful, but they can't tell you how well an AI does on your own task."
  - "Make your own small test: real questions, written-down good answers, kept private."
  - "AI graders can be swayed by answer order, longer answers and their own writing, so check them against people."
---

How would you grade a poem, or a helpful explanation? There's rarely one right answer. That's the challenge when we test chatbots.

## The big idea in one sentence

**To trust a chatbot, test it on questions that matter to you, and be careful when you let another AI do the grading.**

## Why public tests aren't the whole story

Public AI tests, called **benchmarks**, let everyone compare models on the same questions, a bit like a standard exam. But chatbots do so many different things that fixed tests struggle to capture what people actually prefer. A 2023 study by Lianmin Zheng and colleagues made this point.

Benchmarks are still useful, and that study found different kinds of tests work well together. They just can't tell you how well an AI will do on *your* task.

## Make your own small test

A good habit is to make your own test, like writing your own quiz:

1. **Collect real questions** from what you actually use AI for, including tricky ones.
2. **Write down what a good answer looks like** for each.
3. **Keep it private.** Don't share it or use it to train the AI, so it stays a fair test.

## When AI grades AI

Grading thousands of answers by hand takes ages, so people can ask one AI to grade another. The 2023 study found AI graders have some habits, a bit like a teacher with favourites:

| Habit | What happens | What helps |
| --- | --- | --- |
| **Order** | It may prefer an answer because of where it appears | Swap the order and grade again |
| **Length** | It may prefer longer answers | Ask it to judge specific things, like accuracy |
| **Self-preference** | It may prefer answers it wrote itself | Keep this in mind |
| **Maths and reasoning** | It can struggle to grade them correctly | Check those grades carefully |

![Diagram of four habits of AI graders and what to do: order (may favour an answer because of its position; swap the order and grade again), length (may favour longer answers; ask about specific qualities, like accuracy), self-preference (may favour its own answers) and reasoning (can struggle to grade maths and reasoning). A ring chart shows that GPT-4, as a grader, agreed with human judges more than 80% of the time, about as often as people agree with each other.](/images/ai-grader-habits.jpg)

## So, are AI graders any good?

The researchers compared AI graders with real people using two collections:

- **MT-Bench:** 80 challenging questions, each a short back-and-forth conversation.
- **Chatbot Arena:** a website where people chat with two anonymous chatbots at once and pick the better answer.

The result: a strong AI grader, GPT-4, agreed with people **more than 80%** of the time, about as often as people agree with each other. So AI grading can be a useful, much cheaper stand-in for human opinions, as long as you remember its habits.

Before trusting an AI grader for your own task, check its grades against some people's ratings first.

## Something to think about

If you were testing a chatbot to help with your schoolwork, what five questions would you want it to answer well? Writing them down is the first step to a good test.

## Sources & further reading

- Zheng et al., [*Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena*](https://arxiv.org/abs/2306.05685) (2023), which studies the position, verbosity and self-enhancement biases and the reasoning limits of AI graders, and how often they agree with people.
- Related: [reward hacking, decoded](/blog/ai-clever-shortcuts/), on why measures can drift from goals.
- Related: [Hugging Face leaderboards: how to read AI model rankings](/blog/hugging-face-leaderboard/), on what public scoreboards can and can't tell you.
