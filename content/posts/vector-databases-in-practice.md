---
title: "Vector Databases in Practice: PGVector vs Dedicated Solutions"
slug: vector-databases-in-practice
date: 2025-02-01
excerpt: "A practical comparison of vector database solutions for production AI applications, based on real-world usage at scale."
tags:
  - Vector DB
  - PostgreSQL
  - AI
readingTime: "10 min"
published: true
---

I've deployed production systems on PGVector, Pinecone, and ChromaDB. After running them across 6+ products serving real users, here's my honest take on when to use what — based on actual production experience, not benchmarks on synthetic datasets.

## The Short Version

Use PGVector if you already run PostgreSQL. Use a dedicated vector database only when you've hit a specific limitation that PostgreSQL can't solve. Most teams will never hit that limitation.

That's the article. If you want the reasoning, keep reading.

## PGVector: The Default Choice

PGVector is a PostgreSQL extension that adds vector similarity search. Install the extension, add a vector column, create an index, query with `<=>` (cosine distance) or `<->` (L2 distance). That's it.

### Why It's My Default

**Operational simplicity.** If your team already runs PostgreSQL (and statistically, you do), adding PGVector means zero new infrastructure. Same backup strategy. Same monitoring. Same connection pooling. Same team managing it.

Every new service you add to your stack is a service you have to monitor, back up, scale, debug, and pay for. Vector search bolted onto your existing database eliminates an entire category of operational burden.

**Transactional consistency.** Your documents live in PostgreSQL. Your vector embeddings live in PostgreSQL. When you update a document, you update its embedding in the same transaction. No eventual consistency issues. No sync jobs. No "the embedding is stale because the webhook failed."

This sounds minor until you're debugging why search results show a document that was deleted 3 hours ago because the async sync to your separate vector store failed silently.

**Hybrid queries.** The killer feature of PGVector isn't vector search — it's the ability to combine vector similarity with standard SQL predicates in a single query.

```sql
SELECT id, title, content,
       1 - (embedding <=> $1) AS similarity
FROM documents
WHERE tenant_id = $2
  AND created_at > $3
  AND status = 'published'
ORDER BY embedding <=> $1
LIMIT 10;
```

Try doing that in Pinecone. You can filter by metadata, but the metadata filtering is limited compared to full SQL. With PGVector, your entire relational data model is available as filter criteria.

### Performance Reality

On Echo, PGVector with HNSW indexing handled:
- 500,000 document chunks (1536-dimensional embeddings)
- Sub-200ms p95 query latency
- 2,000+ queries per day

On Sonar, with a smaller corpus (~50K chunks), p95 was under 80ms.

These numbers are with standard PostgreSQL on Azure, nothing exotic. No read replicas. No sharding. Just a single instance with enough RAM to hold the HNSW index.

### Where PGVector Struggles

**Scale beyond ~5M vectors.** The HNSW index consumes significant memory. At 5M vectors with 1536 dimensions, you're looking at roughly 30-40GB of index data in RAM. Doable, but you're entering territory where a dedicated vector database starts earning its keep.

**High-throughput ingestion.** If you're inserting thousands of vectors per second continuously, PostgreSQL's MVCC overhead and index maintenance can become a bottleneck. For batch ingestion (like initial document loading), this is manageable with bulk inserts and deferred indexing. For streaming ingestion, it gets harder.

**Multi-tenancy at massive scale.** If you have 1000 tenants each with 100K vectors, partitioning strategies become important and complex. Dedicated vector databases often handle multi-tenancy more gracefully out of the box.

## Pinecone: When You Need Managed Scale

I used Pinecone on one project where the client insisted on a managed solution and had budget for it.

### What It Does Well

**Zero ops.** You don't manage infrastructure. You create an index, push vectors, query. Scaling is automatic. Backups are automatic. This matters if your team doesn't have strong database ops skills.

**Genuinely fast at scale.** At 10M+ vectors, Pinecone's query latency was consistently under 50ms. Getting PGVector to match that at the same scale would require significant tuning and hardware.

