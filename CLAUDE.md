# Instructions for Claude: AIERA-TS blog

## Content rules (always follow for every article, page, post and social copy)

Set by Thahira. "Sources" means the pages, documents and data actually opened and read for the piece.

1. Use only information explicitly supported by the sources.
2. Do not use outside knowledge, assumptions, or information not present in the sources. If a source can't be opened (for example, the network is blocked), leave the fact out, and tell Thahira what was removed.
3. Include all relevant information needed to cover the topic completely.
4. Do not omit important conditions, exclusions, limitations, exceptions or caveats.
5. Focus only on information directly relevant to the topic and its title.
6. Do not include unrelated information from the sources.
7. Deliver what the title and description promise, directly.
8. Keep the writing concise, clear and easy to understand.
9. Do not invent statistics, figures, dates, benefits, limits, quotes or examples presented as real. Made-up illustrations (sample data, example payments) must be clearly labelled as made up.
10. If the information is insufficient, say: "The available sources do not contain enough information to answer this." If sources conflict, clearly mention the conflict.

## Fact check before handing over (every time)

Run this check on every article, page and post while preparing it, and report the result to Thahira:

1. **Fact-based:** every number, date, name and claim matches an opened source. Check each number against the source text.
2. **Not overfitting (claiming too much):** nothing goes beyond what the source says. No "always", "every", "most" or "biggest" unless the source says so, no guessed causes, no general claims stretched from one example. Opinions and advice are worded as advice, not as facts.
3. **Not underfitting (leaving too much out):** the important conditions, limits, dates and caveats are included, for example which country a rule applies to, when a survey was done, and that made-up examples are made up. If a needed fact can't be sourced, say so using the wording in content rule 10.
4. Report: how many numbers were checked, what was toned down, what was added, and any facts that could not be checked.

## Weak-spot check (always)

Whenever working on the blog, and after every publish, look for weak spots and suggest fixes. Never fix them without Thahira's approval. Check:

1. **Facts:** any fact not backed by an opened source (see the fact check above).
2. **Thin articles:** articles under about 400 words, or that don't fully deliver what their title promises.
3. **Links:** articles that no other article links to, and broken links.
4. **Topics:** topics with only one or two articles.
5. **Pictures:** articles with no pictures inside the text, pictures that no longer match the text, and pictures without a set size or a description.
6. **Speed and quality:** Lighthouse scores below 90 for speed, accessibility, best practices or SEO.
7. **Search basics:** missing or duplicate titles and descriptions, missing sharing images, and the sitemap and robots.txt.
8. **Security:** the security headers still allow only the services the blog uses.
9. **Promises and dates:** wording on the site that may no longer be true (for example, newsletter timing), and dates that look wrong.

Report the weak spots as a short table, most important first: what's wrong, why it matters, and the suggested fix. Say which fixes Claude can do (batched into one publish after Thahira's "commit") and which she must do herself.

## Copyright rules (always follow)

1. Write everything in original words. Never copy sentences or paragraphs from sources, other blogs or AI tools' outputs found online.
2. Facts, figures and names may be reused, but say them in your own words.
3. A source's exact wording may be used only as a short quotation: in quotation marks, credited to the source, and only when the exact words matter.
4. Before handing over any article, compare it with its sources: rewrite any run of about 8 or more words in a row that matches a source, unless it is a credited quotation or a list of names.
5. Credit every source in "Sources & further reading", with a link.
6. Images must be original (drawn by our own scripts or provided by Thahira). No screenshots of other products, logos, brand designs, stock photos or images found online.
7. Code examples must be written from scratch. Label made-up data as made up.
8. Mention products and companies only factually, and don't imply AIERA-TS is connected to them.

## Workflow rules

- Thahira reviews everything before it goes live. Never commit or push until she says "commit".
- Batch changes into one publish to save Netlify usage.
- Before handing over content, list any facts that could not be checked against an opened source.
