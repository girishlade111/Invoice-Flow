'use client';

import React from 'react';
import type { Invoice as InvoiceType } from '@/types/invoice';
import { InvoicePreviewClassic } from './invoice-preview-classic';
import { InvoicePreviewModern } from './invoice-preview-modern';
import { InvoicePreviewCreative } from './invoice-preview-creative';
import { InvoicePreviewFormal } from './invoice-preview-formal';
import { InvoicePreviewMinimal } from './invoice-preview-minimal';

interface InvoicePreviewProps extends InvoiceType {
  calculatedTotals: {
    subtotal: number;
    discountAmount: number;
    taxAmount: number;
    total: number;
  };
}

const InvoicePreview = React.forwardRef<HTMLDivElement, InvoicePreviewProps>(
  (props, ref) => {
    const { template } = props;

    const renderTemplate = () => {
      switch (template) {
        case 'modern':
          return <InvoicePreviewModern ref={ref} {...props} />;
        case 'creative':
          return <InvoicePreviewCreative ref={ref} {...props} />;
        case 'formal':
          return <InvoicePreviewFormal ref={ref} {...props} />;
        case 'minimal':
          return <InvoicePreviewMinimal ref={ref} {...props} />;
        case 'classic':
        default:
          return <InvoicePreviewClassic ref={ref} {...props} />;
      }
    };

    return renderTemplate();
  }
);

InvoicePreview.displayName = 'InvoicePreview';

export { InvoicePreview };
