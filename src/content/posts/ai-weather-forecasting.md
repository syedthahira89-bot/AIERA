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
  - "Traditional forecasts solve physics equations on supercomputers. AI models such as GraphCast learn instead from about four decades of past weather data."
  - "GraphCast is a graph neural network: it looks at the weather 6 hours ago and now, predicts 6 hours ahead, and repeats this to reach 10 days."
  - "AI and traditional forecasting work together: traditional models supply the training data and the starting conditions that AI models need."
---

Before heading out, you probably check the weather app: sunny at noon, rain by 6pm. Each of those little icons is a prediction about the future, and some forecasting systems now make those predictions with **neural networks**.

This guide uses what Google DeepMind has published about its weather models to show how a neural network learns from the past to predict what comes next.

> **A note on dates:** the sources for this article were published between 2022 and 2024. They describe the models as they were then.

## How forecasts have traditionally been made

Most forecasts rely on **numerical weather prediction**: physics equations, turned into computer programs and run on supercomputers.

DeepMind calls this approach a triumph of science and engineering, but notes the costs: the equations take time and deep expertise to design, and a 10-day forecast can take hours on a supercomputer with hundreds of machines.

## A different idea: learn from the past

**Deep learning**, the approach behind DeepMind's models, takes another route: it uses data instead of physics equations. The model learns how the weather changes by studying examples from the past.

DeepMind trained its GraphCast model on about **four decades** of past weather from the European Centre for Medium-Range Weather Forecasts (ECMWF), in a collection called **ERA5**. ERA5 is built from real observations, including satellite pictures, radar and readings from weather stations, with a traditional forecasting model filling the gaps where observations are missing.

## The Earth as a graph

GraphCast is built on **graph neural networks**, a kind of neural network that DeepMind describes as particularly useful for data laid out in space. Picture the Earth covered in a grid of points.

- The points are about **28 km apart at the equator** (0.25 degrees of longitude and latitude). That's more than **a million points** covering the whole planet.
- At each point, the model predicts **5 surface measurements**, including temperature, wind speed and direction, and air pressure at sea level.
- It also predicts **6 measurements at each of 37 heights** in the atmosphere, including humidity, wind and temperature.

## Six hours at a time

GraphCast needs only two snapshots of the weather: **6 hours ago** and **now**. From those, it predicts the weather **6 hours from now**.

It then feeds its prediction back in and repeats, 6 hours at a time, up to **10 days ahead**.

![A diagram of how GraphCast forecasts the weather. Two snapshots of the globe, the weather 6 hours ago and the weather now, go into a graph neural network, which predicts the weather 6 hours ahead. An arrow loops the prediction back in, and the steps repeat, 6 hours at a time, up to 10 days.](/images/weather-six-hours.jpg)

## How well does it work?

DeepMind compared GraphCast with ECMWF's High Resolution Forecast (HRES), which it calls the industry gold standard:

| What was tested | Result |
| --- | --- |
| 1,380 test variables and forecast times | GraphCast was more accurate on more than 90% |
| The same test, in the lowest part of the atmosphere (the troposphere), where accuracy matters most | GraphCast was more accurate on 99.7% |
| Time to make a 10-day forecast | Under a minute on one Google TPU v4 machine, compared with hours on a supercomputer for HRES |

Training took a lot of computing, but each forecast is quick. In 2023, DeepMind described GraphCast as "the most accurate 10-day global weather forecasting system in the world".

## Earlier warnings for extreme weather

GraphCast wasn't trained to look for severe weather, yet it spotted some events earlier than traditional models:

- **Cyclones.** In September 2023, a live version of GraphCast on ECMWF's website predicted about **nine days** ahead that Hurricane Lee would reach land in Nova Scotia. Traditional forecasts settled on Nova Scotia only about **six days** ahead.
- **Atmospheric rivers.** GraphCast can help describe these narrow bands of moist air, which can bring welcome rain or floods.
- **Extreme heat.** It can show when temperatures are set to rise above a place's historical highs, which helps when preparing for heat waves.

