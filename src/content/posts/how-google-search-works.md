---
title: "How Google search works: crawling, indexing and AI"
description: "What happens between publishing a page and seeing it on Google? A friendly guide to crawling, indexing and the AI that helps Google understand what you mean."
pubDate: 2026-11-19
# Planned for Thursday 19 November: remove the draft line to publish
draft: true
topic: "Everyday AI"
level: Beginner
cover: /images/cover-search.jpg
coverAlt: "A code editor showing an example robots.txt file (User-agent: *, Disallow: /admin/, Sitemap: https://www.example.com/sitemap.xml) above three steps joined by arrows: Crawl, with a magnifying glass (Googlebot finds the page), Index, with books on a shelf (Google files it away), and Rank, with a short list of results (AI picks the best answers)."
takeaways:
  - "Google finds pages by crawling, stores them in its index, then ranks the best matches when you search."
  - "AI helps Google understand the meaning behind your words, not just the exact words you type."
  - "New pages can take days or weeks to appear; a sitemap and Google Search Console help Google find them."
---

When I launched AIERA-TS, one of my first questions was a simple one: *"When will people be able to find it on Google?"* I submitted my site to Google Search Console, and the first message I saw was *"Processing data, please check again in a day or so."*

That little message sent me down a fascinating path. What actually happens between publishing a page and seeing it in search results? And where does AI fit in? Here's what I learned, in plain language.

## Step 1: Crawling, or finding the page

Google uses automated programs called **crawlers** to discover pages on the web. Its main crawler is known as **Googlebot**.

Crawlers work a bit like a curious reader following links. They start from pages they already know, follow the links on those pages, and find new ones along the way. That's why links matter: a page that nothing links to is much harder to discover.

Website owners can help by offering a **sitemap**, a simple list of all the pages on a site. It's like handing Google a map instead of hoping it finds every room by wandering the corridors.

## Step 2: Indexing, or filing it away

Once Googlebot has visited a page, Google tries to understand what it's about: the text, the headings, the images and how it connects to other pages. If the page is useful and allowed to be shown, Google stores it in its **index**, an enormous library of the web.

Not every page that's crawled is indexed. Google may skip pages that are duplicates, very thin, blocked by the site owner, or simply not yet judged useful enough. That's normal, especially for brand-new sites.

## Step 3: Ranking, or choosing the best answers

When you type a search, Google looks through its index and decides which pages are most likely to help you. It considers many signals, such as how relevant the page is to your question, how useful and trustworthy it seems, how recent it is when freshness matters, and whether it works well on your device.

This is where **AI** plays a big role.

## Where AI comes in

Searches are full of everyday language, and people often don't type the "right" words. AI helps Google understand what you **mean**, not just the words you use.

- **Understanding language.** Google has shared that it uses language models to better understand searches. For example, in 2019 it introduced **BERT**, a model that looks at how the words in a question relate to each other, so small words like "for" or "to" change the meaning as they should.
- **Matching ideas, not just words.** If you search for "python sort list of dicts by key", AI helps Google find pages that explain `sorted()` with a `key` function, even if they never use your exact words.
- **Summarising answers.** For some searches, Google now shows AI-generated overviews that pull together information from several pages, with links to the sources.

AI helps with understanding, but the basic recipe still matters: clear, helpful, well-organised pages are what search systems are designed to reward.

## What I learned from Google Search Console

**Google Search Console** is a free tool that shows how Google sees your website. A few of the messages you might meet, and what they really mean:

| Message | What it means |
| --- | --- |
| **Processing data** | Your site is new and Google is still building its reports. Just wait. |
| **Discovered – currently not indexed** | Google knows the page exists but hasn't visited it yet. |
| **Crawled – currently not indexed** | Google visited but hasn't added it to the index yet. Often temporary for new sites. |
| **Page with redirect** | An old address that forwards to a new page. Usually exactly what you want. |
| **Not found (404)** | The address doesn't exist, often an old link or an automated bot guessing addresses. |

For my blog, the most surprising discovery was how many "Not found" requests came from bots trying WordPress addresses on a site that doesn't use WordPress. It's harmless, but a good reminder that the web is busy with automated visitors.

## A peek behind the scenes: robots.txt and sitemaps

Two small text files help search engines understand a website. Here are the real ones from this blog.

**robots.txt** sits at the root of a site and tells crawlers what they may visit and where to find the sitemap:

```text
User-agent: *
Allow: /

Sitemap: https://aiera-ts.com/sitemap-index.xml
```

`User-agent: *` means "these rules apply to every crawler", and `Allow: /` means "you're welcome to visit every page".

A **sitemap** lists the pages on a site. Each entry is a `<url>` with its address in `<loc>`:

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://aiera-ts.com/</loc></url>
  <url><loc>https://aiera-ts.com/blog/what-is-agentic-ai/</loc></url>
  <url><loc>https://aiera-ts.com/glossary/</loc></url>
</urlset>
```

Curious what a sitemap contains? This short Python script lists every page in one:

```python
import urllib.request
import xml.etree.ElementTree as ET

url = "https://aiera-ts.com/sitemap-0.xml"
ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}

with urllib.request.urlopen(url) as response:
    root = ET.fromstring(response.read())

pages = [loc.text for loc in root.findall("sm:url/sm:loc", ns)]
print(f"{len(pages)} pages found")
for page in pages[:5]:
    print(page)
```

Try it with your favourite website's sitemap, which you can usually find listed in its `robots.txt`.

## Tips if you have a website or blog

1. **Submit a sitemap** in Google Search Console.
2. **Link your pages together**, so every page can be found from another.
3. **Write clear titles and descriptions** that say what the page is about.
4. **Be patient.** New sites can take days or weeks to appear in results.
5. **Focus on being genuinely helpful.** It's still the best long-term strategy.

## Common questions

**How long does it take for a new page to appear on Google?**
It varies, from a few days to several weeks. Submitting a sitemap and requesting indexing in Search Console can help, but there's no guaranteed timeline.

**Can I pay Google to rank higher in normal results?**
No. Ads are shown separately and labelled. The regular results are chosen by Google's ranking systems.

**Does AI mean keywords no longer matter?**
They still help Google understand your topic, but writing naturally for people matters more than repeating exact phrases.

## Try it this week

Search for something in your own words, the way you'd ask a friend. Then try the same search using just two or three keywords. Notice how similar the results are. That's AI helping search understand what you mean.

## Sources & further reading

- Google Search Central, [*In-depth guide to how Google Search works*](https://developers.google.com/search/docs/fundamentals/how-search-works).
- Google Search Central, [*A guide to Google Search ranking systems*](https://developers.google.com/search/docs/appearance/ranking-systems-guide).
- Search Console Help, [*Page indexing report*](https://support.google.com/webmasters/answer/7440203).
- Google, [*Understanding searches better than ever before*](https://blog.google/products/search/search-language-understanding-bert/) (2019), on BERT in Search.
- [LLM tokens decoded: how AI models read text](/blog/tokenizers-quirks/)
- [LLM attention, demystified: how models know what “it” means](/blog/attention-step-by-step/)
