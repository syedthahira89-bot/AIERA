---
title: "What is attention in AI? How chatbots know what “it” means"
description: "Follow one little word through a transformer and discover how AI decides which other words matter most."
pubDate: 2026-10-22
updatedDate: 2026-11-03
topic: "Chatbots & Language"
level: Intermediate
cover: /images/attention-cover.jpg
coverAlt: "Diagram of the sentence \"The robot picked up the ball because it was light\", with curves from the word \"it\" to every other word. The thickest curve goes to \"ball\"."
---

Read this sentence: *"The robot picked up the ball because it was light."* What does "it" mean? You probably knew straight away: the ball. But how would a computer work that out?

That small puzzle is exactly what **attention** solves. It is the idea at the heart of every modern chatbot, and once you see how it works, a lot of AI suddenly makes sense. Let's follow that one little word, "it", through the process together.

## An everyday way to picture it

Imagine you're at a busy party and someone says, "She just got back from Japan." Without thinking, you glance around the room to work out who "she" is. Your attention lands on the friend who mentioned a trip last week, and the rest of the room fades into the background.

A transformer does something very similar for every word in a sentence. Each word "glances around" at all the others and decides how much each one matters to its meaning right now.

## Every word gets three name tags

Inside a transformer, each word (more precisely, each *token*) starts as a list of numbers called an embedding, $x_i$. The model then creates three new versions of it by multiplying with three learned tables of numbers:

- a **query** $q_i = x_i W_Q$: *"What am I looking for?"*
- a **key** $k_i = x_i W_K$: *"What do I have to offer?"*
- a **value** $v_i = x_i W_V$: *"Here's what I'll share if you pick me."*

A friendly way to picture it is a library. The query is what you type into the search box, the keys are the labels on every book, and the values are the books themselves.

## Asking every other word a question

Now "it" holds up its query and compares it with every other word's key. The comparison is a simple dot product: multiply matching numbers together and add them up. A high score means "you look relevant to me".

Do this for every pair of words and you get a grid of scores. Written for all words at once, the whole idea fits in one tidy formula:

$$
\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right) V
$$

The **softmax** turns each row of scores into percentages that add up to 100%. Then each word gathers information from the others in proportion to those percentages.

## Let's try it with real numbers

To keep things small, imagine "it" only compares itself with three words, and gets these scores:

| Word | Score | e^score | Share of attention |
| --- | --- | --- | --- |
| robot | 1.0 | 2.72 | 11% |
| ball | 3.0 | 20.09 | 82% |
| light | 0.5 | 1.65 | 7% |

Softmax raises *e* (about 2.718) to the power of each score, then divides each result by the total (24.45). So "ball" gets about 82% of the attention. The new meaning of "it" becomes mostly the value of "ball", with small touches of "robot" and "light". That's exactly the story in the cover picture above.

Curious to try it yourself? Here is the whole thing in a few lines of Python:

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

## Why divide by the square root of d_k?

Here's a lovely detail. If each query and key has $d_k$ numbers, their dot products tend to grow as $d_k$ grows. With $d_k = 64$, typical scores land around ±8. Softmax on numbers that big puts nearly all the attention on a single word, and the model finds it very hard to keep learning.

Dividing by $\sqrt{d_k}$ gently brings the scores back to a comfortable size. Attention stays nicely spread out early in training, and the model can learn to focus sharply only where that really helps.

## How does the model know word order?

Attention on its own treats a sentence like a bag of words: "dog bites man" and "man bites dog" would look the same. So transformers add a little extra information to each embedding about its **position** in the sentence. The original transformer used gentle wave patterns (sines and cosines) for this, and newer models use other clever schemes. Either way, every word knows both *what* it is and *where* it sits.

> **A fun fact:** chatbots that write text one word at a time use a "mask" so each word can only look at itself and the words before it. That way the model never peeks at words it hasn't written yet.

## Many heads, many questions

One round of attention lets each word ask one question. **Multi-head attention** lets it ask several at once. One head might learn to connect pronouns like "it" to their nouns, while another keeps track of matching brackets or quotation marks.

Each head has its own $W_Q$, $W_K$ and $W_V$. Their answers are joined together and passed through one more table, $W_O$. The original transformer used 8 heads of size 64 for a model dimension of 512.

## Common questions

**Is attention the same as human attention?**
Not really. It borrows the name because it decides what to focus on, but it's a calculation with numbers, not awareness.

**Why was attention such a big deal?**
Older language models read text one word at a time, so long-distance connections faded. Attention lets every word look at every other word directly, and it can run in parallel on modern chips, which made much larger models practical.

**Does attention get slower with longer text?**
Yes. Every word compares itself with every other word, so doubling the text roughly quadruples the work. Researchers have many clever ideas to make long texts more efficient.

## Try it yourself

Pick a sentence with a tricky "it", "they" or "this", and guess which word each one should pay attention to. You've just done, by intuition, what a transformer learns to do with numbers.

## Sources & further reading

- Vaswani et al., [*Attention Is All You Need*](https://arxiv.org/abs/1706.03762) (2017), the paper that introduced the transformer.
- Jay Alammar, [*The Illustrated Transformer*](https://jalammar.github.io/illustrated-transformer/), a beautifully visual walkthrough.
- Our friendly guide to [tokens](/blog/tokenizers-quirks/), which explains what the "words" in this post really are.
