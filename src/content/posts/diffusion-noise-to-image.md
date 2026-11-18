---
title: "Diffusion models unpacked: how AI turns noise into images"
description: "Many AI image tools start with pure noise and tidy it up, a little at a time, until a picture appears."
pubDate: 2026-09-10
updatedDate: 2026-11-03
topic: "ML Fundamentals"
level: Intermediate
cover: /images/cover-diffusion.jpg
coverAlt: "Five squares in a row, changing from random static into a clear picture of a sun over green hills."
takeaways:
  - "Diffusion models create images by starting from pure static and removing a little noise at each step."
  - "They learn by guessing which noise was added to real pictures."
  - "Your prompt steers every step, and latent diffusion reduces the computing needed."
---

Have you ever watched an old TV showing nothing but static, and imagined a picture hiding inside? Many of today's AI image tools work in a surprisingly similar way. They start with pure noise and gently clean it up, step by step, until a picture appears. They're called **diffusion models**, and the idea behind them is elegant.

## An everyday way to picture it

Think of a sculptor with a rough block of stone. They don't create the statue in one go. They remove a little stone, step back, look, and remove a little more. Slowly, a shape that "was always in there" appears.

A diffusion model is a sculptor for pictures. Its block of stone is random static, and each step removes a little of the noise, guided by what it learned about how real pictures look.

## Step one: slowly add noise

During training, the model is shown real pictures with a little random noise sprinkled on top. Over many steps (the original 2020 paper used 1,000), the noise grows until the picture fades into static. Thanks to some neat maths, we can jump straight to any step $t$:

$$
x_t = \sqrt{\bar\alpha_t}\, x_0 + \sqrt{1 - \bar\alpha_t}\, \epsilon, \qquad \epsilon \sim \mathcal{N}(0, I)
$$

Here $x_0$ is the original picture, $\epsilon$ is the noise, and $\bar\alpha_t$ shrinks from about 1 toward 0 as $t$ grows. So the picture slowly fades out while the static fades in.

## Step two: learn to spot the noise

The model's job sounds simple: look at a noisy picture, and guess exactly which noise was added. It is trained on many examples at every noise level, comparing its guess with the real noise each time and adjusting itself with [gradient descent](/blog/gradient-descent-felt/).

Here's the clever part. To guess the noise well, the model has to understand what pictures *usually* look like: that skies tend to be at the top, that faces have two eyes, that grass is often green. All of that knowledge ends up inside the model.

## Step three: paint by un-noising

To create something new, the model starts from pure static. It guesses the noise, removes a little of it, and repeats. With each step, shapes, colours and details gradually appear, just like the five squares on the cover above.

Early steps decide the big picture: where the horizon sits, what's in the middle. Later steps add fine details like textures and edges. Faster methods can do it in far fewer steps: the 2020 DDIM paper matched the quality of 1,000-step models in 20 to 100 steps.

![Diagram of how a diffusion model works. Training: a simple picture of a sky, sun and grass gets a little more noise at each step until it becomes static; the original 2020 paper used 1,000 steps. Creating: the model starts from static and removes a little noise at each step until a picture appears, with early steps setting the big picture and later steps adding fine details. Faster methods (DDIM, 2020) matched 1,000-step quality in 20 to 100 steps.](/images/diffusion-two-ways.jpg)

## How your words steer the picture

To make a picture that matches your prompt, the model also receives a description of your words at every step, created by a separate model that turns text into numbers.

A technique called **classifier-free guidance** then helps it follow your words closely. At each step, the model makes two guesses: one with your prompt and one without. It then leans further in the direction of the prompted guess. How strongly it leans can be adjusted. The researchers who introduced the technique describe this as a trade-off between picture quality and variety.

## Working in a smaller space

Cleaning up a large, detailed picture pixel by pixel takes a lot of computing. **Latent diffusion**, described in a 2021 paper, first squeezes pictures into a much smaller, compressed form, does all the noise-removing there, and then expands the result back into a full picture at the end. This greatly reduces the computing needed.

## Common questions

**Does the model copy or stitch together existing images?**
It's designed to learn general patterns and build new pictures from static. But a 2023 study showed that diffusion models can memorise some individual training images and reproduce them, which is one reason training data and image rights are important topics.

**Why does the same prompt give a different picture each time?**
Because every picture starts from a different patch of random static. The DDIM paper found that starting from the same static gives pictures with very similar overall features.

## Something to think about

Next time you see an AI-made image, picture it beginning as a screen of static, being tidied up a little at a time. What would you ask it to paint?

## Sources & further reading

- Ho, Jain & Abbeel, [*Denoising Diffusion Probabilistic Models*](https://arxiv.org/abs/2006.11239) (2020), the paper that popularised this approach.
- Song, Meng & Ermon, [*Denoising Diffusion Implicit Models*](https://arxiv.org/abs/2010.02502) (2020), a faster way to generate in fewer steps.
- Ho & Salimans, [*Classifier-Free Diffusion Guidance*](https://arxiv.org/abs/2207.12598) (2022).
- Rombach et al., [*High-Resolution Image Synthesis with Latent Diffusion Models*](https://arxiv.org/abs/2112.10752) (2021, published at CVPR 2022).
- Carlini et al., [*Extracting Training Data from Diffusion Models*](https://arxiv.org/abs/2301.13188) (2023).
- [Sun, rain or storm? How neural networks forecast the weather](/blog/ai-weather-forecasting/), including GenCast, a diffusion model that forecasts the weather.
