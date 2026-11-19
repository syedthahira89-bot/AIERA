---
title: "Overfitting in plain English: when AI memorises, not learns"
description: "Why an AI can ace its practice questions but stumble on new ones, how to spot it, and three simple ways to help it really learn."
pubDate: 2026-10-08
updatedDate: 2026-11-19
topic: "ML Fundamentals"
level: Beginner
cover: /images/cover-overfitting.jpg
coverAlt: "A chart with two falling curves: practice examples keep improving, while new examples improve, level off, then rise again. A star marks the best moment to stop."
takeaways:
  - "Overfitting is when an AI memorises its practice examples instead of learning the real pattern, so it struggles with anything new."
  - "To catch it, keep some examples aside and compare: great on practice but poor on new examples is the warning sign."
  - "Stopping at the right time, keeping the model simpler and giving it more varied examples all help."
---

Think about studying for a test. You could learn *why* each answer is right, or you could just memorise the practice questions. Both work on the practice sheet. Only one works on the real exam, when the questions are new.

AI faces the same choice. When it memorises instead of learning, it's called **overfitting**.

## The big idea in one sentence

**An overfitted AI is great on the examples it practised with, but poor on anything new.**

## A made-up example

Imagine training an AI to sort your emails into "important" and "not important". By chance, lots of your important practice emails come from your manager, who always signs off with "Cheers, Sam".

The AI might learn a lazy rule: *emails ending in "Cheers, Sam" are important.* It gets every practice email right. But then a newsletter arrives from a different Sam, or your manager changes their sign-off, and the AI gets it wrong. It learned a coincidence, not the real pattern, such as deadlines or questions addressed to you.

## How do you catch it?

The trick is to **keep some examples aside**. The AI never practises on them. They're only used to check how it's doing, like a surprise quiz.

Then you compare two scores:

| Score | What it measures |
| --- | --- |
| **Training loss** | How wrong the AI is on its practice examples |
| **Validation loss** | How wrong it is on examples it has never seen |

In the illustration below, both go down at first. That's good: the AI is really learning. But when the practice score keeps getting better while the new-examples score starts getting worse, that's the warning sign. The AI has started memorising.

![An illustration, not real data: training loss keeps falling over the training rounds, while validation loss falls, reaches its lowest point (marked 'Stop here') and then starts to rise. Beside it, three friendly ways to help: stop at the right moment, encourage simpler answers with weight decay and dropout, and show the model more variety.](/images/overfitting-curves.jpg)

## Too little, too much, just right

It's a Goldilocks problem:

- **Too little learning (underfitting).** The AI hasn't trained enough, or hasn't got useful information, so it can't find the main pattern at all. It does badly on everything.
- **Too much memorising (overfitting).** It trained too long or is too complicated, so it starts learning the "noise": random, unimportant details.
- **Just right.** It finds the main pattern and can use it on new examples too. Finding this sweet spot is the goal.

## Why does it happen?

Every set of examples has some **noise**: odd cases and details that don't really matter, like Sam's sign-off. An AI that trains for too long, or is very complicated, can end up learning that noise as if it were important.

## Three simple ways to help

1. **Stop at the right time.** Stop training before the AI starts memorising. This is called *early stopping*, and many machine learning packages can do it for you. Stop too early, though, and it may underfit instead.
2. **Keep it simpler.** Techniques like *weight decay* (keeping the AI's internal numbers small) and *dropout* (randomly switching off parts of it during training) help stop it from memorising.
3. **Give it more variety.** More examples can help it find the real pattern. You can even make extra examples from the ones you have. This is called *data augmentation*.

> **Check this first:** sometimes the new-examples score gets worse because the new examples are simply different, for example collected later or from different people. Our guide to [model drift](/blog/monitoring-drift/) explains this.

## Quick questions

**How can I tell if an AI is overfitting?**
Compare its results on practice examples with its results on new ones. Very good on practice but much worse on new examples is the classic sign.

**Do big AI models ever memorise?**
Yes, sometimes. A 2023 study found that image-making AI models can memorise individual pictures from their training data, and the researchers pulled out more than a thousand of them. That's one reason to always test AI on examples it hasn't seen.

## Something to think about

Can you remember memorising something without really understanding it? What finally helped you *get* it? The same things help AI: practising with variety, and knowing when to stop.

## Sources & further reading

- IBM, [*What is overfitting?*](https://www.ibm.com/think/topics/overfitting), on overfitting, underfitting, early stopping and training with more data.
- IBM, [*What is regularization?*](https://www.ibm.com/think/topics/regularization), on dropout, weight decay and data augmentation.
- Google, [Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course), for further reading.
- Srivastava et al., [*Dropout: A Simple Way to Prevent Neural Networks from Overfitting*](https://jmlr.org/papers/v15/srivastava14a.html) (2014), the original dropout paper, for further reading.
- Carlini et al., [*Extracting Training Data from Diffusion Models*](https://arxiv.org/abs/2301.13188) (2023).
- Previous in this series: [gradient descent 101](/blog/gradient-descent-felt/).
