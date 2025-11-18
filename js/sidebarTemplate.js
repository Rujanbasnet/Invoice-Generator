// Centralized Sidebar Template - Single Source of Truth
// This function generates the sidebar HTML to prevent duplication across 7 files

function getSidebarHTML(activePage) {
  return `
    <aside id="main-sidebar" data-active-nav="${activePage}" class="transition-all duration-300" aria-label="Sidebar">
      <div data-sidebar-root class="sidebar-container flex flex-col h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300">
        <!-- Header -->
        <div class="px-6 py-5 border-b border-gray-100">
          <a href="dashboard.html" class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">IP</div>
            <div class="sidebar-text flex flex-col">
              <span class="text-xl font-bold text-gray-900">Invoice<span class="text-indigo-600">Pro</span></span>
              <span class="text-xs text-gray-500 uppercase tracking-wide">Dashboard</span>
            </div>
          </a>
        </div>
        
        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto" aria-label="Primary navigation">
          <a href="dashboard.html" data-nav="dashboard" class="sidebar-link group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-indigo-50 hover:text-indigo-700">
            <span class="text-xl">🏠</span>
            <span class="sidebar-text transition-transform duration-200 group-hover:translate-x-0.5">Dashboard</span>
          </a>
          <a href="create-invoice.html" data-nav="create-invoice" class="sidebar-link group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-indigo-50 hover:text-indigo-700">
            <span class="text-xl">🧾</span>
            <span class="sidebar-text transition-transform duration-200 group-hover:translate-x-0.5">Create Invoice</span>
          </a>
          <a href="invoices.html" data-nav="invoices" class="sidebar-link group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-indigo-50 hover:text-indigo-700">
            <span class="text-xl">💼</span>
            <span class="sidebar-text transition-transform duration-200 group-hover:translate-x-0.5">Invoices</span>
          </a>
          <a href="clients.html" data-nav="clients" class="sidebar-link group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-indigo-50 hover:text-indigo-700">
            <span class="text-xl">👤</span>
            <span class="sidebar-text transition-transform duration-200 group-hover:translate-x-0.5">Clients</span>
          </a>
          <a href="reports.html" data-nav="reports" class="sidebar-link group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-indigo-50 hover:text-indigo-700">
            <span class="text-xl">📊</span>
            <span class="sidebar-text transition-transform duration-200 group-hover:translate-x-0.5">Reports</span>
          </a>
          <a href="settings.html" data-nav="settings" class="sidebar-link group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-indigo-50 hover:text-indigo-700">
            <span class="text-xl">⚙️</span>
            <span class="sidebar-text transition-transform duration-200 group-hover:translate-x-0.5">Settings</span>
          </a>
        </nav>
        
        <!-- Footer with Logout -->
        <div class="p-4 border-t border-gray-100">
          <button id="logout-button" class="logout-button w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
            <span class="text-lg">↪</span>
            <span class="sidebar-text font-medium">Logout</span>
          </button>
        </div>
        
        <!-- Minimize Toggle Button -->
        <button id="sidebar-toggle" class="absolute -right-3 bottom-8 w-6 h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-md z-10" title="Toggle Sidebar">
          <svg class="w-3 h-3 transition-transform duration-300" id="toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
      </div>
      
      <style>
        .sidebar-container { width: 16rem; position: relative; }
        .sidebar-container.collapsed { width: 5rem; }
        .sidebar-container.collapsed .sidebar-text { opacity: 0; width: 0; overflow: hidden; }
        .sidebar-container.collapsed .sidebar-link { justify-content: center; }
        .sidebar-container.collapsed #toggle-icon { transform: rotate(180deg); }
        .sidebar-link.bg-indigo-50 { background-color: rgb(238 242 255); color: rgb(67 56 202); font-weight: 600; }
      </style>
    </aside>
  `;
}

// Synchronous sidebar injection to prevent flicker
function injectSidebar(activePage) {
  document.write(getSidebarHTML(activePage));
}
