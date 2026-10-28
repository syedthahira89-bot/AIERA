---
title: "Tokenizers are where your model's quirks start"
description: "Byte-pair encoding explains why language models struggle to count letters and do arithmetic on long numbers."
pubDate: 2026-09-24
topic: Language models
level: Intermediate
cover: /images/tokenizers-quirks-cover.jpg
coverAlt: "A sentence split into glowing token chips, each labelled with a numeric token ID."
---

Language models never see characters. They see tokens: chunks of text chosen by an algorithm before training starts. Many of the strange failures people notice in chatbots trace back to this step.

## How byte-pair encoding works

Byte-pair encoding (BPE) starts with individual bytes as the vocabulary. It then counts every adjacent pair in a large training corpus, merges the most frequent pair into a new token, and repeats until the vocabulary reaches a target size, often between 50,000 and 200,000 tokens.

Common words end up as single tokens. Rare words get split into several pieces.

## Why models miscount letters

A word like `strawberry` may become two or three tokens, for example `str`, `aw` and `berry`. The model receives the token IDs, not the letters inside them, so it has no direct view of how many r's the word contains. It has to have learned the spelling of each token indirectly from training data.

## Why arithmetic gets harder

Numbers are split wherever the merges happened to fall, so `12345` might become `123` and `45` while `12346` splits differently. Some newer tokenizers split numbers into single digits for exactly this reason.

```python
import tiktoken
enc = tiktoken.get_encoding("cl100k_base")
for word in ["strawberry", "12345", "unbelievably"]:
    ids = enc.encode(word)
    print(word, [enc.decode([i]) for i in ids])
```
