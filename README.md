# Prompt for Building InvoiceFlow

This document contains a detailed, structured prompt that breaks down the creation of the InvoiceFlow application into specific, actionable steps. This prompt is designed to guide an AI code generator in building the entire application from the ground up, specifying components, state management, styling, and functionality in great detail.

### **Super Detailed Prompt for Building InvoiceFlow**

**Project Goal:** Create "InvoiceFlow," a feature-rich, client-side invoice generator. The application will be built with a modern tech stack and will prioritize a professional, minimalist UI/UX, full responsiveness, and robust client-side functionality.

**Tech Stack:**
*   **Framework:** Next.js 15+ with App Router
*   **Language:** TypeScript
*   **UI Components:** ShadCN/UI
*   **Styling:** Tailwind CSS
*   **Icons:** `lucide-react`
*   **Client-side PDF Generation:** `jspdf`, `html2canvas`

---

### **Phase 1: Core Data Structure and State Management**

**1.1. Define Invoice Data Types (`src/types/invoice.ts`)**
*   Create an `InvoiceItem` interface with `id: string`, `description: string`, `quantity: string`, `rate: string`.
*   Create a main `Invoice` interface that includes all fields for the invoice. Be specific with types:
    *   `template`: A string literal type for the different templates: `'classic' | 'modern' | 'creative' | 'formal' | 'minimal' | 'business'`.
    *   `logo`: `string | null`.
    *   `invoiceNumber`, `purchaseOrderNumber`, etc.: `string`.
    *   `date`, `dueDate`: `Date`.
    *   `items`: An array of `InvoiceItem[]`.
    *   `discountType`, `taxType`: A string literal type: `"percentage" | "fixed"`.
    *   `currency`: `string`.

**1.2. Implement the `useInvoice` Hook (`src/hooks/use-invoice.ts`)**
*   This hook will be the single source of truth for the invoice state.
*   **State:**
    *   Use `useState<Invoice>` to hold the invoice data.
    *   Initialize the state with an `getEmptyInvoice()` function to prevent hydration errors. The dates should be `new Date(0)` and items should be an empty array initially.
    *   Use a separate `useState<boolean>` for `isMounted` to track when the component has mounted on the client.
*   **Initialization (`useEffect`):**
    *   In a `useEffect` hook, set `isMounted` to `true`.
    *   Inside this hook, check `localStorage` for saved invoice data. If found, parse it, convert date strings back to `Date` objects, and set the invoice state.
    *   If no saved data is found, call a `getInitialInvoice()` function to populate the form with realistic default/placeholder data.
*   **Core Logic (use `useCallback` for all functions):**
    *   `updateInvoice(updates: Partial<Invoice>)`: A function to merge partial updates into the main invoice state.
    *   `handleFieldChange(field: keyof Invoice, value: any)`: A specific handler for top-level invoice fields.
    *   `handleItemChange(id: string, field: keyof InvoiceItem, value: string)`: Updates a specific field of a specific line item.
    *   `addItem()`: Adds a new, empty `InvoiceItem` to the `items` array with a unique `id` (use `crypto.randomUUID()`).
    *   `removeItem(id: string)`: Removes an item from the `items` array by its `id`.
*   **Calculations (`useMemo`):**
    *   Create a `calculatedTotals` object memoized with `useMemo`.
    *   This object should contain `subtotal`, `discountAmount`, `taxAmount`, and `total`.
    *   Implement the logic precisely:
        1.  `subtotal` = Sum of `(item.quantity * item.rate)`.
        2.  `discountAmount` = If `discountType` is 'percentage', calculate `subtotal * (discountValue / 100)`. Otherwise, use the fixed `discountValue`.
        3.  `taxAmount` = If `taxType` is 'percentage', calculate `(subtotal - discountAmount) * (taxValue / 100)`. Otherwise, use the fixed `taxValue`.
        4.  `total` = `subtotal - discountAmount + taxAmount`.
*   **Persistence & Actions (use `useCallback`):**
    *   `saveInvoice()`: Saves the current invoice state to `localStorage` as a JSON string.
    *   `loadInvoice()`: Loads and sets the state from `localStorage`.
    *   `resetInvoice()`: Clears `localStorage` and resets the state to the initial default data.
*   **Formatting (`useCallback`):**
    *   `formatCurrency(amount: number)`: Formats a number into a currency string using `Intl.NumberFormat`, based on the `invoice.currency` state.
*   **Return Value:** The hook must export the `invoice` state, all handler functions, `calculatedTotals`, `isMounted`, and `formatCurrency`. Define and export a `UseInvoiceReturn` type for its return value.

---

### **Phase 2: UI Components and Layout**

**2.1. Main Page Layout (`src/app/page.tsx`)**
*   **Structure:**
    *   Use a two-panel flex layout for the main content.
    *   The left panel will contain the `InvoiceForm` and be scrollable (`ScrollArea` from ShadCN).
    *   The right panel will contain the `InvoicePreview` and should have a muted background color.
