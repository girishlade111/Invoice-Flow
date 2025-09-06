'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Download,
  Trash2,
  Printer,
  Save,
  FileUp,
  RotateCcw,
  PlusCircle,
} from 'lucide-react';
import type { UseInvoiceReturn } from '@/hooks/use-invoice';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

type InvoiceFormProps = UseInvoiceReturn & {
  invoicePreviewRef: React.RefObject<HTMLDivElement>;
};

const SectionCard: React.FC<React.PropsWithChildren<{ title: string; id: string }>> = ({ title, children, id }) => (
    <Card id={id} className="w-full">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
    </Card>
)

const Field: React.FC<React.PropsWithChildren<{ label: string; htmlFor: string }>> = ({ label, htmlFor, children }) => (
    <div className="grid gap-2">
        <Label htmlFor={htmlFor}>{label}</Label>
        {children}
    </div>
)

export function InvoiceForm({
  invoice,
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
  invoicePreviewRef,
  isMounted,
}: InvoiceFormProps) {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState<string | null>(invoice.logo || null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        updateInvoice({ logo: result });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveLogo = () => {
    setLogoPreview(null);
    updateInvoice({ logo: null });
  };
  
  const handleDownload = async () => {
    const invoiceElement = invoicePreviewRef.current;
    if (!invoiceElement) return;

    toast({ title: 'Generating PDF...', description: 'Please wait a moment.' });

    try {
        const canvas = await html2canvas(invoiceElement, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = imgWidth / imgHeight;
        const imgHeightPdf = pdfWidth / ratio;
        let height = imgHeightPdf;
        if(height > pdfHeight) height = pdfHeight;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, height);
        pdf.save(`Invoice-${invoice.invoiceNumber}-${invoice.toName}.pdf`);

        toast({ title: "✅ PDF Downloaded", description: "Your invoice has been saved." });

    } catch (error) {
        console.error("Error generating PDF:", error);
        toast({ variant: "destructive", title: "❌ Error", description: "Failed to generate PDF." });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
        <Card>
            <CardContent className="p-4 flex flex-wrap gap-2">
                <Button onClick={handleDownload}><Download className="mr-2 h-4 w-4" /> Download</Button>
                <Button variant="outline" onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print</Button>
                <div className="flex-grow" />
                <Button variant="outline" onClick={() => { saveInvoice(); toast({ title: "✅ Invoice Saved", description: "Your progress has been saved to local storage." }) }}><Save className="mr-2 h-4 w-4" /> Save</Button>
                <Button variant="outline" onClick={() => { if(!loadInvoice()) { toast({ variant: "destructive", title: "❌ No Saved Data", description: "Could not find any saved invoice data."})} else { toast({ title: "✅ Invoice Loaded", description: "Your saved invoice has been loaded."}) } }} disabled={!isMounted}><FileUp className="mr-2 h-4 w-4" /> Load</Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive"><RotateCcw className="mr-2 h-4 w-4" /> Reset</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete all your invoice data and reset the form.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => { resetInvoice(); toast({ title: "🗑️ Form Reset", description: "All fields have been reset to their default values." }) }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>

        <div className="space-y-8">
            <SectionCard title="Company & Client" id="company-client">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">From</h3>
                        <Field label="Your Logo" htmlFor="logo-upload">
                            <div className="flex items-center gap-4">
                                {logoPreview && <img data-ai-hint="logo" src={logoPreview} alt="Company Logo" className="w-16 h-16 object-contain rounded-md border p-1" />}
                                <div className="flex-1">
                                    <Input id="logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} className="text-sm" />
                                    {logoPreview && <Button variant="link" size="sm" onClick={handleRemoveLogo} className="mt-1 px-0 h-auto">Remove Logo</Button>}
                                </div>
                            </div>
                        </Field>
                        <Field label="Your Name" htmlFor="fromName">
                            <Input id="fromName" value={invoice.fromName} onChange={(e) => handleFieldChange('fromName', e.target.value)} />
                        </Field>
                        <Field label="Company Name" htmlFor="fromCompany">
                            <Input id="fromCompany" value={invoice.fromCompany} onChange={(e) => handleFieldChange('fromCompany', e.target.value)} />
                        </Field>
                        <Field label="Company Address" htmlFor="fromAddress">
                            <Input id="fromAddress" value={invoice.fromAddress} onChange={(e) => handleFieldChange('fromAddress', e.target.value)} />
                        </Field>
                        <Field label="City, State, Zip" htmlFor="fromCityStateZip">
                            <Input id="fromCityStateZip" value={invoice.fromCityStateZip} onChange={(e) => handleFieldChange('fromCityStateZip', e.target.value)} />
                        </Field>
                        <Field label="Country" htmlFor="fromCountry">
                            <Input id="fromCountry" value={invoice.fromCountry} onChange={(e) => handleFieldChange('fromCountry', e.target.value)} />
                        </Field>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">To</h3>
                         <Field label="Client's Name" htmlFor="toName">
                            <Input id="toName" value={invoice.toName} onChange={(e) => handleFieldChange('toName', e.target.value)} />
                        </Field>
                         <Field label="Client's Company" htmlFor="toCompany">
                            <Input id="toCompany" value={invoice.toCompany} onChange={(e) => handleFieldChange('toCompany', e.target.value)} />
                        </Field>
                         <Field label="Client's Address" htmlFor="toAddress">
                            <Input id="toAddress" value={invoice.toAddress} onChange={(e) => handleFieldChange('toAddress', e.target.value)} />
                        </Field>
                         <Field label="Client's City, State, Zip" htmlFor="toCityStateZip">
                            <Input id="toCityStateZip" value={invoice.toCityStateZip} onChange={(e) => handleFieldChange('toCityStateZip', e.target.value)} />
                        </Field>
                         <Field label="Client's Country" htmlFor="toCountry">
                            <Input id="toCountry" value={invoice.toCountry} onChange={(e) => handleFieldChange('toCountry', e.target.value)} />
                        </Field>
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="Invoice Details" id="invoice-details">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Field label="Invoice #" htmlFor="invoiceNumber">
                        <Input id="invoiceNumber" value={invoice.invoiceNumber} onChange={(e) => handleFieldChange('invoiceNumber', e.target.value)} />
                    </Field>
                    <Field label="Date of Issue" htmlFor="date">
                        <DatePicker date={invoice.date} setDate={(d) => handleFieldChange('date', d)} />
                    </Field>
                    <Field label="Due Date" htmlFor="dueDate">
                        <DatePicker date={invoice.dueDate} setDate={(d) => handleFieldChange('dueDate', d)} />
                    </Field>
                </div>
            </SectionCard>

            <SectionCard title="Items" id="items">
                <div className="space-y-4">
                    {invoice.items.length > 0 && (
                         <div className="grid grid-cols-12 gap-2 items-end p-2 rounded-lg -mx-2">
                            <div className="col-span-12 md:col-span-5 px-2">
                                <Label className="text-xs font-bold uppercase text-muted-foreground">Description</Label>
                            </div>
                             <div className="col-span-4 md:col-span-2 px-2">
                                <Label className="text-xs font-bold uppercase text-muted-foreground">Qty</Label>
                            </div>
                             <div className="col-span-4 md:col-span-2 px-2">
                                <Label className="text-xs font-bold uppercase text-muted-foreground">Rate</Label>
                            </div>
                            <div className="col-span-3 md:col-span-2 text-right px-2">
                               <Label className="text-xs font-bold uppercase text-muted-foreground">Total</Label>
                            </div>
                            <div className="col-span-1"></div>
                        </div>
                    )}
                    {invoice.items.map((item, index) => (
                        <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                            <div className="col-span-12 md:col-span-5">
                                <Input id={`item-desc-${index}`} placeholder="Item name or description" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} />
                            </div>
                             <div className="col-span-4 md:col-span-2">
                                <Input id={`item-qty-${index}`} type="number" placeholder="1" value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)} />
                            </div>
                             <div className="col-span-4 md:col-span-2">
                                <Input id={`item-rate-${index}`} type="number" placeholder="0.00" value={item.rate} onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)} />
                            </div>
                            <div className="col-span-3 md:col-span-2 text-right">
                               <p className="font-semibold h-10 flex items-center justify-end pr-3">{formatCurrency((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0))}</p>
                            </div>
                            <div className="col-span-1 flex items-center justify-center">
                                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button onClick={addItem} variant="outline" className="mt-2"><PlusCircle className="mr-2 h-4 w-4" /> Add Item</Button>
                </div>
            </SectionCard>

            <SectionCard title="Totals & Notes" id="totals-notes">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <Field label="Notes" htmlFor="notes">
                            <Textarea id="notes" placeholder="Any additional notes..." value={invoice.notes} onChange={(e) => handleFieldChange('notes', e.target.value)} rows={3}/>
                        </Field>
                        <Field label="Terms & Conditions" htmlFor="terms">
                            <Textarea id="terms" placeholder="Payment terms, policies, etc." value={invoice.terms} onChange={(e) => handleFieldChange('terms', e.target.value)} rows={3}/>
                        </Field>
                    </div>
                    <div className="space-y-4 bg-muted/30 dark:bg-muted/20 p-6 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="font-semibold">{formatCurrency(calculatedTotals.subtotal)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Label>Discount</Label>
                                <Select value={invoice.discountType} onValueChange={(v) => handleFieldChange('discountType', v)}>
                                    <SelectTrigger className="w-[80px] h-8 text-xs">
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="percentage">%</SelectItem>
                                        <SelectItem value="fixed">$</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input type="number" value={invoice.discountValue} onChange={(e) => handleFieldChange('discountValue', e.target.value)} className="w-24 h-8 text-right" />
                                <span className="text-muted-foreground text-sm w-24 text-right">(-{formatCurrency(calculatedTotals.discountAmount)})</span>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                           <div className="flex items-center gap-2">
                                <Label>Tax</Label>
                                 <Select value={invoice.taxType} onValueChange={(v) => handleFieldChange('taxType', v)}>
                                    <SelectTrigger className="w-[80px] h-8 text-xs">
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="percentage">%</SelectItem>
                                        <SelectItem value="fixed">$</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input type="number" value={invoice.taxValue} onChange={(e) => handleFieldChange('taxValue', e.target.value)} className="w-24 h-8 text-right" />
                                 <span className="text-muted-foreground text-sm w-24 text-right">(+{formatCurrency(calculatedTotals.taxAmount)})</span>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center font-bold text-lg text-primary">
                            <span>Total</span>
                            <span>{formatCurrency(calculatedTotals.total)}</span>
                        </div>
                    </div>
                </div>
            </SectionCard>
        </div>
    </div>
  );
}
