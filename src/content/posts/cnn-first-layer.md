---
title: "Computer vision basics: what AI notices first in an image"
description: "How an image AI looks at a picture: tiny patterns first, then shapes, then whole objects, explained with simple everyday examples."
pubDate: 2026-10-01
updatedDate: 2026-11-19
topic: "ML Fundamentals"
level: Beginner
cover: /images/cover-image-filters.jpg
coverAlt: "A grid of 32 small tiles showing edges at different angles, light-to-dark fades and soft colour spots, like the first patterns an image model learns."
takeaways:
  - "An image AI looks at a picture in layers: tiny patterns first, then bigger shapes, then whole objects."
  - "Nobody draws these patterns by hand. The AI learns them from examples."
  - "Looking inside the layers helps researchers check the AI and build better ones."
---

When you look at a photo of a cat, you just *see* a cat, instantly. An image AI can't do that. It builds up its understanding piece by piece, a bit like putting together a jigsaw puzzle.

## The big idea in one sentence

**An image AI looks at a picture in layers: tiny patterns first, then bigger shapes, then whole objects.**

## Little windows sliding across a picture

**Picture a tiny magnifying glass** sliding across a photo, one small patch at a time. At each patch, it asks one question: *"Is my pattern here?"* For example: "Is there a straight edge here?"

That's roughly what an image AI does. The tiny window is called a **filter**, and sliding it across the picture is called a **convolution**. The result is a new picture, called a **feature map**, that shows where the pattern was found.

An AI uses lots of different filters, each looking for its own pattern.

## What's inside each layer?

In 2013, researchers Matthew Zeiler and Rob Fergus found a way to look inside a trained image AI and see what each layer had learned:

| Layer | What it noticed |
| --- | --- |
| 1 | Simple patterns straight from the pixels |
| 2 | Corners, and combinations of edges and colours |
| 3 | Textures, such as mesh patterns |
| 4 | Parts of things, such as dogs' faces and birds' legs |
| 5 | Whole objects, such as keyboards and dogs |

**It's like learning to read:** first letters, then words, then whole sentences. Each layer builds on the one before.

![Diagram of an image model building up layer by layer: layer 1 picks up very fine and very broad patterns, layer 2 corners, edges and colours, layer 3 textures like mesh, layer 4 parts such as dog faces and birds' legs, and layer 5 whole objects such as keyboards and dogs. Based on Zeiler and Fergus (2013).](/images/cnn-layers.jpg)

Nobody draws these patterns by hand. The AI learns them by itself from lots of example pictures during training.

## Simple things first, complex things later

Zeiler and Fergus also watched the layers while the AI was learning. The lower layers, with the simple patterns, settled down after just a few passes through the training pictures. The top layers, with whole objects, needed 40 to 50 passes. Their advice: let the AI train until it has fully settled.

They found something else useful. If you move or resize a picture slightly, the first layer's answers change a lot, but the top layers change much less. **A cat is still a cat if it moves a little to the left.** Turning the picture round can still confuse it, though, unless the object looks the same from every angle.

## Is the AI really looking at the object?

Maybe the AI isn't looking at the dog at all, just at the grass around it. To check, the researchers covered different parts of a picture with a **grey square** and watched the AI's answer.

When the square covered the dog itself, the AI's confidence in the right answer dropped sharply. So it really was looking at the dog.

## Why looking inside matters

Looking inside the layers also showed what wasn't working. In an earlier, well-known model by Krizhevsky and colleagues, the first layer picked up very fine and very broad patterns, but hardly any in between. Fixing problems like this helped Zeiler and Fergus build a model that did better than the earlier one on ImageNet, a well-known image-recognition test.

## Try it yourself

```python
import torchvision
model = torchvision.models.resnet18(weights="DEFAULT")
filters = model.conv1.weight.detach()  # shape: (64, 3, 7, 7)
print(filters.shape)
```

**What the output means:** it prints the shape of the first layer's filters, (64, 3, 7, 7). That's 64 filters, each with 3 colour channels (red, green and blue) and a 7 × 7 grid of numbers. So each filter is a tiny 7 × 7 colour picture of the pattern it looks for.

Want to go further? Turn each of the 64 filters into a small image and display them in a grid. What patterns can you spot?

![A made-up illustration of what 64 first-layer filters can look like, drawn as an 8 by 8 grid of tiny colour tiles. Some show edges where light meets dark at different angles, some show fine or broad stripes, and some show patches of colour. A note explains that each tile is one filter, a tiny 7 by 7 colour picture, and that the tiles are drawn for illustration, not taken from a real model. Early layers focus on simple features, such as colours and edges.](/images/cnn-filters-grid.jpg)

## Sources & further reading

- Krizhevsky, Sutskever & Hinton, [*ImageNet Classification with Deep Convolutional Neural Networks*](https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html) (2012), the AlexNet paper.
- Zeiler & Fergus, [*Visualizing and Understanding Convolutional Networks*](https://arxiv.org/abs/1311.2901) (2013), the source of the findings in this article.
- Olah, Mordvintsev & Schubert, [*Feature Visualization*](https://distill.pub/2017/feature-visualization/) (Distill, 2017), a beautiful look at what each layer responds to.
- IBM, [*What are convolutional neural networks?*](https://www.ibm.com/think/topics/convolutional-neural-networks), on filters, convolution and feature maps.
- Related: [diffusion models unpacked](/blog/diffusion-noise-to-image/).
