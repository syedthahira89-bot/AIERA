---
title: "LLM tokens decoded: how AI models read text"
description: "Chatbots don't read letters like we do. Here's how they chop text into pieces called tokens, explained with building blocks and a tiny example you can run."
pubDate: 2026-09-24
updatedDate: 2026-11-19
topic: "LLMs Decoded"
level: Intermediate
cover: /images/cover-tokens.jpg
coverAlt: "The word \"strawberry\" with an arrow pointing to three coloured pieces, \"str\", \"aw\" and \"berry\", each with an example token number underneath."
takeaways:
  - "Chatbots don't read letters. They read tokens: small pieces of words, each turned into a number."
  - "Common pieces get joined into bigger tokens, so even brand-new words can be built from familiar parts."
  - "Tokens explain some odd AI habits, like trouble counting the letters in a word."
---

Here's something surprising: chatbots don't actually read letters. Before your question reaches the AI, it gets chopped into pieces called **tokens**. Once you know how that works, some of AI's strange habits start to make sense.

## The big idea in one sentence

**A chatbot breaks text into small pieces called tokens, turns each piece into a number, and works with those numbers instead of letters.**

## Think of building blocks

Imagine a box of LEGO. You could build everything from tiny single bricks, but it would take ages. So the box also has ready-made pieces, like a door or a wheel. You use the big pieces when they fit, and small bricks for everything else.

Tokens work the same way. Common words can be one ready-made piece. Rarer words are built from a few smaller pieces.

## How the pieces are chosen

One popular method is called **byte-pair encoding**. A 2015 paper by Rico Sennrich and colleagues used it so translation AI could handle rare words it had never seen. Here's how it builds its set of pieces:

1. Start with single letters.
2. Look through lots of text and find the **pair of pieces that appears side by side most often**.
3. Join that pair into one new, bigger piece.
4. Repeat, until there are as many pieces as you want.

Then each piece gets an ID number. Those numbers are what the AI actually works with.

![Diagram of byte-pair encoding in four steps: start with single characters; find the pair that appears side by side most often; join that pair into a new, bigger piece; repeat until the vocabulary reaches a chosen size. Below, an example of how a tokenizer might split 'strawberry' into 'str', 'aw' and 'berry'. The model gets a number for each piece, not the letters.](/images/tokens-bpe.jpg)

### Try it: a tiny token-maker you can run

This made-up example uses five short words and how often each appears. It runs the joining steps three times.

```python
from collections import Counter

# A tiny made-up "collection of writing": each word and how often it appears
words = {"hug": 10, "hugs": 5, "pug": 4, "pun": 3, "bun": 6}
pieces = {w: list(w) for w in words}          # start with single letters

for step in range(1, 4):
    pairs = Counter()
    for w, count in words.items():
        p = pieces[w]
        for a, b in zip(p, p[1:]):
            pairs[a + b] += count             # count side-by-side pairs
    best = pairs.most_common(1)[0][0]         # the most common pair
    for w in words:                           # join that pair everywhere
        p, out, i = pieces[w], [], 0
        while i < len(p):
            if i + 1 < len(p) and p[i] + p[i + 1] == best:
                out.append(best); i += 2
            else:
                out.append(p[i]); i += 1
        pieces[w] = out
    print(f"Step {step}: join '{best}' ->", "  ".join("|".join(pieces[w]) for w in words))
```

Output:

```text
Step 1: join 'ug' -> h|ug  h|ug|s  p|ug  p|u|n  b|u|n
Step 2: join 'hug' -> hug  hug|s  p|ug  p|u|n  b|u|n
Step 3: join 'un' -> hug  hug|s  p|ug  p|un  b|un
```

**What the output means:** each line shows the five words, with a "|" between their pieces. In step 1, "u" and "g" sit side by side most often (in hug, hugs and pug), so they become one piece, "ug". In step 2, "h" + "ug" becomes "hug", the most common word. In step 3, "u" + "n" becomes "un". Notice that "hugs" is now built from two familiar pieces, "hug" + "s". That's how a tokenizer can handle words it has never seen.

## Why AI finds some easy things hard

**Counting letters.** A tokenizer might split "strawberry" into pieces like "str", "aw" and "berry". The AI gets a number for each piece, not the letters inside. So when you ask "How many r's are in strawberry?", it can't just look. It has to remember the spelling from what it has read.

**Capitals and spaces.** "Hello" and " hello" (with a space in front) can be different tokens. So the same idea can use a different number of tokens depending on how it's written.

## Why tokens matter for cost

Many AI services charge by the number of tokens you send and receive. Anthropic's price list for its Claude models, for example, is set per million tokens. That's why a long question or answer can cost more than a short one.

## Try the real thing at home

OpenAI's **tiktoken** is a free tool that shows how text is split for OpenAI's models. On your own computer, run `pip install tiktoken`, then:

```python
import tiktoken
enc = tiktoken.get_encoding("cl100k_base")
for word in ["strawberry", "12345", "unbelievably", "Hello", " hello"]:
    ids = enc.encode(word)
    print(repr(word), [enc.decode([i]) for i in ids])
```

**What the output means:** each line shows a word, then the pieces it's split into. A word that stays in one piece is in the vocabulary whole. A longer list means it was built from smaller pieces. Compare "Hello" and " hello" to see if the space and capital change anything. (The tool downloads its word list when it first runs, which isn't possible in our workspace, so we can't show the output here.)

## Quick questions

**Why not just use whole words?**
There are too many words, names and spellings, and new ones appear all the time. Byte-pair encoding was brought in to handle rare and unknown words by building them from smaller pieces.

**Do I need to understand tokens to use AI?**
No, but it helps explain why AI sometimes stumbles on spelling, and why longer messages can cost more.

## Sources & further reading

- Sennrich, Haddow & Birch, [*Neural Machine Translation of Rare Words with Subword Units*](https://arxiv.org/abs/1508.07909) (2015, published at ACL 2016), which brought byte-pair encoding to language models.
- Anthropic, [*Claude pricing*](https://claude.com/pricing), an example of prices set per million tokens.
- [tiktoken on PyPI](https://pypi.org/project/tiktoken/), a fast byte-pair tokeniser for OpenAI's models, used in the "try at home" example.
- Next in this series: [LLM attention, demystified](/blog/attention-step-by-step/)
