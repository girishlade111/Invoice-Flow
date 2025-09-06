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

const InvoicePreviewModern = React.forwardRef<HTMLDivElement, InvoicePreviewProps>(
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
      <Card ref={ref} className="w-full shadow-lg rounded-xl invoice-preview-print bg-white text-black dark:bg-white dark:text-black font-sans">
        <CardContent className="p-0">
            <div className="grid grid-cols-3">
                <div className="col-span-2 p-12">
                    <header className="mb-12">
                        {logo ? (
                            <img data-ai-hint="logo" src={logo} alt="Company Logo" className="h-16 w-auto object-contain mb-6" />
                        ) : <h1 className="text-3xl font-bold text-primary mb-6">{fromCompany}</h1>}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">From</h3>
                                <p className="font-bold text-gray-800">{fromCompany}</p>
                                <p className="text-sm text-gray-600">{fromName}</p>
                                <p className="text-sm text-gray-600">{fromAddress}</p>
                                <p className="text-sm text-gray-600">{fromCityStateZip}, {fromCountry}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">To</h3>
                                <p className="font-bold text-gray-800">{toCompany}</p>
                                <p className="text-sm text-gray-600">{toName}</p>
                                <p className="text-sm text-gray-600">{toAddress}</p>
                                <p className="text-sm text-gray-600">{toCityStateZip}, {toCountry}</p>
                            </div>
                        </div>
                    </header>
                    <main>
                         <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-2 border-gray-300">
                                <th className="p-3 pb-4 text-sm font-bold uppercase text-gray-700">Description</th>
                                <th className="p-3 pb-4 text-center text-sm font-bold uppercase text-gray-700">Qty</th>
                                <th className="p-3 pb-4 text-right text-sm font-bold uppercase text-gray-700">Rate</th>
                                <th className="p-3 pb-4 text-right text-sm font-bold uppercase text-gray-700">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => {
                                    const quantity = parseFloat(item.quantity) || 0;
                                    const rate = parseFloat(item.rate) || 0;
                                    const total = quantity * rate;
                                    return(
                                        <tr key={item.id} className="border-b border-gray-200">
                                            <td className="p-3 font-medium">{item.description}</td>
                                            <td className="p-3 text-center text-gray-600">{item.quantity}</td>
                                            <td className="p-3 text-right text-gray-600">{formatCurrency(rate)}</td>
                                            <td className="p-3 text-right font-semibold">{formatCurrency(total)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </main>

                     <footer className="mt-12 space-y-6">
                        {notes && (
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-1">Notes</h4>
                                <p className="text-sm text-gray-600">{notes}</p>
                            </div>
                        )}
                        {terms && (
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-1">Terms</h4>
                                <p className="text-sm text-gray-600">{terms}</p>
                            </div>
                        )}
                    </footer>
                </div>
                <div className="col-span-1 bg-muted/30 p-12">
                     <div className="text-right mb-12">
                        <h2 className="text-4xl font-bold uppercase text-primary">Invoice</h2>
                        <p className="text-md text-gray-600"># {invoiceNumber}</p>
                    </div>

                    <div className="space-y-4 mb-12">
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-600">Date</span>
                            <span className="text-gray-800">{format(date, 'MMM d, yyyy')}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="font-semibold text-gray-600">Due Date</span>
                            <span className="text-gray-800">{format(dueDate, 'MMM d, yyyy')}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-semibold">{formatCurrency(calculatedTotals.subtotal)}</span>
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
                        <Separator className="my-4 bg-gray-300"/>
                        <div className="flex justify-between font-bold text-2xl text-primary">
                            <span>Total</span>
                            <span>{formatCurrency(calculatedTotals.total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    );
  }
);

InvoicePreviewModern.displayName = 'InvoicePreviewModern';

export { InvoicePreviewModern };

    