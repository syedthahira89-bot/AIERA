---
title: "Gradient descent, felt rather than memorized"
description: "Build intuition for slopes, step sizes and why the loss sometimes explodes, before touching any framework."
pubDate: 2026-10-15
topic: Training & deployment
level: Beginner
cover: /images/gradient-descent-felt-cover.jpg
coverAlt: "A path zig-zagging down oval contour lines and settling at the lowest point."
---

Training a model means adjusting numbers, its parameters, so that a loss gets smaller. The loss measures how wrong the model is. Gradient descent is the method almost every model uses to make it smaller.

## Downhill in the dark

Picture standing on a hillside in thick fog. You cannot see the valley, but you can feel which way the ground slopes under your feet. The sensible move is to take a step in the steepest downhill direction, then feel again.

The gradient is that slope. For a single parameter $x$ it is the derivative $\frac{dL}{dx}$. Gradient descent repeats one update:

$$
x \leftarrow x - \eta \, \frac{dL}{dx}
$$

where $\eta$ (eta) is the learning rate, the size of each step.

## Three ways it can go

Take the simplest possible loss, $L(x) = x^2$. Its gradient is $2x$, so each update becomes $x \leftarrow x(1 - 2\eta)$.

| Learning rate | What happens to x each step | Result |
| --- | --- | --- |
| 0.05 | multiplied by 0.9 | Slow, steady progress |
| 0.4 | multiplied by 0.2 | Fast convergence |
| 0.9 | multiplied by −0.8 | Bounces across the minimum, still converges |
| 1.1 | multiplied by −1.2 | Diverges, the loss grows every step |

Try these yourself in the [interactive demo on the home page](/#concept).

## Why real training is harder

Real losses have millions of parameters and are not neat bowls. Some directions are steep and others nearly flat, so one learning rate can be too big for one parameter and too small for another. Optimizers such as Adam keep a running estimate of each parameter's gradient size and scale its step accordingly.

```python
x, lr = -3.5, 0.4
for step in range(10):
    grad = 2 * x
    x -= lr * grad
    print(step, round(x, 4), round(x * x, 4))
```
