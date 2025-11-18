# InvoicePro - Invoice Management Application

## Overview
InvoicePro is a modern, client-side invoice management application built with vanilla JavaScript, HTML, and CSS. It provides a comprehensive solution for creating, managing, and tracking invoices with a clean, professional interface.

**Current State**: Fully functional static web application running on Node.js HTTP server, deployed on Replit.

## Project Architecture

### Technology Stack
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **UI Framework**: Tailwind CSS (CDN)
- **Icons**: Font Awesome 6.4.2
- **Server**: Node.js HTTP server (for serving static files)
- **Data Storage**: LocalStorage (client-side persistence)
- **Port**: 5000 (frontend server)

### Project Structure
```
/
├── index.html              # Landing page (redirects to dashboard)
├── dashboard.html          # Main dashboard view
├── create-invoice.html     # Invoice creation form
├── invoices.html           # Invoice list view
├── clients.html            # Client management
├── reports.html            # Reporting interface
├── settings.html           # Application settings
├── login.html              # Login page
├── server.js               # Node.js static file server
├── package.json            # Node.js configuration
├── css/
│   └── modern-ui.css       # Custom UI styles
├── js/
│   ├── authStore.js        # Centralized auth state management
│   ├── dataStore.js        # Centralized data storage (invoices, clients, etc.)
│   ├── sidebar.js          # Sidebar functionality (highlighting, toggle)
│   └── sidebarTemplate.js  # Centralized sidebar HTML template
└── scripts/
    └── push_updates.sh     # Git deployment helper
```

## Features

### Core Functionality
1. **Invoice Management**
   - Create, edit, and delete invoices
   - Multiple invoice statuses (draft, pending, paid, overdue)
   - Invoice numbering system
   - Line items with quantity, rate, and tax calculations

2. **Client Management**
   - Add and manage client information
   - Client portal access
   - Client authentication system

3. **Dashboard**
   - Summary cards showing total invoices, pending, paid, and overdue
   - Recent invoices list with filtering
   - Quick search functionality

4. **Payment Integration**
   - Stripe payment gateway support
   - PayPal payment gateway support
   - Payment tracking and status updates

5. **Additional Features**
   - PDF generation for invoices
   - Email notifications
   - Automated reminders
   - Reports and analytics
   - User settings management

### Data Persistence
All data is stored locally in the browser's LocalStorage, making this a fully client-side application with no backend database required.

## Development Setup

### Running Locally
The application is configured to run automatically in Replit. The workflow "InvoicePro Server" starts the Node.js server on port 5000.

To manually start the server:
```bash
npm start
```

### Server Configuration
- **Host**: 0.0.0.0 (allows connections from Replit proxy)
- **Port**: 5000 (required for Replit webview)
- **Cache Headers**: Disabled to prevent stale content in iframe

## Deployment

### Current Deployment
The application is set up to run on Replit with:
- Workflow configured for automatic server startup
- Port 5000 exposed for web preview
- Static file serving with proper MIME types

### Future Backend Integration
The codebase includes references to backend API endpoints:
- `/api/payments/*` - Payment processing
- `/api/auth/*` - Authentication
- `/api/automation/*` - Automation tasks

These endpoints would need to be implemented if server-side functionality is required.

## Recent Changes (November 18, 2025)

### Initial Setup
- ✅ Added Node.js HTTP server for serving static files
- ✅ Configured Replit workflow for automatic server startup
- ✅ Set up proper cache control headers to prevent iframe caching issues
- ✅ Created package.json for Node.js dependencies
- ✅ Added .gitignore for Node.js artifacts
- ✅ Configured deployment settings for static hosting

### Code Quality Cleanup & Refactoring
- ✅ **Centralized Sidebar Template**: Created js/sidebarTemplate.js to eliminate 7 duplicate sidebar HTML blocks across all pages, reducing maintenance burden and preventing drift
- ✅ **Removed Dead Code**: Deleted 13 unused files (9 JS modules + 4 legacy root scripts) that were never loaded, reducing codebase footprint by ~45KB
- ✅ **Fixed Branding Inconsistencies**: Updated login.html from InvoiceGen to InvoicePro, converted dark theme to light theme matching rest of app
- ✅ **Consolidated Auth State**: Created js/authStore.js to centralize authentication state management (isLoggedIn, currentUser) instead of scattered localStorage calls
- ✅ **Organized Data Management**: Maintained clear separation of concerns - DataStore for business data, AuthStore for auth state, UI state kept in respective modules
- ✅ **Code Consistency**: Added header comments to all JS modules, ensured consistent code style and documentation across remaining 4 JavaScript files

## User Preferences
None set yet.

## Known Limitations
1. **Client-Side Only**: All data is stored in LocalStorage and will be lost if browser data is cleared
2. **No Backend**: Payment processing and email features require backend implementation
3. **Single User**: No multi-user support or real authentication
4. **Browser Dependent**: Data is tied to specific browser/device

## Future Enhancements
- Backend API implementation for persistent data storage
- PostgreSQL database integration for multi-user support
- Real authentication and authorization
- Email service integration
- Automated backup system
- Multi-currency support
- Invoice templates
