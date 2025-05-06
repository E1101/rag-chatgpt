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

## About This Application

This application is a Retrieval Augmented Generation (RAG) chatbot built with Next.js. It combines the power of large language models with a vector database to provide more accurate and contextual responses.

### What is RAG?

RAG (Retrieval Augmented Generation) is an AI architecture that enhances traditional language models by first retrieving relevant information from a knowledge base and then using that information to generate more accurate and contextually relevant responses. This approach helps overcome limitations of pre-trained models by providing them with up-to-date and domain-specific information.

### Key Features

- **Contextual Conversations**: The chatbot maintains context through conversations for more coherent interactions
- **Document-based Knowledge**: Leverages information stored in Astra DB's vector database to answer questions
- **Real-time Responses**: Streams AI-generated responses for a smooth user experience
- **Customizable Knowledge Base**: Can be extended with additional documents and information sources

The application leverages Next.js for the frontend and API routes, Astra DB for vector storage and retrieval, and integrates with OpenAI's language models through LangChain and Vercel's AI SDK.

## Dependencies

This project uses the following dependencies:

### Data Storage and Vector Operations

- **[@datastax/astra-db-ts](https://github.com/datastax/astra-db-ts)**: A TypeScript client for Astra DB, used to store and manipulate vector data for retrieval augmented generation (RAG) capabilities in the chatbot.

### LLM Integration

- **[langchain](https://js.langchain.com)**: A framework for developing applications powered by language models. It provides tools for integrating, chaining, and optimizing large language models (LLMs) in applications, enabling sophisticated document retrieval, reasoning, and response generation.
- **[openai](https://github.com/openai/openai-node)**: Official OpenAI Node.js client library that provides convenient access to the OpenAI API for generating text, embeddings, and other AI capabilities used in the chatbot's natural language understanding and generation.
- **[ai](https://github.com/vercel/ai)**: Vercel's AI SDK for building AI-powered user interfaces. It provides React and JavaScript utilities for streaming responses, chat UI components, and integrations with various AI models.
- **[@ai-sdk/openai](https://github.com/vercel/ai/tree/main/packages/openai)**: Part of the AI SDK that provides specialized utilities for working with OpenAI models, offering enhanced integration features and optimizations specific to OpenAI's capabilities.

