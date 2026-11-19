---
title: "Gradient descent 101: how AI learns step by step"
description: "How AI learns from its mistakes, one small step at a time, explained with a shower, a foggy hill and a three-step example you can check yourself."
pubDate: 2026-10-15
updatedDate: 2026-11-19
topic: "ML Fundamentals"
level: Beginner
cover: /images/cover-gradient-descent.jpg
coverAlt: "A curved valley with a trail of dots stepping down one side to a glowing dot at the lowest point, marked with a star."
takeaways:
  - "AI learns from its mistakes: it measures how wrong it is, makes a small change to be a bit less wrong, and repeats."
  - "The step size matters: tiny steps are slow, and giant leaps can overshoot the answer."
  - "The same simple idea trains models with billions of settings."
---

When you learn to shoot a basketball, you miss, notice *how* you missed, and adjust. Too short? Throw a bit harder. Too far left? Aim a bit right. Do that enough times and you get good.

AI learns in a surprisingly similar way. The method is called **gradient descent**, and it's commonly used to train AI models, including neural networks.

## The big idea in one sentence

**Measure how wrong you are, make a small change that makes you a little less wrong, and repeat.**

That's it. Everything else in this article is just that idea, explained.

## An everyday example: the shower

Think about getting the shower temperature right:

1. You feel the water. **Too cold.** (You measure how wrong it is.)
2. You turn the handle a little towards hot. (You make a small change in the right direction.)
3. You feel it again. Now a bit too warm, so you nudge it back. (You repeat.)

After a few tries, it's just right. You never worked out the perfect handle position. You just kept making small corrections. That's gradient descent.

## Picture a foggy hill

Imagine you're on a hill in thick fog, trying to reach the bottom of the valley. You can't see where it is. But you can feel which way the ground slopes under your feet. So you take a small step downhill, feel the slope again, and take another step.

For an AI, the hill stands for its mistakes:

| On the hill | In the AI | What it means |
| --- | --- | --- |
| How high you are | The **loss** | A number for how wrong the AI's answers are. Lower is better. |
| Which way is downhill | The **gradient** | Which direction to change things to be less wrong |
| How big your step is | The **learning rate** | How much the AI changes itself each time |
| The bottom of the valley | The goal | As few mistakes as possible |

## Watch it happen, step by step

Here's the simplest possible example. Imagine an AI with just one setting, called x. Its mistake score (the loss) is x × x, so the best value is x = 0, where the loss is 0.

The AI starts at x = −3.5, which is quite wrong (the loss is 12.25). With a learning rate of 0.4, each step happens to multiply x by 0.2:

| Step | x | Loss (how wrong) |
| --- | --- | --- |
| Start | −3.5 | 12.25 |
| 1 | −0.7 | 0.49 |
| 2 | −0.14 | 0.0196 |
| 3 | −0.028 | 0.00078 |

In just three steps, the mistake score drops from 12.25 to almost zero. Notice the steps get smaller as it gets close, because the slope gets gentler near the bottom. Nobody told it to slow down. It happens naturally.

![Worked example from this article: the valley L(x) = x squared. Starting at x = −3.5 with a learning rate of 0.4, each step multiplies x by 0.2: x goes from −3.5 to −0.7, −0.14 and −0.028, and the loss falls from 12.25 to 0.49, 0.0196 and 0.00078. Each step is smaller as the slope gets gentler.](/images/gradient-steps.jpg)

> **For the maths fans:** the slope of x × x is 2x, so each step is x → x − (learning rate × 2x). With a learning rate of 0.4, that's x → 0.2 × x.

## Why step size matters

Step size is a Goldilocks problem. Here's the same example with different learning rates:

| Learning rate | What happens | Like… |
| --- | --- | --- |
| 0.05 | x shrinks by 10% each step | Tiny baby steps: you get there, but slowly |
| 0.4 | x shrinks by 80% each step | Confident steps: quick and smooth |
| 0.9 | x flips side to side but still shrinks | Wobbly: overshooting, but still settling |
| 1.1 | x flips side to side and grows | Leaping right over the valley: it never settles |

Too small and learning takes forever. Too big and the AI overshoots the answer. You can try this yourself in the [interactive demo on the home page](/#concept).

## From one setting to billions

Our example had one setting. Real AI models have millions or even billions, called **parameters**. A large language model with 8 billion parameters, for example, has 8 billion numbers to adjust.

The good news: the idea doesn't change. Each setting gets its own slope, and they all take a small step downhill together. Two tricks help at that size:

- **Learning from a few examples at a time.** Instead of checking every example before each step, the AI can update after one example, or after a small group. This is called **stochastic** or **mini-batch gradient descent**.
- **Smarter steps.** Helpers such as **Adam**, introduced in 2014, adjust the steps as training goes. Its authors say it suits problems with lots of data or many settings.

## Where you've seen it

The tiny weather forecaster in our [neural networks and weather article](/blog/ai-weather-forecasting/) learns by gradient descent. And if an AI practises too long on the same examples, it can start memorising them instead of learning. Our guide to [overfitting](/blog/validation-loss-rising/) explains that.

## Quick questions

**Does it always find the perfect answer?**
Not always. Real "valleys" can have several dips, and the AI may settle in a low spot that isn't the very lowest.

**Who picks the learning rate?**
People do, often by testing several values and keeping the one that works best. It can also be changed during training, using what's called a learning rate schedule.

## Try it yourself

```python
x, lr = -3.5, 0.4
for step in range(10):
    grad = 2 * x
    x -= lr * grad
    print(step, round(x, 4), round(x * x, 4))
```

The first lines it prints:

```text
0 -0.7 0.49
1 -0.14 0.0196
2 -0.028 0.0008
3 -0.0056 0.0
```

**What the output means:** each line shows the step number, the new value of x and the loss. The first values match the table above (x goes from −0.7 to −0.14 to −0.028), and both x and the loss keep shrinking towards 0, the bottom of the valley. After a few steps the loss is so small that it rounds to 0.

Change `lr` to 0.05, then 0.9, then 1.1. Can you predict what will happen before you run it?

## Sources & further reading

- IBM, [*What is gradient descent?*](https://www.ibm.com/think/topics/gradient-descent), on how gradient descent works, its types and local minima.
- IBM, [*What is learning rate?*](https://www.ibm.com/think/topics/learning-rate), on choosing the learning rate and learning rate schedules.
- Google, [Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course), a free course, for further reading.
- Kingma & Ba, [*Adam: A Method for Stochastic Optimization*](https://arxiv.org/abs/1412.6980) (2014), the paper behind the Adam optimizer.
- Next in this series: [overfitting in plain English](/blog/validation-loss-rising/)
- [Sun, wind or storm? How neural networks forecast the weather](/blog/ai-weather-forecasting/), with a tiny forecasting network that learns by gradient descent.
