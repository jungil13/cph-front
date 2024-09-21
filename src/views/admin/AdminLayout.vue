<template>
  <div class="flex h-screen overflow-hidden bg-white">
    <aside :class="[
        'fixed inset-0 z-30 bg-gray-800 p-4 transition-transform transform lg:relative lg:translate-x-0 lg:w-64 shadow-lg',
        drawerOpen ? 'translate-x-0' : '-translate-x-full'
      ]" @click.away="drawerOpen = false">
      <button @click="toggleDrawer" class="text-2xl lg:hidden absolute top-4 right-4 text-white focus:outline-none">
        ✕
      </button>
      <div class="flex items-center justify-center mb-14 mt-6">
        <h1 class="text-2xl font-extrabold text-white">Admin Panel</h1>
      </div>
      <nav>
        <ul>
          <li v-for="item in menuItems" :key="item.title" class="mb-6">
            <RouterLink :to="item.path" exact-active-class="bg-orange-600 shadow-md shadow-black"
              class="text-white flex align-center gap-6 p-4 font-semibold rounded-xl hover:bg-gray-700 hover:text-white transition-colors duration-200 ease-in-out">
              <span class="material-icons text-white shadow-lg rounded-full text-2xl text-center">{{ item.icon }}</span>
              {{ item.title }}
            </RouterLink>
          </li>
        </ul>
        <RouterLink to="/"
          class="mt-6 text-center flex justify-center w-full bg-blue-300 text-black p-2 py-3 rounded-full shadow-lg shadow-black font-semibold mt-6">
          Go to page</RouterLink>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="flex items-center justify-between bg-blue-600 p-4 text-white shadow-md shadow-black">
        <button @click="toggleDrawer" class="text-2xl lg:hidden focus:outline-none">
          ☰
        </button>
        <div class="text-xl font-extrabold p-6">C P H : Admin Dashboard</div>
        <div class="flex items-center">
          <button @click="confirmLogout"
            class="w-full bg-red-600 text-white p-3 py-2 rounded-full shadow-lg shadow-black font-bold flex items-center justify-center mr-4">
            <span class="material-icons">exit_to_app</span>
            Logout
          </button>
          <img src="/ad.png" alt="Admin Avatar"
            class="bg-white w-12 h-12 rounded-full mr-12 shadow-md shadow-black border" />
        </div>
      </header>

      <main class="flex-1 overflow-auto p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { useAuthStore } from '@/stores/auth';

const drawerOpen = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const menuItems = ref([
  { title: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
  { title: 'User Management', path: '/usermanagement', icon: 'people' },
  { title: 'Pet Management', path: '/petmanagement', icon: 'pets' },
  { title: 'Pet Listings Management', path: '/applicationmanagement', icon: 'assignment' },
  { title: 'Application Management', path: '/appmanagement', icon: 'assignment' },
  { title: 'Report Management', path: '/reportmanagement', icon: 'search' },
  { title: 'Forum Management', path: '/forummanagement', icon: 'forum' },
  { title: 'Comments Management', path: '/commentsmanagement', icon: 'comment' }
]);

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

const logout = async () => {
  localStorage.clear();
  authStore.isLoggedIn = false;
  await Swal.fire({
    title: 'Logged Out!',
    text: 'Your session has been closed.',
    icon: 'success',
    confirmButtonColor: '#3085d6'
  });
  router.push('/login');
  location.reload();
};

const confirmLogout = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You will be logged out of your account!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, log me out!'
  });
  if (result.isConfirmed) {
    logout();
  }
};
</script>

<style scoped>
.material-icons {
  font-size: 1.5rem; 
}
@media (min-width: 640px) {
  aside {
    width: 20rem;
  }
}
</style>
