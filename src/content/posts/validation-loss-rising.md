---
title: "What is overfitting? When AI memorises instead of learning"
description: "Why a model can ace its practice questions yet stumble on new ones, plus three gentle ways to help it learn."
pubDate: 2026-10-08
updatedDate: 2026-11-03
topic: "Images & Learning"
level: Beginner
cover: /images/cover-overfitting.jpg
coverAlt: "A chart with two falling curves: practice examples keep improving, while new examples improve, level off, then rise again. A star marks the best moment to stop."
---

Think back to studying for a test. You could learn *why* each answer is right, or you could simply memorise the practice questions. Both work well on the practice sheet. Only one helps on the real exam.

AI models face exactly the same choice. When a model memorises instead of learning, we call it **overfitting**, and spotting it is one of the most useful habits in machine learning.

## A friendly example

Imagine teaching an AI to sort email into "important" and "not important". Your training emails happen to include lots of important messages from your manager, who always signs off with "Cheers, Sam".

A model that overfits might learn a surprising rule: *emails ending in "Cheers, Sam" are important.* It scores perfectly on your training emails. But when a new colleague also called Sam sends a newsletter, or your manager changes their sign-off, the model gets confused. It learned a coincidence, not the real pattern, such as deadlines, meeting requests or questions addressed to you.

## Spotting the moment it happens

To catch this, we split our examples into groups:

- **Training set:** the examples the model studies.
- **Validation set:** examples it never studies, used to check its progress as it learns.
- **Test set:** a final, untouched set used once at the very end, like the real exam.

While a model trains, we track two numbers:

- **Training loss:** how well it does on the examples it is studying.
- **Validation loss:** how well it does on examples it has never seen.

At first both go down together, which is great news. But sometimes, a few rounds later, training loss keeps falling while validation loss starts to rise. That gentle turn, shown by the star on the cover chart, is the sign of overfitting.

## Not too simple, not too complex

There's a Goldilocks balance here.

- A model that is **too simple** can't capture the real pattern at all. It does poorly on both practice and new examples. This is called **underfitting**.
- A model that is **too complex**, or trained for too long, starts learning the noise and coincidences. It does brilliantly on practice examples and less well on new ones.
- A model that is **just right** learns the general pattern, and does well on both.

## Why it happens

Every set of training examples contains a little randomness: unusual cases, typos, one-off details. A model with lots of capacity can eventually learn those details too. They help on the practice examples but not on anything new. The fewer examples you have, the easier it is for coincidences to look like patterns.

## Three friendly ways to help

1. **Stop at the right moment.** Keep the version of the model from the round when validation loss was lowest. Most tools call this *early stopping* and can do it for you.
2. **Encourage simpler answers.** Techniques like *weight decay* (gently keeping the model's settings small) and *dropout* (briefly switching off random parts of the network during training) nudge the model toward general patterns rather than tiny details.
3. **Show it more variety.** More examples help most. You can also create variety by flipping or cropping images, or rephrasing sentences. This is called *data augmentation*.

```python
# In PyTorch, weight decay is a single setting on the optimizer
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=0.01)
```

> **A helpful check first:** sometimes validation loss rises because the new examples are simply different, for example collected later or from different people. It's worth checking that before changing the model. Our guide to [model drift](/blog/monitoring-drift/) explores this.

## Common questions

**Is overfitting always bad?**
A little is normal, and most models do slightly better on their training examples than on new ones. It becomes a problem when the gap grows large, because that's when real-world results disappoint.

**How much data is "enough" to avoid it?**
There's no single number. It depends on how complex the task and the model are. A useful rule is to watch the validation loss: if it keeps improving as you add data, more data is still helping.

**Do giant models like chatbots overfit?**
They can memorise rare passages they've seen many times, which is one reason researchers remove duplicates from training data and test models on fresh questions.

## Something to think about

Can you remember a time you memorised something without really understanding it? What helped you finally *get* it? The same ideas, practice with variety and knowing when to stop, help AI too.

## Sources & further reading

- Google, [Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course), with friendly lessons on generalisation and overfitting.
- Srivastava et al., [*Dropout: A Simple Way to Prevent Neural Networks from Overfitting*](https://jmlr.org/papers/v15/srivastava14a.html) (2014).
- Previous in this series: [gradient descent explained](/blog/gradient-descent-felt/).
