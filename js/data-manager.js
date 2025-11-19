/**
 * Data Manager for InvoicePro
 * Handles persistence using localStorage
 */

const DataManager = {
    // --- DEFAULTS ---
    defaults: {
        clients: [
            { id: 'c1', name: 'Acme Corp', email: 'billing@acme.com', phone: '555-0101', address: '123 Tech Blvd, Silicon Valley, CA' },
            { id: 'c2', name: 'Blue Ocean LLC', email: 'accounts@blueocean.com', phone: '555-0102', address: '456 Sea View, Miami, FL' },
            { id: 'c3', name: 'Skyline Builders', email: 'finance@skyline.com', phone: '555-0103', address: '789 High Rise, New York, NY' }
        ],
        invoices: [
            { id: 'INV-00128', clientId: 'c1', clientName: 'Acme Corp', date: '2025-10-12', dueDate: '2025-11-12', amount: 540.00, status: 'Paid', items: [] },
            { id: 'INV-00127', clientId: 'c2', clientName: 'Blue Ocean LLC', date: '2025-10-10', dueDate: '2025-11-10', amount: 1240.00, status: 'Pending', items: [] },
            { id: 'INV-00126', clientId: 'c3', clientName: 'Skyline Builders', date: '2025-10-08', dueDate: '2025-11-08', amount: 820.00, status: 'Overdue', items: [] }
        ]
    },

    // --- INITIALIZATION ---
    init() {
        if (!localStorage.getItem('invoicepro_clients')) {
            localStorage.setItem('invoicepro_clients', JSON.stringify(this.defaults.clients));
        }
        if (!localStorage.getItem('invoicepro_invoices')) {
            localStorage.setItem('invoicepro_invoices', JSON.stringify(this.defaults.invoices));
        }
    },

    // --- CLIENTS ---
    getClients() {
        return JSON.parse(localStorage.getItem('invoicepro_clients') || '[]');
    },

    addClient(client) {
        const clients = this.getClients();
        client.id = 'c' + Date.now();
        clients.push(client);
        localStorage.setItem('invoicepro_clients', JSON.stringify(clients));
        return client;
    },

    // --- INVOICES ---
    getInvoices() {
        return JSON.parse(localStorage.getItem('invoicepro_invoices') || '[]');
    },

    saveInvoice(invoice) {
        const invoices = this.getInvoices();
        const existingIndex = invoices.findIndex(i => i.id === invoice.id);

        if (existingIndex >= 0) {
            invoices[existingIndex] = invoice;
        } else {
            invoices.unshift(invoice); // Add to top
        }

        localStorage.setItem('invoicepro_invoices', JSON.stringify(invoices));
    },

    getInvoiceById(id) {
        return this.getInvoices().find(i => i.id === id);
    },

    // --- UTILS ---
    formatMoney(amount) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    },

    generateId() {
        return 'INV-' + Math.floor(10000 + Math.random() * 90000);
    }
};

// Initialize on load
DataManager.init();
