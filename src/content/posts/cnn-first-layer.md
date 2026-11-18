---
title: "Computer vision basics: what AI notices first in an image"
description: "Open up a vision model and you'll find it starts by noticing edges and colours, a lot like our own eyes."
pubDate: 2026-10-01
topic: "ML Fundamentals"
level: Beginner
cover: /images/cover-image-filters.jpg
coverAlt: "A grid of 32 small tiles showing edges at different angles, light-to-dark fades and soft colour spots, like the first patterns an image model learns."
takeaways:
  - "Image models build understanding in layers, starting from simple patterns in the pixels."
  - "Nobody programs these patterns; the model learns them from examples during training."
  - "Researchers who visualised one model found corners, then textures, then parts like dog faces, then whole objects."
---

When you look at a photo of a cat, you just *see* a cat. But what does an AI see first? The answer is surprisingly intuitive.

## Little windows sliding across a picture

Many image models are built from **convolutional layers**. Each layer has a set of small "windows", called filters, just a few pixels across. Each filter slides across the picture and asks one question everywhere it goes: *"Does this patch look like my pattern?"*

The answers form a new image, called a feature map, that glows wherever the pattern appears.

## Here's the delightful part

Because the first filters look directly at pixels, we can display them as tiny pictures of their own. When Matthew Zeiler and Rob Fergus visualised a trained image model in 2013, its first-layer filters picked up a mix of very fine and very broad patterns.

Nobody draws these patterns by hand. The model learns them from examples while training.

## Building up, layer by layer

Each new layer looks at the patterns found by the layer before. In Zeiler and Fergus's model, the second layer responded to corners and combinations of edges and colours, the third to textures such as mesh patterns, the fourth to parts like dog faces and birds' legs, and the fifth to whole objects such as keyboards and dogs. It's a bit like learning to read: letters, then words, then sentences.

![Diagram of an image model building up layer by layer: layer 1 picks up very fine and very broad patterns, layer 2 corners, edges and colours, layer 3 textures like mesh, layer 4 parts such as dog faces and birds' legs, and layer 5 whole objects such as keyboards and dogs. Based on Zeiler and Fergus (2013).](/images/cnn-layers.jpg)

## Simple first, complex later

Zeiler and Fergus also watched how these patterns developed during training. The lower layers settled within a few passes through the training data, but the upper layers only took shape after 40 to 50 passes. Their lesson: let a model train until it has fully settled.

They found another difference between the layers. Small shifts, rotations or changes in size had a dramatic effect on what the first layer detected, but much less effect on the top layers. That's useful: a cat is still a cat if it moves a little to the left.

## Is the model really looking at the object?

A fair question is whether an image model actually looks at the object, or just at the background around it. Zeiler and Fergus tested this by covering different parts of a picture with a grey square and watching the model's answer.

When they covered the object itself, the model's confidence in the right answer dropped sharply. So the model was genuinely finding the object, not just guessing from its surroundings.

## Why seeing inside matters

Visualising each layer wasn't just interesting. It helped Zeiler and Fergus spot ways to improve the model's design, and their improved model beat the earlier, well-known model by Krizhevsky and colleagues on the ImageNet image-recognition benchmark.

## Try it yourself

```python
import torchvision
model = torchvision.models.resnet18(weights="DEFAULT")
filters = model.conv1.weight.detach()  # shape: (64, 3, 7, 7)
print(filters.shape)
```

Scale each of the 64 filters to the 0 to 1 range and display them in a grid. What patterns can you spot?

## Sources & further reading

- Krizhevsky, Sutskever & Hinton, [*ImageNet Classification with Deep Convolutional Neural Networks*](https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html) (2012), the AlexNet paper.
- Zeiler & Fergus, [*Visualizing and Understanding Convolutional Networks*](https://arxiv.org/abs/1311.2901) (2013), the source of the findings in this article.
- Olah, Mordvintsev & Schubert, [*Feature Visualization*](https://distill.pub/2017/feature-visualization/) (Distill, 2017), a beautiful look at what each layer responds to.
- Related: [diffusion models unpacked](/blog/diffusion-noise-to-image/).
