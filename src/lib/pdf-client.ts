import * as pdfjs from 'pdfjs-dist';

// Set the worker source to CDN for simplicity in Next.js environment
// @ts-ignore
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/**
 * Extracts all text from a PDF file using PDF.js.
 * This runs on the client-side to leverage browser capabilities.
 */
export async function getPdfText(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({ 
      data: arrayBuffer,
      useSystemFonts: true,
      disableFontFace: false,
    });
    
    const pdf = await loadingTask.promise;
    let fullText = "";
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      // Extract text items and join them
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(" ");
        
      fullText += `--- Page ${i} ---\n${pageText}\n\n`;
    }
    
    return fullText;
  } catch (error: any) {
    console.error("PDF.js Extraction Error:", error);
    throw new Error("Failed to extract text from PDF. The file might be corrupted or protected.");
  }
}
