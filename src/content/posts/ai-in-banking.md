---
title: "AI in banking: how fraud checks and fair lending work"
description: "How banks use AI to spot unusual payments and support lending decisions, the rules that keep it fair, and simple habits that keep you in charge."
pubDate: 2026-11-16
topic: "Everyday AI"
level: Beginner
cover: /images/cover-ai-banking.jpg
coverAlt: "An illustration of AI in banking: a phone shows a 'Was this you?' alert for an unusual payment, beside a risk score gauge and a card listing the main reasons behind a lending decision, with the label 'A person reviews the decision'."
takeaways:
  - "In a 2024 Bank of England and FCA survey, 75% of UK financial firms were already using AI, and fighting fraud was one of the biggest benefits they saw."
  - "Fraud checks compare each payment with your usual pattern and ask you when something stands out."
  - "In the US, lenders must give specific reasons when they turn down credit, even when a complex model is involved."
---

Have you ever had a message from your bank asking, *"Was this you?"* moments after an unusual payment? Fighting fraud is one of the areas where financial firms say AI helps most.

I've built my career in banking and insurance, so this topic is close to my heart. This article is one of three: this one covers **banking**, and the others cover [insurance](/blog/ai-in-insurance/) and [cybersecurity](/blog/cybersecurity-in-finance/). For a short summary of all three, see the [series overview](/blog/ai-in-banking-and-insurance/).

If you enjoy a peek under the hood, look out for the **"For the technically curious"** sections, each with a small code example. If not, feel free to skip them.

## How widely banks use AI

The Bank of England and the Financial Conduct Authority (FCA) surveyed 118 UK financial firms and published the results in November 2024. Among their findings:

- **75%** of the firms were already using AI, and another 10% expected to start within three years.
- **94%** of international banks that took part were using AI.
- **Retail banking** was the second-largest area for AI, with 11% of all use cases. Operations and IT came first.
- The biggest benefits firms saw were in **understanding their data**, **tackling fraud and money laundering**, and **cybersecurity**.

The survey also shows that people stay involved. Of all the AI use cases, 55% involve some automated decision-making, but only **2%** make decisions fully on their own.

