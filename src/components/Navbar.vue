<template>
  <header class="bg-white py-2 shadow-md fixed top-0 w-full z-50">
    <div class="container mx-auto flex items-center justify-between px-4 md:px-6">
      <!-- Logo and Site Name -->
      <RouterLink to="/" class="flex items-center text-lg font-semibold text-gray-600">
       <img src="/cphlogo.png" alt="Cordova Pet Hub Logo" class="w-15 h-20 mr-3 object-cover" />
        <p class="text-md font-sans font-extrabold text-gray-700">
          <span class="hidden md:inline">Cordova</span>
          <span class="hidden md:inline text-teal-700">Pet Hub</span>
          <span class="inline md:hidden text-teal-700">CPH</span>
        </p>
      </RouterLink>
      <div v-if="isLoggedIn" class="md:hidden">
        <button @click="toggleDropdown"
          class="ml-24 relative text-gray-600 font-semibold rounded-full text-sm p-2 flex items-center transform transition duration-300 hover:scale-105">
          <img :src="userProfile.photoUrl" alt="User Profile Photo" class="w-10 h-10 rounded-full object-cover" />
          <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </button>
        <div v-if="isDropdownOpen"
          class="absolute  p-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg shadow-md shadow-black">
          <RouterLink to="/summary" class="block px-4 py-2 text-gray-600  flex items-center space-x-2">
            Profile
          </RouterLink>
          <RouterLink to="dashboard" class="block px-4 py-2 text-gray-600flex items-center space-x-2">
            Dashboard
          </RouterLink>
          <div class="bg-gray-500 w-full h-px my-1"></div>
          <button @click="confirmLogout" class="w-full text-left px-4 py-2 text-gray-600 flex items-center space-x-2">
            Logout
          </button>
        </div>
      </div>
      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" class="md:hidden text-gray-600 focus:outline-none mr-6" aria-label="Open menu">
        <span class="material-symbols-outlined text-3xl">menu</span>
      </button>
      <!-- Desktop Navigation Links -->
      <nav class="hidden md:flex items-center space-x-6">
        <RouterLink v-for="link in links" :key="link.title" :to="link.route"
          class="relative text-gray-600 hover:bg-gray-600 hover:text-white text-md font-semibold rounded-lg transition duration-300 hover:scale-105 px-4 py-2"
          :class="{ 'border-b-2 border-teal-700': $route.path === link.route }">
          {{ link.title }}
          <span v-if="$route.path === link.route" class="absolute bottom-0 left-0 right-0 h-1"></span>
        </RouterLink>
      </nav>

      <!-- User Profile and Authentication Links -->
      <div class="hidden md:flex items-center space-x-4">
        <RouterLink to="/donations"
          class="text-black bg-yellow-300 rounded-full hover:bg-gray-600 hover:text-white text-md font-semibold transition duration-300 hover:scale-105 px-4 py-2">
          Donate
        </RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/login"
          class="text-gray-600 hover:bg-gray-600 hover:text-white text-md font-semibold rounded-lg transition duration-300 hover:scale-105 px-4 py-2">
          Login
        </RouterLink>
        <h1 v-if="!isLoggedIn" class="text-white mb-5">User <span><svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 29 29" id="user">
              <path
                d="M14.5 2A12.514 12.514 0 0 0 2 14.5 12.521 12.521 0 0 0 14.5 27a12.5 12.5 0 0 0 0-25Zm7.603 19.713a8.48 8.48 0 0 0-15.199.008A10.367 10.367 0 0 1 4 14.5a10.5 10.5 0 0 1 21 0 10.368 10.368 0 0 1-2.897 7.213ZM14.5 7a4.5 4.5 0 1 0 4.5 4.5A4.5 4.5 0 0 0 14.5 7Z">
              </path>
            </svg></span></h1>
        <div v-if="isLoggedIn">
          <button @click="toggleDropdown"
            class="relative text-gray-600 font-semibold rounded-full text-sm p-2 flex items-center transform transition duration-300 hover:scale-105">
            <img :src="userProfile.photoUrl" alt="User Profile Photo" class="w-10 h-10 rounded-full object-cover" />
            <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </button>
          <h3 class="font-semibold cursor-pointer">{{ userProfile.Username }}</h3>
          <div v-if="isDropdownOpen" class="absolute p-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
            <RouterLink to="/summary" class="block px-4 py-2 text-gray-600 flex items-center space-x-2">
              Profile
            </RouterLink>
            <RouterLink to="dashboard" class="block px-4 py-2 text-gray-600  flex items-center space-x-2">
              Dashboard
            </RouterLink>
            <div class="bg-gray-300 w-full h-px my-1"></div>
            <button @click="confirmLogout"
              class="w-full text-left px-4 py-2 text-gray-600  flex items-center space-x-2">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-bind:class="['md:hidden fixed inset-0 bg-white z-40 transition-transform', isMenuOpen ? 'translate-x-0' : 'translate-x-full']"
      class="flex flex-col items-center justify-center p-8 space-y-4">
      <button @click="toggleMobileMenu" class="absolute top-5 right-5 text-gray-600 focus:outline-none"
        aria-label="Close menu">
        <span class="material-symbols-outlined text-3xl">close</span>
      </button>
      <img src="/cphlogo.png" alt="Cordova Pet Hub Logo" class="w-40 h-40 object-cover" />
      <RouterLink v-for="link in links" :key="link.title" :to="link.route" @click="toggleMobileMenu"
        class="w-full text-center text-md font-semibold text-gray-600 hover:bg-gray-600 hover:text-white rounded-lg transition duration-300 hover:scale-105 px-4 py-2">
        {{ link.title }}
      </RouterLink>
      <div v-if="isLoggedIn">
        <RouterLink to="/summary" @click="toggleMobileMenu"
          class="block w-full text-center px-4 py-2 text-gray-600 hover:bg-gray-700 font-bold flex items-center space-x-2">
          Profile
        </RouterLink>
        <div>
          <RouterLink to="/Dashboard" @click="toggleMobileMenu"
            class="block w-full text-center py-2 text-gray-600 hover:bg-gray-700 font-bold flex items-center space-x-2">
            Dashboard
          </RouterLink>
        </div>
        <button @click="logout"
          class="w-full bg-teal-500 text-white font-semibold rounded-full px-4 py-2 shadow-lg flex items-center justify-center space-x-2">
          Logout
        </button>
      </div>
    </div>
  </header>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import Swal from 'sweetalert2';
