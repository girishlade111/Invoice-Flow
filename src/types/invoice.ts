
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: string;
  rate: string;
}

export interface Invoice {
  template: 'classic' | 'modern' | 'creative' | 'formal' | 'minimal' | 'business';
  logo?: string | null;
  invoiceNumber: string;
  purchaseOrderNumber: string;
  fromName: string;
  fromCompany: string;
  fromAddress: string;
  fromCityStateZip: string;
  fromCountry: string;
  fromPhone: string;
  fromEmail: string;
  toName: string;
  toCompany: string;
  toAddress: string;
  toCityStateZip: string;
  toCountry: string;
  toPhone: string;
  toEmail: string;
  date: Date;
  dueDate: Date;
  items: InvoiceItem[];
  notes: string;
  terms: string;
  discountType: "percentage" | "fixed";
  discountValue: string;
  taxType: "percentage" | "fixed";
  taxValue: string;
  paymentBank: string;
  paymentAccountName: string;
  paymentAccountNumber: string;
  currency: string;
}

    