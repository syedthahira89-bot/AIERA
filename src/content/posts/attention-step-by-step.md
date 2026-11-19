---
title: "LLM attention, demystified: how models know what “it” means"
description: "How AI works out what a word like “it” means, explained with a party, a library and one worked example you can check yourself."
pubDate: 2026-10-22
updatedDate: 2026-11-19
topic: "LLMs Decoded"
level: Intermediate
cover: /images/attention-cover.jpg
coverAlt: "Diagram of the sentence \"The robot picked up the ball because it was light\", with curves from the word \"it\" to every other word. The thickest curve goes to \"ball\"."
takeaways:
  - "Attention lets each word in a sentence decide which other words matter most to its meaning."
  - "Each word asks a question, compares it with every other word, and listens most to the best matches."
  - "Running many attention steps side by side is what made today's large language models possible."
---

Read this sentence: *"The robot picked up the ball because it was light."* What does "it" mean? You knew straight away: the ball. But how could a computer work that out?

That puzzle is what **attention** solves. It's the idea behind the transformer, the design that led to today's large language models, like the ones behind ChatGPT.

## The big idea in one sentence

**Each word looks at all the other words in the sentence and decides how much each one matters to its meaning.**

## Think of a busy party

Someone says, *"She just got back from Japan."* Without thinking, you glance around the room to work out who "she" is. Your attention lands on the friend who mentioned a trip, and everyone else fades into the background.

Attention lets each word do the same: glance at every other word and focus on the ones that matter.

## Every word gets three name tags

Inside the AI, each word gets three versions of itself:

| Name tag | The question it answers | In a library… |
| --- | --- | --- |
| **Query** | "What am I looking for?" | What you type into the search box |
| **Key** | "What do I have to offer?" | The label on each book |
| **Value** | "Here's what I'll share if you pick me." | The book itself |

"It" holds up its query and compares it with every other word's key. A good match gets a high score.

## A worked example you can check

Let's keep it tiny. Imagine "it" compares itself with just three words and gets these made-up scores:

| Word | Score | Share of attention |
| --- | --- | --- |
| robot | 1.0 | 11% |
| ball | 3.0 | 82% |
| light | 0.5 | 7% |

A step called **softmax** turns the scores into shares that add up to 100%. So "it" pays about 82% of its attention to "ball". Its new meaning becomes mostly "ball", with small touches of "robot" and "light".

![Worked example from this article. The sentence 'The robot picked up the ball because it was light.' Each word gets three name tags: a query (what am I looking for?), a key (what do I have to offer?) and a value (what I'll share if picked). After softmax, the word 'it' gives 11% of its attention to 'robot' (score 1.0), 82% to 'ball' (score 3.0) and 7% to 'light' (score 0.5), so 'it' takes its new meaning mostly from 'ball'.](/images/attention-example.jpg)

> **For the maths fans:** softmax raises *e* (about 2.718) to the power of each score (2.72, 20.09 and 1.65), then divides each by their total (24.45). The original paper also divides the scores by the square root of the vector size first, so they don't grow too big.

## How does it know the word order?

On its own, attention would treat "dog bites man" and "man bites dog" the same. So the original transformer adds a little extra information to each word about its **position**, using wave patterns called sines and cosines. Now every word knows what it is *and* where it sits.

AI that writes one word at a time also uses a **mask**, so each word can only look at the words before it. That way it never peeks at words it hasn't written yet.

## Many questions at once

One attention step lets each word ask one question. **Multi-head attention** lets it ask several at once, side by side. The original transformer used **8 heads**. In the paper's examples, some heads seemed to link words like "its" back to what they referred to.

## Why was this such a big deal?

Older language AI read text one word at a time, in order, which made it slow to train on long text. Attention lets every word look at every other word directly, and the work can be done in parallel, all at once. That's a big part of what made much larger models practical.

### For the technically curious: attention in a few lines of Python

```python
import numpy as np

def attention(Q, K, V):
    d_k = Q.shape[-1]
    scores = Q @ K.T / np.sqrt(d_k)
    scores -= scores.max(axis=-1, keepdims=True)  # keeps the numbers tidy
    weights = np.exp(scores)
    weights /= weights.sum(axis=-1, keepdims=True)
    return weights @ V, weights

rng = np.random.default_rng(0)
Q, K, V = (rng.normal(size=(4, 8)) for _ in range(3))
out, w = attention(Q, K, V)
print(w.round(2))  # each row adds up to 1
```

Output:

```text
[[0.3  0.47 0.08 0.14]
 [0.33 0.07 0.25 0.35]
 [0.32 0.39 0.23 0.06]
 [0.1  0.03 0.68 0.18]]
```

**What the output means:** each row is one of four words, and its four numbers show how much attention that word pays to each word, including itself. Each row adds up to 1 (give or take rounding), so the fourth word gives 68% of its attention to the third. The inputs are random, so the pattern itself means nothing: the point is to see the method at work.

## Quick questions

**Is AI attention the same as human attention?**
No. The name was inspired by how people focus on what matters, but AI attention is a calculation with numbers.

**Does attention get slower with longer text?**
Yes. Every word compares itself with every other word, so doubling the length of the text roughly quadruples the work.

## Try it yourself

Find a sentence with a tricky "it" or "they". Which word should it pay attention to? You've just done, by instinct, what a transformer learns to do with numbers.

## Sources & further reading

- Vaswani et al., [*Attention Is All You Need*](https://arxiv.org/abs/1706.03762) (2017), the paper that introduced the transformer.
- IBM, [*What is an attention mechanism?*](https://www.ibm.com/think/topics/attention-mechanism)
- Jay Alammar, [*The Illustrated Transformer*](https://jalammar.github.io/illustrated-transformer/), a visual walkthrough, for further reading.
- Our friendly guide to [tokens](/blog/tokenizers-quirks/), which explains what the "words" in this post really are.