**Metadata filtering.** While not as powerful as SQL, Pinecone's metadata filtering covers the 80% case. You can filter by string equality, numeric ranges, and boolean values.

### What Annoys Me

**Vendor lock-in.** Your vectors live in Pinecone's proprietary format on their infrastructure. If you want to switch, you're re-indexing everything. With PGVector, you can pg_dump and restore.

**Cost.** Pinecone's pricing model means you're paying continuously for storage and query capacity. PGVector's cost is whatever your PostgreSQL instance costs, which you're already paying for.

**The sync problem.** Your source-of-truth data lives in your database. Your vectors live in Pinecone. Now you need a sync mechanism. That sync mechanism will have bugs. Those bugs will cause search results to be stale or missing. I've seen this on every project that separates vectors from source data.

## ChromaDB: The Prototyping Companion

ChromaDB is great for prototyping and local development. I use it when:

1. I'm building a proof of concept and don't want to set up PostgreSQL
2. I'm running experiments on my laptop
3. I need to quickly test different embedding models

### Where It Fits

**Local development.** Spin up an in-memory Chroma instance, load your test documents, iterate on your retrieval pipeline. No database server needed. No connection strings. Just Python.

**Small-scale applications.** For apps with under 100K vectors and low query throughput, Chroma's simplicity is its strength. The API is clean, the Python integration is seamless, and it just works.

### Where It Doesn't

**Production at scale.** ChromaDB's persistence story has improved, but it's still not where I'd trust it for production workloads. The project is evolving rapidly, which is great for innovation but risky for stability.

**Operational maturity.** No built-in backup/restore. No replication. No connection pooling. These are table stakes for production databases, and Chroma doesn't have them yet.

I wouldn't run Chroma in production for anything user-facing. For internal tools with small datasets and a tolerance for occasional restarts, it's fine.

## My Decision Framework

Here's the flowchart I use for every new project:

**Do you already run PostgreSQL?** → Use PGVector. You're done.

**Is your dataset under 5M vectors?** → Use PGVector even if you don't currently run PostgreSQL. It's worth adding.

**Is your dataset over 5M vectors AND you need sub-50ms latency?** → Consider Pinecone or Qdrant.

**Are you prototyping locally?** → Use ChromaDB. Switch to PGVector before deploying.

**Do you need real-time streaming ingestion of vectors?** → Consider a dedicated solution. PGVector can handle it but requires more tuning.

For 90% of AI applications I've seen in the wild, PGVector is the right answer. The remaining 10% are either operating at massive scale (tens of millions of vectors) or have specific latency requirements that justify the operational complexity of a separate service.

## Practical Setup Tips

If you go with PGVector, here are the things I wish I'd known from day one:

**Use HNSW indexes, not IVFFlat.** HNSW provides better recall at comparable speed and doesn't require training on your data. The only downside is higher memory usage, but on modern hardware that's rarely a constraint.

```sql
CREATE INDEX ON documents
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 200);
```

**Set `ef_search` at query time.** Higher values give better recall at the cost of latency. Start at 100, tune based on your eval results.

```sql
SET hnsw.ef_search = 100;
```

**Batch your inserts.** Don't insert vectors one at a time. Batch them in groups of 100-500. This reduces index maintenance overhead significantly during bulk loading.

**Monitor index size.** The HNSW index lives in memory. If it exceeds your available RAM, PostgreSQL will swap, and your query latency will spike. Keep an eye on `pg_relation_size` for your index.

**Don't forget to VACUUM.** After bulk deletions or updates, run VACUUM on your vector table. Dead tuples affect scan performance.

## The Bigger Point

The vector database you choose matters less than you think. What matters is:

1. **Your chunking strategy** — garbage in, garbage out
2. **Your embedding model** — matched to your domain
3. **Your eval pipeline** — measuring retrieval quality systematically
4. **Your hybrid search approach** — combining dense and sparse retrieval

Get those four things right and any reasonable vector store will perform well. Get them wrong and the fanciest vector database won't save you.

Pick the simplest option that meets your requirements. For most of us, that's PGVector.
