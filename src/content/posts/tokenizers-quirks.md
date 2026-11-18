---
title: "LLM tokens decoded: how AI models read text"
description: "Chatbots don't read letters the way we do. Discover how they break text into pieces, and why that explains some of their surprising habits."
pubDate: 2026-09-24
updatedDate: 2026-11-03
topic: "LLMs Decoded"
level: Intermediate
cover: /images/cover-tokens.jpg
coverAlt: "The word \"strawberry\" with an arrow pointing to three coloured pieces, \"str\", \"aw\" and \"berry\", each with an example token number underneath."
takeaways:
  - "Chatbots don't read letters; they read tokens, small pieces of words turned into numbers."
  - "Token counts, not word counts, are what many AI services use to set their prices."
  - "Tokens explain quirks like miscounting letters in \"strawberry\" and stumbling on long numbers."
---

Here's a curious fact: chatbots don't actually read letters. Before any text reaches the model, it is chopped into pieces called **tokens**. Once you know how that works, some of AI's surprising habits, and even how chatbots are priced, start to make perfect sense.

## An everyday way to picture it

Think of a box of building blocks. You could build everything from tiny single bricks, but it would take ages. So the box also includes ready-made pieces: a door, a window, a wheel. Builders reach for the big pieces when they fit, and use small bricks for everything else.

Tokens work the same way. Common words like "the" or "because" are single ready-made pieces. Rarer words are built from a few smaller, familiar pieces.

## Building a vocabulary, piece by piece

One well-known method is called **byte-pair encoding**, brought to language models in a 2015 paper by Rico Sennrich and colleagues. It works like this:

1. Start with the smallest pieces of text: individual characters.
2. Look through a huge collection of writing and find the pair of pieces that appears side by side most often.
3. Join that pair into a new, bigger piece, and add it to the vocabulary.
4. Repeat, again and again, until the vocabulary reaches a chosen size.

Each token gets an ID number, and those numbers are what the model actually receives. Before a chatbot "reads" your question, it has already become a list of numbers.

![Diagram of byte-pair encoding in four steps: start with single characters; find the pair that appears side by side most often; join that pair into a new, bigger piece; repeat until the vocabulary reaches a chosen size. Below, an example of how a tokenizer might split 'strawberry' into 'str', 'aw' and 'berry'. The model gets a number for each piece, not the letters.](/images/tokens-bpe.jpg)

## Why token counts matter

The number of tokens isn't the same as the number of words or letters, and the same sentence can split differently in different languages and models. Try the example above with your own sentences to see this.

Token counts matter for **cost**: many AI services charge by the number of tokens you send and receive. Anthropic's price list for its Claude models, for example, is set per million tokens.
## Why counting letters can be tricky

Take the word `strawberry`. A tokenizer might split it into pieces such as `str`, `aw` and `berry`. The model receives a number for each piece, not the individual letters inside it. So when you ask "how many r's are in strawberry?", it can't simply look. It has to recall the spelling it picked up from reading lots of text.

## Why long numbers can be tricky too

Numbers get split wherever the joins happened to fall. `12345` might become `123` and `45`, while `12346` splits a little differently. That makes digit-by-digit arithmetic harder.

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

**What the output means:** each line shows a word, then the list of pieces the tokenizer splits it into. A word that comes back as a single piece is in the vocabulary whole; a longer list means it was built from smaller, familiar pieces. Compare "Hello" and " hello" to see whether the space and the capital letter change the result.

Try your own name, or a word from another language. How many pieces does it become?

## Common questions

**Do all chatbots use the same tokens?**
No. Each model family builds its own vocabulary, so the same sentence can split differently and use a different number of tokens.

**Why not just use whole words?**
There are far too many words, names and spellings, and new ones appear every day. Pieces let a model handle any text, even words it has never seen, by building them from familiar parts.

**Why not use single letters?**
It would work, but texts would become very long lists, which makes models slower and gives them less room to remember a conversation.

## Sources & further reading

- Sennrich, Haddow & Birch, [*Neural Machine Translation of Rare Words with Subword Units*](https://arxiv.org/abs/1508.07909) (2015, published at ACL 2016), which brought byte-pair encoding to language models.
- Anthropic, [*Claude pricing*](https://claude.com/pricing), an example of prices set per million tokens.
- OpenAI's open-source tokenizer, [tiktoken](https://github.com/openai/tiktoken), used in the example above.
- Next in this series: [LLM attention, demystified](/blog/attention-step-by-step/)
