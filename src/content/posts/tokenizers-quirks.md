---
title: "How chatbots read: a friendly introduction to tokens"
description: "Chatbots don't read letters the way we do. Discover how they break text into pieces, and why that explains some of their surprising habits."
pubDate: 2026-09-24
topic: "Talking Machines"
level: Intermediate
---

Here's a curious fact: chatbots don't actually read letters. Before any text reaches the model, it is chopped into pieces called **tokens**. Once you know how that works, some of AI's surprising habits start to make perfect sense.

## Building a vocabulary, piece by piece

The most common method is called **byte-pair encoding**. It starts with the smallest pieces of text, then looks through a huge collection of writing for the pair of pieces that appears together most often, and joins them into a new token. It repeats this again and again, until the vocabulary reaches a chosen size, often between 50,000 and 200,000 tokens.

The result is clever: common words like "the" or "because" become single tokens, while rarer words are built from a few familiar pieces.

## Why counting letters can be tricky

Take the word `strawberry`. A tokenizer might split it into pieces such as `str`, `aw` and `berry`. The model receives a number for each piece, not the individual letters inside it. So when you ask "how many r's are in strawberry?", it can't simply look. It has to recall the spelling it picked up from reading lots of text.

## Why long numbers can be tricky too

Numbers get split wherever the joins happened to fall. `12345` might become `123` and `45`, while `12346` splits a little differently. That makes digit-by-digit arithmetic harder. Some newer tokenizers split numbers into single digits for exactly this reason.

## Try it yourself

```python
import tiktoken
enc = tiktoken.get_encoding("cl100k_base")
for word in ["strawberry", "12345", "unbelievably"]:
    ids = enc.encode(word)
    print(word, [enc.decode([i]) for i in ids])
```

Try your own name, or a word from another language. How many pieces does it become? Next time a chatbot gives a surprising answer about spelling, you'll know one reason why.
