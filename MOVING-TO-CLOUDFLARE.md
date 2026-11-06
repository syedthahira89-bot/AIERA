# Moving AIERA-TS to Cloudflare Pages

Cloudflare Pages hosts static sites like AIERA-TS for free, with unlimited bandwidth and a generous monthly build allowance, and it doesn't add a "Powered by" badge. Your site is ready to move: everything it needs is already in the repository.

**Nothing changes for readers.** Your articles, design, web address (aiera-ts.com), newsletter, Google Search Console verification and redirects all come with you.

Do the steps in this order. Your Netlify site keeps running the whole time, so there is no downtime.

---

## Step 1: Create the Cloudflare Pages site (about 10 minutes)

1. Go to **dash.cloudflare.com** and sign up for a free account (you can use aiera.blog@gmail.com).
2. In the left menu, open **Workers & Pages**, click **Create**, then choose the **Pages** tab and **Connect to Git**.
3. Connect your **GitHub** account and pick the repository **syedthahira89-bot/AIERA**.
4. Fill in the build settings:

   | Setting | Value |
   | --- | --- |
   | Project name | `aiera-ts` |
   | Production branch | `main` |
   | Framework preset | **Astro** |
   | Build command | `npm run build` |
   | Build output directory | `dist` |

5. Open **Environment variables (advanced)** and add:

   | Variable name | Value |
   | --- | --- |
   | `NODE_VERSION` | `22.23.4` |

6. Click **Save and Deploy**. The first build takes 2–3 minutes.
7. When it finishes, Cloudflare gives you a test address like **`aiera-ts.pages.dev`**. Open it and check the home page, an article, the images and the "Ask AIERA" search.

---

## Step 2: Point aiera-ts.com to Cloudflare (about 15 minutes, plus waiting)

1. In your Pages project, open **Custom domains** and click **Set up a custom domain**.
2. Enter **`aiera-ts.com`** and continue.
3. Cloudflare will ask you to **add the domain to Cloudflare**. Follow the prompts. It shows you **two nameservers** (they look like `name.ns.cloudflare.com`).
4. Log in to the company where you **bought the domain** (your domain registrar), find **Nameservers** or **DNS settings**, and replace the current nameservers with the two from Cloudflare. Save.
5. Back in Cloudflare, wait for the domain to show as **Active**. This usually takes under an hour, but can take up to 24 hours.
6. Also add **`www.aiera-ts.com`** as a custom domain, so both addresses work.

> **Tip:** before changing nameservers, take a screenshot of your current DNS records at the registrar (especially any email records). Cloudflare normally copies them automatically, but it's good to double-check.

---

## Step 3: Check everything works

Open these on your phone and computer:

- `https://aiera-ts.com/` (home page)
- `https://aiera-ts.com/blog/what-is-agentic-ai/` (an article with images)
- `https://aiera-ts.com/topics/smarter-living/` (should redirect to **Everyday AI**)
- `https://aiera-ts.com/googlee1a9a71e2655801a.html` (Google verification file)
- Sign up for the newsletter with your own email

If anything looks wrong, you can switch the nameservers back at your registrar and the Netlify site takes over again.

---

## Step 4: Tidy up

1. **Netlify:** once aiera-ts.com has worked on Cloudflare for a few days, remove the domain from your Netlify site (Domain management), then delete the Netlify site or keep it as a backup. If you no longer need Netlify Pro, downgrade or cancel it under **Billing**.
2. **Analytics (free):** in your Pages project, open **Metrics** or **Web Analytics** and turn it on. It's cookie-free, so it fits your Privacy page. Tell Claude so the Privacy page wording can be updated.
3. **Google Search Console:** nothing to do. The verification file moves with the site.

---

## How publishing works afterwards

Exactly the same as now: every change pushed to the `main` branch on GitHub is built and published automatically, usually within 2–3 minutes. Cloudflare's free plan has a monthly build allowance, so changes are still best published in batches.

## Files that make this work

- `public/_redirects` holds the redirect rules for Cloudflare (old topic addresses and so on). Keep it in sync with `netlify.toml` if you add new redirects.
- `public/googlee1a9a71e2655801a.html` is the Google Search Console verification file. Keep it.
- Unknown addresses show the site's own `404.html` page automatically.
