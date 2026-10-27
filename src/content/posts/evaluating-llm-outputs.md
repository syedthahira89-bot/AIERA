---
title: "Evaluating LLM outputs without fooling yourself"
description: "Contaminated benchmarks, position bias in model graders, and how to build an eval set you can trust."
pubDate: 2026-08-27
topic: Language models
level: Advanced
cover: /images/evaluating-llm-outputs-cover.jpg
coverAlt: "A scatter of model scores along a dashed trend line, with two check marks and one cross."
---

It is easy to convince yourself a language model is better than it is. Evaluating open-ended text is hard, and the shortcuts people take tend to flatter the model.

## Public benchmarks leak

Popular benchmarks are published online, and web-scale training data can include them. A model can then score well by recall rather than reasoning. Scores on public benchmarks are useful for rough comparisons, but they say little about your specific task.

## Build a private eval set

Collect 100 to 300 real examples from your own use case, including the hard and awkward ones. Write down what a good answer looks like for each. Keep this set out of any prompt, fine-tuning data or few-shot examples, so it stays a fair test.

## Model graders have biases

Using one model to grade another scales well, but graders have known biases:

- **Position bias**: preferring whichever answer is shown first. Randomize the order, or grade both orders and average.
- **Length bias**: preferring longer answers. Ask the grader to judge specific criteria rather than overall quality.
- **Self-preference**: favouring text in their own style.

Check the grader against a sample of human ratings before trusting it, and re-check whenever you change the grader prompt.
