<template>
  <div class="w-full">
    <Account />

    <!-- User Details Section -->
    <div class="bg-zinc-700 p-8 mx-4 md:mx-8 lg:mx-12 xl:mx-16 shadow-lg shadow-sky-400 border border-white rounded-3xl text-center mb-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <!-- Profile Photo with Verified Badge -->
        <div class="col-span-full flex justify-center relative">
          <div class="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white shadow-md cursor-pointer">
            <img :src="previewImage || getProfilePhotoUrl(user.ProfilePhoto)" alt="Profile Photo" class="object-cover w-full h-full rounded-full" />
            <div v-if="user.isVerified" class="border absolute ml-24 bottom-0 bg-blue-500 text-white p-2 rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Conditionally Display User Details or Edit Form -->
        <div v-if="!isEditing" class="col-span-full">
          <h2 class="text-3xl font-extrabold text-white mb-4">{{ user.Fullname }}<span v-if="user.isVerified" class="ml-2 text-xl font-bold text-sky-100 mb-2">(Verified)</span></h2>
          <h3 class="text-lg font-bold text-gray-100 mb-2"><span class="font-medium">Age: </span> {{ user.Age }}</h3>
          <h3 class="text-lg font-bold text-gray-100 mb-2"><span class="font-medium">Email: </span> {{ user.Email }}</h3>
          <h3 class="text-lg font-bold text-gray-100 mb-2"><span class="font-medium">Phone Number: </span> {{ user.Contactnumber }}</h3>
          <h3 class="text-lg font-bold text-gray-100 mb-2"><span class="font-medium">Address: </span> {{ user.Address }}</h3>

          <!-- Edit Mode Button -->
          <div class="flex justify-center space-x-4 mt-4">
            <button class="bg-yellow-300 text-black font-bold py-2 px-5 rounded-lg shadow-md hover:bg-sky-600 hover:text-white transition-colors duration-200"
              @click="isEditing = true">
              Edit Information
            </button>
          </div>
        </div>

        <!-- Edit Information Form -->
        <div v-if="isEditing" class="col-span-full">
          <h2 class="text-2xl font-extrabold mb-4 text-white">Edit Information</h2>
          <input type="file" @change="handleFileChange" class="shadow-sm shadow-black border bordet-white block w-full text-sm text-white rounded-lg
        file:mr-4 file:py-3 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-pink-50 file:text-pink-700
        hover:file:bg-pink-100"/>
          <template v-for="(value, key) in editableUser" :key="'edit-' + key">
            <div v-if="shouldShowField(key)" class="mb-4">
              <label class="block text-white text-md font-medium mb-1 capitalize">{{ formatLabel(key) }}</label>
              <input v-model="editableUser[key]" 
                :type="key === 'Password' ? 'password' : (key === 'Birthdate' ? 'date' : 'text')"
                class="form-input w-full rounded-full p-2 shadow-black shadow-lg focus:ring-2 focus:ring-teal-500" />
            </div>
          </template>
          <!-- Action Buttons -->
          <div class="flex justify-center space-x-4 mt-4">
            <button @click="saveInformation"
              class="border-white border bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-200 ease-in-out">Save</button>
            <button @click="cancelEdit"
              class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-lg transition-colors duration-200 ease-in-out">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="bg-gray-800 text-white py-8 mt-4">
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <div class="text-center md:text-left mb-4 md:mb-0">
        <h5 class="text-lg font-semibold">Pet Adoption</h5>
        <p class="mt-2 text-sm">Contact us: <a href="mailto:info@petadoption.com"
            class="underline hover:text-gray-400">info@petadoption.com</a></p>
      </div>
      <div class="text-center md:text-right text-sm">
        <p>© 2024 Pet Adoption. All rights reserved.</p>
        <p>Developed by: Jun Gil</p>
      </div>
    </div>
  </footer>
</template>

<script>
import Account from "@/views/user/Profile/Account.vue";
import Swal from 'sweetalert2';
import axiosInstance from '@/utils/axios'; // Use the Axios instance

export default {
  components: {
    Account
  },
  data() {
    return {
      user: null,
      editableUser: {},
      isEditing: false, 
      previewImage: null 
    };
  },
  created() {
    this.fetchUserDetails();
  },
  methods: {
    async fetchUserDetails() {
      const token = localStorage.getItem('token');
      try {
        const response = await axiosInstance.get('/api/users/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.user = response.data;
        this.editableUser = { ...this.user, Password: '' };
      } catch (error) {
        console.error('Error fetching user details:', error);
        Swal.fire('Error', 'Failed to load user details. Please try again.', 'error');
      }
    },
    getProfilePhotoUrl(photoPath) {
      return photoPath ? `http://localhost:3000/${photoPath}` : '/path/to/default/image.jpg';
    },
    handleFileChange(e) {
      const file = e.target.files[0];
      this.editableUser.ProfilePhoto = file;
      this.previewImage = URL.createObjectURL(file);
    },
    async saveInformation() {
  if (!this.editableUser.UserID) {
    Swal.fire('Error', 'User ID is missing or invalid.', 'error');
    return;
  }

  const formData = new FormData();
  Object.keys(this.editableUser).forEach(key => {
    formData.append(key, this.editableUser[key]); 
  });

  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put(`/api/users/${this.editableUser.UserID}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    this.user = response.data.user;
    this.editableUser = { ...this.user, Password: '' }; 
    this.isEditing = false;
    this.previewImage = null; 
    Swal.fire('Success', 'Information updated successfully.', 'success');
    this.fetchUserDetails();
    location.reload();
  } catch (error) {
    console.error('Error updating user details:', error.response ? error.response.data : error);
    Swal.fire('Error', `Failed to update user details: ${error.response ? error.response.data.message : "Please try again."}`, 'error');
  }
},
    cancelEdit() {
      this.isEditing = false;
      if (this.previewImage) {
        URL.revokeObjectURL(this.previewImage);
        this.previewImage = null;
      }
      this.editableUser = { ...this.user, Password: '' };
    },
    shouldShowField(key) {
      return !['UserID', 'UserType', 'created_at', 'updated_at', 'isVerified', 'verificationToken', 'status', 'DateJoined','Birthdate', 'ProfilePhoto'].includes(key);
    },
    formatLabel(key) {
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }
  }
};
</script>