*   **Header:**
    *   Create a `header` element with `sticky` positioning, a bottom border, and `bg-card` color.
    *   It should contain the app title "InvoiceFlow", an SVG logo, and a theme-toggle `Button` for light/dark mode.
    *   Implement a **mobile-only** `Sheet` trigger (`Menu` icon) that opens the `InvoiceForm` from the side on small screens.
*   **State Management:**
    *   Instantiate the `useInvoice` hook here.
    *   Manage the light/dark theme state with `useState` and `useEffect` to persist the setting in `localStorage`.
*   **Ad Containers:**
    *   Define a reusable `AdContainer` component.
    *   Place a "Leaderboard Ad" container in the form panel (visible on desktop).
    *   Place another "Footer Leaderboard Ad" below the invoice preview.
*   **Footer:**
    *   Create a `footer` element with `lucide-react` icons for Instagram, LinkedIn, GitHub, Codepen, and Email, linked to the provided URLs. Style them with `text-muted-foreground` and a `hover:text-primary` transition.

**2.2. Invoice Form (`src/components/invoice-form.tsx`)**
*   **Props:** The component should accept `UseInvoiceReturn` props and a `ref` to the invoice preview element.
*   **Structure:**
    *   Organize the form into sections using reusable `SectionCard` and `Field` components to ensure consistency.
    *   **Company & Client:** Use a two-column grid. Implement the logo uploader with `FileReader` to create a `dataURI` for the preview and update the state.
    *   **Line Items:**
        *   Map over `invoice.items`. For each item, render inputs for description, quantity, and rate.
        *   Display the calculated line total next to each item.
        *   Include a `Button` with a `Trash2` icon to remove the item.
        *   Place an "Add Item" `Button` below the list.
    *   **Totals & Notes:**
        *   Display the calculated `subtotal`, `discountAmount`, and `taxAmount` from `calculatedTotals`.
        *   Use ShadCN `Select` for discount/tax type toggles ('%' or '$').
        *   Display the final `Total` prominently.
        *   Provide `Textarea`s for notes and terms.
    *   **Settings:**
        *   Include a `Select` dropdown for `currency`, populated from a `currencies.ts` utility file.
        *   Add `Button`s for each invoice template, with the active template having the `default` variant and others having the `outline` variant. Use `lucide-react` icons on each button (`Building`, `Sparkles`, `Feather`, etc.).
    *   **Actions:**
        *   Place a final `Card` at the bottom containing all action buttons: Download, Print, Save, Load, and Reset. Use appropriate icons.
        *   Wrap the "Reset" button in an `AlertDialog` to confirm the action.
*   **Functionality:**
    *   **PDF Download:** Implement the `handleDownload` function using `html2canvas` to capture the `invoicePreviewRef` element, then use `jspdf` to create and save the PDF. Show `Toast` notifications for success and failure.

**2.3. Invoice Previews (e.g., `src/components/invoice-preview-business.tsx`)**
*   **Structure:** Create a separate component for each template (`-classic.tsx`, `-modern.tsx`, etc.).
*   **Props:** Each preview component should accept the `invoice` state and `calculatedTotals`.
*   **Styling:**
    *   Each component must be self-contained and styled to look distinct and professional.
    *   Use a white background (`bg-white text-black`) to ensure they are printable regardless of the app's theme. Add the `invoice-preview-print` class.
    *   Use `date-fns` to format dates.
    *   Use the `formatCurrency` function passed down through props to display all monetary values.
    *   Lay out the data logically, mirroring a real-world invoice. For the Business template, use a primary-colored header and a table for line items.

**2.4. Main Preview Component (`src/components/invoice-preview.tsx`)**
*   This component will act as a router.
*   It receives all invoice props, including the `template` field.
*   Use a `switch` statement on `props.template` to conditionally render the correct preview component (e.g., `InvoicePreviewBusiness`, `InvoicePreviewModern`, etc.), passing along all props and the `ref`.

---

### **Phase 3: AI and Final Touches**

**3.1. Genkit Flow for PDF Generation (`src/ai/flows/generate-pdf-and-fit-content.ts`)**
*   Define a Genkit flow named `generatePdfAndFitContentFlow`.
*   **Input Schema:** `GeneratePdfAndFitContentInputSchema` (using Zod) should expect a single string: `invoiceHtml`.
*   **Output Schema:** `GeneratePdfAndFitContentOutputSchema` (using Zod) should define two fields: `pdfDataUri: z.string()` and `isContentFitted: z.boolean()`.
*   **Implementation:**
    *   Since server-side PDF generation from HTML is complex, the flow will be a placeholder. It should define the `ai.definePrompt` but the main flow function will return a mock PDF data URI and `isContentFitted: true`. This sets up the architecture for a future, real implementation.
    *   Export the flow wrapper function and the input/output types.

**3.2. Configuration**
*   **`next.config.ts`:** Add `placehold.co` and `picsum.photos` to `images.remotePatterns`.
*   **`apphosting.yaml`:** Set a `maxInstances` value.
*   **`package.json`:** Ensure all dependencies like `genkit`, `jspdf`, `html2canvas`, and ShadCN packages are listed.
*   **`src/app/globals.css`:** Define the CSS variables for the color palette, including light and dark mode themes, and print styles (`@media print`).
