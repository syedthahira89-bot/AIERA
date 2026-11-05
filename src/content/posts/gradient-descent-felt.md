---
title: "Gradient descent 101: how AI learns step by step"
description: "Discover how AI improves itself one small step at a time, and why the size of each step matters so much."
pubDate: 2026-10-15
updatedDate: 2026-11-03
topic: "ML Fundamentals"
level: Beginner
cover: /images/cover-gradient-descent.jpg
coverAlt: "A curved valley with a trail of dots stepping down one side to a glowing dot at the lowest point, marked with a star."
takeaways:
  - "Gradient descent is how AI improves: measure the error, take a small step downhill, repeat."
  - "The learning rate sets the step size; too small is slow and too large overshoots."
  - "The same idea scales to billions of settings with mini-batches and smart optimisers like Adam."
---

Have you ever wondered how an AI model actually *gets better*? It isn't magic. Behind almost every model, from photo filters to chatbots, is one beautifully simple idea called **gradient descent**. Let's explore it together, no framework required.

## An everyday version you already know

Think about adjusting the shower in the morning. Too cold? You turn the handle a little toward hot. Now too warm? You nudge it back a touch. After a few small adjustments, it's just right.

You didn't calculate the perfect position. You felt how far off you were, adjusted in the right direction, and repeated. That's the heart of gradient descent.

## A walk downhill in the fog

Here's another way to picture it. Imagine you're standing on a hillside in thick fog, and your goal is to reach the bottom of the valley. You can't see far, but you can feel which way the ground slopes under your feet. So you take a small step downhill, feel the slope again, and take another.

In AI, the "height" is the model's **loss**, a number that measures how far its answers are from the right ones. The slope is the **gradient**. For a single setting $x$, the slope is written $\frac{dL}{dx}$, and each step looks like this:

$$
x \leftarrow x - \eta \, \frac{dL}{dx}
$$

The Greek letter $\eta$ (eta) is the **learning rate**: how big each step is.

## Let's walk it step by step

Let's use the simplest valley there is, $L(x) = x^2$. The bottom is at $x = 0$. Its slope is $2x$, so every step becomes $x \leftarrow x(1 - 2\eta)$.

Start at $x = -3.5$ with a learning rate of 0.4. Each step multiplies $x$ by 0.2:

| Step | x | Loss (x²) |
| --- | --- | --- |
| 0 | −3.5 | 12.25 |
| 1 | −0.7 | 0.49 |
| 2 | −0.14 | 0.0196 |
| 3 | −0.028 | 0.00078 |

In just three steps, the loss drops from 12.25 to almost zero. Each step is smaller than the last, because the slope gets gentler as we approach the bottom. Nobody told the model to slow down. The maths does it naturally.

## How big should each step be?

Now let's compare different step sizes on the same valley:

| Learning rate | What happens to x each step | What it feels like |
| --- | --- | --- |
| 0.05 | multiplied by 0.9 | Slow and steady |
| 0.4 | multiplied by 0.2 | Quick and smooth |
| 0.9 | multiplied by −0.8 | Bouncing side to side, but still settling |
| 1.1 | multiplied by −1.2 | Each bounce gets bigger, so it never settles |

You can feel each of these for yourself in the [interactive demo on the home page](/#concept). Try sliding the learning rate slowly from small to large and watch the path change.

## From one setting to millions

Real models don't have one setting. They have millions or even billions, called **parameters**. The good news is that the idea stays exactly the same: the gradient becomes a long list of slopes, one per setting, and every setting takes its own small step downhill at the same time.

Two practical tricks make this work at scale:

- **Mini-batches.** Instead of checking every training example before each step, the model looks at a small random handful, say 32 or 256 examples. That's much faster, and the little bit of randomness even helps. This is called **stochastic gradient descent**.
- **Smart step sizes.** One step size can be just right in one direction and far too big in another. Helpers such as the **Adam** optimizer adjust the step size for each setting separately, a bit like a hiker who takes careful steps on steep ground and longer strides on flat paths.

## Common questions

**Does gradient descent always find the very best answer?**
Not always. Real valleys can have many dips. Surprisingly, for large modern models, most dips turn out to be good enough, and the randomness of mini-batches helps the model avoid getting stuck in poor ones.

**Who chooses the learning rate?**
People do, usually by trying a few values and seeing which trains best. Many projects also lower the learning rate gradually during training, taking big strides early and careful steps near the end.

**Is this how the human brain learns?**
Probably not in exactly this way, but the spirit of "notice the error, adjust a little, repeat" is something we all do when practising a skill.

## Try it yourself

```python
x, lr = -3.5, 0.4
for step in range(10):
    grad = 2 * x
    x -= lr * grad
    print(step, round(x, 4), round(x * x, 4))
```

Change `lr` to 0.05, then 0.9, then 1.1. Can you predict what will happen before you run it?

## Sources & further reading

- Google, [Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course), a free, beginner-friendly course with lessons on loss and gradient descent.
- Kingma & Ba, [*Adam: A Method for Stochastic Optimization*](https://arxiv.org/abs/1412.6980) (2014), the paper behind the Adam optimizer.
- Next in this series: [overfitting in plain English](/blog/validation-loss-rising/)
