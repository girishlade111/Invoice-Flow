'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Invoice as InvoiceType } from '@/types/invoice';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface InvoicePreviewProps extends InvoiceType {
  calculatedTotals: {
    subtotal: number;
    discountAmount: number;
    taxAmount: number;
    total: number;
  };
}

const InvoicePreviewBusiness = React.forwardRef<HTMLDivElement, InvoicePreviewProps>(
  (
    {
      logo,
      invoiceNumber,
      purchaseOrderNumber,
      fromName,
      fromCompany,
      fromAddress,
      fromCityStateZip,
      fromCountry,
      fromPhone,
      fromEmail,
      toName,
      toCompany,
      toAddress,
      toCityStateZip,
      toCountry,
      toPhone,
      toEmail,
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
      <Card ref={ref} className="w-full shadow-lg rounded-none border-none invoice-preview-print bg-white text-black dark:bg-white dark:text-black font-sans">
        <CardContent className="p-0">
          <header className="bg-primary text-primary-foreground p-8 flex justify-between items-center">
            {logo ? (
                <img data-ai-hint="logo" src={logo} alt="Company Logo" className="h-16 w-auto object-contain bg-white p-2 rounded-sm" />
            ) : null}
            <h1 className="text-4xl font-bold uppercase tracking-widest">Invoice</h1>
          </header>

          <main className="p-8 md:p-10 space-y-8">
            <section className="grid grid-cols-2 gap-8">
                <div className="space-y-2 text-sm">
                    <h2 className="font-bold text-base mb-2">{fromCompany}</h2>
                    <p>{fromAddress}</p>
                    <p>{fromCityStateZip}, {fromCountry}</p>
                    <p>Phone: {fromPhone}</p>
                    <p>Email: {fromEmail}</p>
                </div>
                <div className="space-y-2 text-sm text-right">
                    <div className="flex justify-end gap-4"><span className="font-bold">Date:</span><span>{format(date, 'MM/dd/yy')}</span></div>
                    <div className="flex justify-end gap-4"><span className="font-bold">Invoice #:</span><span>{invoiceNumber}</span></div>
                    <div className="flex justify-end gap-4"><span className="font-bold">PO #:</span><span>{purchaseOrderNumber}</span></div>
                </div>
            </section>
            
            <section className="text-sm">
                <div className="bg-primary text-primary-foreground font-bold p-2">
                    Bill To
                </div>
                <div className="p-4 space-y-1">
                    <p className="font-bold">{toName}</p>
                    <p>{toCompany}</p>
                    <p>{toAddress}</p>
                    <p>{toCityStateZip}, {toCountry}</p>
                    <p>{toPhone}</p>
                </div>
            </section>

            <section>
                <table className="w-full text-left text-sm">
                <thead>
                    <tr className="bg-primary text-primary-foreground">
                    <th className="p-2 font-bold w-1/6">Quantity</th>
                    <th className="p-2 font-bold w-3/6">Description</th>
                    <th className="p-2 font-bold w-1/6 text-right">Unit Price</th>
                    <th className="p-2 font-bold w-1/6 text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => {
                        const quantity = parseFloat(item.quantity) || 0;
                        const rate = parseFloat(item.rate) || 0;
                        const total = quantity * rate;
                        return(
                            <tr key={item.id} className="border-b even:bg-gray-50">
                                <td className="p-2">{item.quantity}</td>
                                <td className="p-2">{item.description}</td>
                                <td className="p-2 text-right">{formatCurrency(rate)}</td>
                                <td className="p-2 text-right">{formatCurrency(total)}</td>
                            </tr>
                        )
                    })}
                    {/* Add empty rows for spacing */}
                    {Array.from({ length: Math.max(0, 8 - items.length) }).map((_, i) => (
                        <tr key={`empty-${i}`} className="border-b even:bg-gray-50 h-10">
                            <td className="p-2">&nbsp;</td>
                            <td className="p-2">&nbsp;</td>
                            <td className="p-2">&nbsp;</td>
                            <td className="p-2">&nbsp;</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </section>

            <section className="grid grid-cols-2 gap-8 items-start">
                 <div className="space-y-4 text-sm">
                    <p>{terms}</p>
                    <p className="font-bold">{notes}</p>
                 </div>
                <div className="space-y-1 text-sm">
                    <div className="flex justify-between p-1">
                        <span className="font-bold">Subtotal</span>
                        <span>{formatCurrency(calculatedTotals.subtotal)}</span>
                    </div>
                    {calculatedTotals.discountAmount > 0 && (
                        <div className="flex justify-between p-1">
                            <span className="font-bold">Credit</span>
                            <span>- {formatCurrency(calculatedTotals.discountAmount)}</span>
                        </div>
                    )}
                    {calculatedTotals.taxAmount > 0 && (
                        <div className="flex justify-between p-1">
                            <span className="font-bold">Tax</span>
                            <span>{formatCurrency(calculatedTotals.taxAmount)}</span>
                        </div>
                    )}
                    <div className="bg-primary text-primary-foreground flex justify-between font-bold text-base p-2 mt-2">
                        <span>Balance Due</span>
                        <span>{formatCurrency(calculatedTotals.total)}</span>
                    </div>
                </div>
            </section>
          </main>
        </CardContent>
      </Card>
    );
  }
);

InvoicePreviewBusiness.displayName = 'InvoicePreviewBusiness';

export { InvoicePreviewBusiness };
