---
title: "Banking and insurance security: the AI layers that keep you safe"
description: "From fraud alerts to cyber security, see how banks, insurers and the wider industry use AI to protect your money, with simple habits to stay safe."
pubDate: 2026-11-12
featured: true
topic: "Everyday AI"
level: Beginner
cover: /images/cover-banking.jpg
coverAlt: "A green bank card with a gold shield and tick, linked by a dotted line to a claim update card for a car repair claim with three ticked steps: photos checked, policy confirmed and approved by a person. The caption reads 'AI handles the paperwork, people make the decisions'."
takeaways:
  - "AI already works behind the scenes in banking and insurance: fraud checks, cyber defence, lending decisions, pricing and claims."
  - "Cyber security works in layers: banks, card networks, insurers, regulators and you each add protection, so one weak spot isn't enough."
  - "Fairness, clear reasons and privacy matter most, and you can always ask why a decision was made and request a human review."
---
Have you ever had a message from your bank asking, *"Was this you?"* moments after an unusual payment? Or made an insurance claim and been surprised by how quickly it was settled? Chances are, AI was working quietly behind the scenes.

I've built my career in banking and insurance, so this topic is close to my heart. These industries run on trust and genuine care for people's information. Behind every payment and every claim are dedicated teams of fraud analysts, security engineers, claims handlers and support staff, working around the clock so that you can bank and insure with confidence. This guide celebrates that effort and shows how AI helps them protect you.

It's written for everyone. If you enjoy a peek under the hood, look out for the short **"For the technically curious"** sections, each with a small code example. If not, feel free to skip them.

## Where you already meet AI

| Where | What AI does | What you see |
| --- | --- | --- |
| **Card payments** | Spots payments that don't fit your usual pattern | A "Was this you?" alert |
| **Signing in** | Checks that it's really you, from your device and habits | A quick extra check when something looks different |
| **Opening an account** | Reads and checks ID documents and forms | Faster sign-up |
| **Loans and credit cards** | Helps estimate whether borrowing is affordable | A quicker decision, with clear reasons |
| **Insurance claims** | Reads photos and documents | Simple claims settled faster |
| **Customer service** | Answers common questions at any hour | Help when you need it |

