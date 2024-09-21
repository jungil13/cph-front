// src/stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: !!localStorage.getItem('token'),
  }),
  actions: {
    logIn(token) {
        localStorage.setItem('token', token);
        this.isLoggedIn = true;
      },
    logOut() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
    },
    checkLogin() {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
  }
});
