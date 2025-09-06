
'use client';

import { InvoiceForm } from '@/components/invoice-form';
import { InvoicePreview } from '@/components/invoice-preview';
import { useInvoice } from '@/hooks/use-invoice';
import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Menu,
  Moon,
  Sun,
  Instagram,
  Linkedin,
  Github,
  Codepen,
  Mail,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Home() {
  const invoiceState = useInvoice();
  const invoicePreviewRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const AdContainer = ({
    title,
    className,
  }: {
    title: string;
    className?: string;
  }) => (
    <div
      className={`flex items-center justify-center w-full h-24 bg-muted/40 border border-dashed rounded-lg my-4 ${className}`}
    >
      <p className="text-muted-foreground text-sm">{title}</p>
    </div>
  );

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card px-4 md:px-8 no-print">
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary"
          >
            <path
              d="M14.5 3.5C14.5 3.5 14.5 5.5 12.5 5.5C10.5 5.5 9.5 3.5 9.5 3.5M14.5 3.5C14.5 3.5 16.5 3.5 16.5 5.5C16.5 7.5 14.5 8 14.5 8M9.5 3.5C9.5 3.5 7.5 3.5 7.5 5.5C7.5 7.5 9.5 8 9.5 8M12 14.5L14 19.5L12 21.5L10 19.5L12 14.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M18 10L21 12L18 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M6 10L3 12L6 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <h1 className="text-xl font-bold text-foreground">InvoiceFlow</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Invoice Form</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="lg:hidden w-full max-w-md p-0 flex flex-col"
            >
              <SheetHeader className="p-6 pb-0">
                <SheetTitle>Invoice Editor</SheetTitle>
                <SheetDescription>
                  Fill out the form below to create your invoice. The preview on
                  the right will update in real-time.
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-full">
                <div className="p-6">
                  <InvoiceForm
                    {...invoiceState}
                    invoicePreviewRef={invoicePreviewRef}
                  />
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <div className="flex-1 no-print">
          <ScrollArea className="h-full">
            <div className="p-6 xl:p-8 max-w-4xl mx-auto">
              <AdContainer
                title="Leaderboard Ad (728x90)"
                className="h-24 hidden md:flex"
              />
              <InvoiceForm
                {...invoiceState}
                invoicePreviewRef={invoicePreviewRef}
              />
            </div>
          </ScrollArea>
        </div>
        <div className="bg-muted/40 dark:bg-muted/20 flex justify-center print-container py-6 xl:py-8">
          <div className="w-full max-w-[8.5in] p-4">
            <InvoicePreview
              ref={invoicePreviewRef}
              {...invoiceState.invoice}
              calculatedTotals={invoiceState.calculatedTotals}
            />
          </div>
        </div>
        <div className="no-print p-6 xl:p-8 max-w-4xl mx-auto w-full">
          <AdContainer
            title="Footer Leaderboard Ad (728x90)"
            className="h-24 hidden md:flex"
          />
        </div>
      </main>
      <footer className="no-print border-t bg-card">
        <div className="max-w-4xl mx-auto py-6 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} InvoiceFlow. Built by Girish Lade.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/girish_lade_/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://www.linkedin.com/in/girish-lade-075bba201/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://github.com/girishlade111" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://codepen.io/Girish-Lade-the-looper" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Codepen className="h-5 w-5" />
              <span className="sr-only">Codepen</span>
            </a>
            <a href="mailto:girishlade111@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
