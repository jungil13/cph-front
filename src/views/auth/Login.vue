<template>
  <div class="min-h-screen flex items-center justify-center md:bg-teal-900 lg:bg-pastel-green bg-white">
    <div class="flex w-full max-w-4xl sm:shadow-lg sm:shadow-black sm:rounded-lg">
      <!-- Image and Text Section - Hidden on mobile -->
      <div class="hidden lg:block lg:w-1/2 p-12 bg-white lg:rounded-l-lg">
        <img src="/adopt.jpg" alt="Decorative image" class="max-w-full h-auto rounded-xl shadow-md shadow-black">
        <h3 class="text-xl font-semibold mt-4">Pet Adoption Website for Everyone</h3>
        <p class="text-gray-600">All users are welcome to register and login, and you can log in with Google!</p>
        <p class="text-gray-600">Get started by signing in or creating an account.</p>
      </div>
      <!-- Form Section -->
      <div class="w-full lg:w-1/2 bg-white p-8 lg:rounded-r-lg">
        <h2 class="text-3xl font-extrabold text-gray-800 mb-6 text-center">Welcome to <span class="text-orange-600 font-extrabold">C P H</span></h2>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-600 mb-2">Username or Email</label>
            <input type="email" id="email" v-model="email" required
              class="shadow-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-600 mb-2">Password</label>
            <input type="password" id="password" v-model="password" required
              class="shadow-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
            <p class="text-right text-sm text-teal-500 hover:text-teal-600 cursor-pointer mt-2">Forgot password?</p>
          </div>
          <button type="submit"
            class="shadow-md w-full py-3 px-4 bg-teal-500 text-white font-bold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
            Sign in
          </button>
          <div class="text-center text-sm text-gray-600 mt-4">
            or
          </div>
          <button type="button" @click="handleGoogleLogin"
            class="shadow-md w-full py-3 px-4 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            <span class="material-symbols-outlined mr-2">login</span>
            Sign in with Google
          </button>
          <p class="mt-6 text-center text-sm text-gray-600">
            New User? <router-link to="/register" class="text-teal-500 hover:underline">Create Account</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.bg-pastel-green {
  background-color: #a8dadc;
}
</style>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axiosInstance from '@/utils/axios'; 

const email = ref('');
const password = ref('');
const router = useRouter();

const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/api/users/login', {
      Email: email,
      Password: password
    });
    return response.data; 
  } catch (error) {
    throw error.response?.data?.msg || 'Login failed due to server error';
  }
};

const handleSubmit = async () => {
  try {
    const response = await loginUser(email.value, password.value); 
    console.log('Login response:', response); // Log the entire response
    const { msg, token, username, userType, user } = response; 

    // Ensure user is defined and has an id
    if (!user || !user.id) {
      throw new Error('User ID is not available in the response');
    }

    // Store user information
    localStorage.setItem('token', token);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('userType', userType);
    localStorage.setItem('userID', user.id); // Store user ID

    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: `You have been logged in successfully as ${username}!`,
      confirmButtonText: 'OK'
    }).then(() => {
      if (userType === 'Admin') {
        router.push('/dashboard'); 
      } else {
        router.push('/');
      }
      location.reload(); // Reload after routing
    });
  } catch (error) {
    console.error('Login error:', error);
    localStorage.clear(); 
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: error.message || 'Login failed due to server error',
      confirmButtonText: 'OK'
    });
  }
};

const handleGoogleLogin = () => {
  Swal.fire('Google Login', 'Google login feature not implemented yet.', 'info');
};
</script>
