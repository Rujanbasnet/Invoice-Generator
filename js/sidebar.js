(function () {
  const PLACEHOLDER_ID = 'main-sidebar';
  const HIGHLIGHT_CLASSES = ['bg-indigo-50', 'text-indigo-700', 'font-semibold'];

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

  function attachLogoutHandlers() {
    const buttons = document.querySelectorAll('.logout-button');
    buttons.forEach((button) => {
      if (!button.dataset.logoutBound) {
        button.addEventListener('click', handleLogout);
        button.dataset.logoutBound = 'true';
      }
    });
  }

  function highlightActiveLink(navKey) {
    const links = document.querySelectorAll('[data-nav]');
    links.forEach((link) => {
      HIGHLIGHT_CLASSES.forEach((cls) => link.classList.remove(cls));
      link.removeAttribute('aria-current');
    });

    const activeLink = document.querySelector(`[data-nav="${navKey}"]`) || document.querySelector(`a[href$="${navKey}.html"]`);
    if (!activeLink) {
      return;
    }

    HIGHLIGHT_CLASSES.forEach((cls) => activeLink.classList.add(cls));
    activeLink.setAttribute('aria-current', 'page');
    activeLink.classList.remove('hover:bg-gray-100');
  }

  function initSidebarToggle() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('[data-sidebar-root]');
    
    if (toggleBtn && sidebar) {
      // Load saved state
      const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
      if (isCollapsed) {
        sidebar.classList.add('collapsed');
      }
      
      toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        const collapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', collapsed);
      });
    }
  }

  function initSidebar() {
    const placeholder = document.getElementById(PLACEHOLDER_ID);
    if (!placeholder) {
      return;
    }

    const navKey = getNavKey();
    highlightActiveLink(navKey);
    attachLogoutHandlers();
    initSidebarToggle();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar, { once: true });
  } else {
    initSidebar();
  }
})();
