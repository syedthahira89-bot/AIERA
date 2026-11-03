---
title: "How AI paints from static: a gentle guide to diffusion models"
description: "Many AI image tools start with pure noise and tidy it up, a little at a time, until a picture appears."
pubDate: 2026-09-10
topic: "Eyes of AI"
level: Intermediate
---

Have you ever watched an old TV show nothing but static, and imagined a picture hiding inside? Many of today's AI image tools work in a surprisingly similar way. They start with pure noise and gently clean it up, step by step, until a picture appears. They're called **diffusion models**, and the idea behind them is lovely.

## Step one: slowly add noise

During training, the model is shown real pictures with a little random noise sprinkled on top. Over many steps, often 1,000, the noise grows until the picture fades into static. Thanks to some neat maths, we can jump straight to any step $t$:

$$
x_t = \sqrt{\bar\alpha_t}\, x_0 + \sqrt{1 - \bar\alpha_t}\, \epsilon, \qquad \epsilon \sim \mathcal{N}(0, I)
$$

Here $x_0$ is the original picture, $\epsilon$ is the noise, and $\bar\alpha_t$ shrinks from about 1 toward 0 as $t$ grows. So the picture slowly fades out while the static fades in.

## Step two: learn to spot the noise

The model's job sounds simple: look at a noisy picture, and guess exactly which noise was added. It is trained on millions of examples at every noise level, and slowly becomes very good at it.

## Step three: paint by un-noising

To create something new, the model starts from pure static. It guesses the noise, removes a little of it, and repeats. With each step, shapes, colours and details gradually appear. Faster methods can produce a picture in just 20 to 50 steps instead of 1,000.

To make a picture that matches your words, the model also receives a description of your prompt at every step. A technique called **classifier-free guidance** compares its guesses with and without the prompt, then leans toward the version that fits your words more closely.

## Something to think about

Next time you see an AI-made image, picture it beginning as a screen of static, being tidied up a little at a time. What would you ask it to paint?
