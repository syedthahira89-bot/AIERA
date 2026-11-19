---
title: "Model drift 101: keeping AI reliable after launch"
description: "Why an AI can slowly get worse after launch as the world changes, with simple examples of the two kinds of drift and three easy ways to spot it."
pubDate: 2026-09-03
updatedDate: 2026-11-19
topic: "ML Fundamentals"
level: Intermediate
cover: /images/cover-drift.jpg
coverAlt: "Two overlapping bell curves, labelled \"what it learned from\" and \"what it sees now\", with an arrow showing the shift between them."
takeaways:
  - "The world keeps changing after an AI is built. If the AI doesn't keep up, its answers slowly get worse."
  - "Data drift means the information coming in changes. Concept drift means what it means changes."
  - "Spot it early by comparing new data with old, watching the AI's answers and checking some by hand."
---

Think about your way to school. You learned the route, and it works every day. Then one morning a road closes. If you keep following your old route, you'll be late. You have to notice the change and adjust.

AI has the same problem. It learns from a snapshot of the world, but the world keeps changing.

## The big idea in one sentence

**When the world changes after an AI is built, its answers can slowly get worse, unless someone notices and updates it.**

This is called **drift**. And it's sneaky. In a 2018 paper, researchers Stephan Rabanser, Stephan Günnemann and Zachary Lipton wrote that machine learning systems "tend to fail silently". There's no alarm. The answers just quietly get worse.

## A real example: when traffic changed overnight

Google Maps predicts traffic partly from past patterns, which had been reliable for years. Then, in early 2020, COVID-19 lockdowns began, and worldwide traffic fell by up to **50%**. The old patterns suddenly didn't fit.

Google's fix: update its models to focus on the last **two to four weeks** of traffic, and pay much less attention to older patterns. The world changed, so the AI had to change too.

![Diagram of model drift. Left, an illustration: two bell curves, one for the data the model learned from and one, shifted to the right, for the data it sees now; a two-sample test checks whether they look like they come from the same place. Right, the Google Maps example: before 2020, historical traffic patterns were reliable for years; in early 2020, lockdowns cut worldwide traffic by up to 50%; the fix was for models to lean on the last two to four weeks of data.](/images/drift-shift.jpg)

## Two kinds of drift

| | What changes | Example from IBM |
| --- | --- | --- |
| **Data drift** | The kind of information coming in | A website first used mostly by young people starts attracting older people too |
| **Concept drift** | What the information means | Spammers keep inventing new tricks, so a spam filter that never updates soon falls behind |

## Three easy ways to spot it

1. **Compare new data with old data.** Does what's coming in now look like what the AI learned from? A **two-sample test** checks whether two sets of data look like they come from the same place. In Rabanser and colleagues' study, an approach based on these tests worked best at spotting changes.
2. **Watch the AI's answers.** If it suddenly gives one answer much more often than usual, that's an early hint something has changed.
3. **Check some answers by hand.** Having people review a few recent examples shows how well the AI is really doing.

### For the technically curious: a quick drift check

This snippet compares one input, the payment amount, in the training data with last week's data, using a Kolmogorov–Smirnov test from the SciPy library. The table names are placeholders for your own data.

```python
from scipy.stats import ks_2samp
stat, p_value = ks_2samp(train_df["amount"], last_week_df["amount"])
if p_value < 0.01:
    print("'amount' looks different from the training data. Time for a closer look.")
```

**What the output means:** the test gives a p-value. A very small one (here, under 0.01) means the two sets of amounts are unlikely to come from the same pattern, so the code prints a warning that it's time for a closer look. If the amounts look similar, it prints nothing.

> **Tip:** checks only help if someone acts on them. Decide in advance who gets the warning and how the AI will be updated.

## Something to think about

What has changed in your own life over the last year: your routines, your favourite apps, the way you shop? Every one of those changes is something an AI would need to learn about too.

## Sources & further reading

- Rabanser, Günnemann & Lipton, [*Failing Loudly: An Empirical Study of Methods for Detecting Dataset Shift*](https://arxiv.org/abs/1810.11953) (2018, published at NeurIPS 2019).
- Google, [*Google Maps 101: How AI helps predict traffic and determine routes*](https://blog.google/products/maps/google-maps-101-how-ai-helps-predict-traffic-and-determine-routes/) (2020).
- SciPy documentation for [`ks_2samp`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ks_2samp.html), the test used in the example above.
- IBM, [*What is model drift?*](https://www.ibm.com/think/topics/model-drift), for the data drift and concept drift examples.
- Related: [overfitting in plain English](/blog/validation-loss-rising/)
