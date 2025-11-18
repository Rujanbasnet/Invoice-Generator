(function () {
  const SIDEBAR_URL = 'sidebar.html';
  const PLACEHOLDER_ID = 'main-sidebar';
  const HIGHLIGHT_CLASSES = ['bg-indigo-50', 'text-indigo-700', 'font-semibold'];

  const state = {
    loaded: false,
  };

  function getNavKey() {
    const placeholder = document.getElementById(PLACEHOLDER_ID);
    if (placeholder && placeholder.dataset.activeNav) {
      return placeholder.dataset.activeNav;
    }
    if (document.body && document.body.dataset && document.body.dataset.activeNav) {
      return document.body.dataset.activeNav;
    }
    const fileName = (window.location.pathname.split('/').pop() || '').toLowerCase();
    if (!fileName || fileName === 'index.html') {
      return 'dashboard';
    }
    return fileName.replace(/\.html?$/, '') || 'dashboard';
  }

  function handleLogout(event) {
    if (event) {
      event.preventDefault();
    }
    if (confirm('Are you sure you want to log out?')) {
      alert('Logging out...');
      window.location.href = 'login.html';
    }
  }

  function attachLogoutHandlers(root) {
    const buttons = new Set([
      ...root.querySelectorAll('.logout-button'),
      ...document.querySelectorAll('.logout-button'),
    ]);

    buttons.forEach((button) => {
      if (!button.dataset.logoutBound) {
        button.addEventListener('click', handleLogout);
        button.dataset.logoutBound = 'true';
      }
    });
  }

  function highlightActiveLink(root, navKey) {
    const links = root.querySelectorAll('[data-nav]');
    links.forEach((link) => {
      HIGHLIGHT_CLASSES.forEach((cls) => link.classList.remove(cls));
      link.removeAttribute('aria-current');
    });

    const activeLink = root.querySelector(`[data-nav="${navKey}"]`) || root.querySelector(`a[href$="${navKey}.html"]`);
    if (!activeLink) {
      return;
    }

    HIGHLIGHT_CLASSES.forEach((cls) => activeLink.classList.add(cls));
    activeLink.setAttribute('aria-current', 'page');
    activeLink.classList.remove('hover:bg-gray-100');
  }

  function buildFallbackMarkup() {
    return `
      <div data-sidebar-root class="flex flex-col h-screen bg-white border-r border-gray-200 shadow-sm">
        <div class="px-6 py-5 border-b border-gray-100">
          <a href="dashboard.html" class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">IP</div>
            <div class="flex flex-col">
              <span class="text-xl font-bold text-gray-900">Invoice<span class="text-indigo-600">Pro</span></span>
              <span class="text-xs text-gray-500 uppercase tracking-wide">Dashboard</span>
            </div>
          </a>
        </div>
        <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto" aria-label="Primary navigation">
          <a href="dashboard.html" data-nav="dashboard" class="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-indigo-50 hover:text-indigo-700">
            <span class="text-xl">🏠</span>
            <span class="transition-transform duration-200 group-hover:translate-x-0.5">Dashboard</span>
          </a>
          <a href="create-invoice.html" data-nav="create-invoice" class="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-indigo-50 hover:text-indigo-700">
            <span class="text-xl">🧾</span>
            <span class="transition-transform duration-200 group-hover:translate-x-0.5">Create Invoice</span>
          </a>
          <a href="invoices.html" data-nav="invoices" class="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-indigo-50 hover:text-indigo-700">
            <span class="text-xl">💼</span>
            <span class="transition-transform duration-200 group-hover:translate-x-0.5">Invoices</span>
          </a>
          <a href="clients.html" data-nav="clients" class="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-indigo-50 hover:text-indigo-700">
            <span class="text-xl">👤</span>
            <span class="transition-transform duration-200 group-hover:translate-x-0.5">Clients</span>
          </a>
          <a href="reports.html" data-nav="reports" class="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-indigo-50 hover:text-indigo-700">
            <span class="text-xl">📊</span>
            <span class="transition-transform duration-200 group-hover:translate-x-0.5">Reports</span>
          </a>
          <a href="settings.html" data-nav="settings" class="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-indigo-50 hover:text-indigo-700">
            <span class="text-xl">⚙️</span>
            <span class="transition-transform duration-200 group-hover:translate-x-0.5">Settings</span>
          </a>
        </nav>
        <div class="p-4 border-t border-gray-100">
          <button id="logout-button" class="logout-button w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
            <span class="text-lg">↪</span>
            <span class="font-medium">Logout</span>
          </button>
        </div>
      </div>
    `;
  }

  function finalizeSidebar(root, navKey) {
    highlightActiveLink(root, navKey);
    attachLogoutHandlers(root);
    state.loaded = true;

    const event = new CustomEvent('sidebar:loaded', {
      detail: {
        root,
        activeNav: navKey,
      },
    });
    document.dispatchEvent(event);
  }

  function injectSidebar(placeholder, html, navKey) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    const sidebarContent = template.content.querySelector('[data-sidebar-root]') || template.content.firstElementChild;

    placeholder.innerHTML = '';
    if (sidebarContent) {
      placeholder.appendChild(sidebarContent.cloneNode(true));
    } else {
      placeholder.innerHTML = html;
    }

    finalizeSidebar(placeholder, navKey);
  }

  function loadSidebar() {
    const placeholder = document.getElementById(PLACEHOLDER_ID);
    if (!placeholder) {
      return Promise.resolve(null);
    }

    const navKey = getNavKey();

    return fetch(SIDEBAR_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch sidebar: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        injectSidebar(placeholder, html, navKey);
        return placeholder;
      })
      .catch((error) => {
        console.error('Sidebar load failed:', error);
        placeholder.innerHTML = buildFallbackMarkup();
        finalizeSidebar(placeholder, navKey);
        return placeholder;
      });
  }

  if (document.getElementById(PLACEHOLDER_ID)) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadSidebar, { once: true });
    } else {
      loadSidebar();
    }
  }

  window.Sidebar = Object.freeze({
    loadSidebar,
    isLoaded: () => state.loaded,
  });
})();