![An example of how AI spots fraud. A card lists usual payments, such as a \$42 grocery shop, an \$18 train ticket and a \$3.20 coffee, and flags an unusual \$1,240 electronics purchase abroad. A phone shows the bank's alert: 'Was this you?', with buttons for 'Yes, it was me' and 'No, block my card'. All amounts are made up.](/images/banking-fraud-alert.jpg)

## Inside a fraud check

The idea behind a fraud check is simple: **learn what "normal" looks like for you, then notice when something doesn't fit.**

A simple fraud model might look at **signals** such as the amount, the time, the place, the shop and the device. It combines them into a **risk score**. A low score lets the payment through; a high score might pause it and ask you to confirm.

![A diagram of an example fraud model. Five made-up signals (an amount of \$1,240 when usually under \$100, a time of 3am, a location 6,500 km away, a first visit to the shop and a recognised phone) feed into an AI model, which gives a risk score of 0.94 out of 1.00 and pauses the payment to ask, 'Was this you?'.](/images/banking-fraud-model.jpg)

### For the technically curious: spotting the unusual payment

This example uses **Isolation Forest** from the scikit-learn library. According to scikit-learn's documentation, it builds random trees that split the data at random points, and unusual data points take noticeably fewer splits to isolate. The payments below are made up.

```python
import numpy as np
from sklearn.ensemble import IsolationForest

rng = np.random.default_rng(42)

# 500 everyday card payments: [amount in $, hour of day, distance from home in km]
usual = np.column_stack([
    rng.gamma(shape=2, scale=25, size=500),   # mostly small amounts
    rng.normal(loc=14, scale=3, size=500),    # daytime
    rng.exponential(scale=5, size=500),       # close to home
])

model = IsolationForest(contamination=0.01, random_state=42).fit(usual)

new_payments = np.array([
    [38, 13, 2],       # lunch near home
    [65, 18, 8],       # weekly shop
    [1240, 3, 6500],   # electronics abroad at 3am
])

for payment, score in zip(new_payments, model.decision_function(new_payments)):
    status = "check with customer" if score < 0 else "looks normal"
    print(f"${payment[0]:,.0f} at {payment[1]:02.0f}:00, {payment[2]:,.0f} km from home -> {status}")
```

Output:

```text
$38 at 13:00, 2 km from home -> looks normal
$65 at 18:00, 8 km from home -> looks normal
$1,240 at 03:00, 6,500 km from home -> check with customer
```

Real systems use far more data and careful testing, but the principle is the same: compare each payment with what's usual, and ask when something stands out.

## Lending decisions and clear reasons

When you apply for a loan or a credit card, a lender has to judge whether you can repay. In the example below, a model weighs information such as income, existing debts and repayment history.

A key principle here is **clear reasons**. In the United States, the Consumer Financial Protection Bureau (CFPB) addressed this directly in a 2022 circular. Its answer: lenders must give **specific and accurate reasons** when they turn down an application, and the rules apply to every credit decision, whatever technology is used. If a complex "black-box" model makes that impossible, the lender can't use it that way.

In the European Union, the **AI Act** lists AI systems that assess people's creditworthiness as **high-risk**, which brings extra requirements. AI used only to detect financial fraud is an exception.

### For the technically curious: turning a score into reasons

This example trains a simple, transparent model on made-up data, scores an applicant, and lists the factors that pushed the score up most. Those factors become the reasons a customer would see.

```python
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(7)
features = ["income ($k)", "debt-to-income (%)", "missed payments", "years at address"]

# Synthetic training data for illustration only
X = np.column_stack([
    rng.normal(55, 15, 1000), rng.normal(30, 10, 1000),
    rng.poisson(0.5, 1000), rng.normal(5, 3, 1000),
])
risk = -0.04 * X[:, 0] + 0.08 * X[:, 1] + 0.9 * X[:, 2] - 0.1 * X[:, 3]
y = (risk + rng.normal(0, 2, 1000) > np.percentile(risk, 75)).astype(int)  # 1 = struggled to repay

scaler = StandardScaler().fit(X)
model = LogisticRegression().fit(scaler.transform(X), y)

applicant = np.array([[48, 36, 1, 3]])
z = scaler.transform(applicant)[0]
score = model.predict_proba(scaler.transform(applicant))[0, 1]
print(f"Risk score: {score:.2f} (applications above 0.50 go to a person for review)")
print("Main reasons:")

# Each feature's push towards "risky", largest first: these become the reasons
contributions = model.coef_[0] * z
for i in np.argsort(contributions)[::-1][:3]:
    print(f"- {features[i]}: {applicant[0, i]:g}")
```

Output:

```text
Risk score: 0.64 (applications above 0.50 go to a person for review)
Main reasons:
- debt-to-income (%): 36
- missed payments: 1
- years at address: 3
```

In this example the score doesn't decide on its own: it sends the application to a person, with reasons that are specific and easy to understand.

## What the industry is watching

The same survey asked firms about the risks of AI. Four of the top five were about **data**: keeping it private, accurate and secure, and avoiding bias.

Firms also said that 46% of them have only a "partial understanding" of the AI they use, mostly because many models come from outside suppliers. That's one reason governance matters: 84% of firms said they have a named person accountable for their AI framework.

## How to stay in charge

A few simple habits go a long way:

1. **Ask why.** If a decision doesn't go your way, ask for the main reasons.
2. **Check your information.** Review your credit file and account history for mistakes, and ask for corrections.
3. **Ask for a person.** If something doesn't feel right, ask whether a person can review the decision.
4. **Turn on payment alerts**, so you see unusual activity straight away.

## Common questions

**Is AI deciding whether I get a loan?**
The available sources do not contain enough information to answer this for any particular bank. The UK survey found that only 2% of AI use cases make decisions fully on their own, and in the US, lenders must still give specific reasons for turning down credit.

**Can I run the code examples myself?**
Yes. Install Python, then run `pip install numpy scikit-learn`. All the data is made up, so no personal information is involved.

## Try it this week

Open your banking app and look at your **alert settings**. Turn on instant payment alerts if they're off. Then read about the other two parts of this series: [insurance](/blog/ai-in-insurance/) and [cybersecurity](/blog/cybersecurity-in-finance/).

## Sources & further reading

- Bank of England and Financial Conduct Authority, [*Artificial intelligence in UK financial services – 2024*](https://www.bankofengland.co.uk/report/2024/artificial-intelligence-in-uk-financial-services-2024) (21 November 2024).
- Consumer Financial Protection Bureau, [*Circular 2022-03: Adverse action notification requirements in connection with credit decisions based on complex algorithms*](https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/) (26 May 2022).
- [EU AI Act, Annex III](https://artificialintelligenceact.eu/annex/3/), the list of high-risk AI uses, including creditworthiness checks.
- scikit-learn documentation, [*Novelty and outlier detection: Isolation Forest*](https://scikit-learn.org/stable/modules/outlier_detection.html).
- [AI in insurance: pricing, claims and fair treatment](/blog/ai-in-insurance/)
- [Cybersecurity in finance: the layers that keep your money safe](/blog/cybersecurity-in-finance/)
