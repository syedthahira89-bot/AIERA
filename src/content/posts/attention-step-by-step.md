---
title: "Attention, step by step: how a transformer decides what to look at"
description: "Queries, keys and values sound abstract until you follow a few tokens through the math by hand."
pubDate: 2026-10-22
topic: Language models
level: Intermediate
featured: true
cover: /images/attention-cover.jpg
coverAlt: "A white robotic hand touching a glowing AI symbol on a circuit board."
---

Every token in a transformer asks the same question: which other tokens should I pay attention to right now? Self-attention answers it with three learned projections and one softmax. Once you have followed the numbers through once, the rest of the architecture becomes much easier to read.

## Queries, keys and values

Each token starts as an embedding vector $x_i$. The layer multiplies it by three learned weight matrices to produce three new vectors:

- a **query** $q_i = x_i W_Q$, describing what this token is looking for,
- a **key** $k_i = x_i W_K$, describing what this token offers to others,
- a **value** $v_i = x_i W_V$, the information it passes along if chosen.

A useful analogy is a library search. The query is what you typed, the keys are the catalogue entries, and the values are the books themselves.

## Scoring every pair of tokens

To decide how much token $i$ should attend to token $j$, take the dot product of query $i$ with key $j$. Doing that for every pair gives a square matrix of scores. Stack the queries and keys as matrices $Q$ and $K$ and the whole computation becomes one formula:

$$
\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right) V
$$

The softmax turns each row of scores into weights that are positive and sum to 1. Each output vector is then a weighted average of all the value vectors.

Here is the whole thing in a few lines of NumPy:

```python
import numpy as np

def attention(Q, K, V):
    d_k = Q.shape[-1]
    scores = Q @ K.T / np.sqrt(d_k)
    scores -= scores.max(axis=-1, keepdims=True)  # numerical stability
    weights = np.exp(scores)
    weights /= weights.sum(axis=-1, keepdims=True)
    return weights @ V, weights

rng = np.random.default_rng(0)
Q, K, V = (rng.normal(size=(4, 8)) for _ in range(3))
out, w = attention(Q, K, V)
print(w.round(2))  # each row sums to 1
```

## Why divide by the square root of d_k

If the entries of $q$ and $k$ are roughly independent with variance 1, their dot product has variance $d_k$. With $d_k = 64$, typical scores are around ±8. Softmax on numbers that large puts almost all the weight on one token, and its gradients become tiny, so learning stalls.

Dividing by $\sqrt{d_k}$ brings the variance back to about 1. Attention stays spread out early in training, and the model can still learn to sharpen it where that helps.

> In decoder models such as GPT, a causal mask sets the scores for future positions to $-\infty$ before the softmax. Each token can then attend only to itself and earlier tokens, which is what lets the model generate text one token at a time.

## Many heads, many questions

A single attention layer can only compute one weighted average per token. Multi-head attention runs several smaller attention operations in parallel, each with its own $W_Q$, $W_K$ and $W_V$. One head might learn to link pronouns to the nouns they refer to while another tracks matching brackets.

The heads' outputs are concatenated and multiplied by one more matrix, $W_O$, to return to the model's dimension. The original transformer used 8 heads of size 64 for a model dimension of 512.

## What to read next

- Vaswani et al., *Attention Is All You Need* (2017), the paper that introduced the transformer.
- Our article on [tokenizers](/blog/tokenizers-quirks/), which explains what the "tokens" in this post actually are.
