import { json, RequestHandler } from '@sveltejs/kit';
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
  const files = formData.getAll('files') as File[];
  const question = formData.get('question');

  const fileExtensions: { [key: string]: typeof PDFLoader | typeof CSVLoader | typeof DocxLoader | typeof TextLoader } = {
    pdf: PDFLoader,
    csv: CSVLoader,
    docx: DocxLoader,
    txt: TextLoader
  };

 const fileDocsPromises = await Promise.all(files.flatMap(async (file: File) => {
      const extension = (file.name.split('.').pop() || '').toLowerCase();
      const Loader = fileExtensions[extension];
      if (Loader) {
        const loader = new Loader(file);
        return await loader.load();
      }
      return null;
    }));

  const fileDocs = (await Promise.all(fileDocsPromises)).filter(doc => doc !== null);
  const allDocs = fileDocs.flat().filter(doc => doc);

  const vectorstore = await HNSWLib.fromDocuments(allDocs, new HuggingFaceTransformersEmbeddings());
  const retriever = vectorstore.asRetriever();

  const promptTemplate = `Answer the question based only on the following context:\n{context}\nQuestion: {question}`;
  const prompt = PromptTemplate.fromTemplate(promptTemplate);

  const model = new Ollama({
    baseUrl: 'http://localhost:11434',
    model: 'llama2'
  });

  const chain = RunnableSequence.from([
    { context: retriever.pipe(formatDocumentsAsString), question: new RunnablePassthrough() },
    prompt,
    model,
    new StringOutputParser()
  ]);

  const response = await chain.invoke(question);

  return json(response);
};
