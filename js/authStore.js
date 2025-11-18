/**
 * AuthStore - Centralized authentication state management
 * Handles user session persistence using localStorage
 */
class AuthStore {
    constructor() {
        this.storageKeys = {
            isLoggedIn: 'isLoggedIn',
            currentUser: 'currentUser'
        };
    }

    isLoggedIn() {
        return localStorage.getItem(this.storageKeys.isLoggedIn) === 'true';
    }

    getCurrentUser() {
        const userJson = localStorage.getItem(this.storageKeys.currentUser);
        if (!userJson) {
            return null;
        }
        try {
            return JSON.parse(userJson);
        } catch (e) {
            console.error('Failed to parse user data:', e);
            return null;
        }
    }

    login(user) {
        localStorage.setItem(this.storageKeys.isLoggedIn, 'true');
        localStorage.setItem(this.storageKeys.currentUser, JSON.stringify(user));
    }

    logout() {
        localStorage.removeItem(this.storageKeys.isLoggedIn);
        localStorage.removeItem(this.storageKeys.currentUser);
    }

    clear() {
        this.logout();
    }
}

if (typeof window !== 'undefined') {
    window.AuthStore = new AuthStore();
}
