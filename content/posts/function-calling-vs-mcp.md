---
title: "Function Calling vs MCP: How AI Tools Actually Work"
slug: function-calling-vs-mcp
date: 2026-03-08
excerpt: "Function calling and MCP both let AI use tools, but they work very differently under the hood. Here's a practical comparison for engineers and builders."
tags:
  - MCP
  - AI
  - Function Calling
  - Engineering
readingTime: "5 min"
published: true
---

Every major AI model now supports tool use. But there are two distinct approaches: **function calling** (the OpenAI-pioneered pattern) and **MCP** (the open protocol approach). Understanding the difference is critical if you're building AI-powered products.

## Function Calling: The Original Approach

Function calling, introduced by OpenAI in 2023, lets you define functions in your API call that the model can choose to invoke. The model outputs structured JSON with the function name and arguments, and your application executes the function.

The key limitation: function calling is **tightly coupled** to your application. You define the functions, you handle the execution, you manage the context. It works great for single-app experiences but doesn't scale across platforms.

## MCP: The Protocol Approach

MCP decouples the tool from the application. Instead of defining functions per API call, you publish an MCP server that any compatible AI client (ChatGPT, Claude, Cursor, etc.) can discover and use.

The advantages:
- **Write once, run everywhere** — one MCP server works across all AI platforms
- **Dynamic discovery** — AI clients find and understand your tools at runtime
- **Rich UI** — MCP supports visual widgets, not just text responses
- **Standardized auth and permissions**

## Which Should You Use?

**Function calling** for internal AI features within your own app. You control both sides.

**MCP** for distributing your tools across the AI ecosystem. You want AI agents everywhere to be able to use your service.

For a detailed technical walkthrough, read [Function Calling vs MCP](https://www.getdrio.com/blog/function-calling-vs-mcp) on the Drio blog. To start building your own MCP tools visually, check out [Drio's visual builder](https://www.getdrio.com/blog/build-custom-chatgpt-tools-with-mcp).
