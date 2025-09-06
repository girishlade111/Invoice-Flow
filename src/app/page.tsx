'use client';

import { InvoiceForm } from '@/components/invoice-form';
import { InvoicePreview } from '@/components/invoice-preview';
import { useInvoice } from '@/hooks/use-invoice';
import { useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Home() {
  const invoiceState = useInvoice();
  const invoicePreviewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-screen w-full flex-col bg-background">
       <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card px-4 md:px-8 no-print">
        <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary">
                <path d="M14.5 3.5C14.5 3.5 14.5 5.5 12.5 5.5C10.5 5.5 9.5 3.5 9.5 3.5M14.5 3.5C14.5 3.5 16.5 3.5 16.5 5.5C16.5 7.5 14.5 8 14.5 8M9.5 3.5C9.5 3.5 7.5 3.5 7.5 5.5C7.5 7.5 9.5 8 9.5 8M12 14.5L14 19.5L12 21.5L10 19.5L12 14.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M18 10L21 12L18 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M6 10L3 12L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <h1 className="text-xl font-bold text-foreground">InvoiceFlow</h1>
        </div>

        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open Invoice Form</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="lg:hidden w-full max-w-md p-0">
                <ScrollArea className="h-full">
                    <div className="p-6">
                        <InvoiceForm {...invoiceState} invoicePreviewRef={invoicePreviewRef} />
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
      </header>

      <main className="grid flex-1 grid-cols-1 lg:grid-cols-5 xl:grid-cols-11">
        <div className="hidden lg:block lg:col-span-2 xl:col-span-4 no-print">
            <ScrollArea className="h-full">
                <div className="p-6 xl:p-8">
                    <InvoiceForm {...invoiceState} invoicePreviewRef={invoicePreviewRef} />
                </div>
            </ScrollArea>
        </div>
        <div className="lg:col-span-3 xl:col-span-7 bg-muted/40 dark:bg-muted/20 flex justify-center print-container">
            <ScrollArea className="h-full w-full py-6 xl:py-8">
                <div className="flex justify-center items-start">
                    <div className="w-full max-w-[8.5in] p-4">
                        <InvoicePreview ref={invoicePreviewRef} {...invoiceState.invoice} calculatedTotals={invoiceState.calculatedTotals} />
                    </div>
                </div>
            </ScrollArea>
        </div>
      </main>
    </div>
  );
}
