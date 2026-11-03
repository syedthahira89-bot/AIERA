---
title: "Finding the bottom of the valley: gradient descent, explained gently"
description: "Discover how AI improves itself one small step at a time, and why the size of each step matters so much."
pubDate: 2026-10-15
topic: "Numbers Behind the Magic"
level: Beginner
---

Have you ever wondered how an AI model actually *gets better*? It isn't magic. Behind almost every model is one beautifully simple idea called **gradient descent**. Let's explore it together, no framework required.

## A walk downhill in the fog

Imagine you're standing on a hillside in thick fog, and your goal is to reach the bottom of the valley. You can't see far, but you can feel which way the ground slopes under your feet. So you take a small step downhill, feel the slope again, and take another.

That's gradient descent. The "height" is the model's **loss**, a number that measures how far its answers are from the right ones. The slope is the **gradient**. For a single setting $x$, the slope is written $\frac{dL}{dx}$, and each step looks like this:

$$
x \leftarrow x - \eta \, \frac{dL}{dx}
$$

The Greek letter $\eta$ (eta) is the **learning rate**: how big each step is.

## How big should each step be?

Let's use the simplest valley there is, $L(x) = x^2$. Its slope is $2x$, so every step becomes $x \leftarrow x(1 - 2\eta)$. Watch what different step sizes do:

| Learning rate | What happens to x each step | What it feels like |
| --- | --- | --- |
| 0.05 | multiplied by 0.9 | Slow and steady |
| 0.4 | multiplied by 0.2 | Quick and smooth |
| 0.9 | multiplied by −0.8 | Bouncing side to side, but still settling |
| 1.1 | multiplied by −1.2 | Each bounce gets bigger, so it never settles |

You can feel each of these for yourself in the [interactive demo on the home page](/#concept). Try sliding the learning rate slowly from small to large and watch the path change.

## What real models add

Real models have millions of settings, and their valleys are full of gentle slopes and steep cliffs. One step size can be just right in one direction and far too big in another. Clever helpers such as the **Adam** optimizer adjust the step size for each setting separately, a bit like a hiker who takes careful steps on steep ground and longer strides on flat paths.

## Try it yourself

```python
x, lr = -3.5, 0.4
for step in range(10):
    grad = 2 * x
    x -= lr * grad
    print(step, round(x, 4), round(x * x, 4))
```

Change `lr` to 0.05, then 0.9, then 1.1. Can you predict what will happen before you run it?
