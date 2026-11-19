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
  - "A neural network learns from examples. Shown decades of past weather, it learns how the weather usually changes."
  - "GraphCast looks at the weather 6 hours ago and now, guesses the next 6 hours, and repeats this to forecast up to 10 days ahead."
  - "AI doesn't replace traditional forecasting: the two work together."
---

Before heading out, you probably check the weather app: sunny at noon, rain by 6pm. Each icon is a guess about the future, and some are now made with the help of **neural networks**, a kind of AI that learns from examples.

Here's how Google DeepMind's weather models work, step by step.

> **A note on dates:** the sources for this article were published between 2022 and 2024. They describe the models as they were then.

## First, what is a neural network?

It's a computer model made of simple building blocks, called "neurons", stacked in layers. It learns from examples how to turn **inputs** (the information you give it) into an **output** (its answer).

**A simple way to picture it:** imagine a friend who has watched the sky every day for years. Tell them "it's warm and the wind is picking up", and they'll make a good guess about this evening. Nobody gave them a rulebook. They learned the pattern from experience. A neural network learns in a similar way, from data.

![A diagram of a simple neural network for weather, drawn as an illustration. Three inputs on the left (the temperature 6 hours ago, the temperature now and the wind now) feed into two layers of connected circles in the middle, which lead to one output on the right: the temperature in 6 hours. A note explains that during training the network compares its guesses with what really happened and adjusts itself.](/images/weather-nn-basics.jpg)

During training, it guesses, checks the guess against what really happened, and adjusts how much each piece of information counts. Over many examples, its guesses improve.

## The old way and the new way

| | Traditional forecasts | AI forecasts (GraphCast) |
| --- | --- | --- |
| Starts from | Physics equations written by experts | About four decades of past weather data |
| How it works | Supercomputers solve the equations | A neural network learns how weather usually changes |
| Time for a 10-day forecast | Can take hours on a large supercomputer | Under a minute on a single machine |

## Where does the AI learn from?

GraphCast learned from **ERA5**, about four decades of the world's weather kept by the European Centre for Medium-Range Weather Forecasts (ECMWF). It's built from satellite pictures, radar and weather stations, with a traditional forecasting model filling any gaps.

## Picture the Earth as a giant photo

Think of a photo on your phone. Zoom in and it's made of tiny dots, called pixels, and each one holds a colour.

GraphCast sees the Earth in a similar way. It covers the planet with more than **a million dots**, about **28 km (17 miles) apart** at the equator. Instead of a colour, each dot holds the weather in that spot: temperature, wind and air pressure at ground level, plus humidity, wind and temperature at **37 heights** up in the sky.

GraphCast is a **graph neural network**: a kind of neural network that works with things and the links between them, such as towns joined by roads. DeepMind describes it as especially useful for information spread across a map, like these dots.

## Six hours at a time

**A simple way to picture it:** imagine a ball rolling across the floor. If you know where it was a moment ago and where it is now, you can guess where it will be next. Then you can use that guess to make the next one.

GraphCast does the same with the weather:

1. It looks at two snapshots: the weather **6 hours ago** and **now**.
2. It guesses the weather **6 hours from now**.
3. It treats that guess as the new "now" and repeats.

Forty of these 6-hour steps make **10 days**.

![A diagram of how GraphCast forecasts the weather. Two snapshots of the globe, the weather 6 hours ago and the weather now, go into a graph neural network, which predicts the weather 6 hours ahead. An arrow loops the prediction back in, and the steps repeat, 6 hours at a time, up to 10 days.](/images/weather-six-hours.jpg)

## Is it any good?

DeepMind compared GraphCast with HRES, the leading traditional forecast from ECMWF, which it calls the industry gold standard:

- GraphCast was more accurate on **more than 90%** of 1,380 tests.
- Looking only at the layer of air closest to the ground, where accurate forecasts matter most, it was more accurate on **99.7%**.

## A real example: Hurricane Lee

GraphCast wasn't trained to look for storms, yet it spotted some early. In **September 2023**, it predicted about **nine days** ahead that Hurricane Lee would reach land in Nova Scotia. Traditional forecasts settled on Nova Scotia about **six days** ahead.

## Many forecasts at once: GenCast

No forecast is perfect, especially beyond a few days. So weather agencies also make many predictions at once, called an **ensemble**.

**A simple way to picture it:** if most predictions show a storm hitting the same area, the forecast is fairly certain. If they point to different places, it's less certain.

In December 2024, DeepMind introduced **GenCast**, which does this with AI:

- Each forecast is a set of **50 or more** predictions, up to **15 days** ahead.
- It was trained on weather up to 2018 and tested on 2019, weather it had never seen.

Compared with ECMWF's traditional ensemble forecast on 1,320 tests, GenCast was more accurate on 97.2% of them according to DeepMind's blog, or 97.4% according to the research paper. **The two sources give slightly different figures.**

![A diagram of storm forecasts in three panels. A single forecast draws one best estimate of the storm's path. An ensemble made days ahead draws many possible paths that spread out, so the forecast is less certain. For the same storm closer to land, the paths bunch together, so the forecast is more certain. The paths are an illustration.](/images/weather-ensemble.jpg)

## Where you might meet these models

DeepMind says Google's AI weather models are starting to power features in **Google Search and Maps**. It's also clear that **traditional models remain essential**: they supply the training data and starting conditions these AI models need.

### For the technically curious: a tiny forecasting network

This tiny network works the same basic way: give it the temperature 6 hours ago and now, and ask for 6 hours ahead. The temperatures are made up, and there's one place instead of a million.

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

**What the output means:** the network learned a made-up daily pattern (warm afternoons, cool nights) from 60 days of examples. It then forecast a whole day, 6 hours at a time, and its guesses land within half a degree of the pattern. Like GraphCast, each new forecast builds on the one before. It learns by [gradient descent](/blog/gradient-descent-felt/).

## Common questions

**Is a neural network like a brain?**
Only loosely. The idea was inspired by neurons in the human brain, but a neural network is a computer model that learns patterns from data.

**Does my weather app use these models?**
The available sources do not contain enough information to answer this for any particular app. DeepMind says Google's AI weather models are starting to power features in Google Search and Maps.

## Try it this week

Check this weekend's forecast each morning until then, and watch it firm up.

## Sources & further reading

- Google DeepMind, [*GraphCast: AI model for faster and more accurate global weather forecasting*](https://deepmind.google/discover/blog/graphcast-ai-model-for-faster-and-more-accurate-global-weather-forecasting/) (Remi Lam, 14 November 2023).
- Lam et al., [*GraphCast: Learning skillful medium-range global weather forecasting*](https://arxiv.org/abs/2212.12794) (2022, published in *Science*, 2023).
- Google DeepMind, [*GenCast predicts weather and the risks of extreme conditions with state-of-the-art accuracy*](https://deepmind.google/discover/blog/gencast-predicts-weather-and-the-risks-of-extreme-conditions-with-sota-accuracy/) (Ilan Price and Matthew Willson, 4 December 2024).
- Price et al., [*GenCast: Diffusion-based ensemble forecasting for medium-range weather*](https://arxiv.org/abs/2312.15796) (2023, published in *Nature*, 2024).
- IBM, [*What is a neural network?*](https://www.ibm.com/think/topics/neural-networks) and [*What is a graph neural network?*](https://www.ibm.com/think/topics/graph-neural-network).
- [AI for the planet: 3 ways AI is protecting nature](/blog/ai-protecting-nature/)
