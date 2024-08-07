import { defineStore } from 'pinia';
import AuthService from '../services/auth';

export const usePiniaAuthStore = defineStore('piniaAuthStore', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: { loggedIn: !!localStorage.getItem('user') }
  }),
  actions: {
    async register(userData) {
      try {
        const response = await AuthService.register(userData);
        this.user = response;
        this.status.loggedIn = true;
        return response;
      } catch (error) {
        this.status.loggedIn = false;
        this.user = null;
        throw error;
      }
    },
    async login(userData) {
      try {
        const response = await AuthService.login(userData);
        this.user = response;
        this.status.loggedIn = true;
        return response;
      } catch (error) {
        this.status.loggedIn = false;
        this.user = null;
        throw error;
      }
    },
    logout() {
      AuthService.logout();
      this.user = null;
      this.status.loggedIn = false;
    }
  }
});
