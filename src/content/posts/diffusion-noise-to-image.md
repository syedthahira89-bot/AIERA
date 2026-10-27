---
title: "Diffusion models, from pure noise to an image"
description: "Train a network to remove a little noise, then run it many times in a row."
pubDate: 2026-09-10
topic: Computer vision
level: Intermediate
---

Diffusion models power most modern image generators. The core idea is surprisingly simple: if you can remove a small amount of noise from an image, you can remove a lot of noise by doing it many times.

## The forward process: adding noise

Take a training image $x_0$ and add Gaussian noise in small steps until, after $T$ steps (often 1,000), nothing but noise is left. Because the noise is Gaussian, you can jump straight to any step $t$:

$$
x_t = \sqrt{\bar\alpha_t}\, x_0 + \sqrt{1 - \bar\alpha_t}\, \epsilon, \qquad \epsilon \sim \mathcal{N}(0, I)
$$

Here $\bar\alpha_t$ shrinks from about 1 to about 0 as $t$ grows, so the image fades out while the noise fades in.

## The training task: predict the noise

A neural network, usually a U-Net or a transformer, receives $x_t$ and the step number $t$, and is trained to predict the noise $\epsilon$ that was added. The loss is simply the squared error between the predicted and true noise.

## Generating an image

To generate, start from pure noise and step backwards: predict the noise, remove a portion of it, and repeat. Faster samplers such as DDIM need only 20 to 50 steps instead of 1,000.

To generate an image that matches a prompt, the network also receives a text embedding. A technique called classifier-free guidance strengthens the effect of the prompt by comparing predictions made with and without it.
