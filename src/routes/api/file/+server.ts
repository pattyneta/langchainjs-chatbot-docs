import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { CSVLoader } from 'langchain/document_loaders/fs/csv';
import { DocxLoader } from 'langchain/document_loaders/fs/docx';
import { TextLoader } from 'langchain/document_loaders/fs/text';

import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { Ollama } from 'langchain/llms/ollama';
import { PromptTemplate } from 'langchain/prompts';
import { RunnableSequence, RunnablePassthrough } from 'langchain/schema/runnable';
import { StringOutputParser } from 'langchain/schema/output_parser';
import { HuggingFaceTransformersEmbeddings } from 'langchain/embeddings/hf_transformers';
import { formatDocumentsAsString } from 'langchain/util/document';

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const files = formData.getAll('files');
  const question = formData.get('question');

  // Separate files by type
  const pdfFiles = files.filter(file => file.name.endsWith('.pdf'));
  const csvFiles = files.filter(file => file.name.endsWith('.csv'));
  const docxFiles = files.filter(file => file.name.endsWith('.docx'));
  const textFiles = files.filter(file => file.name.endsWith('.txt'));

  const pdfDocsPromises = pdfFiles.map(async (file: File) => {
    const loader = new PDFLoader(file, {
      splitPages: false
    });
    return await loader.loadAndSplit();
  });

  const csvDocsPromises = csvFiles.map(async (file: File) => {
    const loader = new CSVLoader(file);
    return await loader.load();
  });

  const docxDocsPromises = docxFiles.map(async (file: File) => {
    const loader = new DocxLoader(file);
    return await loader.load();
  });

  const textDocsPromises = textFiles.map(async (file: File) => {
    const loader = new TextLoader(file);
    return await loader.load();
  });

  const pdfDocs = await Promise.all(pdfDocsPromises);
  const csvDocs = await Promise.all(csvDocsPromises);
  const docxDocs = await Promise.all(docxDocsPromises);
  const textDocs = await Promise.all(textDocsPromises);

  const allDocs = [...pdfDocs.flat(), ...csvDocs.flat(), ...docxDocs.flat(), ...textDocs.flat()];

  const vectorstore = await HNSWLib.fromDocuments(allDocs, new HuggingFaceTransformersEmbeddings());

  const retriever = vectorstore.asRetriever();

  const prompt =
    PromptTemplate.fromTemplate(`Answer the question based only on the following context:
{context}

Question: {question}`);

  const model = new Ollama({
    baseUrl: 'http://localhost:11434',
    model: 'llama2'
  });

  const chain = RunnableSequence.from([
    {
      context: retriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough()
    },
    prompt,
    model,
    new StringOutputParser()
  ]);

  const response = await chain.invoke(question);

  return json(response);
};
