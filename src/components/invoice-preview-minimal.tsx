'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Invoice as InvoiceType } from '@/types/invoice';
import { format } from 'date-fns';

interface InvoicePreviewProps extends InvoiceType {
  calculatedTotals: {
    subtotal: number;
    discountAmount: number;
    taxAmount: number;
    total: number;
  };
}

const InvoicePreviewMinimal = React.forwardRef<HTMLDivElement, InvoicePreviewProps>(
  (
    {
      invoiceNumber,
      toName,
      toCompany,
      toAddress,
      date,
      dueDate,
      items,
      calculatedTotals,
      paymentBank,
      paymentAccountName,
      paymentAccountNumber,
      fromName
    },
    ref
  ) => {
    
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        }).format(amount);
    };
      
    return (
      <Card ref={ref} className="w-full shadow-lg rounded-xl invoice-preview-print bg-white text-black dark:bg-white dark:text-black font-sans">
        <CardContent className="p-8 md:p-12 space-y-12 text-gray-700">
          <header className="flex items-center justify-between">
            <Separator className="w-1/4 bg-gray-400"/>
            <h1 className="text-5xl font-light tracking-[0.3em] text-gray-800">INVOICE</h1>
          </header>

          <section className="grid grid-cols-2 gap-12">
            <div className="space-y-6 text-sm">
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Issued To:</h2>
                    <p className="font-bold">{toName}</p>
                    <p>{toCompany}</p>
                    <p>{toAddress}</p>
                </div>
                 <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Pay To:</h2>
                    <p>{paymentBank}</p>
                    <p>Account Name: {paymentAccountName}</p>
                    <p>Account No.: {paymentAccountNumber}</p>
                </div>
            </div>
            <div className="text-right text-sm">
                <div className="flex justify-end gap-4">
                    <p className="font-bold uppercase text-gray-500">Invoice No:</p>
                    <p>{invoiceNumber}</p>
                </div>
                <div className="flex justify-end gap-4">
                    <p className="font-bold uppercase text-gray-500">Date:</p>
                    <p>{format(date, 'MM.dd.yyyy')}</p>
                </div>
                <div className="flex justify-end gap-4">
                    <p className="font-bold uppercase text-gray-500">Due Date:</p>
                    <p>{format(dueDate, 'MM.dd.yyyy')}</p>
                </div>
            </div>
          </section>

          <section>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="py-2 font-bold uppercase tracking-wider text-gray-500">Description</th>
                  <th className="py-2 text-right font-bold uppercase tracking-wider text-gray-500">Unit Price</th>
                  <th className="py-2 text-right font-bold uppercase tracking-wider text-gray-500">Qty</th>
                  <th className="py-2 text-right font-bold uppercase tracking-wider text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                    const quantity = parseFloat(item.quantity) || 0;
                    const rate = parseFloat(item.rate) || 0;
                    const total = quantity * rate;
                    return(
                        <tr key={item.id} className="border-b border-gray-200">
                            <td className="py-3">{item.description}</td>
                            <td className="py-3 text-right">{formatCurrency(rate)}</td>
                            <td className="py-3 text-right">{item.quantity}</td>
                            <td className="py-3 text-right">{formatCurrency(total)}</td>
                        </tr>
                    )
                })}
              </tbody>
            </table>
          </section>

          <section className="flex justify-end text-sm">
            <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between">
                    <span className="font-bold uppercase text-gray-500">Subtotal</span>
                    <span>{formatCurrency(calculatedTotals.subtotal)}</span>
                </div>
                {calculatedTotals.taxAmount > 0 && (
                     <div className="flex justify-between">
                        <span className="font-bold uppercase text-gray-500">Tax</span>
                        <span>{formatCurrency(calculatedTotals.taxAmount)}</span>
                    </div>
                )}
                {calculatedTotals.discountAmount > 0 && (
                    <div className="flex justify-between">
                        <span className="font-bold uppercase text-gray-500">Discount</span>
                        <span>- {formatCurrency(calculatedTotals.discountAmount)}</span>
                    </div>
                )}
                <div className="flex justify-between font-bold text-md">
                    <span className="uppercase text-gray-500">Total</span>
                    <span className="text-gray-800">{formatCurrency(calculatedTotals.total)}</span>
                </div>
            </div>
          </section>
          
          <footer className="flex justify-end pt-12">
            <div className="w-1/3 text-center">
                <p className="font-serif italic text-lg">{fromName}</p>
                <Separator className="mt-2 bg-gray-400"/>
                <p className="text-xs mt-2">Signature</p>
            </div>
          </footer>
        </CardContent>
      </Card>
    );
  }
);

InvoicePreviewMinimal.displayName = 'InvoicePreviewMinimal';

export { InvoicePreviewMinimal };
