This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dependencies

This project uses the following dependencies:

### Data Storage and Vector Operations

- **[@datastax/astra-db-ts](https://github.com/datastax/astra-db-ts)**: A TypeScript client for Astra DB, used to store and manipulate vector data for retrieval augmented generation (RAG) capabilities in the chatbot.

### LLM Integration

- **[langchain](https://js.langchain.com)**: A framework for developing applications powered by language models. It provides tools for integrating, chaining, and optimizing large language models (LLMs) in applications, enabling sophisticated document retrieval, reasoning, and response generation.
- **[openai](https://github.com/openai/openai-node)**: Official OpenAI Node.js client library that provides convenient access to the OpenAI API for generating text, embeddings, and other AI capabilities used in the chatbot's natural language understanding and generation.
- **[ai](https://github.com/vercel/ai)**: Vercel's AI SDK for building AI-powered user interfaces. It provides React and JavaScript utilities for streaming responses, chat UI components, and integrations with various AI models.
- **[@ai-sdk/openai](https://github.com/vercel/ai/tree/main/packages/openai)**: Part of the AI SDK that provides specialized utilities for working with OpenAI models, offering enhanced integration features and optimizations specific to OpenAI's capabilities.

