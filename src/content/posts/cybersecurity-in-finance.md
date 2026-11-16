---
title: "Cybersecurity in finance: the layers that keep your money safe"
description: "How banks, the card industry, industry groups and regulators each add a layer of protection around your money, plus how one-time codes and passkeys work."
pubDate: 2026-11-16
topic: "Everyday AI"
level: Beginner
cover: /images/cover-cybersecurity-finance.jpg
coverAlt: "An illustration of cybersecurity in finance: a gold shield surrounded by five rings labelled You, Your bank, Card industry, Industry groups and Regulators, beside a phone showing a six-digit one-time code and a passkey prompt."
takeaways:
  - "Cybersecurity was the highest perceived systemic risk for UK financial firms in 2024, and also one of the areas where they saw the biggest benefits from AI."
  - "Protection comes in layers: you, your bank, the card industry, industry groups and regulators each add one."
  - "One-time codes change every 30 seconds, and passkeys are designed to resist phishing."
---

Your money is protected by several layers, not just one. Each layer is looked after by different people: you, your bank, the card industry, industry groups and regulators.

This article is one of three: this one covers **cybersecurity**, and the others cover [banking](/blog/ai-in-banking/) and [insurance](/blog/ai-in-insurance/).

## Why finance takes security so seriously

In the 2024 Bank of England and FCA survey of UK financial firms, **cybersecurity** was rated the **highest perceived systemic risk**, both at the time and looking three years ahead.

The same survey found that cybersecurity is also one of the areas where firms see the **biggest benefits from AI**, alongside fighting fraud and money laundering, and data insights.

![Five layers of protection around your money: you (passkeys or one-time codes, payment alerts switched on), your bank (AI checks for fraud and money laundering, strong sign-in options), the card industry (the PCI DSS standard for card data, industry-wide standards), industry groups (threat intelligence shared worldwide, joint crisis response) and regulators (resilience testing and incident reports, deposit insurance). The caption reads: 'Many layers working together to keep you safe'.](/images/finance-security-layers.jpg)

## Layer 1: you

Two simple steps strengthen your own layer: **strong sign-in** and **payment alerts**.

**Passkeys** are a newer way to sign in. The FIDO Alliance, which develops the standard, describes them as credentials tied to your account on a particular website or app, unlocked the same way you unlock your device, such as with a fingerprint, face or PIN. It also describes them as **phishing-resistant**.

**One-time codes** from an authenticator app are another strong option.

### For the technically curious: how a one-time code works

The six-digit codes in authenticator apps follow a standard called **TOTP** (time-based one-time password), published as RFC 6238. Your bank and your phone share a secret once. After that, both combine the secret with the current time to produce the same code. The standard's default time step is **30 seconds**.

This example uses only Python's built-in tools, and checks itself against the official test value in RFC 6238.

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

The code stays the same within one 30-second window, then changes, so a code someone sees soon stops working.

## Layer 2: your bank

The UK survey shows banks are putting AI to work on security: **anti-money laundering and fighting fraud** and **cybersecurity** were among the biggest benefits firms reported. Our [banking article](/blog/ai-in-banking/) shows how a fraud check spots an unusual payment.

## Layer 3: the card industry

The card industry's main security standard for payment data is **PCI DSS** (Payment Card Industry Data Security Standard). It's managed by the PCI Security Standards Council, which develops industry-driven security standards, training and programmes for protecting payment data.

## Layer 4: industry groups

Financial firms don't defend themselves alone. **FS-ISAC** is a member organisation that describes itself as a platform for **sharing threat intelligence**, and for **crisis response**, with authorities around the world. It has been doing this work for more than 25 years.

## Layer 5: regulators and safety nets

- **Testing and incident reporting.** The EU's **Digital Operational Resilience Act (DORA)** has applied since **17 January 2025**. It covers banks, insurers, investment firms and other financial firms, and includes resilience testing, including threat-led penetration testing, and reporting of major technology incidents.
- **A shared framework.** Many organisations use the **NIST Cybersecurity Framework**. Version 2.0, published on **26 February 2024**, was its first major update since it was created in 2014.
- **Deposit insurance.** In the United States, money in an FDIC-insured bank is automatically covered for at least **\$250,000** per bank.

## Habits that strengthen your layer

1. **Turn on passkeys or two-step sign-in** wherever your bank offers them.
2. **Switch on payment alerts**, so you notice anything unusual quickly.
3. **Never share one-time codes** with anyone, whoever they say they are.
4. **If in doubt, contact your bank yourself**, using the number on its official website or your card.

## Common questions

**Are passkeys safer than passwords?**
The FIDO Alliance describes passkeys as always strong and phishing-resistant, unlike passwords. Check whether your bank offers them.

**Does DORA apply outside the EU?**
DORA is EU law. This article's sources don't cover other countries' rules, so check your own country's financial regulator.

**Can I run the code example myself?**
Yes. It uses only Python's built-in tools, with no extra installs.

## Try it this week

Open your banking app's **security settings**. Switch on passkeys or two-step sign-in if they're offered, and turn on payment alerts. Then read the other two parts of this series: [banking](/blog/ai-in-banking/) and [insurance](/blog/ai-in-insurance/).

## Sources & further reading

- Bank of England and Financial Conduct Authority, [*Artificial intelligence in UK financial services – 2024*](https://www.bankofengland.co.uk/report/2024/artificial-intelligence-in-uk-financial-services-2024) (21 November 2024).
- FIDO Alliance, [*Passkeys*](https://fidoalliance.org/passkeys/).
- IETF, [*RFC 6238: TOTP: Time-Based One-Time Password Algorithm*](https://www.rfc-editor.org/rfc/rfc6238).
- PCI Security Standards Council, [*PCI DSS*](https://www.pcisecuritystandards.org/).
- [FS-ISAC](https://www.fsisac.com/).
- EIOPA, [*Digital Operational Resilience Act (DORA)*](https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en).
- NIST, [*NIST releases version 2.0 of landmark Cybersecurity Framework*](https://www.nist.gov/news-events/news/2024/02/nist-releases-version-20-landmark-cybersecurity-framework) (26 February 2024).
- FDIC, [*Deposit insurance*](https://www.fdic.gov/resources/deposit-insurance).
- [AI in banking: how fraud checks and fair lending work](/blog/ai-in-banking/)
- [AI in insurance: pricing, claims and fair treatment](/blog/ai-in-insurance/)
