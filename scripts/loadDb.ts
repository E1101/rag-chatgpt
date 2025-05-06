import { DataAPIClient } from '@datastax/astra-db-ts';
import { PuppeteerWebBaseLoader } from '@langchain/community/document_loaders/web/puppeteer';

import OpenAI from 'openai';

import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import 'dotenv/config';

const {
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  OPENAI_API_KEY,
} = process.env;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT!, { namespace: ASTRA_DB_NAMESPACE });

/**
 * breaks down text into manageable chunks for RAG processing.
 * 
 * chunkSize: 512
 * - Sets maximum size (in characters) for each chunk
 * - Optimizes for embedding model input size
 * - Creates chunks small enough for efficient vector storage and retrieval
 * 
 * chunkOverlap: 100
 * - Creates a 100-character overlap between adjacent chunks
 * - Prevents information loss at chunk boundaries
 * - Preserves context between related chunks
 * - Improves retrieval quality for concepts that span boundaries
 */
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 100,
});

/**
 * SimilarityMetric defines the algorithm used for vector similarity search in Astra DB:
 * 
 * dot_product (default):
 * - Calculates raw dot product between vectors
 * - Higher values indicate greater similarity
 * - Computationally efficient but sensitive to vector magnitudes
 * - Best used when vectors are normalized to similar lengths
 * 
 * cosine:
 * - Measures angle between vectors, ignoring magnitude
 * - Range: -1 (opposite) to 1 (identical)
 * - Ideal for text embeddings where direction matters more than magnitude
 * - More robust to length variations in documents
 * 
 * euclidean:
 * - Calculates "straight-line" distance between vectors
 * - Lower values indicate greater similarity
 * - Considers both direction and magnitude differences
 * - Best when absolute differences between vector components matter
 */
type SimilarityMetric = 'dot_product' | 'cosine' | 'euclidean';

const createCollection = async (
  similarityMetric: SimilarityMetric = 'dot_product'
) => {
  const res = await db.createCollection(ASTRA_DB_COLLECTION!, {
    vector: {
      dimension: 1536, // get this from docs for open AI embedding model
      metric: similarityMetric,
    },
  });

  console.log(res);
};

createCollection().then(() => loadSampleData());

// 

const f1Data = [
  'https://en.wikipedia.org/wiki/Formula_One',
  'https://www.formula1.com/en/latest/all',
  'https://en.wikipedia.org/wiki/2023_Formula_One_World_Championship',
  'https://en.wikipedia.org/wiki/2022_Formula_One_World_Championship',
  'https://en.wikipedia.org/wiki/2024_Formula_One_World_Championship',
];

async function loadSampleData () {
  const collection = await db.collection(ASTRA_DB_COLLECTION!);
  for await (const url of f1Data) {
    const content = await scrapePage(url);
    const chunks = await splitter.splitText(content);
    for await (const chunk of chunks) {
      const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: chunk,
        encoding_format: 'float',
      });

      const vector = embedding.data[0].embedding; // array of numbers

      const res = await collection.insertOne({
        $vector: vector,
        text: chunk,
      });
    }
  }
};

async function scrapePage(url: string) {
  // use Puppeteer
  const loader = new PuppeteerWebBaseLoader(url, {
    launchOptions: {
      headless: true,
    },
    gotoOptions: {
      waitUntil: 'domcontentloaded',
    },
    evaluate: async (page, browser) => {
      const result = await page.evaluate(() => document.body.innerHTML);
      await browser.close();
      return result;
    },
  });

  // only care about text - stripe out html tag elements
  return (await loader.scrape())?.replace(/<[^>]*>?/gm, '');
};