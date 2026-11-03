---
title: "What are tokens? How chatbots read text"
description: "Chatbots don't read letters the way we do. Discover how they break text into pieces, and why that explains some of their surprising habits."
pubDate: 2026-09-24
updatedDate: 2026-11-03
topic: "Chatbots & Language"
level: Intermediate
cover: /images/cover-tokens.jpg
coverAlt: "The word \"strawberry\" with an arrow pointing to three coloured pieces, \"str\", \"aw\" and \"berry\", each with an example token number underneath."
---

Here's a curious fact: chatbots don't actually read letters. Before any text reaches the model, it is chopped into pieces called **tokens**. Once you know how that works, some of AI's surprising habits, and even how chatbots are priced, start to make perfect sense.

## An everyday way to picture it

Think of a box of building blocks. You could build everything from tiny single bricks, but it would take ages. So the box also includes ready-made pieces: a door, a window, a wheel. Builders reach for the big pieces when they fit, and use small bricks for everything else.

Tokens work the same way. Common words like "the" or "because" are single ready-made pieces. Rarer words are built from a few smaller, familiar pieces.

## Building a vocabulary, piece by piece

The most common method is called **byte-pair encoding**. It works like this:

1. Start with the smallest pieces of text: individual bytes, which cover every letter, number and symbol.
2. Look through a huge collection of writing and find the pair of pieces that appears side by side most often.
3. Join that pair into a new, bigger piece, and add it to the vocabulary.
4. Repeat, again and again, until the vocabulary reaches a chosen size, often between 50,000 and 200,000 tokens.

Each token gets an ID number, and those numbers are what the model actually receives. Before a chatbot "reads" your question, it has already become a list of numbers.

## A quick rule of thumb

For everyday English, one token is roughly **four characters**, or about three quarters of a word. So 100 tokens is around 75 words. Other languages often need more tokens for the same meaning, because their words appeared less often in the text used to build the vocabulary.

This matters for two practical reasons:

- **Limits.** A chatbot's memory for a conversation, called its *context window*, is measured in tokens, not words.
- **Cost.** Many AI services charge by the number of tokens you send and receive.

## Why counting letters can be tricky

Take the word `strawberry`. A tokenizer might split it into pieces such as `str`, `aw` and `berry`. The model receives a number for each piece, not the individual letters inside it. So when you ask "how many r's are in strawberry?", it can't simply look. It has to recall the spelling it picked up from reading lots of text.

## Why long numbers can be tricky too

Numbers get split wherever the joins happened to fall. `12345` might become `123` and `45`, while `12346` splits a little differently. That makes digit-by-digit arithmetic harder. Some newer tokenizers split numbers into single digits for exactly this reason.

## Spaces, capitals and emoji

Tokenizers are wonderfully particular. "Hello", " hello" with a space in front, and "HELLO" can all be different tokens. Emoji and unusual symbols are often split into several byte-sized pieces. None of this is a problem for the model, which has seen it all many times, but it's why the same idea can use a different number of tokens depending on how it's written.

## Try it yourself

```python
import tiktoken
enc = tiktoken.get_encoding("cl100k_base")
for word in ["strawberry", "12345", "unbelievably", "Hello", " hello"]:
    ids = enc.encode(word)
    print(repr(word), [enc.decode([i]) for i in ids])
```

Try your own name, or a word from another language. How many pieces does it become?

## Common questions

**Do all chatbots use the same tokens?**
No. Each model family builds its own vocabulary, so the same sentence can split differently and use a different number of tokens.

**Why not just use whole words?**
There are far too many words, names and spellings, and new ones appear every day. Pieces let a model handle any text, even words it has never seen, by building them from familiar parts.

**Why not use single letters?**
It would work, but texts would become very long lists, which makes models slower and gives them less room to remember a conversation.

## Sources & further reading

- Sennrich, Haddow & Birch, [*Neural Machine Translation of Rare Words with Subword Units*](https://arxiv.org/abs/1508.07909) (2016), which brought byte-pair encoding to language models.
- OpenAI's open-source tokenizer, [tiktoken](https://github.com/openai/tiktoken), used in the example above.
- Next in this series: [what is attention in AI?](/blog/attention-step-by-step/)
