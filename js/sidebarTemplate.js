function getSidebarHTML(activePage) {
  // Helper to check active state
  const isActive = (page) => activePage === page ? 'active' : '';

  return `
    <aside id="main-sidebar" data-sidebar-root class="w-64 h-screen sticky top-0 z-30 flex-shrink-0 transition-all duration-300 bg-slate-900">
      <div class="sidebar-container flex flex-col h-full">
        
        <!-- Header / Logo -->
        <div class="px-6 py-6 flex items-center justify-between">
          <a href="dashboard.html" class="flex items-center gap-3 group sidebar-logo">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-bolt text-white text-lg"></i>
            </div>
            <div class="sidebar-text">
              <h1 class="text-xl font-bold text-white tracking-tight">Invoice<span class="text-emerald-400">Pro</span></h1>
              <p class="text-xs text-slate-500">AI Edition</p>
            </div>
          </a>
          <button id="sidebar-toggle" class="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5" title="Toggle Sidebar">
            <i class="fa-solid fa-bars text-lg"></i>
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-1">
          <p class="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 sidebar-text">Menu</p>
          
          <a href="dashboard.html" class="sidebar-link ${isActive('dashboard')} flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium" title="Dashboard">
            <i class="fa-solid fa-chart-pie"></i>
            <span class="sidebar-text">Dashboard</span>
          </a>
          
          <a href="invoices.html" class="sidebar-link ${isActive('invoices')} flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium" title="Invoices">
            <i class="fa-solid fa-file-invoice"></i>
            <span class="sidebar-text">Invoices</span>
          </a>
          
          <a href="clients.html" class="sidebar-link ${isActive('clients')} flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium" title="Clients">
            <i class="fa-solid fa-users"></i>
            <span class="sidebar-text">Clients</span>
          </a>

          <div class="pt-6 pb-2 sidebar-text">
            <p class="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tools</p>
          </div>

          <a href="create-invoice.html" class="sidebar-link ${isActive('create-invoice')} flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium" title="Create Invoice">
            <i class="fa-solid fa-plus-circle"></i>
            <span class="sidebar-text">Create Invoice</span>
          </a>

          <a href="reports.html" class="sidebar-link ${isActive('reports')} flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium" title="AI Insights">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            <span class="sidebar-text">AI Insights <span class="ml-auto text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">NEW</span></span>
          </a>
        </nav>

        <!-- Footer / Logout -->
        <div class="p-4 border-t border-slate-800">
          <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors" title="Logout">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <span class="sidebar-text">Logout</span>
          </a>
        </div>

      </div>
    </aside>
  `;
}

function injectSidebar(activePage) {
  document.write(getSidebarHTML(activePage));
}
