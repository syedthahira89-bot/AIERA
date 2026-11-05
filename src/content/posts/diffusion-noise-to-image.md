---
title: "Diffusion models explained: how AI turns noise into images"
description: "Many AI image tools start with pure noise and tidy it up, a little at a time, until a picture appears."
pubDate: 2026-09-10
updatedDate: 2026-11-03
topic: "ML Fundamentals"
level: Intermediate
cover: /images/cover-diffusion.jpg
coverAlt: "Five squares in a row, changing from random static into a clear picture of a sun over green hills."
---

Have you ever watched an old TV showing nothing but static, and imagined a picture hiding inside? Many of today's AI image tools work in a surprisingly similar way. They start with pure noise and gently clean it up, step by step, until a picture appears. They're called **diffusion models**, and the idea behind them is lovely.

## An everyday way to picture it

Think of a sculptor with a rough block of stone. They don't create the statue in one go. They remove a little stone, step back, look, and remove a little more. Slowly, a shape that "was always in there" appears.

A diffusion model is a sculptor for pictures. Its block of stone is random static, and each step removes a little of the noise, guided by what it learned about how real pictures look.

## Step one: slowly add noise

During training, the model is shown real pictures with a little random noise sprinkled on top. Over many steps, often 1,000, the noise grows until the picture fades into static. Thanks to some neat maths, we can jump straight to any step $t$:

$$
x_t = \sqrt{\bar\alpha_t}\, x_0 + \sqrt{1 - \bar\alpha_t}\, \epsilon, \qquad \epsilon \sim \mathcal{N}(0, I)
$$

Here $x_0$ is the original picture, $\epsilon$ is the noise, and $\bar\alpha_t$ shrinks from about 1 toward 0 as $t$ grows. So the picture slowly fades out while the static fades in.

## Step two: learn to spot the noise

The model's job sounds simple: look at a noisy picture, and guess exactly which noise was added. It is trained on millions of examples at every noise level, comparing its guess with the real noise each time and adjusting itself with [gradient descent](/blog/gradient-descent-felt/).

Here's the clever part. To guess the noise well, the model has to understand what pictures *usually* look like: that skies tend to be at the top, that faces have two eyes, that grass is often green. All of that knowledge ends up inside the model.

## Step three: paint by un-noising

To create something new, the model starts from pure static. It guesses the noise, removes a little of it, and repeats. With each step, shapes, colours and details gradually appear, just like the five squares on the cover above.

Early steps decide the big picture: where the horizon sits, what's in the middle. Later steps add fine details like textures and edges. Faster methods can produce a picture in just 20 to 50 steps instead of 1,000.

## How your words steer the picture

To make a picture that matches your prompt, the model also receives a description of your words at every step, created by a separate model that turns text into numbers.

A technique called **classifier-free guidance** then helps it follow your words closely. At each step, the model makes two guesses: one with your prompt and one without. It then leans further in the direction of the prompted guess. Many image tools let you adjust how strongly it leans, often with a setting called the **guidance scale**. Higher values follow the prompt more literally; lower values give the model more creative freedom.

## Working in a smaller space

Cleaning up a large, detailed picture pixel by pixel takes a lot of computing. So many popular image tools first squeeze pictures into a much smaller, compressed form, do all the noise-removing there, and then expand the result back into a full picture at the end. This approach is called **latent diffusion**, and it's a big reason these tools can run on everyday computers.

## Common questions

**Does the model copy or stitch together existing images?**
No. It learns general patterns from many pictures, then builds new ones from static. That said, models can sometimes reproduce very common images too closely, which is one reason training data and image rights are important topics.

**Why does the same prompt give a different picture each time?**
Because every picture starts from a different patch of random static. Many tools let you set a "seed" number to start from the same static and get the same result again.

**Are diffusion models only for pictures?**
Not at all. The same idea is used for audio, video and even designing new molecules.

## Something to think about

Next time you see an AI-made image, picture it beginning as a screen of static, being tidied up a little at a time. What would you ask it to paint?

## Sources & further reading

- Ho, Jain & Abbeel, [*Denoising Diffusion Probabilistic Models*](https://arxiv.org/abs/2006.11239) (2020), the paper that popularised this approach.
- Song, Meng & Ermon, [*Denoising Diffusion Implicit Models*](https://arxiv.org/abs/2010.02502) (2020), a faster way to generate in fewer steps.
- Ho & Salimans, [*Classifier-Free Diffusion Guidance*](https://arxiv.org/abs/2207.12598) (2022).
- Rombach et al., [*High-Resolution Image Synthesis with Latent Diffusion Models*](https://arxiv.org/abs/2112.10752) (2022).
