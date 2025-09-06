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

const InvoicePreviewFormal = React.forwardRef<HTMLDivElement, InvoicePreviewProps>(
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
      <Card ref={ref} className="w-full shadow-lg rounded-none border-none invoice-preview-print bg-white text-black dark:bg-white dark:text-black font-[inherit]">
        <CardContent className="p-8 md:p-12 space-y-6">
          {/* Header */}
          <header className="grid grid-cols-2 gap-4 items-start">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-800">{fromCompany || fromName}</h1>
              <p className="text-xs text-gray-600">{fromAddress}</p>
              <p className="text-xs text-gray-600">{fromCityStateZip}</p>
              <p className="text-xs text-gray-600">{fromCountry}</p>
            </div>
            <div className="text-right">
              <h2 className="text-4xl font-bold uppercase text-gray-700">Invoice</h2>
              <div className="mt-2 space-y-1 text-xs">
                <div className="grid grid-cols-2 text-right gap-1">
                  <span className="font-bold">DATE</span>
                  <span className="border border-gray-400 px-2 py-1">{format(date, 'MM/dd/yyyy')}</span>
                </div>
                <div className="grid grid-cols-2 text-right gap-1">
                  <span className="font-bold">INVOICE #</span>
                  <span className="border border-gray-400 px-2 py-1">{invoiceNumber}</span>
                </div>
                <div className="grid grid-cols-2 text-right gap-1">
                  <span className="font-bold">DUE DATE</span>
                  <span className="border border-gray-400 px-2 py-1">{format(dueDate, 'MM/dd/yyyy')}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Bill To */}
          <section className="w-1/2">
            <div className="bg-blue-800 text-white font-bold p-2 text-sm">
              BILL TO
            </div>
            <div className="border-l border-r border-b border-gray-400 p-2 space-y-1 text-sm">
                <p className="font-bold">{toName}</p>
                <p>{toCompany}</p>
                <p>{toAddress}</p>
                <p>{toCityStateZip}</p>
                 <p>{toCountry}</p>
            </div>
          </section>

          {/* Items Table */}
          <section>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="p-2 font-bold w-full">DESCRIPTION</th>
                  <th className="p-2 font-bold text-right whitespace-nowrap">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                    const quantity = parseFloat(item.quantity) || 0;
                    const rate = parseFloat(item.rate) || 0;
                    const total = quantity * rate;
                    return(
                        <tr key={item.id} className="border border-gray-400">
                            <td className="p-2 border-r border-gray-400">{item.description}</td>
                            <td className="p-2 text-right">{formatCurrency(total)}</td>
                        </tr>
                    )
                })}
                {/* Add empty rows for spacing */}
                {Array.from({ length: Math.max(0, 10 - items.length) }).map((_, i) => (
                    <tr key={`empty-${i}`} className="border border-gray-400">
                        <td className="p-2 border-r border-gray-400">&nbsp;</td>
                        <td className="p-2">&nbsp;</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Other Comments & Totals */}
          <section className="grid grid-cols-2 gap-4 items-start">
             <div className="w-full">
                <div className="bg-blue-800 text-white font-bold p-2 text-sm">
                    OTHER COMMENTS
                </div>
                <div className="border-l border-r border-b border-gray-400 p-2 text-sm h-24">
                   <p>1. {terms}</p>
                </div>
             </div>
            <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                    <span className="font-bold">Subtotal</span>
                    <span>{formatCurrency(calculatedTotals.subtotal)}</span>
                </div>
                {calculatedTotals.discountAmount > 0 && (
                    <div className="flex justify-between">
                        <span className="font-bold">Discount</span>
                        <span>- {formatCurrency(calculatedTotals.discountAmount)}</span>
                    </div>
                )}
                {calculatedTotals.taxAmount > 0 && (
                     <div className="flex justify-between">
                        <span className="font-bold">Tax</span>
                        <span>+ {formatCurrency(calculatedTotals.taxAmount)}</span>
                    </div>
                )}
                <Separator className="my-2 bg-gray-600" />
                <div className="flex justify-between font-bold text-md bg-gray-200 p-2 border border-gray-400">
                    <span>TOTAL</span>
                    <span>{formatCurrency(calculatedTotals.total)}</span>
                </div>
            </div>
          </section>
          
          {/* Footer */}
          <footer className="text-center space-y-2 text-sm">
            <p>Make all checks payable to <span className="font-bold">{fromCompany}</span></p>
            <p>If you have any questions about this invoice, please contact</p>
            <p className="font-bold">Thank You For Your Business!</p>
          </footer>
        </CardContent>
      </Card>
    );
  }
);

InvoicePreviewFormal.displayName = 'InvoicePreviewFormal';

export { InvoicePreviewFormal };
