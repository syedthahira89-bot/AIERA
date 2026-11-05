---
title: "Computer vision basics: what AI notices first in an image"
description: "Open up a vision model and you'll find it starts by noticing edges and colours, a lot like our own eyes."
pubDate: 2026-10-01
topic: "ML Fundamentals"
level: Beginner
cover: /images/cover-image-filters.jpg
coverAlt: "A grid of 32 small tiles showing edges at different angles, light-to-dark fades and soft colour spots, like the first patterns an image model learns."
---

When you look at a photo of a cat, you just *see* a cat. But what does an AI see first? The answer is surprisingly charming, and it looks a lot like how our own eyes and brain begin.

## Little windows sliding across a picture

Many image models are built from **convolutional layers**. Each layer has a set of small "windows", called filters, often just 3×3 or 7×7 pixels. Each filter slides across the picture and asks one question everywhere it goes: *"Does this patch look like my pattern?"*

The answers form a new image, called a feature map, that glows wherever the pattern appears.

## Here's the delightful part

Because the first filters look directly at pixels, we can display them as tiny pictures of their own. In a trained model, they turn out to be wonderfully neat: edges at different angles, smooth fades from light to dark, and patches of contrasting colour.

Nobody draws these patterns by hand. The model discovers them while learning, because edges and colour changes are the most useful building blocks for recognising almost anything. Scientists have found similar edge-detecting cells in the early visual areas of the brain.

## Building up, layer by layer

Each new layer looks at the patterns found by the layer before. So edges combine into corners and textures, those combine into parts like eyes, ears or wheels, and those combine into whole objects. It's a bit like learning to read: letters, then words, then sentences.

## Try it yourself

```python
import torchvision
model = torchvision.models.resnet18(weights="DEFAULT")
filters = model.conv1.weight.detach()  # shape: (64, 3, 7, 7)
print(filters.shape)
```

Scale each of the 64 filters to the 0 to 1 range and display them in a grid. You'll see the edge and colour detectors for yourself. Which ones do you recognise?

## Sources & further reading

- Krizhevsky, Sutskever & Hinton, [*ImageNet Classification with Deep Convolutional Neural Networks*](https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html) (2012), the AlexNet paper, whose first-layer filters are famously edge-like.
- Olah, Mordvintsev & Schubert, [*Feature Visualization*](https://distill.pub/2017/feature-visualization/) (Distill, 2017), a beautiful look at what each layer responds to.
- Related: [how diffusion models work](/blog/diffusion-noise-to-image/).
