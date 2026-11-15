---
title: "Traffic prediction, decoded: the AI behind your ETA"
description: "How Google Maps combines live and historical traffic with graph neural networks to predict your arrival time, explained step by step with a small code example."
pubDate: 2026-11-19
# Planned for Thursday 19 November: remove the draft line to publish
draft: true
topic: "ML Fundamentals"
level: Intermediate
cover: /images/cover-traffic.jpg
coverAlt: "An illustration titled 'How your arrival time is made'. A city road map is drawn as a graph of road segments: a jam on Side Street (+8 min) sends dotted messages to Main Road, whose predicted time updates (+1 min). Three inputs, live traffic, past patterns and nearby roads, feed a graph neural network that predicts travel time. A phone shows a route with a slow section, a faster detour, an arrival time of 9:42 'predicted with traffic', and a look-ahead at 10, 20 and 50 minutes."
takeaways:
  - "Google Maps predicts traffic by combining live traffic conditions with historical traffic patterns, using machine learning."
  - "A graph neural network treats roads as a connected graph, so a jam on a side street can inform predictions for the main road."
  - "DeepMind reported improving ETA accuracy by up to 50% in some cities, on top of ETAs that Google says were already accurate for over 97% of trips."
---

You type in a destination, and within seconds your phone says you'll arrive at 9:42. That number feels simple, but it's a prediction about traffic that hasn't happened yet.

This guide explains how Google Maps makes that prediction, using what Google and DeepMind have published about it. It's a great real-world example of a **neural network** at work, and of a special kind called a **graph neural network**.

> **A note on dates:** the sources for this article were published in 2020 and 2021. They describe the system as it was then, and Google may have changed it since.

## Step 1: what's happening right now

According to Google, people drive more than 1 billion kilometres a day using Google Maps, across more than 220 countries and territories. To see current traffic, Google uses **aggregate location data** from people navigating with the app.

That gives a good picture of traffic *now*. But it can't show what the roads will be like 10, 20 or even 50 minutes from now, when you're partway through your trip. For that, Maps needs to predict.

## Step 2: learning from the past

To predict the near future, Google Maps analyses **historical traffic patterns** for roads over time. Google gives the example of a freeway in Northern California where traffic typically moves at 65 mph between 6 and 7am, but only 15 to 20 mph in the late afternoon.

Machine learning then blends this history with **what's happening on the roads right now**. It's harder than it sounds. DeepMind points out that rush hour comes every morning and evening, but its exact timing shifts from one day, and one month, to the next. Road quality, speed limits, accidents and closures add even more to consider.

## Step 3: why a graph neural network?

Google Maps worked with DeepMind to make these predictions more accurate. The team first divided road networks into **Supersegments**: groups of adjacent road segments that share significant traffic volume. The model's job is to predict how long it takes to travel each Supersegment.

DeepMind describes trying three approaches:

1. **One ordinary neural network per Supersegment.** The results were promising, but every Supersegment needed its own model. That would have meant training millions of models.
2. **Recurrent neural networks**, which handle sequences of different lengths. But it was hard to include the extra structure of the road network.
3. **Graph neural networks**, which they chose. One model can handle every Supersegment, from simple two-segment routes to routes with hundreds of segments.

![A diagram of a small road network drawn as a graph. Each road segment is a circle (a node), and lines (edges) join segments that follow each other on the same road or meet at an intersection. A jam on a side street sends messages along the edges to the main road, which updates its predicted travel time.](/images/traffic-graph.jpg)

### Roads as a graph

In DeepMind's model, the local road network is a **graph**:

- each road segment is a **node**;
- an **edge** joins two segments when they follow each other on the same road or meet at an intersection.

The network then runs **message passing**: neighbouring segments pass information to each other, and neural networks learn what those messages should be and how they change each segment's state.

That's what makes graphs so useful for traffic. DeepMind gives the example of a jam on a side street spilling over onto a larger road. By looking across several intersections, the model can also predict delays at turns, delays from merging, and the overall time in stop-and-go traffic.

### For the technically curious: one step of message passing

This tiny example shows the idea of message passing on a made-up road network with four segments. It isn't Google's model: the numbers are invented, and the two weights are picked by hand, where a real graph neural network learns them from data.

```python
import numpy as np

# A made-up road network with four segments, for illustration only
segments = ["Main St (north)", "Main St (south)", "Side St", "Ring Rd"]
links = [(0, 1), (1, 2), (1, 3)]   # pairs of segments that meet

# Extra delay on each segment right now, in minutes (made-up numbers)
delay = np.array([0.0, 0.0, 8.0, 0.0])   # a jam on Side St

# Each segment lists its neighbours
neighbours = {i: [] for i in range(len(segments))}
for a, b in links:
    neighbours[a].append(b)
    neighbours[b].append(a)

def message_passing_step(delay, keep=0.6, listen=0.4):
    """Each segment keeps part of its own delay and adds part of its neighbours' average.
    In a real graph neural network these weights are learned from data; here they are hand-picked."""
    new = np.zeros_like(delay)
    for i, nbrs in neighbours.items():
        new[i] = keep * delay[i] + listen * np.mean(delay[nbrs])
    return new

step1 = message_passing_step(delay)
step2 = message_passing_step(step1)

for name, d0, d1, d2 in zip(segments, delay, step1, step2):
    print(f"{name:16} now {d0:4.1f}  after 1 step {d1:4.1f}  after 2 steps {d2:4.1f}")
```

