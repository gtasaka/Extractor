import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import { Document } from 'docx';
import cheerio from 'cheerio';

// Function to process PDF files
export async function processPdf(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => item.str).join(' ');
  }
  return text;
}

// Function to process DOCX files
export async function processDocx(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const doc = new Document(arrayBuffer);
  const text = doc.coreProperties.title + ' ' + doc.paragraphs.map((para: any) => para.text).join(' ');
  return text;
}

// Function to process TXT files
export async function processTxt(file: File) {
  const text = await file.text();
  return text;
}

// Function to process URLs
export async function processUrl(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const text = $('body').text().trim();
    return text;
  } catch (error) {
    console.error('Error processing URL:', error);
    return 'Failed to process URL';
  }
}
