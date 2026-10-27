---
title: "What the first layer of a CNN learns to see"
description: "Visualize trained filters and you find edge and colour detectors, much like the early stages of the visual cortex."
pubDate: 2026-10-01
topic: Computer vision
level: Beginner
---

A convolutional layer slides a set of small filters, often 3×3 or 7×7 pixels, across an image. At each position it computes how strongly the patch underneath matches the filter. The result is a feature map that lights up wherever that pattern appears.

## Looking at the filters

Because first-layer filters act directly on pixels, you can display their weights as tiny images. In a network trained on ImageNet, such as AlexNet, they look strikingly regular: edges at different angles, light-to-dark gradients and blobs of opposing colours.

Nobody programs these patterns. They emerge from training because edges and colour contrasts are the most useful building blocks for recognizing almost anything.

## From edges to objects

Deeper layers take the previous layer's feature maps as input, so they detect combinations of patterns. Layer by layer, edges combine into corners and textures, those into parts such as eyes or wheels, and those into whole objects.

```python
import torchvision
model = torchvision.models.resnet18(weights="DEFAULT")
filters = model.conv1.weight.detach()  # shape: (64, 3, 7, 7)
print(filters.shape)
```

Normalize each filter to the 0 to 1 range and plot the 64 of them in a grid to see the edge detectors for yourself.
