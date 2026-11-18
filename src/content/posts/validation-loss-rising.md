---
title: "Overfitting in plain English: when AI memorises, not learns"
description: "Why a model can ace its practice questions yet stumble on new ones, plus three gentle ways to help it learn."
pubDate: 2026-10-08
updatedDate: 2026-11-03
topic: "ML Fundamentals"
level: Beginner
cover: /images/cover-overfitting.jpg
coverAlt: "A chart with two falling curves: practice examples keep improving, while new examples improve, level off, then rise again. A star marks the best moment to stop."
takeaways:
  - "Overfitting is when a model memorises its practice examples instead of learning the real pattern."
  - "Watch validation loss: when it rises while training loss keeps falling, the model is overfitting."
  - "Stop early, encourage simpler models and add more varied examples to help it generalise."
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

![An illustration, not real data: training loss keeps falling over the training rounds, while validation loss falls, reaches its lowest point (marked 'Stop here') and then starts to rise. Beside it, three friendly ways to help: stop at the right moment, encourage simpler answers with weight decay and dropout, and show the model more variety.](/images/overfitting-curves.jpg)

## Not too simple, not too complex

There's a Goldilocks balance here.

- A model that is **too simple** can't capture the real pattern at all. It does poorly on both practice and new examples. This is called **underfitting**.
- A model that is **too complex**, or trained for too long, starts learning the noise and coincidences. It does brilliantly on practice examples and less well on new ones.
- A model that is **just right** learns the general pattern, and does well on both.

## Why it happens

Every set of training examples contains a little randomness: unusual cases, typos, one-off details. A model with lots of capacity can eventually learn those details too. They help on the practice examples but not on anything new. The fewer examples you have, the easier it is for coincidences to look like patterns.

## Three friendly ways to help

1. **Stop at the right moment.** Pause training before the model starts fitting its training examples too closely. This is called *early stopping*, and many machine learning packages can do it for you. Stop too early, though, and the model may underfit instead.
2. **Encourage simpler answers.** Techniques like *weight decay* (keeping the network's weights small) and *dropout* (randomly leaving out parts of the network during training) are forms of regularisation: ways to reduce overfitting.
3. **Show it more variety.** Training with more data can help the model find the real pattern. You can also create extra examples from the ones you already have. This is called *data augmentation*.


> **A helpful check first:** sometimes validation loss rises because the new examples are simply different, for example collected later or from different people. It's worth checking that before changing the model. Our guide to [model drift](/blog/monitoring-drift/) explores this.

## Common questions

**Is overfitting always bad?**
A little is normal, and most models do slightly better on their training examples than on new ones. It becomes a problem when the gap grows large, because that's when real-world results disappoint.

**How much data is "enough" to avoid it?**
There's no single number. It depends on how complex the task and the model are. A useful rule is to watch the validation loss: if it keeps improving as you add data, more data is still helping.

**Do giant models like chatbots overfit?**
Large models can memorise some of their training data: a 2023 study showed that image-generating diffusion models can reproduce individual training images. That's one reason to test models on fresh questions they haven't seen.

## Something to think about

Can you remember a time you memorised something without really understanding it? What helped you finally *get* it? The same ideas, practice with variety and knowing when to stop, help AI too.

## Sources & further reading

- IBM, [*What is overfitting?*](https://www.ibm.com/think/topics/overfitting), on overfitting, underfitting, early stopping and training with more data.
- IBM, [*What is regularization?*](https://www.ibm.com/think/topics/regularization), on dropout, weight decay and data augmentation.
- Google, [Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course), for further reading.
- Srivastava et al., [*Dropout: A Simple Way to Prevent Neural Networks from Overfitting*](https://jmlr.org/papers/v15/srivastava14a.html) (2014), the original dropout paper, for further reading.
- Carlini et al., [*Extracting Training Data from Diffusion Models*](https://arxiv.org/abs/2301.13188) (2023).
- Previous in this series: [gradient descent 101](/blog/gradient-descent-felt/).
