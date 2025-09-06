# InvoiceFlow - Modern Invoice Generator

InvoiceFlow is a powerful, client-side invoice generator built with Next.js and ShadCN UI. It empowers freelancers and small businesses to quickly create, customize, and download professional invoices directly in the browser. All data is processed and stored locally, ensuring your financial information remains private and secure.

## ✨ Key Features

*   **🎨 Multiple Professional Templates**: Choose from a variety of templates to match your brand's style, including Business, Classic, Modern, Creative, Formal, and Minimal.
*   **✏️ Real-Time Preview**: See your invoice update instantly as you type.
*   **⚙️ Fully Customizable**: Edit all fields, from your company details and client information to invoice numbers and payment terms.
*   **💸 Flexible Calculations**: Easily add discounts and taxes, with options for both fixed amounts and percentages.
*   **🌍 Global Currency Support**: Select from a comprehensive list of world currencies with proper formatting.
*   **💾 Save & Load Progress**: Your work is automatically saved to your browser's local storage. You can close the tab and return later to continue where you left off.
*   **📄 PDF & Print**: Download a high-quality PDF of your invoice or print it directly from the browser.
*   **🌓 Light & Dark Mode**: Switch between light and dark themes for comfortable viewing in any environment.
*   **📱 Fully Responsive**: Create and manage invoices seamlessly on both desktop and mobile devices.

## 🚀 How to Use

1.  **Fill in Your Details**: Start by entering your company's information in the "From" section and your client's information in the "To" section. You can also upload your company logo.
2.  **Add Invoice Details**: Set the invoice number, purchase order (PO) number, issue date, and due date.
3.  **Enter Payment Information**: Provide your bank details for payment instructions.
4.  **List Line Items**: Add each product or service as a line item. Specify the description, quantity, and rate for each. The total will be calculated automatically.
5.  **Calculate Totals**: Adjust the subtotal with any applicable discounts or taxes.
6.  **Add Notes & Terms**: Include any additional notes for the client or specify your payment terms and conditions.
7.  **Customize the Look**:
    *   Use the **Currency** dropdown to select the appropriate currency for the invoice.
    *   Click the **Template** buttons to instantly switch between different invoice designs and find the one that best suits your needs.
8.  **Finalize Your Invoice**:
    *   Click **Download** to save a PDF copy.
    *   Click **Print** to open the browser's print dialog.
    *   Use **Save** and **Load** to manually manage your progress in local storage.
    *   Click **Reset** to clear the form and start over.

## 広告の配置 (Ad Placement)

This application is set up with placeholder ad containers to simulate monetization with services like Google AdSense. The ad containers are located in the following files:

*   **Header and Footer Ads**: `src/app/page.tsx`
*   **In-Form Ad**: `src/components/invoice-form.tsx`

These components can be modified to include your ad provider's code snippets.
