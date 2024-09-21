<template>
  <div class="p-6 min-h-screen shadow-md shadow-black">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-extrabold text-gray-800 mb-4 text-center">User Management</h1>
      <div class="justify-center flex items-center">
        <div class="relative w-1/3">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="material-icons text-gray-500 text-center">search</span>
          </span>
          <input
            v-model="searchQuery"
            @input="fetchUsers"
            type="text"
            class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            placeholder="Search users..."
          />
        </div>
      </div>
    </div>
    <!-- Users Table -->
    <div class="overflow-x-auto bg-white shadow-lg shadow-black rounded-lg">
      <table class="min-w-full whitespace-nowrap bg-white">
        <thead class="bg-blue-600 text-white uppercase text-sm leading-normal">
          <tr>
            <th class="py-3 px-6 text-left">Profile Photo</th>
            <th class="py-3 px-6 text-left">User ID</th>
            <th class="py-3 px-6 text-left">Name</th>
            <th class="py-3 px-6 text-left">Email</th>
            <th class="py-3 px-6 text-left">Address</th>
            <th class="py-3 px-6 text-center">Role</th>
            <th class="py-3 px-6 text-center">Verified</th>
            <th class="py-3 px-6 text-center">Status</th>
            <th class="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-800 text-sm font-semibold">
          <tr v-for="user in users" :key="user.UserID" class="border border-gray-200 hover:bg-yellow-100">
            <td class="py-3 px-6 text-left">
              <img :src="getUserPhotoUrl(user.ProfilePhoto)" alt="User Image" class="w-20 h-20 object-cover rounded-full shadow-md shadow-black">
            </td>
            <td class="py-3 px-6 text-left">{{ user.UserID }}</td>
            <td class="py-3 px-6 text-left">{{ user.Fullname }}</td>
            <td class="py-3 px-6 text-left">{{ user.Email }}</td>
            <td class="py-3 px-6 text-left">{{ user.Address }}</td>
            <td class="py-3 px-6 text-center">{{ user.UserType }}</td>
            <td class="py-3 px-6 text-center">{{ user.isVerified ? 'Verified' : 'Not Verified' }}</td>
            <td class="py-3 px-6 text-center">
              <span :class="['bg-' + (user.status === 'Active' ? 'green' : 'red') + '-200', 'text-' + (user.status === 'Active' ? 'green' : 'red') + '-700', 'py-1', 'px-3', 'rounded-full', 'text-xs']">
                {{ user.status }}
              </span>
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex item-center justify-center space-x-2">
                <button
                  v-if="canView(user)"
                  class="w-8 h-8 rounded-full hover:bg-blue-100 flex items-center justify-center"
                  @click="openUserModal(user)"
                >
                  <span class="material-icons text-blue-500">visibility</span>
                </button>
                <button
                  v-if="canEdit(user)"
                  class="w-8 h-8 rounded-full hover:bg-yellow-100 flex items-center justify-center"
                  @click="editUser(user)"
                >
                  <span class="material-icons text-yellow-500">edit</span>
                </button>
                <button
                  v-if="canDelete(user)"
                  class="w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center"
                  @click="deleteUser(user.UserID)"
                >
                  <span class="material-icons text-red-500">delete</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- User Detail Modal -->
    <div v-if="userModalVisible" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full relative">
        <button @click="userModalVisible = false" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          <span class="material-icons">close</span>
        </button>
        <h2 class="text-2xl font-bold mb-4">{{ isEditing ? 'Edit User' : 'User Details' }}</h2>
        <form @submit.prevent="handleSubmit" class="flex flex-col lg:flex-row gap-6">
          <div class="flex-shrink-0 lg:w-1/3 mb-4 lg:mb-0">
            <label class="block text-gray-700 font-semibold mb-2" for="profilePhoto">Profile Photo</label>
            <img :src="getUserPhotoUrl(selectedUser.ProfilePhoto)" alt="User Photo" class="w-30 h-30 object-cover rounded-xl shadow-lg mb-4 mx-auto lg:mx-0">
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="newFullname">New Full Name</label>
              <input v-model="newFullname" id="newFullname" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :readonly="!isEditing" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="newEmail">New Email</label>
              <input v-model="newEmail" id="newEmail" type="email" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :readonly="!isEditing" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="newAddress">New Address</label>
              <input v-model="newAddress" id="newAddress" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :readonly="!isEditing" />
            </div>
          </div>
          <div class="flex-1">
            <div v-if="isEditing" class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="newPassword">New Password</label>
              <input v-model="newPassword" id="newPassword" type="password" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="newUserType">New Role</label>
              <select v-model="newUserType" id="newUserType" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :disabled="!isEditing">
                <option value="Admin">Admin</option>
                <option value="Regular">Regular</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="newIsVerified">New Verified Status</label>
              <select v-model="newIsVerified" id="newIsVerified" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :disabled="!isEditing">
                <option value="1">Verified</option>
                <option value="0">Not Verified</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="newAge">New Age</label>
              <input v-model="newAge" id="newAge" type="number" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :readonly="!isEditing" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="newContactnumber">New Contact Number</label>
              <input v-model="newContactnumber" id="newContactnumber" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :readonly="!isEditing" />
            </div>
          </div>
        </form>
        <div class="flex justify-end mt-4">
          <button type="button" @click="userModalVisible = false" class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            Cancel
          </button>
          <button v-if="isEditing" type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-4" @click.prevent="updateUser">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

