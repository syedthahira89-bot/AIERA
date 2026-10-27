---
title: "Shipping a model is the easy part: watching for drift"
description: "How input data quietly changes after launch, and the checks that catch it before your users do."
pubDate: 2026-09-03
topic: MLOps
level: Intermediate
---

A model is trained on a snapshot of the world. After launch the world keeps moving: new products appear, users behave differently, and an upstream team changes how a field is recorded. Accuracy slips, and nothing throws an error.

## Two kinds of drift

- **Data drift**: the distribution of inputs changes. A fraud model trained before a holiday season sees very different purchase patterns during it.
- **Concept drift**: the relationship between inputs and the right answer changes. The same transaction pattern that was safe last year is now a known fraud technique.

## What to monitor

1. **Input feature distributions.** Compare recent data with the training data using a statistic such as the population stability index or a Kolmogorov–Smirnov test, and alert on large shifts.
2. **Prediction distribution.** If your model suddenly predicts "fraud" twice as often, something changed, even before you have labels.
3. **Real accuracy on a labelled sample.** Keep a small stream of recent examples flowing to human review so you can measure performance directly.

```python
from scipy.stats import ks_2samp
stat, p_value = ks_2samp(train_df["amount"], last_week_df["amount"])
if p_value < 0.01:
    print("amount has drifted, investigate before the next retrain")
```

> Monitoring is only useful if someone acts on it. Decide in advance who gets alerted and what the retraining process is.
