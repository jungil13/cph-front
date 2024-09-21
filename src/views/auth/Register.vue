<template>
  `` <div class="min-h-screen flex items-center justify-center md:bg-teal-800 mt-16 bg-white">
    <div class="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-xl">
      <div class="text-right">
        <router-link to="/login" class="text-sm text-teal-600 hover:text-teal-700">Already have an account? Sign in
          here!</router-link>
      </div>
      <h2 class="text-3xl font-bold text-center text-teal-800">Create An Account</h2>
      <form @submit.prevent="handleSubmit" class="mt-4 space-y-6">
        <div class="">
            <label for="email" class="block text-sm font-medium text-gray-600 mb-2">Email</label>
            <input type="email" id="Email" v-model="Email" required
              class="shadow-sm shadow-black w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email" />
          </div>
        <!-- <div class="grid grid-cols-2 gap-4">
          <div class="">
            <label for="profilePhoto" class="block text-sm font-medium text-gray-600 mb-3">Profile Photo</label>
            <input type="file" class="shadow-sm shadow-black block w-full text-sm text-slate-500 rounded-lg
        file:mr-4 file:py-3 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-pink-50 file:text-pink-700
        hover:file:bg-pink-100" />
          </div>
        </div> -->
        <div class="grid grid-cols-2 gap-4">
          <div class="">
            <label for="name" class="block text-sm font-medium text-gray-600 mb-2">FullName</label>
            <input type="text" id="Fullname" v-model="Fullname" required
              class="shadow-sm shadow-black w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Full Name" />
          </div>
           <div class="">
            <label for="name" class="block text-sm font-medium text-gray-600 mb-2">Username</label>
            <input type="text" id="Username" v-model="Username" required
              class="shadow-sm shadow-black w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="">
            <label for="name" class="block text-sm font-medium text-gray-600 mb-2">Address</label>
            <input type="text" id="Address" v-model="Address" required
              class="shadow-sm shadow-black w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Address" />
          </div>
          <div class="">
            <label for="age" class="block text-sm font-medium text-gray-600 mb-2">Age</label>
            <input type="number" id="Age" v-model="Age" required
              class="shadow-sm shadow-black w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="">
            <label for="birthdate" class="block text-sm font-medium text-gray-600 mb-2">Birthdate</label>
            <input type="date" id="Birthdate" v-model="Birthdate" required
              class="shadow-sm shadow-black w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Select your birthdate" />
          </div>
          <div class="">
            <label for="name" class="block text-sm font-medium text-gray-600 mb-2">Contact Number</label>
            <input type="text" id="Contactnumber" v-model="Contactnumber" required
              class="shadow-sm shadow-black w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Contact Number" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="">
            <label for="password" class="block text-sm font-medium text-gray-600 mb-2">Password</label>
            <input type="password" id="Password" v-model="Password" required
              class="shadow-sm shadow-black w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password" />
          </div>
          <div class="">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-600 mb-2">Confirm Password</label>
            <input type="password" id="ConfirmPassword" v-model="ConfirmPassword" required
              class="shadow-sm shadow-black w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password" />
          </div>
        </div>
        <button type="submit"
          class="shadow-sm shadow-black w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
          Create Account
        </button>
      </form>
      <p class="text-center text-xs text-gray-500">
        Creating your account and you accepting Terms & Conditions.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axiosInstance from '@/utils/axios';

const router = useRouter();
const Username = ref('');
const Fullname = ref('');
const Contactnumber = ref('');
const Address = ref('');
const Email = ref('');
const Password = ref('');
const ConfirmPassword = ref('');
const Age = ref('');
const Birthdate = ref('');
const ProfilePhoto = ref(null);

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    ProfilePhoto.value = file;
  }
};

const handleSubmit = async () => {
  if (Password.value !== ConfirmPassword.value) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Passwords do not match!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
    return;
  }

  if (!Username.value || !Email.value || !Password.value || !ConfirmPassword.value || !Fullname.value || !Contactnumber.value || !Address.value || !Age.value || !Birthdate.value) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill in all fields!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
    return;
  }

  if (!validateEmail(Email.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email address.',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
    return;
  }

  const formData = new FormData();
  formData.append('Username', Username.value);
  formData.append('Email', Email.value);
  formData.append('Password', Password.value);
  formData.append('Fullname', Fullname.value);
  formData.append('Contactnumber', Contactnumber.value);
  formData.append('Address', Address.value);
  formData.append('Age', Age.value);
  formData.append('Birthdate', Birthdate.value);
  if (ProfilePhoto.value) {
    formData.append('ProfilePhoto', ProfilePhoto.value);
  }

  try {
    const response = await axiosInstance.post('/api/users/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    Swal.fire({
      icon: 'success',
      title: 'Registered Successfully!',
      text: 'Your account has been created.',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then(() => {
      router.push('/login');
      location.reload();
    });
    console.log(response.data);
  } catch (error) {
    const message = error.response?.data?.msg || error.message || 'Failed to register. Please try again.';
    Swal.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: message,
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK'
    });
    console.error('Error:', error);
  }
};
</script>
