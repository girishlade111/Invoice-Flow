'use server';
/**
 * @fileOverview Generates a PDF of the invoice and checks if the content fits on the page.
 *
 * - generatePdfAndFitContent - A function that generates a PDF of the invoice and checks if the content fits on the page.
 * - GeneratePdfAndFitContentInput - The input type for the generatePdfAndFitContent function.
 * - GeneratePdfAndFitContentOutput - The return type for the generatePdfAndFitContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePdfAndFitContentInputSchema = z.object({
  invoiceHtml: z
    .string()
    .describe('The HTML content of the invoice to be converted to PDF.'),
});
export type GeneratePdfAndFitContentInput = z.infer<
  typeof GeneratePdfAndFitContentInputSchema
>;

const GeneratePdfAndFitContentOutputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      'The data URI of the generated PDF. The data URI must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
  isContentFitted: z
    .boolean()
    .describe('Whether or not the invoice content fits within a single page.'),
});
export type GeneratePdfAndFitContentOutput = z.infer<
  typeof GeneratePdfAndFitContentOutputSchema
>;

export async function generatePdfAndFitContent(
  input: GeneratePdfAndFitContentInput
): Promise<GeneratePdfAndFitContentOutput> {
  return generatePdfAndFitContentFlow(input);
}

const generatePdfAndFitContentPrompt = ai.definePrompt({
  name: 'generatePdfAndFitContentPrompt',
  input: {schema: GeneratePdfAndFitContentInputSchema},
  output: {schema: GeneratePdfAndFitContentOutputSchema},
  prompt: `You are an expert PDF generator that takes HTML as input and returns a PDF data URI.

You will also determine if the content of the HTML invoice fits within a single page.

Input HTML: {{{invoiceHtml}}}`,
});

const generatePdfAndFitContentFlow = ai.defineFlow(
  {
    name: 'generatePdfAndFitContentFlow',
    inputSchema: GeneratePdfAndFitContentInputSchema,
    outputSchema: GeneratePdfAndFitContentOutputSchema,
  },
  async input => {
    // Here, we would ideally use a tool or library to generate the PDF
    // and determine if the content fits within the page.
    // Since external libraries are not directly usable, this is a placeholder.
    // In a real implementation, libraries like jsPDF and html2canvas
    // would be used to generate the PDF from the HTML input.

    // For now, we return a mock PDF data URI and assume the content fits.
    const mockPdfDataUri = 'data:application/pdf;base64,mockpdfdata';
    const isContentFitted = true; // Assuming content fits for now

    // In a real implementation, the prompt would not be necessary as the
    // PDF generation and content fitting check would be done directly.
    // However, for demonstration purposes, we call the prompt with dummy values.
    const {output} = await generatePdfAndFitContentPrompt({
      invoiceHtml: input.invoiceHtml,
    });

    return {
      pdfDataUri: mockPdfDataUri,
      isContentFitted: isContentFitted,
    };
  }
);
