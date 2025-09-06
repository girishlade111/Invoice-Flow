export interface InvoiceItem {
  id: string;
  description: string;
  quantity: string;
  rate: string;
}

export interface Invoice {
  template: 'classic' | 'modern';
  logo?: string | null;
  invoiceNumber: string;
  fromName: string;
  fromCompany: string;
  fromAddress: string;
  fromCityStateZip: string;
  fromCountry: string;
  toName: string;
  toCompany: string;
  toAddress: string;
  toCityStateZip: string;
  toCountry: string;
  date: Date;
  dueDate: Date;
  items: InvoiceItem[];
  notes: string;
  terms: string;
  discountType: "percentage" | "fixed";
  discountValue: string;
  taxType: "percentage" | "fixed";
  taxValue: string;
}

    