![A card of usual payments, such as a \$42 grocery shop and a \$3.20 coffee, flags an unusual \$1,240 purchase abroad, and a phone shows the bank's alert: 'Was this you?'](/images/banking-fraud-alert.jpg)

## Inside a fraud check

Fraud detection is one of the longest-standing uses of AI in banking. The idea is simple: **learn what "normal" looks like for you, then notice when something doesn't fit.**

A fraud model looks at **signals** for each payment, such as the amount, the time, the location, the shop and the device. It combines them into a **risk score**. A low score lets the payment go through instantly; a high score might pause it and send you a quick message to confirm. All of this happens in a fraction of a second.

![Five payment signals feed into an AI model, which gives a risk score of 0.94 out of 1.00 and pauses the payment to ask, 'Was this you?'](/images/banking-fraud-model.jpg)

### For the technically curious: spotting the unusual payment

This example uses **Isolation Forest**, a popular method for finding unusual data points. It learns from 500 made-up everyday payments, then checks three new ones.

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

Real systems use many more signals and careful testing, but the principle is the same: compare each payment with what's usual, and ask when something stands out.

## Cyber security: many layers protecting you

Because banks and insurers look after money and personal information, they invest heavily in keeping both safe. Online threats keep evolving, from fake emails and text messages (often called *phishing*) to stolen passwords, and the people who defend against them keep evolving too.

The reassuring part is that the industry doesn't rely on a single lock. It uses **layers of protection**, often called *defence in depth*. If one layer is ever bypassed, the next one is still there.

![Five layers of protection: you, your bank, card networks, insurers, and regulators and industry, with the caption 'Many layers working together to keep you safe'.](/images/banking-security-layers.jpg)

- **Your bank** encrypts your information, offers strong sign-in such as **passkeys**, fingerprint and one-time codes, and runs security teams day and night. AI helps these specialists sift through millions of sign-ins and payments, highlighting the few that deserve a closer look.
- **Card networks** protect every payment. Chip cards create a unique code each time, and phone wallets use *tokens*, so the shop never sees your real card number. Businesses that handle card data follow the **PCI DSS** security standard.
- **Insurers** help people and businesses recover when something goes wrong. Because they often ask for protections such as two-step sign-in and backups before offering cyber cover, they encourage better security across the whole economy.
- **Regulators and industry groups** set and test the rules. In the EU, the **Digital Operational Resilience Act (DORA)** has required banks and insurers to test their defences and report major incidents since January 2025. Through groups such as **FS-ISAC**, firms share warnings about new threats, so when one bank spots a new scam, others can prepare.
- **Ethical hackers** are invited to test systems, with permission, so any weak spots are found and fixed early.

**Safety nets for peace of mind.** In the United States, the **FDIC** protects deposits at insured banks up to \$250,000 per depositor, per bank, for each account ownership category, and your liability for unauthorised credit card charges is capped at \$50 by law. For debit cards, protection depends on how quickly you report a problem, so it's always worth telling your bank straight away.

**Staying a step ahead.** Scammers have started using AI too, for example to imitate a familiar voice. The industry is meeting this challenge with AI of its own, recognising scam patterns such as a large, unexpected payment to a brand-new account. If your bank pauses a payment to ask a few gentle questions, it's simply looking out for you.

### For the technically curious: how a one-time code works

The six-digit codes in authenticator apps use a method called **TOTP** (time-based one-time password). Your bank and your phone share a secret once; after that, both combine it with the current time to produce the same code, without sending anything over the internet.

```python
import hashlib
import hmac
import struct

def one_time_code(secret: bytes, unix_time: int, digits: int = 6) -> str:
    """The code an authenticator app shows (the TOTP method, RFC 6238)."""
    counter = unix_time // 30                        # a new code every 30 seconds
    digest = hmac.new(secret, struct.pack(">Q", counter), hashlib.sha1).digest()
    offset = digest[-1] & 0x0F                       # pick 4 bytes from the result
    number = struct.unpack(">I", digest[offset:offset + 4])[0] & 0x7FFFFFFF
    return str(number % 10**digits).zfill(digits)

# The secret is shared once, when you set up the app (this is the RFC's test secret)
secret = b"12345678901234567890"

# Check against the official test value in RFC 6238
assert one_time_code(secret, 59, digits=8) == "94287082"

for unix_time in (1_700_000_010, 1_700_000_039, 1_700_000_040):
    print(f"Time {unix_time}: code {one_time_code(secret, unix_time)}")
```

Output:

```text
Time 1700000010: code 732303
Time 1700000039: code 732303
Time 1700000040: code 136087
```

The code changes every 30 seconds, so even if someone sees one, it soon stops working. **Passkeys** go a step further: they work only on the genuine website or app, so a fake website can't trick you into handing them over.

## Lending and insurance decisions

When you apply for a loan, AI models can help weigh information such as income, existing debts and repayment history, alongside affordability rules and, in many cases, human review. If an application isn't approved, you deserve to know the main reasons. In the United States, the Consumer Financial Protection Bureau has made clear that lenders must give **specific reasons**, even when a complex model is involved.

### For the technically curious: turning a score into reasons

This example trains a simple, transparent model on made-up data, scores an applicant and lists the factors that pushed the score up most. Those factors become the reasons a customer would see.

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

The score doesn't make the decision on its own; it sends the application to a person, with reasons that are specific and easy to understand.

In insurance, models help estimate risk when you ask for a quote. For a simple claim, such as a dented car door, AI can read photos, check the policy and suggest an estimate, while larger or sensitive claims go to an experienced claims handler. Even on the fast track, a person approves the final decision.

![A simple car insurance claim in four steps: you send photos, AI checks the damage and policy, a person approves it, and the payment is sent, often within days.](/images/banking-claim-journey.jpg)

## Using AI responsibly

Because these decisions affect people's lives, responsible organisations focus on:

- **Fairness.** Past data isn't always balanced, so models are tested carefully to make sure everyone is treated fairly.
- **Clear explanations.** Using a complex model never removes your right to know why.
- **Privacy.** Personal information should be collected only when needed and protected carefully.
- **Human oversight.** AI can make mistakes, so important decisions should always have a person who can step in.

Regulators support this work too. The EU's **AI Act** gives AI used for credit scoring and for life and health insurance pricing extra safeguards, and US insurance regulators have issued guidance on using AI responsibly.

## How to stay in charge

A few simple habits go a long way:

1. **Ask why.** If a decision doesn't go your way, ask for the main reasons.
2. **Check your information.** Review your credit file and account history for mistakes.
3. **Ask for a person.** If something doesn't feel right, ask for a human review.
4. **Watch for scams.** Your bank will never ask for your full PIN or password. If in doubt, end the call and phone the number on the back of your card.
5. **Use official apps and stronger sign-in.** Turn on passkeys or two-step sign-in, and switch on payment alerts.

![A checklist of five habits: ask why, check your information, ask for a person, watch for scams, and use official apps.](/images/banking-stay-in-charge.jpg)

## Common questions

**Is AI deciding whether I get a loan?**
Usually, it supports the decision rather than making it alone, alongside affordability rules and, in many cases, human review.

**Is online banking safe?**
It's protected by many layers, from encryption and fraud checks to strong sign-in and legal protections. Your own habits add the final layer: keep one-time codes to yourself, and take a moment before acting on any urgent request.

**Will AI replace bank and insurance staff?**
It's changing their work more than replacing it. Judgement, empathy and complex cases remain firmly human. Our guide to [AI and your career](/blog/ai-and-your-job/) explores this further.

**Can I run the code examples myself?**
Yes. Install Python, then run `pip install numpy scikit-learn` for the first two examples; the one-time code example needs nothing extra. All the data is made up, so no personal information is involved.

## Looking ahead

Banking and insurance have always been about looking after people at important moments. AI is giving the people in these industries better tools to do that work, faster and more safely than ever before. With security teams, regulators, insurers and customers all playing their part, the future of money looks not only smarter, but safer too.

## Try it this week

Open your banking app and look at your **security and alert settings**. Turn on instant payment alerts, and switch on passkeys or two-step sign-in if your bank offers them.

## Sources & further reading

- Bank of England and Financial Conduct Authority, [*Artificial intelligence in UK financial services*](https://www.bankofengland.co.uk/report/2024/artificial-intelligence-in-uk-financial-services-2024) (2024), a survey of how financial firms use AI.
- [EU Artificial Intelligence Act](https://artificialintelligenceact.eu/), including the uses that need extra safeguards, such as credit scoring and life and health insurance pricing.
- Consumer Financial Protection Bureau, [*Adverse action notification requirements and complex algorithms*](https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/) (Circular 2022-03).
- National Association of Insurance Commissioners, [*Artificial intelligence*](https://content.naic.org/insurance-topics/artificial-intelligence).
- NIST, [*Cybersecurity Framework*](https://www.nist.gov/cyberframework), version 2.0 (2024).
- [FS-ISAC](https://www.fsisac.com/), the global group where financial firms share cyber threat warnings.
- PCI Security Standards Council, [*PCI DSS*](https://www.pcisecuritystandards.org/), the security standard for card data.
- EIOPA, [*Digital Operational Resilience Act (DORA)*](https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en).
- FDIC, [*Deposit insurance*](https://www.fdic.gov/resources/deposit-insurance).
- Federal Trade Commission, [*Lost or stolen credit, ATM and debit cards*](https://consumer.ftc.gov/articles/lost-or-stolen-credit-atm-and-debit-cards).
- FIDO Alliance, [*Passkeys*](https://fidoalliance.org/passkeys/), and IETF, [*RFC 6238: TOTP*](https://www.rfc-editor.org/rfc/rfc6238), the method behind one-time codes.
- scikit-learn documentation, [*Isolation Forest*](https://scikit-learn.org/stable/modules/outlier_detection.html#isolation-forest), the method used in the fraud example.
- [AI and your career: how to thrive in the future of work](/blog/ai-and-your-job/)