Output:

```text
Main St (north)  now  0.0  after 1 step  0.0  after 2 steps  0.4
Main St (south)  now  0.0  after 1 step  1.1  after 2 steps  1.3
Side St          now  8.0  after 1 step  4.8  after 2 steps  3.3
Ring Rd          now  0.0  after 1 step  0.0  after 2 steps  0.4
```

After one step, only the segment that touches Side Street "hears" about the jam. After two steps, the news has reached roads two links away. This is the same idea DeepMind describes: neighbours pass messages, so the model can see how a jam nearby might affect your route.

## Step 4: making it reliable enough for millions of people

Building a model that works in a research lab is one thing; running it for millions of drivers is another. DeepMind describes two challenges and how they solved them.

- **Training that varied from run to run.** Training the same model twice could give slightly different results, partly because the road graphs ranged from two nodes to more than 100. The team used a technique called **MetaGradients** to let the model adjust its own learning rate during training, which made the results more stable. (Curious about learning rates? See [gradient descent explained](/blog/gradient-descent-felt/).)
- **Avoiding overfitting.** They combined several loss functions, weighted carefully, so the model didn't simply memorise its training data. (Our guide to [overfitting](/blog/validation-loss-rising/) explains why that matters.)

## The results

According to Google, its ETA predictions were already consistently accurate for **over 97% of trips**. Working with DeepMind and using graph neural networks, Google says it reduced the share of inaccurate ETAs further still. It names Berlin, Jakarta, São Paulo, Sydney, Tokyo and Washington D.C. among the places with significant improvements.

The sources describe the size of the gain in slightly different ways:

| Source | What it reports |
| --- | --- |
| DeepMind (2020) | Accuracy of real-time ETAs improved by up to 50% in some cities, and remaining inaccuracies cut by more than 50% in Taichung |
| Research paper (2021) | Negative ETA outcomes reduced by more than 40% in cities like Sydney, compared with the previous system |

## Keeping predictions fresh

Historical patterns only help if they still describe today's roads. Google says that when COVID-19 lockdowns began in early 2020, worldwide traffic fell by up to 50%. Its response was to make the models favour the most recent two to four weeks of traffic data automatically, and lean less on older patterns.

This is a real example of **model drift**: the world changed, so the model had to change too. Our [model drift guide](/blog/monitoring-drift/) explains how teams spot it.

## From prediction to route

Traffic predictions also help Google Maps choose your route. If heavy traffic is likely in one direction, Maps looks for a lower-traffic alternative. Google says it also considers:

- **Road quality:** for example, whether a road is paved, or a gravel or dirt track.
- **Size and directness:** a highway can beat a smaller road with lots of stops.
- **Information from local governments**, such as speed limits, tolls and road restrictions.
- **Reports from drivers** about closures, construction or objects on the road.

## Common questions

**Does Google Maps know where I personally am going?**
The available sources do not contain enough information to answer this in full. Google's post says that when people navigate with Google Maps, "aggregate location data can be used to understand traffic conditions".

**Why does my arrival time change during the drive?**
Maps combines its predictions with live conditions as you go. Google gives the example of a route that looks clear when you leave, but where Maps predicts a jam about 30 minutes in, and reroutes you to avoid it.

**Is this the same AI as a chatbot?**
Not quite. Both use neural networks, but the sources describe this one as predicting travel times from road and traffic data.

## Try it this week

Next time you drive with a navigation app, note the arrival time when you set off and the time you actually arrive. If the app suggests a different route on the way, think about what it might have predicted: a jam that hadn't happened yet.

## Sources & further reading

- Google DeepMind, [*Traffic prediction with advanced Graph Neural Networks*](https://deepmind.google/discover/blog/traffic-prediction-with-advanced-graph-neural-networks/) (Oliver Lange and Luis Perez, September 2020).
- Google, [*Google Maps 101: How AI helps predict traffic and determine routes*](https://blog.google/products/maps/google-maps-101-how-ai-helps-predict-traffic-and-determine-routes/) (Johann Lau, September 2020).
- Derrow-Pinion et al., [*ETA Prediction with Graph Neural Networks in Google Maps*](https://arxiv.org/abs/2108.11482) (CIKM 2021).
- [Gradient descent 101: how AI learns step by step](/blog/gradient-descent-felt/)
- [Model drift 101: keeping AI reliable after launch](/blog/monitoring-drift/)
