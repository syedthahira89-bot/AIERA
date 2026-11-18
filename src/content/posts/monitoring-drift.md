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
Launching an AI model is a wonderful milestone, but it's only the start of the journey. A model learns from a snapshot of the world, and the world keeps changing: new products appear, people's habits shift, and the way information is recorded gets updated.

When the world moves on, a model's answers can become less accurate. Researchers Stephan Rabanser, Stephan Günnemann and Zachary Lipton put it memorably in a 2018 paper: machine learning systems "tend to fail silently". They don't raise an alarm; they just quietly get worse. This change is called **drift**, and looking after it is an important part of running AI responsibly.

## A real example: when traffic changed overnight

Google Maps predicts traffic partly from historical patterns. According to Google, those patterns were reliable for years, until the COVID-19 pandemic. When lockdowns began in early 2020, worldwide traffic fell by up to 50%.

Google responded by updating its models to lean on the most recent **two to four weeks** of traffic data, and much less on older patterns. That's drift in action: the world changed, so the model had to change too.

![Diagram of model drift. Left, an illustration: two bell curves, one for the data the model learned from and one, shifted to the right, for the data it sees now; a two-sample test checks whether they look like they come from the same place. Right, the Google Maps example: before 2020, historical traffic patterns were reliable for years; in early 2020, lockdowns cut worldwide traffic by up to 50%; the fix was for models to lean on the last two to four weeks of data.](/images/drift-shift.jpg)

## Two kinds of change

- **Data drift:** the kind of information coming in changes. A shopping model trained in spring may see very different buying patterns during the holiday season.
- **Concept drift:** the meaning behind the information changes. A pattern that used to mean one thing can come to mean something else.

## Three friendly check-ups

1. **Compare what's coming in with what the model learned from.** A **two-sample test** asks whether two sets of data look like they come from the same place. In Rabanser and colleagues' study, an approach based on two-sample tests performed best at detecting these shifts. One simple version tests each input separately with a Kolmogorov–Smirnov test.
2. **Watch the model's answers.** If it suddenly gives one answer twice as often as usual, that's a helpful early hint, even before you know whether the answers are right.
3. **Keep checking a small sample by hand.** A steady trickle of recent examples reviewed by people shows how well the model is really doing.

### For the technically curious: a quick drift check

This snippet compares one input, the payment amount, in the training data with last week's data, using SciPy's Kolmogorov–Smirnov test. The table names are placeholders for your own data.

```python
from scipy.stats import ks_2samp
stat, p_value = ks_2samp(train_df["amount"], last_week_df["amount"])
if p_value < 0.01:
    print("'amount' looks different from the training data. Time for a closer look.")
```

A small p-value means the two sets of amounts are unlikely to come from the same pattern, which is a sign worth investigating.

> **Tip:** checks are most helpful when someone is ready to act on them. Agree in advance who gets notified and how the model will be refreshed.

## Something to think about

What in your own life has changed over the last year: your routines, your favourite apps, the way you shop? Every one of those changes is something an AI model would need to learn about too.

## Sources & further reading

- Rabanser, Günnemann & Lipton, [*Failing Loudly: An Empirical Study of Methods for Detecting Dataset Shift*](https://arxiv.org/abs/1810.11953) (2018, published at NeurIPS 2019).
- Google, [*Google Maps 101: How AI helps predict traffic and determine routes*](https://blog.google/products/maps/google-maps-101-how-ai-helps-predict-traffic-and-determine-routes/) (2020).
- SciPy documentation for [`ks_2samp`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ks_2samp.html), the test used in the example above.
- Related: [overfitting in plain English](/blog/validation-loss-rising/)
