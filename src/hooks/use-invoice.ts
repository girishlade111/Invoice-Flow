'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import type { Invoice, InvoiceItem } from '@/types/invoice';

const getInitialInvoice = (): Invoice => ({
  logo: null,
  invoiceNumber: 'INV-001',
  fromName: 'Your Name',
  fromCompany: 'Your Company Inc.',
  fromAddress: '123 Main St',
  fromCityStateZip: 'Anytown, ST 12345',
  fromCountry: 'United States',
  toName: "Client's Name",
  toCompany: "Client's Company Inc.",
  toAddress: '456 Client Ave',
  toCityStateZip: 'Otherville, ST 67890',
  toCountry: 'United States',
  date: new Date(),
  dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
  items: [{
    id: crypto.randomUUID(),
    description: '',
    quantity: '1',
    rate: '0.00',
  }],
  notes: 'Thanks for your business!',
  terms: 'Payment due within 30 days.',
  discountType: 'percentage',
  discountValue: '0',
  taxType: 'percentage',
  taxValue: '0',
});

// Create an empty initial state to avoid server/client mismatch
const getEmptyInvoice = (): Invoice => ({
    ...getInitialInvoice(),
    date: new Date(0), // Use a fixed date on server
    dueDate: new Date(0),
    items: [],
  });

export const useInvoice = () => {
  const [invoice, setInvoice] = useState<Invoice>(getEmptyInvoice());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('invoiceData');
    if (savedData) {
        const parsed = JSON.parse(savedData);
        parsed.date = new Date(parsed.date);
        parsed.dueDate = new Date(parsed.dueDate);
        setInvoice(parsed);
    } else {
        setInvoice(getInitialInvoice());
    }
    setIsMounted(true);
  }, []);

  const updateInvoice = useCallback((updates: Partial<Invoice>) => {
    setInvoice((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleFieldChange = (field: keyof Invoice, value: any) => {
    updateInvoice({ [field]: value });
  };
  
  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string) => {
    const newItems = invoice.items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateInvoice({ items: newItems });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: crypto.randomUUID(),
      description: '',
      quantity: '1',
      rate: '0.00',
    };
    updateInvoice({ items: [...invoice.items, newItem] });
  };

  const removeItem = (id: string) => {
    const newItems = invoice.items.filter((item) => item.id !== id);
    updateInvoice({ items: newItems });
  };

  const calculatedTotals = useMemo(() => {
    const subtotal = invoice.items.reduce((acc, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const rate = parseFloat(item.rate) || 0;
      return acc + quantity * rate;
    }, 0);

    const discountValueNum = parseFloat(invoice.discountValue) || 0;
    const discountAmount = invoice.discountType === 'percentage'
      ? subtotal * (discountValueNum / 100)
      : discountValueNum;

    const subtotalAfterDiscount = subtotal - discountAmount;

    const taxValueNum = parseFloat(invoice.taxValue) || 0;
    const taxAmount = invoice.taxType === 'percentage'
      ? subtotalAfterDiscount * (taxValueNum / 100)
      : taxValueNum;

    const total = subtotalAfterDiscount + taxAmount;

    return { subtotal, discountAmount, taxAmount, total };
  }, [invoice.items, invoice.discountType, invoice.discountValue, invoice.taxType, invoice.taxValue]);

  const saveInvoice = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('invoiceData', JSON.stringify(invoice));
    }
  }, [invoice]);

  const loadInvoice = useCallback(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('invoiceData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Dates need to be converted back to Date objects
        parsed.date = new Date(parsed.date);
        parsed.dueDate = new Date(parsed.dueDate);
        setInvoice(parsed);
        return true;
      }
    }
    return false;
  }, []);

  const resetInvoice = useCallback(() => {
    setInvoice(getInitialInvoice());
    if (typeof window !== 'undefined') {
      localStorage.removeItem('invoiceData');
    }
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  return {
    invoice,
    setInvoice,
    updateInvoice,
    handleFieldChange,
    handleItemChange,
    addItem,
    removeItem,
    calculatedTotals,
    saveInvoice,
    loadInvoice,
    resetInvoice,
    formatCurrency,
    isMounted,
  };
};

export type UseInvoiceReturn = ReturnType<typeof useInvoice>;
