---
title: "Sun, wind or storm? How neural networks forecast the weather"
description: "How neural networks learned to forecast the weather from decades of past data, how they see the Earth as a graph, and why they work with traditional forecasts."
pubDate: 2026-11-19
topic: "AI for the Planet"
level: Beginner
featured: true
cover: /images/cover-weather.jpg
coverAlt: "An illustration titled 'How neural networks predict the weather'. Two globes, the weather 6 hours ago and now, feed a graph neural network that predicts 6 hours ahead. A larger globe covered in a grid of points, with sun and rain icons, notes that the steps repeat 6 hours at a time, up to 10 days ahead, on a grid of more than a million points about 28 km apart at the equator."
takeaways:
  - "A neural network learns from examples, a bit like studying past test papers. GraphCast studied about 40 years of old weather."
  - "It looks at the weather 6 hours ago and now, guesses the next 6 hours, then repeats to forecast up to 10 days ahead."
  - "AI doesn't replace normal weather forecasting. The two work as a team."
---

Before you leave the house, you probably check the weather app: sunny at lunch, rain by 6pm. Every one of those icons is a guess about the future. Today, some of those guesses are made with help from **neural networks**, a type of AI that learns from examples.

Here's how one of them works, in plain steps.

> **A note on dates:** the sources for this article were published between 2022 and 2024. They describe the AI as it was then.

## What is a neural network?

It's a computer program that learns patterns from examples. It's built from lots of tiny parts, called "neurons", arranged in layers. You give it information (the **input**), and it gives you an answer (the **output**).

**Think of it like studying for a test.** You do lots of practice questions, check your answers, and learn from your mistakes. After enough practice, you can answer questions you've never seen. A neural network learns the same way:

1. It makes a guess.
2. It checks the guess against the right answer.
3. It adjusts itself a little, then tries again, over and over.

![A diagram of a simple neural network for weather, drawn as an illustration. Three inputs on the left (the temperature 6 hours ago, the temperature now and the wind now) feed into two layers of connected circles in the middle, which lead to one output on the right: the temperature in 6 hours. A note explains that during training the network compares its guesses with what really happened and adjusts itself.](/images/weather-nn-basics.jpg)

## Old way vs new way

| | Normal weather forecasts | AI forecasts (GraphCast) |
| --- | --- | --- |
| How it starts | Experts write physics equations | The AI studies about 40 years of past weather |
| Who does the work | Huge supercomputers solve the equations | A neural network spots the patterns |
| Time for a 10-day forecast | Can take hours | Under a minute |

**GraphCast** is the AI weather model made by Google DeepMind.

## Where did it learn from?

GraphCast studied about **four decades** of real weather records from around the world: satellite pictures, radar and weather stations. A European weather centre keeps these records, and it uses a normal forecasting program to fill in any gaps.

So the AI actually needs the old way to learn. The two work as a team.

## The Earth as a giant photo

Zoom in on a photo on your phone and you'll see it's made of tiny dots called pixels. Each pixel holds a colour.

GraphCast sees the planet the same way. It covers the Earth with more than **a million dots**, about **28 km (17 miles) apart**. Instead of a colour, each dot holds the weather there: temperature, wind and air pressure at the ground, plus readings at **37 different heights** up in the sky.

GraphCast is a special kind called a **graph neural network**. That just means it's good at information spread across a map, and at how things connect, like towns linked by roads.

## Six hours at a time

**Picture a ball rolling across the floor.** If you know where it was a second ago and where it is now, you can guess where it'll be next. Then you can use that guess to make the next one.

GraphCast does the same with the weather:

1. It looks at two snapshots: the weather **6 hours ago** and **now**.
2. It guesses the weather **6 hours from now**.
3. It treats that guess as the new "now" and goes again.

Do that 40 times, and you've got a forecast for **10 days**.

![A diagram of how GraphCast forecasts the weather. Two snapshots of the globe, the weather 6 hours ago and the weather now, go into a graph neural network, which predicts the weather 6 hours ahead. An arrow loops the prediction back in, and the steps repeat, 6 hours at a time, up to 10 days.](/images/weather-six-hours.jpg)

## Is it any good?

DeepMind tested GraphCast against a forecast from a European weather centre that DeepMind calls the industry's gold standard.

- Out of 1,380 tests, GraphCast did better on **more than 90%**.
- For the layer of air closest to the ground, where accurate forecasts matter most, it did better on **99.7%**.

**A real example:** in September 2023, GraphCast predicted about **nine days** ahead that Hurricane Lee would hit land in Nova Scotia. Normal forecasts were sure about Nova Scotia only about **six days** ahead. That's three extra days to get ready.

## Many forecasts at once: GenCast

No forecast is perfect, especially more than a few days ahead. So weather agencies also make lots of forecasts at once and compare them. This is called an **ensemble**.

**Think of asking 50 friends** to guess where a storm will go. If most of them point to the same place, you can feel fairly sure. If they all point to different places, nobody really knows yet.

In December 2024, DeepMind released **GenCast**, which does this with AI. It makes **50 or more** forecasts at once, up to **15 days** ahead. To test it fairly, DeepMind trained it on weather up to 2018 and then tested it on 2019, weather it had never seen.

