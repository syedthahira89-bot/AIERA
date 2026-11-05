# Helping people find AIERA-TS

Three small habits: get listed on Google, see what readers enjoy, and share each post on LinkedIn.

---

## 1. Google Search Console (free)

1. Go to https://search.google.com/search-console and sign in with aiera.blog@gmail.com.
2. Click **Add property**, choose **URL prefix**, and enter your live address, for example `https://aiera-ts.com/`.
   If the site is still on a Netlify address (like `something.netlify.app`), use that for now and add the custom domain later.
3. Pick the **HTML tag** method. Google shows a line like
   `<meta name="google-site-verification" content="AbC123xyz" />`.
4. Send me only the code inside `content="..."`. I'll put it in `src/data/site.ts` under `googleSiteVerification` and you can commit it.
5. Once the site redeploys, click **Verify** in Search Console.
6. Open **Sitemaps** on the left, type `sitemap-index.xml`, and click **Submit**.

New articles are added to the sitemap automatically, so you only do this once. Google can take a few days to a few weeks to start showing pages.

Tip: Bing Webmaster Tools (https://www.bing.com/webmasters) can import your site straight from Search Console in one click.

---

## 2. Simple analytics

| Option | Cost | Setup |
| --- | --- | --- |
| **Netlify Analytics** | Paid add-on | Turn it on in the Netlify dashboard for this site. No code needed. Counts visits on Netlify's servers. |
| **Plausible** | Paid, free trial | Sign up at https://plausible.io, add `aiera-ts.com`, and copy the snippet it gives you. |

For Plausible, send me the snippet and I'll paste it into `analyticsSnippet` in `src/data/site.ts`. Neither option uses cookies, which matches what the Privacy page already says.

What to look at each month:
- **Top pages**: which topics people read most. Write more like those.
- **Sources**: how much comes from Google, LinkedIn and the newsletter.

---

## 3. Sharing on LinkedIn

A simple pattern that works well:
1. One personal line (why you wrote it).
2. One or two sentences on what the reader will learn.
3. The link.
4. One question to invite comments.
5. Two or three hashtags.

Post one article a week, on the day it's published. Posting in the morning on a weekday (Tuesday to Thursday) usually gets the most views. Reply to comments in the first hour or two.

LinkedIn shows the article's cover image automatically when you paste the link.

### Ready-to-use posts

**Hugging Face leaderboards: how to read AI model rankings**
> Ever seen people say "this AI model is #1"? I wondered who keeps score, so I wrote a one-minute guide.
>
> Hugging Face leaderboards are friendly online scoreboards that compare AI models. Here's how to read them, and why the top spot isn't always the best choice for you.
>
> https://aiera-ts.com/blog/hugging-face-leaderboard/
>
> Have you ever picked an AI tool because of a ranking?
>
> #AI #MachineLearning #HuggingFace

**AI and your career: how to thrive in the future of work**
> It's the question I hear most from friends and family, so I wanted to give a calm, practical answer.
>
> AI is changing work mostly task by task, not job by job. The article shares a simple way to think about your own role, plus five steps to grow with the change.
>
> https://aiera-ts.com/blog/ai-and-your-job/
>
> Which part of your work would you happily hand over to AI?
>
> #FutureOfWork #AI #Careers

**Creative AI: how to use AI as your creative co-pilot**
> I've been using AI as a creative partner, not a replacement, and it has changed how I start new ideas.
>
> Here's a friendly guide to using AI to start, explore and finish creative projects while keeping your own voice.
>
> https://aiera-ts.com/blog/ai-creativity-guide/
>
> What's one creative project you'd like a little help with?
>
> #Creativity #AI #GenerativeAI

**AI for the planet: 5 ways AI is protecting nature**
> Some of the most hopeful AI stories aren't about chatbots at all.
>
> From listening to rainforests to warning families about floods, here are five ways AI is helping people care for the planet, and how you can join in.
>
> https://aiera-ts.com/blog/ai-protecting-nature/
>
> Which of these surprised you most?
>
> #AIforGood #Climate #Sustainability

**Everyday AI: a beginner’s guide from Turing to today**
> If you've ever wondered where AI actually came from, this one's for you.
>
> A friendly tour from Alan Turing's 1950 question to flood warnings and talking cameras, with simple ways to start using AI yourself.
>
> https://aiera-ts.com/blog/ai-origins-everyday-life/
>
> When did you first notice AI in your everyday life?
>
> #AI #Beginners #Technology

**LLM attention, demystified: how models know what “it” means**
> How does a chatbot know what "it" means in a sentence? I followed one little word through an AI model to find out.
>
> This explainer shows, step by step, how AI decides which words matter most.
>
> https://aiera-ts.com/blog/attention-step-by-step/
>
> What AI idea would you like explained next?
>
> #AI #LLM #Transformers

**LLM tokens decoded: how AI models read text**
> Chatbots don't read letters the way we do, and that explains some of their funny habits.
>
> Here's how they break text into small pieces called tokens, in plain language.
>
> https://aiera-ts.com/blog/tokenizers-quirks/
>
> Have you ever caught a chatbot miscounting letters?
>
> #AI #ChatGPT #LLM

**LLM evaluation made simple: how to test a chatbot fairly**
> How do you know if a chatbot's answers are actually good? It's trickier than it looks.
>
> Here are simple, fair ways to test AI and trust the results.
>
> https://aiera-ts.com/blog/evaluating-llm-outputs/
>
> How do you check an AI answer before you use it?
>
> #AI #LLM #ResponsibleAI

**Gradient descent 101: how AI learns step by step**
> The way AI learns reminds me of walking down a foggy hill, one careful step at a time.
>
> This explainer shows how AI improves itself step by step, and why the size of each step matters so much.
>
> https://aiera-ts.com/blog/gradient-descent-felt/
>
> What's an everyday picture that helped you understand a tricky idea?
>
> #MachineLearning #AI #DataScience

**Overfitting in plain English: when AI memorises, not learns**
> Ever known a student who aces the practice test but struggles in the real exam? AI can do that too.
>
> Here's why it happens, plus three gentle ways to help a model truly learn.
>
> https://aiera-ts.com/blog/validation-loss-rising/
>
> #MachineLearning #AI #DataScience

**Computer vision basics: what AI notices first in an image**
> When a vision model looks at a photo, what does it notice first? The answer is a lot like our own eyes.
>
> https://aiera-ts.com/blog/cnn-first-layer/
>
> #ComputerVision #AI #DeepLearning

**Diffusion models unpacked: how AI turns noise into images**
> Many AI image tools start with pure static and tidy it up, a little at a time, until a picture appears.
>
> Here's how that works, in plain language.
>
> https://aiera-ts.com/blog/diffusion-noise-to-image/
>
> Have you tried making an image with AI yet?
>
> #GenerativeAI #AIArt #AI

**Model drift 101: keeping AI reliable after launch**
> An AI model's work isn't finished on launch day, because the world keeps changing.
>
> Here's how teams notice that change and keep their models helpful.
>
> https://aiera-ts.com/blog/monitoring-drift/
>
> #MachineLearning #MLOps #AI

**Reward hacking, decoded: when AI games the goal**
> Reward an AI for a goal and it may find a surprising shortcut instead.
>
> Here's why that happens, and how researchers gently guide it back on course.
>
> https://aiera-ts.com/blog/ai-clever-shortcuts/
>
> #AI #AISafety #MachineLearning

### Reusable template for new posts

> [One personal line: why you wrote this or what made you curious.]
>
> [One or two sentences: what the reader will learn.]
>
> https://aiera-ts.com/blog/[slug]/
>
> [A friendly question to start a conversation.]
>
> #AI #[Topic] #[Topic]