## From one forecast to many: GenCast

The weather can never be predicted perfectly, and forecasts get less certain beyond a few days. So weather agencies also make **ensemble forecasts**: many predictions at once, showing what might happen and how likely each outcome is.

In December 2024, DeepMind introduced **GenCast**, which does this with AI:

- Each forecast is a set of **50 or more** predictions, each one a possible path for the weather, up to **15 days** ahead.
- It's a **diffusion model**, the same family of AI behind many image generators, adapted to the round shape of the Earth. (See [how diffusion models work](/blog/diffusion-noise-to-image/).)
- It was trained on data up to 2018 and tested on 2019, so it was judged on weather it had never seen.
- One 15-day forecast takes **8 minutes** on a single Google Cloud TPU v5, and all of them can be made at once.

DeepMind compared GenCast with ECMWF's ensemble forecast, ENS, on 1,320 combinations of weather measurements and forecast times. **The sources give slightly different figures:** DeepMind's blog says GenCast was more accurate on 97.2% of them, and the research paper says 97.4%.

![A diagram of storm forecasts in three panels. A single forecast draws one best estimate of the storm's path. An ensemble made days ahead draws many possible paths that spread out, so the forecast is less certain. For the same storm closer to land, the paths bunch together, so the forecast is more certain. The paths are an illustration.](/images/weather-ensemble.jpg)

For Typhoon Hagibis, GenCast's paths spread widely seven days ahead, then narrowed into a confident, accurate group as the storm neared Japan.

## Where you might meet these models

DeepMind says Google's AI weather models are starting to power features in **Google Search and Maps**, and to improve forecasts of rain, wildfires, flooding and extreme heat. ECMWF has also run GraphCast forecasts as a live experiment on its website.

DeepMind is clear that **traditional models remain essential**: they supply the training data and the starting weather conditions that models like GenCast need.

### For the technically curious: a tiny forecasting network

This tiny network works the same basic way: give it the temperature 6 hours ago and now, and ask for 6 hours ahead. It isn't GraphCast: the temperatures are made up, and there's one place instead of a million.

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

The network learned the made-up daily rhythm from 60 days of examples, then rolled its forecast forward a day. Like GraphCast, each new forecast builds on the one before. It learns by [gradient descent](/blog/gradient-descent-felt/).

## Common questions

**Does my weather app use these models?**
The available sources do not contain enough information to answer this for any particular app. DeepMind says Google's AI weather models are starting to power features in Google Search and Maps.

**Why does next week's forecast keep changing?**
Forecasts are less certain beyond a few days. Ensembles like GenCast's show that uncertainty as a range of outcomes.

**Can I run the code example myself?**
Yes, with Python and `pip install numpy`.

## Try it this week

Pick a day this weekend and check its forecast each morning until then. Notice how it changes as the day gets closer: that's forecast uncertainty shrinking.

## Sources & further reading

- Google DeepMind, [*GraphCast: AI model for faster and more accurate global weather forecasting*](https://deepmind.google/discover/blog/graphcast-ai-model-for-faster-and-more-accurate-global-weather-forecasting/) (Remi Lam, 14 November 2023).
- Lam et al., [*GraphCast: Learning skillful medium-range global weather forecasting*](https://arxiv.org/abs/2212.12794) (2022, published in *Science*, 2023).
- Google DeepMind, [*GenCast predicts weather and the risks of extreme conditions with state-of-the-art accuracy*](https://deepmind.google/discover/blog/gencast-predicts-weather-and-the-risks-of-extreme-conditions-with-sota-accuracy/) (Ilan Price and Matthew Willson, 4 December 2024).
- Price et al., [*GenCast: Diffusion-based ensemble forecasting for medium-range weather*](https://arxiv.org/abs/2312.15796) (2023, published in *Nature*, 2024).
- [AI for the planet: 3 ways AI is protecting nature](/blog/ai-protecting-nature/)