![A diagram of storm forecasts in three panels. A single forecast draws one best estimate of the storm's path. An ensemble made days ahead draws many possible paths that spread out, so the forecast is less certain. For the same storm closer to land, the paths bunch together, so the forecast is more certain. The paths are an illustration.](/images/weather-ensemble.jpg)

Out of 1,320 tests against the European centre's best ensemble, GenCast did better on 97.2% according to DeepMind's blog, or 97.4% according to the research paper. **The two sources give slightly different numbers.**

## Where you might see it

DeepMind says Google's AI weather models are starting to show up in **Google Search and Maps**. It also says normal forecasting is still essential: it provides the data the AI learns from, and the starting weather for each forecast.

### For the technically curious: build a tiny forecaster

Here's a mini neural network in Python that works the same basic way: give it the temperature 6 hours ago and now, and it guesses 6 hours ahead. The temperatures are made up, and it covers one place instead of a million.

```python
import numpy as np

rng = np.random.default_rng(0)

# Made-up temperatures every 6 hours for 60 days (a daily rhythm plus noise)
hours = np.arange(0, 60 * 24, 6)
temps = 15 + 6 * np.sin(2 * np.pi * (hours % 24 - 9) / 24) + rng.normal(0, 0.8, hours.size)

# Inputs: the temperature 6 hours ago and now. Target: 6 hours from now
X = np.column_stack([temps[:-2], temps[1:-1]])
y = temps[2:]
mean, std = X.mean(), X.std()
Xs, ys = (X - mean) / std, (y - mean) / std

# A tiny neural network: 2 inputs -> 8 hidden units -> 1 output
W1 = rng.normal(0, 0.5, (2, 8)); b1 = np.zeros(8)
W2 = rng.normal(0, 0.5, (8, 1)); b2 = np.zeros(1)

for step in range(3000):                       # learn by gradient descent
    h = np.tanh(Xs @ W1 + b1)
    pred = (h @ W2 + b2).ravel()
    err = pred - ys
    g2 = h.T @ err[:, None] / len(ys)
    gh = (err[:, None] @ W2.T) * (1 - h**2)
    g1 = Xs.T @ gh / len(ys)
    W2 -= 0.1 * g2; b2 -= 0.1 * err.mean()
    W1 -= 0.1 * g1; b1 -= 0.1 * gh.mean(axis=0)

def forecast(before, now):
    h = np.tanh(((np.array([before, now]) - mean) / std) @ W1 + b1)
    return float((h @ W2 + b2)[0] * std + mean)

def pattern(hour):  # the made-up daily rhythm, without the noise
    return 15 + 6 * np.sin(2 * np.pi * (hour - 9) / 24)

# Roll forward 6 hours at a time, starting from midnight and 6am readings
before, now = 11.0, 10.5
for hour, label in [(12, "noon"), (18, "6pm"), (24, "midnight"), (30, "6am")]:
    before, now = now, forecast(before, now)
    print(f"{label:>8}: forecast {now:.1f} °C   made-up pattern {pattern(hour):.1f} °C")
```

Output:

```text
    noon: forecast 19.1 °C   made-up pattern 19.2 °C
     6pm: forecast 19.4 °C   made-up pattern 19.2 °C
midnight: forecast 10.6 °C   made-up pattern 10.8 °C
     6am: forecast 10.7 °C   made-up pattern 10.8 °C
```

**What the output means:** the network learned a made-up daily pattern (warm afternoons, cool nights) from 60 days of examples. Then it forecast a whole day, 6 hours at a time, and its guesses landed within half a degree of the pattern. It learns by [gradient descent](/blog/gradient-descent-felt/).

## Quick questions

**Is a neural network a brain?**
No. The idea was inspired by brain cells, but it's a computer program that learns patterns from data.

**Does my weather app use this?**
The available sources do not contain enough information to answer this for any particular app. DeepMind says Google's AI weather models are starting to appear in Google Search and Maps.

## Try it this week

Check the forecast for Saturday every morning this week. Does it change as Saturday gets closer?

## Sources & further reading

- Google DeepMind, [*GraphCast: AI model for faster and more accurate global weather forecasting*](https://deepmind.google/discover/blog/graphcast-ai-model-for-faster-and-more-accurate-global-weather-forecasting/) (Remi Lam, 14 November 2023).
- Lam et al., [*GraphCast: Learning skillful medium-range global weather forecasting*](https://arxiv.org/abs/2212.12794) (2022, published in *Science*, 2023).
- Google DeepMind, [*GenCast predicts weather and the risks of extreme conditions with state-of-the-art accuracy*](https://deepmind.google/discover/blog/gencast-predicts-weather-and-the-risks-of-extreme-conditions-with-sota-accuracy/) (Ilan Price and Matthew Willson, 4 December 2024).
- Price et al., [*GenCast: Diffusion-based ensemble forecasting for medium-range weather*](https://arxiv.org/abs/2312.15796) (2023, published in *Nature*, 2024).
- IBM, [*What is a neural network?*](https://www.ibm.com/think/topics/neural-networks) and [*What is a graph neural network?*](https://www.ibm.com/think/topics/graph-neural-network).
- [AI for the planet: 3 ways AI is protecting nature](/blog/ai-protecting-nature/)
