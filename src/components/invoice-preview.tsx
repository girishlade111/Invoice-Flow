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

const InvoicePreview = React.forwardRef<HTMLDivElement, InvoicePreviewProps>(
  (
    {
      logo,
      invoiceNumber,
      fromName,
      fromCompany,
      fromAddress,
      fromCityStateZip,
      fromCountry,
      toName,
      toCompany,
      toAddress,
      toCityStateZip,
      toCountry,
      date,
      dueDate,
      items,
      notes,
      terms,
      calculatedTotals,
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
      <Card ref={ref} className="w-full shadow-lg rounded-xl invoice-preview-print bg-white text-black dark:bg-white dark:text-black">
        <CardContent className="p-8 md:p-12 space-y-8">
          <header className="flex justify-between items-start">
            <div>
              {logo ? (
                <img data-ai-hint="logo" src={logo} alt="Company Logo" className="h-20 w-auto object-contain mb-4" />
              ) : null}
              <h1 className="text-2xl font-bold text-gray-800">{fromCompany}</h1>
              <p className="text-sm text-gray-600">{fromName}</p>
              <p className="text-sm text-gray-600">{fromAddress}</p>
              <p className="text-sm text-gray-600">{fromCityStateZip}</p>
              <p className="text-sm text-gray-600">{fromCountry}</p>
            </div>
            <div className="text-right">
              <h2 className="text-4xl font-bold uppercase text-gray-400">Invoice</h2>
              <p className="text-sm text-gray-600"># {invoiceNumber}</p>
            </div>
          </header>

          <section className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
                <h3 className="text-sm font-semibold text-gray-500">Bill To</h3>
                <p className="font-bold text-gray-800">{toCompany}</p>
                <p className="text-sm text-gray-600">{toName}</p>
                <p className="text-sm text-gray-600">{toAddress}</p>
                <p className="text-sm text-gray-600">{toCityStateZip}</p>
                <p className="text-sm text-gray-600">{toCountry}</p>
            </div>
            <div className="text-right space-y-1">
                <p><span className="font-semibold text-gray-600">Date of Issue:</span> {format(date, 'MMM d, yyyy')}</p>
                <p><span className="font-semibold text-gray-600">Due Date:</span> {format(dueDate, 'MMM d, yyyy')}</p>
            </div>
          </section>

          <section>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-sm font-semibold uppercase text-gray-600">Description</th>
                  <th className="p-3 text-center text-sm font-semibold uppercase text-gray-600">Qty</th>
                  <th className="p-3 text-right text-sm font-semibold uppercase text-gray-600">Rate</th>
                  <th className="p-3 text-right text-sm font-semibold uppercase text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                    const quantity = parseFloat(item.quantity) || 0;
                    const rate = parseFloat(item.rate) || 0;
                    const total = quantity * rate;
                    return(
                        <tr key={item.id} className="border-b border-gray-200">
                            <td className="p-3">{item.description}</td>
                            <td className="p-3 text-center">{item.quantity}</td>
                            <td className="p-3 text-right">{formatCurrency(rate)}</td>
                            <td className="p-3 text-right">{formatCurrency(total)}</td>
                        </tr>
                    )
                })}
              </tbody>
            </table>
          </section>

          <section className="flex justify-end">
            <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(calculatedTotals.subtotal)}</span>
                </div>
                {calculatedTotals.discountAmount > 0 && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Discount</span>
                        <span>- {formatCurrency(calculatedTotals.discountAmount)}</span>
                    </div>
                )}
                {calculatedTotals.taxAmount > 0 && (
                     <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span>+ {formatCurrency(calculatedTotals.taxAmount)}</span>
                    </div>
                )}
                <Separator className="bg-gray-300"/>
                <div className="flex justify-between font-bold text-lg">
                    <span className="text-gray-800">Total</span>
                    <span className="text-gray-800">{formatCurrency(calculatedTotals.total)}</span>
                </div>
            </div>
          </section>
          
          <Separator className="my-8 bg-gray-300" />
          
          <footer className="space-y-4">
            {notes && (
                <div>
                    <h4 className="font-semibold text-gray-700">Notes</h4>
                    <p className="text-sm text-gray-600">{notes}</p>
                </div>
            )}
             {terms && (
                <div>
                    <h4 className="font-semibold text-gray-700">Terms & Conditions</h4>
                    <p className="text-sm text-gray-600">{terms}</p>
                </div>
            )}
          </footer>
        </CardContent>
      </Card>
    );
  }
);

InvoicePreview.displayName = 'InvoicePreview';

export { InvoicePreview };
