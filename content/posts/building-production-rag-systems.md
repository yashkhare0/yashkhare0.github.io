---
title: "Building Production RAG Systems: Lessons from Echo"
slug: building-production-rag-systems
date: 2024-12-15
excerpt: "How we built an enterprise RAG tool that generated six-figure revenue in its first month. Architecture decisions, pitfalls, and what I'd do differently."
tags:
  - RAG
  - AI
  - Architecture
readingTime: "8 min"
published: true
---

Echo was our first real product at GEM AI. An enterprise RAG tool that hit EUR 125,000 in licensing revenue in month one. We built it in 45 days with a team that scaled from 2 to 10 engineers during the process.

Here's what actually worked, what didn't, and what I'd change if I were starting over.

## The Problem

Our client needed their workforce to query internal documentation — compliance manuals, HR policies, technical specs — without spending 20 minutes digging through SharePoint. Standard search wasn't cutting it. People were asking questions in natural language and expecting natural language answers, grounded in actual company documents.

That's the RAG pitch in one paragraph.

## Architecture Decisions That Mattered

### Chunking Strategy

We started with naive fixed-size chunks (512 tokens with 50-token overlap). It worked for demos. It broke in production.

The issue: compliance documents have hierarchical structure. A paragraph about "employee termination procedures" only makes sense in the context of the section it belongs to. Rip it out and embed it alone, and you lose the parent context entirely.

We switched to **hierarchical chunking** — preserving document structure by embedding chunks with their parent section headers prepended. A chunk about termination procedures now carries its section title, chapter title, and document name as prefix metadata.

Retrieval precision jumped from roughly 72% to 89% on our eval set.

```
# Before: naive chunking
"The employee must submit form HR-7 within 14 business days..."

# After: hierarchical chunking  
"[HR Policy Manual > Termination > Voluntary Resignation] The employee must submit form HR-7 within 14 business days..."
```

### Embedding Model Selection

We tested OpenAI `text-embedding-3-large`, Cohere `embed-english-v3.0`, and a fine-tuned `e5-large-v2`. For English enterprise docs, Cohere edged out the others on our domain-specific eval. But the margin was thin — maybe 2-3% on precision@10.

What mattered more than the model was **the eval pipeline itself**. Having 200+ curated question-answer pairs with source document references let us make data-driven decisions instead of vibes-driven ones.

### Vector Store

PGVector. Not Pinecone, not Weaviate, not Chroma.

Why? The client already ran PostgreSQL. Their ops team knew how to back it up, monitor it, and scale it. Adding a separate vector database meant another service to maintain, another point of failure, another vendor relationship.

PGVector with HNSW indexing handled 500K documents at sub-200ms query latency. That was more than enough.

## The Retrieval Pipeline

Our final pipeline looked like this:

1. **Query expansion** — LLM rewrites the user's question into 2-3 semantic variants
2. **Hybrid search** — combine dense vector similarity (PGVector) with sparse keyword matching (pg_trgm + tsvector)
3. **Re-ranking** — Cohere Rerank on top-20 candidates, return top-5
4. **Context assembly** — stitch the 5 chunks with their metadata into a prompt
5. **Generation** — GPT-4 with strict grounding instructions and source citations

The hybrid search was the single biggest improvement. Pure vector search missed keyword-exact matches ("form HR-7"), and pure keyword search missed semantic matches ("how do I quit"). Combining them covered both cases.

## What Went Wrong

### Hallucination in Edge Cases

Even with explicit grounding instructions, the LLM occasionally fabricated policy details when the retrieved context was ambiguous. We added a **confidence score** based on the re-ranker's output — if the top-ranked chunk scored below a threshold, the system responded with "I found potentially relevant documents, but I'm not confident enough to give a direct answer" and linked to the source docs instead.

Not elegant. But honest. The client preferred a system that said "I don't know" over one that made things up.

### Latency

The full pipeline — query expansion, hybrid search, re-ranking, generation — took 4-6 seconds end-to-end. For a chatbot, that's too slow.

We cut it to ~2.5 seconds by:
- Caching query expansions for repeated questions
- Reducing the re-rank candidate pool from 50 to 20
- Streaming the generation response so the user sees tokens immediately

### Document Ingestion at Scale

Processing 50,000 documents on initial load took 14 hours. We hadn't parallelized the embedding pipeline. Switching to async batch processing with 8 concurrent workers brought it down to 2 hours. Should have done that from day one.

## What I'd Do Differently

**Start with evals, not with the product.** We built the RAG pipeline first, then retroactively created evaluation datasets. That meant we spent the first two weeks making architectural decisions based on gut feeling. If I started over, I'd spend the first 3 days building 100 question-answer pairs and an automated eval harness. Every decision after that becomes measurable.

**Use a simpler re-ranker initially.** Cohere Rerank is great but adds latency and cost. A cross-encoder running locally on a small model would have been sufficient for v1 and removed an external dependency.

**Invest in observability earlier.** We added logging and tracing in week 4. Should have been day 1. When a user reports "the answer was wrong," you need to see exactly which documents were retrieved, how they were ranked, and what prompt was assembled. Without that, debugging is guesswork.

## The Result

45 days from first line of code to production deployment. EUR 125,000 in licensing revenue in the first month. The client renewed for a full year.

The system handled 2,000+ queries per day with a 91% user satisfaction score (measured by thumbs up/down on responses).

Was it perfect? No. But it shipped, it worked, and it generated real revenue on a timeline that most enterprise software projects would still be in the requirements phase.

That's the lesson: production RAG is not about picking the fanciest model or the most sophisticated retrieval algorithm. It's about building something that works reliably, measuring it honestly, and iterating fast on what the data tells you.
