---
title: "Model drift 101: keeping AI reliable after launch"
description: "The world keeps changing after an AI model goes live. Here's how teams notice the change and keep their models up to date."
pubDate: 2026-09-03
topic: "ML Fundamentals"
level: Intermediate
cover: /images/cover-drift.jpg
coverAlt: "Two overlapping bell curves, labelled \"what it learned from\" and \"what it sees now\", with an arrow showing the shift between them."
takeaways:
  - "Model drift happens when the world changes after launch and a model's answers slowly become less accurate."
  - "Data drift means the inputs change; concept drift means what they mean changes."
  - "Compare new data with training data, watch the model's answers and review a sample by hand."
---

Launching an AI model is a wonderful milestone, but it's only the start of the journey. A model learns from a snapshot of the world, and the world keeps changing: new products appear, people's habits shift, and the way information is recorded gets updated. Over time, a model's answers can slowly become less accurate, quietly and without any warning signs.

This gentle change is called **drift**, and looking after it is one of the most important parts of running AI responsibly.

## Two kinds of change

- **Data drift:** the kind of information coming in changes. A shopping model trained in spring may see very different buying patterns during the holiday season.
- **Concept drift:** the meaning behind the information changes. A pattern that used to mean one thing can come to mean something else.

## Three friendly check-ups

1. **Compare what's coming in with what the model learned from.** Simple statistics, such as the population stability index or a Kolmogorov–Smirnov test, can highlight when an input starts to look different.
2. **Watch the model's answers.** If it suddenly gives one answer twice as often as usual, that's a helpful early hint, even before you know whether the answers are right.
3. **Keep checking a small sample by hand.** A steady trickle of recent examples reviewed by people shows how well the model is really doing.

```python
from scipy.stats import ks_2samp
stat, p_value = ks_2samp(train_df["amount"], last_week_df["amount"])
if p_value < 0.01:
    print("'amount' looks different from the training data. Time for a closer look.")
```

> **Tip:** checks are most helpful when someone is ready to act on them. Agree in advance who gets notified and how the model will be refreshed.

## Something to think about

What in your own life has changed over the last year: your routines, your favourite apps, the way you shop? Every one of those changes is something an AI model would need to learn about too.

## Sources & further reading

- SciPy documentation for [`ks_2samp`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ks_2samp.html), the test used in the example above.
- Google, [*Rules of Machine Learning*](https://developers.google.com/machine-learning/guides/rules-of-ml), practical advice on running models in production.
- Related: [overfitting in plain English](/blog/validation-loss-rising/)
