/**
 * Client Modal Manager
 * Handles the "Add Client" modal functionality across pages.
 */
const ClientModal = {
    html: `
    <div id="clientModal" class="fixed inset-0 z-50 hidden">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onclick="ClientModal.close()"></div>
        
        <!-- Modal -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-100 transform transition-all scale-100">
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-slate-800">Add New Client</h3>
                    <button onclick="ClientModal.close()" class="text-slate-400 hover:text-slate-600">
                        <i class="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>
                
                <form id="addClientForm" onsubmit="ClientModal.save(event)" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                        <input type="text" name="name" required class="modern-input" placeholder="e.g. Acme Corp" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input type="email" name="email" required class="modern-input" placeholder="contact@acme.com" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                        <input type="tel" name="phone" class="modern-input" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Address</label>
                        <textarea name="address" rows="3" class="modern-input" placeholder="123 Business Rd, Tech City"></textarea>
                    </div>
                    
                    <div class="pt-4 flex gap-3">
                        <button type="button" onclick="ClientModal.close()" class="flex-1 secondary-action justify-center">Cancel</button>
                        <button type="submit" class="flex-1 primary-action justify-center bg-emerald-600 hover:bg-emerald-700 text-white">Save Client</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `,

    init: function () {
        if (!document.getElementById('clientModal')) {
            document.body.insertAdjacentHTML('beforeend', this.html);
        }
    },

    open: function (callback) {
        this.init();
        document.getElementById('clientModal').classList.remove('hidden');
        this.onSave = callback;
    },

    close: function () {
        const modal = document.getElementById('clientModal');
        if (modal) modal.classList.add('hidden');
        document.getElementById('addClientForm').reset();
    },

    save: function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const client = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address')
        };

        DataManager.addClient(client);

        if (this.onSave) {
            this.onSave(client);
        } else {
            window.location.reload();
        }

        this.close();
    }
};
