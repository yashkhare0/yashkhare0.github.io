---
title: "Shipping 8 AI Products in 8 Months"
slug: shipping-8-products-8-months
date: 2025-01-20
excerpt: "A retrospective on building and deploying 8 end-to-end AI products with an average time-to-deployment of under 3 weeks."
tags:
  - Productivity
  - Engineering
  - AI
readingTime: "6 min"
published: true
---

Between April 2025 and December 2025, I shipped 8 products end-to-end at COSMO CONSULT. Average time from first line of code to production deployment: under 3 weeks.

This isn't a flex. It's a system. Here's how it works.

## The Context

COSMO CONSULT is a mid-size consultancy that was going through an AI transformation. The company needed internal tools — fast. Not proofs of concept. Not demos. Real products that people would use every day.

I was given the latitude to pick problems, design solutions, and ship them. No committees. No six-month roadmaps. Just: here's a problem, go build something.

## The System

### Week 1: Understand and Prototype

Every project starts the same way. I spend 2-3 days talking to the actual users. Not their managers. Not the stakeholders who wrote the brief. The people who will open the tool every morning.

Then I build a working prototype. Not wireframes. Not Figma mockups. A working thing with real data. Usually a Next.js frontend hitting a FastAPI backend with hardcoded responses where the AI will go. Takes about 3 days.

The prototype forces two things: it surfaces assumptions that are wrong (always at least 2-3), and it gives users something to react to. People can't tell you what they want, but they can tell you what's wrong with what you put in front of them.

### Week 2: Build the Real Thing

By now I know what the product actually needs to do. The scope is small enough to fit in my head. I build:

- **Backend**: FastAPI, async Python, PostgreSQL. If it needs vectors, PGVector. If it needs graph relationships, Neo4j. If it needs queues, RabbitMQ.
- **Frontend**: Next.js, TypeScript, Tailwind. Server components where possible. Client components where interactivity demands it.
- **AI layer**: Whatever the product needs. Could be a simple prompt chain, could be a full RAG pipeline, could be a custom fine-tuned model.
- **Infra**: Docker, Azure, Pulumi for IaC. CI/CD from day one. PostHog for analytics.

I don't abstract prematurely. The first version of every product has exactly the abstractions it needs and nothing more.

### Week 3: Polish and Deploy

The last stretch is about the edges. Error handling. Loading states. Empty states. The experience when the AI takes too long. The experience when the AI is wrong.

Then deploy. Not behind a feature flag to 5% of users. To everyone. If it's broken, I'll know in hours via PostHog and fix it in hours.

## What Made This Possible

### Reusable Infrastructure, Not Reusable Code

I don't have a monorepo of shared components. What I have is a set of patterns I've internalized:

- Every API follows the same structure: routers, services, schemas, dependencies
- Every frontend has the same auth flow, the same error boundary pattern, the same loading state approach
- Every deployment uses the same Pulumi templates with per-project config

The reuse is in my head, not in a package. That's faster than maintaining shared libraries for 8 different products.

### Saying No to Features

Every product launches with 30-40% of the features that were originally discussed. The rest either turned out to be unnecessary during prototyping or got deprioritized to post-launch iterations.

Translate — which became the most adopted internal tool of 2025 — launched with exactly one feature: paste text, pick a target language, get a translation. No file upload. No batch processing. No translation memory. Just the core loop, done really well.

The adoption came from the core experience being fast and reliable, not from a feature checklist.

### No Permission Culture

This is an organizational point, not a technical one. But it's the most important factor. I didn't have to write proposals, get sign-offs, schedule reviews, or wait for architectural approval. I had trust from my manager and the autonomy to make decisions.

If you're reading this as a manager: the single highest-leverage thing you can do for engineering velocity is reduce the number of approvals between "I have an idea" and "it's deployed."

## The Products

Quick overview of what shipped:

**Sonar** — The company's core AI platform. Live transcript ingestion from meetings, custom analysis pipelines, structured insight extraction. This was the most complex build and the one I'm most proud of architecturally.

**Translate** — Internal translation tool. Hit 25% adoption across the company with zero marketing. Just word of mouth because it was faster and more private than alternatives.

**Radar** — Market intelligence tool. Monitors signals, tracks competitors, surfaces trends for product and strategy teams.

**Cosma** — AI business assistant. Natural language interface to company knowledge and processes.

And 4 more that I'll detail in future posts.

## What I Got Wrong

**Under-investing in monitoring for the first 3 products.** I added PostHog analytics from the start but didn't set up proper alerting until product 4. That meant I was discovering issues from user complaints instead of dashboards.

**Not documenting operational runbooks.** When I was the only person who knew how to deploy and debug each product, that was a bus factor of 1. I started writing runbooks from product 5 onwards.

**Skipping load testing.** Translate's sudden adoption spike caught the backend off-guard. Nothing broke, but response times degraded for about 6 hours before I scaled up the instances. A 30-minute load test before launch would have predicted this.

## The Takeaway

Shipping fast isn't about cutting corners. It's about:

1. **Talking to users before building.** Eliminates wasted work.
2. **Prototyping with real code.** Surfaces problems early.
3. **Keeping scope small.** Ship the core value, iterate on the rest.
4. **Reusing patterns, not packages.** Faster than maintaining abstractions.
5. **Deploying to everyone immediately.** Real feedback beats staged rollouts for internal tools.

8 products. 8 months. All still running in production. Several with growing user bases.

The goal was never to ship 8 things. The goal was to solve 8 real problems. The speed was a byproduct of having a system that removes everything between understanding a problem and deploying a solution.
