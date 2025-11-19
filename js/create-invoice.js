/**
 * Create Invoice Logic - Professional Edition
 * Handles Live Preview, Logo Upload, and Split-Screen interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENTS ---
    const inputs = {
        id: document.getElementById('invoiceId'),
        issueDate: document.getElementById('issueDate'),
        dueDate: document.getElementById('dueDate'),
        client: document.getElementById('clientSelect'),
        notes: document.getElementById('invoiceNotes'),
        logo: document.getElementById('logoInput'),
        discount: document.getElementById('invoiceDiscount'),
        tax: document.getElementById('invoiceTax')
    };

    const preview = {
        id: document.getElementById('previewId'),
        date: document.getElementById('previewDate'),
        dueDate: document.getElementById('previewDueDate'),
        client: document.getElementById('previewClient'),
        notes: document.getElementById('previewNotes'),
        logoBox: document.getElementById('previewLogo'),
        logoImg: document.querySelector('#previewLogo img'),
        items: document.getElementById('previewItemsBody'),
        subtotal: document.getElementById('previewSubtotal'),
        discount: document.getElementById('previewDiscount'),
        tax: document.getElementById('previewTax'),
        total: document.getElementById('previewTotal')
    };

    const editorItemsList = document.getElementById('editorItemsList');

    // --- STATE ---
    let lineItems = [];
    const clients = DataManager.getClients();

    // --- INIT ---
    const defaultId = DataManager.generateId();
    inputs.id.value = defaultId;

    // Auto-clear default ID on focus
    inputs.id.addEventListener('focus', () => {
        if (inputs.id.value === defaultId) {
            inputs.id.value = '';
        }
    });

    // Date Logic: Issue = Today, Due = Today + 14 days
    const today = new Date();
    const twoWeeks = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    inputs.issueDate.valueAsDate = today;
    inputs.dueDate.valueAsDate = twoWeeks;

    // Populate Clients
    clients.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.name;
        inputs.client.appendChild(opt);
    });

    // Initial Render
    updatePreview();

    // --- EVENT LISTENERS ---

    // Inputs -> Preview Updates
    inputs.id.addEventListener('input', updatePreview);
    inputs.issueDate.addEventListener('change', updatePreview);
    inputs.dueDate.addEventListener('change', updatePreview);
    inputs.discount.addEventListener('input', updatePreview);
    inputs.tax.addEventListener('input', updatePreview);

    // Notes Sync
    inputs.notes.addEventListener('input', (e) => {
        preview.notes.textContent = e.target.value || 'Thank you for your business!';
    });

    // Client Selection
    inputs.client.addEventListener('change', (e) => {
        if (e.target.value === 'new') {
            // Open Modal
            ClientModal.open((newClient) => {
                // Add to dropdown and select
                const opt = document.createElement('option');
                opt.value = newClient.id;
                opt.textContent = newClient.name;
                // Insert before "+ Add New"
                inputs.client.insertBefore(opt, inputs.client.lastElementChild);
                inputs.client.value = newClient.id;

                // Update local clients array so find() works
                clients.push(newClient);

                updatePreview();
            });
            // Reset select if they cancel modal (handled in modal close but safety here)
            inputs.client.value = "";
        } else {
            updatePreview();
        }
    });

    // Logo Upload
    inputs.logo.addEventListener('change', handleLogoUpload);

    // Add Item
    document.getElementById('addItemBtn').addEventListener('click', addItem);

    // Dynamic Row Total Calculation
    const qtyInput = document.getElementById('newItemQty');
    const priceInput = document.getElementById('newItemPrice');
    const totalInput = document.getElementById('newItemTotal');

    function updateRowTotal() {
        const qty = parseFloat(qtyInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        totalInput.value = DataManager.formatMoney(qty * price);
    }

    qtyInput.addEventListener('input', updateRowTotal);
    priceInput.addEventListener('input', updateRowTotal);

    // Send
    document.getElementById('sendInvoiceBtn').addEventListener('click', saveAndSend);

    // Download
    document.getElementById('downloadBtn').addEventListener('click', () => {
        window.print();
    });

    // --- FUNCTIONS ---

    function updatePreview() {
        // Meta
        preview.id.textContent = inputs.id.value;
        preview.date.textContent = inputs.issueDate.value;
        preview.dueDate.textContent = inputs.dueDate.value;
        preview.notes.textContent = inputs.notes.value || 'Thank you for your business!';

        // Client
        const clientId = inputs.client.value;
        const client = clients.find(c => c.id === clientId);

        if (client) {
            preview.client.innerHTML = `
        <p class="font-bold text-slate-900 text-lg">${client.name}</p>
        <p class="text-slate-500 text-sm">${client.email}</p>
        <p class="text-slate-500 text-sm">${client.address || ''}</p>
        <p class="text-slate-500 text-sm">${client.phone || ''}</p>
      `;
        } else {
            preview.client.innerHTML = `<p class="text-slate-400 italic">Select a client...</p>`;
        }

        // Items & Totals
        renderItems();
    }

    function handleLogoUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Update Preview
                preview.logoImg.src = e.target.result;
                preview.logoBox.classList.remove('hidden');

                // Update Editor Box
                const editorBox = document.getElementById('logoPreviewBox');
                editorBox.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover" />`;
                editorBox.classList.remove('border-dashed', 'text-slate-400');
            };
            reader.readAsDataURL(file);
        }
    }

    function addItem() {
        const descInput = document.getElementById('newItemDesc');
        const qtyInput = document.getElementById('newItemQty');
        const priceInput = document.getElementById('newItemPrice');

        const desc = descInput.value.trim();
        const qty = parseFloat(qtyInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;

        if (!desc) {
            alert('Please enter an item description.');
            return;
        }

        lineItems.push({ id: Date.now(), desc, qty, price });

        // Reset
        descInput.value = '';
        qtyInput.value = '1';
        priceInput.value = '';
        document.getElementById('newItemTotal').value = '$0.00';
        descInput.focus();

        updatePreview();
    }

    function removeItem(id) {
        lineItems = lineItems.filter(item => item.id !== id);
        updatePreview();
    }

    function renderItems() {
        // 1. Render Preview Table
        preview.items.innerHTML = '';
        let subtotal = 0;

        lineItems.forEach(item => {
            const total = item.qty * item.price;
            subtotal += total;

            const tr = document.createElement('tr');
            tr.className = 'border-b border-slate-100 last:border-0';
            tr.innerHTML = `
        <td class="py-4 text-slate-800 font-medium">${item.desc}</td>
        <td class="text-center py-4 text-slate-600">${item.qty}</td>
        <td class="text-right py-4 text-slate-600">${DataManager.formatMoney(item.price)}</td>
        <td class="text-right py-4 font-bold text-slate-900">${DataManager.formatMoney(total)}</td>
      `;
            preview.items.appendChild(tr);
        });

        // 2. Render Editor List (Mini View)
        editorItemsList.innerHTML = '';
        lineItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'grid grid-cols-12 gap-3 items-center p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm';
            div.innerHTML = `
            <div class="col-span-6 font-medium text-slate-800 truncate" title="${item.desc}">${item.desc}</div>
            <div class="col-span-2 text-center text-slate-600">${item.qty}</div>
            <div class="col-span-2 text-right text-slate-600">${DataManager.formatMoney(item.price)}</div>
            <div class="col-span-2 flex justify-end gap-2">
                 <span class="font-medium text-slate-900">${DataManager.formatMoney(item.qty * item.price)}</span>
                 <button class="text-slate-400 hover:text-rose-500 ml-2" onclick="removeItem(${item.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
            // Attach listener manually
            const btn = div.querySelector('button');
            btn.onclick = () => removeItem(item.id);

            editorItemsList.appendChild(div);
        });

        // 3. Calculate Totals
        const discountRate = parseFloat(inputs.discount.value) || 0;
        const taxRate = parseFloat(inputs.tax.value) || 0;

        const discountAmount = subtotal * (discountRate / 100);
        const taxableAmount = subtotal - discountAmount;
        const taxAmount = taxableAmount * (taxRate / 100);
        const total = taxableAmount + taxAmount;

        preview.subtotal.textContent = DataManager.formatMoney(subtotal);

        if (discountRate > 0) {
            preview.discount.parentElement.classList.remove('hidden');
            preview.discount.textContent = '-' + DataManager.formatMoney(discountAmount);
        } else {
            preview.discount.parentElement.classList.add('hidden');
        }

        if (taxRate > 0) {
            preview.tax.parentElement.classList.remove('hidden');
            preview.tax.textContent = DataManager.formatMoney(taxAmount) + ` (${taxRate}%)`;
        } else {
            preview.tax.parentElement.classList.add('hidden');
        }

        preview.total.textContent = DataManager.formatMoney(total);
    }

    function saveAndSend() {
        const clientId = inputs.client.value;
        if (!clientId || clientId === 'new') {
            alert('Please select a client.');
            return;
        }
        if (lineItems.length === 0) {
            alert('Please add at least one item.');
            return;
        }

        const client = clients.find(c => c.id === clientId);
        const isRecurring = document.getElementById('recurringToggle').checked;

        // Recalculate final amounts
        const subtotal = lineItems.reduce((acc, item) => acc + (item.qty * item.price), 0);
        const discountRate = parseFloat(inputs.discount.value) || 0;
        const taxRate = parseFloat(inputs.tax.value) || 0;
        const discountAmount = subtotal * (discountRate / 100);
        const taxableAmount = subtotal - discountAmount;
        const taxAmount = taxableAmount * (taxRate / 100);
        const total = taxableAmount + taxAmount;

        const invoice = {
            id: inputs.id.value,
            clientId: clientId,
            clientName: client.name,
            date: inputs.issueDate.value,
            dueDate: inputs.dueDate.value,
            amount: total,
            status: 'Pending',
            items: lineItems,
            isRecurring: isRecurring,
            notes: inputs.notes.value
        };

        DataManager.saveInvoice(invoice);

        const btn = document.getElementById('sendInvoiceBtn');
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
        btn.disabled = true;

        setTimeout(() => {
            alert('Invoice sent successfully!');
            window.location.href = 'invoices.html';
        }, 1500);
    }
});