// State management
const searchQuery = ref('');
const users = ref([]);
const selectedUser = ref(null);
const userModalVisible = ref(false);
const isEditing = ref(false);
const newFullname = ref('');
const newEmail = ref('');
const newAddress = ref('');
const newPassword = ref('');
const newUserType = ref('');
const newIsVerified = ref('');
const newAge = ref('');
const newContactnumber = ref('');
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Fetch users
const fetchUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/admin/users?search=${searchQuery.value}`);
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Open user modal
const openUserModal = (user) => {
  selectedUser.value = { ...user };
  newFullname.value = user.Fullname;
  newEmail.value = user.Email;
  newAddress.value = user.Address;
  newPassword.value = '';
  newUserType.value = user.UserType;
  newIsVerified.value = user.isVerified;
  newAge.value = user.Age;
  newContactnumber.value = user.Contactnumber;
  userModalVisible.value = true;
  isEditing.value = false;
};

// Edit user
const editUser = (user) => {
  openUserModal(user);
  isEditing.value = true;
};

// Update user
const updateUser = async () => {
  try {
    const updatedUser = { 
      ...selectedUser.value,
      Fullname: newFullname.value,
      Email: newEmail.value,
      Address: newAddress.value,
      Password: newPassword.value ? newPassword.value : selectedUser.value.Password,
      UserType: newUserType.value,
      isVerified: newIsVerified.value,
      Age: newAge.value,
      Contactnumber: newContactnumber.value
    };
    await axios.put(`http://localhost:3000/admin/users/${selectedUser.value.UserID}`, updatedUser);
    newPassword.value = ''; 
    Swal.fire('Success', 'User details updated successfully', 'success');
    fetchUsers();
    userModalVisible.value = false;
  } catch (error) {
    Swal.fire('Error', 'An error occurred while updating user details', 'error');
    console.error('Error updating user:', error);
  }
};

// Delete user
const deleteUser = async (user) => {
  try {
    await axios.delete(`http://localhost:3000/admin/users/${user.UserID}`);
    Swal.fire('Success', 'User deleted successfully', 'success');
    fetchUsers();
  } catch (error) {
    Swal.fire('Error', 'An error occurred while deleting user', 'error');
    console.error('Error deleting user:', error);
  }
};

// User photo URL
const getUserPhotoUrl = (photoPath) => {
  return photoPath ? `http://localhost:3000/${photoPath}` : 'default-image-url'; 
};

// Permission checks
const canView = (user) => {
  return true; 
};
const canEdit = (user) => {
  return true; 
};
const canDelete = (user) => {
  return true; 
};

// Lifecycle hook
onMounted(() => {
  fetchUsers();
});
</script>
