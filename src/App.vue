<template>
  <div id="app">
    <Navbar v-if="showNavBar" />
    <RouterView />
  </div>
</template>
<script setup>
import { onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

const route = useRoute();
const router = useRouter();

const showNavBar = computed(() => route.meta.showNavBar !== false);

function isValidToken(token) {
  return token && token.length > 10 && token.includes('.');
}

function checkStorageIntegrity() {
  window.addEventListener('storage', (event) => {
    if (event.key === 'isLoggedIn' && event.newValue !== 'true') {
      handleLogout();
    }
    if (event.key === 'token') {
      const newToken = event.newValue;
      const oldToken = localStorage.getItem('token');
      if (newToken !== oldToken || !isValidToken(newToken)) {
        handleLogout();
      }
    }
    if (event.key === 'userType' && event.newValue !== 'Admin') {
      handleLogout();
    }
  });
}

function handleLogout() {
  localStorage.clear();
  router.replace('/login');
  window.location.reload();
}

onMounted(() => {
  checkStorageIntegrity();
});
</script>