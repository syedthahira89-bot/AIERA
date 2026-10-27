---
title: "Why your validation loss went up while training loss kept falling"
description: "Overfitting, explained with one small dataset and three fixes you can try today."
pubDate: 2026-10-08
topic: Training & deployment
level: Beginner
cover: /images/validation-loss-rising-cover.jpg
coverAlt: "Training loss keeps falling while validation loss curves back up, with the best stopping point marked."
---

You start training, both curves fall together, and everything looks fine. Then, a few epochs later, training loss keeps dropping while validation loss turns around and climbs. That gap is overfitting.

## What the model is doing

The training set is a sample of the world, complete with noise and quirks. A model with enough capacity can eventually fit those quirks exactly. At that point every further improvement on the training data comes from memorizing details that do not carry over to new examples, so performance on held-out data gets worse.

## Three fixes to try first

1. **Stop early.** Keep the checkpoint from the epoch with the lowest validation loss. Most frameworks have an early-stopping callback that does this for you.
2. **Regularize.** Weight decay penalizes large weights, and dropout randomly switches off units during training so the network cannot rely on any single path.
3. **Add variety to the data.** More examples help most, but augmentation such as flips, crops and noise for images, or paraphrases for text, also makes memorizing harder.

```python
# PyTorch: weight decay is one argument on the optimizer
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=0.01)
```

> A rising validation loss can also mean your validation set differs from your training set, for example if it was collected later or from different users. Check that before adding regularization.
