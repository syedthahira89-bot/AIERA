---
title: "When AI memorises instead of learning: a friendly look at overfitting"
description: "Why a model can ace its practice questions yet stumble on new ones, plus three gentle ways to help it learn."
pubDate: 2026-10-08
topic: "How AI Learns"
level: Beginner
---

Think back to studying for a test. You could learn *why* each answer is right, or you could simply memorise the practice questions. Both work well on the practice sheet. Only one helps on the real exam.

AI models face exactly the same choice, and watching for it is one of the most useful habits in machine learning.

## Spotting the moment it happens

While a model trains, we usually track two numbers:

- **Training loss:** how well it does on the examples it is studying.
- **Validation loss:** how well it does on examples it has never seen.

At first both go down together, which is great news. But sometimes, a few rounds later, training loss keeps falling while validation loss starts to rise. That gentle turn is the sign of **overfitting**: the model has started memorising its practice examples instead of learning patterns that carry over to new ones.

## Why it happens

Every set of training examples contains a little randomness: unusual cases, typos, one-off details. A model with lots of capacity can eventually learn those details too. They help on the practice examples but not on anything new.

## Three friendly ways to help

1. **Stop at the right moment.** Keep the version of the model from the round when validation loss was lowest. Most tools call this *early stopping* and can do it for you.
2. **Encourage simpler answers.** Techniques like *weight decay* and *dropout* nudge the model toward general patterns rather than tiny details.
3. **Show it more variety.** More examples help most. You can also create variety by flipping or cropping images, or rephrasing sentences.

```python
# In PyTorch, weight decay is a single setting on the optimizer
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=0.01)
```

> **A helpful check first:** sometimes validation loss rises because the new examples are simply different, for example collected later or from different people. It's worth checking that before changing the model.

## Something to think about

Can you remember a time you memorised something without really understanding it? What helped you finally *get* it? The same ideas, practice with variety and knowing when to stop, help AI too.