import NotificationBell from '@/components/Notification.vue';

const isMenuOpen = ref(false);
const isDropdownOpen = ref(false);
const authStore = useAuthStore();
const isLoggedIn = ref(authStore.isLoggedIn);
const userProfile = ref({
  Username: 'Loading...',
  photoUrl: '/path/to/default/image.jpg'
});
const router = useRouter();
const links = [
  { title: 'Browse Pet', route: '/browse' },
  { title: 'List a Pet', route: '/addpet' },
  { title: 'Lost And Found', route: '/lostlist' },
  { title: 'Report A Pet', route: '/lostpet' },
  { title: 'Forum', route: '/general' },
  { title: 'Contact Us', route: '/contact' },
  { title: 'About', route: '/about' },
];

function toggleMobileMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

async function fetchUserProfile() {
  if (isLoggedIn.value) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/users/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      userProfile.value = {
        Username: response.data.Username || 'Unknown User',
        photoUrl: response.data.ProfilePhoto
          ? `http://localhost:3000/${response.data.ProfilePhoto}`
          : '/path/to/default/image.jpg'
      };
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      userProfile.value = {
        Username: 'Error loading user',
        photoUrl: '/path/to/default/image.jpg'
      };
      Swal.fire('Error', 'Failed to load user details. Please try again later.', 'error');
    }
  }
}

onMounted(() => {
  fetchUserProfile();
});


watch(() => authStore.isLoggedIn, (newValue) => {
  isLoggedIn.value = newValue;
  if (newValue) {
    fetchUserProfile();
  } else {
    userProfile.value = {
      Username: 'Loading...',
      photoUrl: '/path/to/default/image.jpg'
    };
  }
});

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

const logout = () => {
  axios.post('http://localhost:3000/api/users/logout', {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
    .then(() => {
      localStorage.clear();
      authStore.isLoggedIn = false; 
      Swal.fire('Logged Out!', 'Your session has been closed.', 'success');
      isMenuOpen.value = false;
      router.push('/login');
    })
    .catch(error => {
      console.error('Logout failed:', error);
      Swal.fire('Error', 'Failed to log out. Please try again.', 'error');
    });
};
</script>
