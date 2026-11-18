---
title: "AI in insurance: pricing, claims and fair treatment"
description: "How insurers use AI to assess risk, set prices and handle claims, what European rules now require, and the questions worth asking as a customer."
pubDate: 2026-11-16
topic: "Everyday AI"
level: Beginner
cover: /images/cover-ai-insurance.jpg
coverAlt: "An illustration of AI in insurance: a claim update card for a car repair claim with three ticked steps (photos checked, policy confirmed, approved by a person), beside a pricing card with a 'Fairness checks' label and a small shield."
takeaways:
  - "Insurance has always run on data; AI now reaches every part of the insurance value chain, from pricing to claims."
  - "In the EU, AI used to assess risk and set prices for life and health insurance is classed as high-risk, with extra checks on bias, transparency and oversight."
  - "Regulators see real benefits, such as efficiency and personalised products, and real challenges, such as explainability and fair treatment."
---

When you ask for a car insurance quote or make a claim after a dented door, AI is increasingly part of what happens next.

This article is one of three: this one covers **insurance**, and the others cover [banking](/blog/ai-in-banking/) and [cybersecurity](/blog/cybersecurity-in-finance/). For a short summary of all three, see the [series overview](/blog/ai-in-banking-and-insurance/).

## Insurance has always run on data

The European Insurance and Occupational Pensions Authority (EIOPA), the EU's insurance regulator, puts it well: insurers have used data from the very beginning, to **assess and underwrite risks**, **price policies** and **pay claims**.

What's new is the kind of data and the power of the tools. EIOPA points to new sources such as data from connected devices, images and social media, processed by increasingly complex algorithms, including AI.

## How widely insurers use AI

- In the 2024 Bank of England and FCA survey of UK financial firms, the **insurance sector** had the highest share of firms already using AI: **95%**.
- **General insurance** was the third-largest area for AI, with 10% of all use cases.
- General insurance, along with risk and compliance and retail banking, had the most AI uses that firms rated as **highly important**.

The trend has been building for years. In 2019, EIOPA reviewed motor and health insurers and found that around a third were already using AI, and another third were experimenting with it.

## Where AI helps

**Pricing and underwriting.** When you ask for a quote, models help estimate risk from the details you provide. EIOPA lists **more accurate predictions** and **more personalised products and services** among the main benefits of AI in insurance.

**Claims.** Insurers have always used data to pay claims, and EIOPA notes that new kinds of data, such as images, can now be processed by AI. It lists **more efficient and automated processes** as another main benefit.

![An example car claim, drawn for illustration: you send photos of a dented door, AI checks the damage, policy and cost, a person approves it and answers questions, and the payment is sent once approved.](/images/insurance-claim-example.jpg)

### For the technically curious: deciding which claims to fast-track

Some claims can move quickly, while others need a closer look. This small example shows one way to make that choice with simple, transparent rules. The thresholds are made up for illustration.

```python
def route_claim(amount, photo_confidence, policy_active):
    """Decide how a car damage claim should be handled."""
    if not policy_active:
        return "Send to a claims handler: policy needs checking"
    if amount <= 2000 and photo_confidence >= 0.90:
        return "Fast track: a person approves the AI estimate"
    return "Full review by a claims handler"

print(route_claim(850, 0.96, True))
print(route_claim(850, 0.62, True))
print(route_claim(7400, 0.97, True))
```

Output:

```text
Fast track: a person approves the AI estimate
Full review by a claims handler
Full review by a claims handler
```

**What the output means:** the first claim is small and the image model is confident, so it's fast-tracked, with a person approving the estimate. The second is the same amount, but the model is unsure, so a claims handler reviews it in full. The third is large, so it gets a full review too. Here, `photo_confidence` stands for how sure an image model is about its damage estimate, and the thresholds are made up. Even on the fast track, a person approves the final decision.

## The challenges regulators watch

EIOPA names three main challenges of AI in insurance:

- **Transparency and explainability:** being able to explain how a decision was reached.
- **Fair treatment of consumers:** some AI uses could affect how fairly customers are treated.
- **Financial inclusion:** people who are high-risk or vulnerable could find it harder to get cover.

## What the rules now require

The EU's **AI Act** was published in July 2024. According to EIOPA, it classes AI systems used for **risk assessment and pricing in life and health insurance** as **high-risk**. For these systems, the Act adds requirements on top of existing insurance rules:

| Who | What the AI Act requires |
| --- | --- |
| Providers (who build the system) | Training and test data must follow data governance practices to detect and prevent bias that could lead to discrimination |
| Providers | The system must be transparent enough for users to interpret its output and use it properly |
| Providers | A conformity assessment, and registration in an EU database |
| Deployers (insurers using it) | A fundamental rights impact assessment before first use |
| Both | Report serious incidents, and take corrective action or stop using the system |

For other AI systems in insurance, the Act sets lighter duties, such as minimum transparency, AI literacy for staff and voluntary codes of conduct. EIOPA stresses that **insurance law still applies to every use of AI**, whether or not the AI Act calls it high-risk.

> **Two views:** before the Act was agreed, EIOPA said it believed insurance AI should not be treated as high-risk, and should instead be covered by insurance-specific rules. The final Act does class life and health insurance pricing as high-risk.

## Questions worth asking as a customer

You don't need to understand the technology to stay in charge:

1. **Ask how your price was worked out.** You can ask which details made the biggest difference.
2. **Check your information.** Make sure the details on your policy are correct.
3. **Ask for a person.** If a claim decision doesn't feel right, ask whether a person can review it.

## Common questions

**Can AI make insurance cheaper?**
The available sources do not contain enough information to answer this. EIOPA lists efficiency, prediction accuracy and personalised products among the benefits, but doesn't say what that means for prices.

**Do these rules apply outside the EU?**
The AI Act is EU law. This article's sources cover the EU and UK only, so check your own country's insurance regulator.

**Can I run the code example myself?**
Yes. It needs only Python, with no extra installs.

## Try it this week

Look at your insurer's website or app and find how to make a claim online. Notice which steps are automated, and where you can talk to a person. Then read the other two parts of this series: [banking](/blog/ai-in-banking/) and [cybersecurity](/blog/cybersecurity-in-finance/).

## Sources & further reading

- EIOPA, [*Artificial intelligence and Big Data*](https://www.eiopa.europa.eu/browse/digitalisation-and-financial-innovation/artificial-intelligence-and-big-data_en).
- EIOPA, [*Regulatory framework applicable to AI systems in the insurance sector*](https://www.eiopa.europa.eu/document/download/b53a3b92-08cc-4079-a4f7-606cf309a34a_en?filename=Factsheet-on-the-regulatory-framework-applicable-to-AI-systems-in-the-insurance-sector-july-2024.pdf) (factsheet, July 2024).
- Bank of England and Financial Conduct Authority, [*Artificial intelligence in UK financial services – 2024*](https://www.bankofengland.co.uk/report/2024/artificial-intelligence-in-uk-financial-services-2024) (21 November 2024).
- [EU AI Act, Annex III](https://artificialintelligenceact.eu/annex/3/), the list of high-risk AI uses.
- [AI in banking: how fraud checks and fair lending work](/blog/ai-in-banking/)
- [Cybersecurity in finance: the layers that keep your money safe](/blog/cybersecurity-in-finance/)
