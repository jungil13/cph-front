<template>
  <div class="p-6 min-h-screen shadow-md shadow-black">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-extrabold mb-4 text-gray-800 text-center">Forum Posts</h1>
      <div class="flex items-center justify-center">
        <div class="relative w-1/3">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="material-icons text-gray-500">search</span>
          </span>
          <input
            type="text"
            class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search posts..."
            v-model="searchQuery"
            @input="fetchPosts"
          />
        </div>
      </div>
    </div>

    <!-- Posts Table -->
    <div class="overflow-x-auto bg-white shadow-md shadow-black rounded-lg">
      <table class="min-w-full bg-white">
        <thead class="bg-blue-600 text-white uppercase text-sm leading-normal font-semibold">
          <tr>
            <th class="py-3 px-6 text-left">Post_ID</th>
            <th class="py-3 px-6 text-left">Category_ID</th>
            <th class="py-3 px-6 text-left">Category_Name</th>
            <th class="py-3 px-6 text-left">Author</th>
            <th class="py-3 px-6 text-left">Title</th>
            <th class="py-3 px-6 text-center">Content</th>
            <th class="py-3 px-6 text-center">Date</th>
            <th class="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-semibold">
          <tr v-for="post in posts" :key="post.id" class="border-b border-gray-200 hover:bg-gray-100">
            <td class="py-3 px-6 text-left whitespace-nowrap">{{ post.PostID }}</td>
            <td class="py-3 px-6 text-left whitespace-nowrap">{{ post.CategoryID }}</td>
            <td class="py-3 px-6 text-left whitespace-nowrap">{{ post.CategoryName }}</td>
            <td class="py-3 px-6 text-left">{{ post.AuthorFullName }}</td>
            <td class="py-3 px-6 text-left">{{ post.Title }}</td>
            <td class="py-3 px-6 text-center">{{ post.Content }}</td>
            <td class="py-3 px-6 text-center">{{ post.PostDate }}</td>
            <td class="py-3 px-6 text-center">
              <div class="flex items-center justify-center space-x-2">
                <button class="w-8 h-8 rounded-full hover:bg-blue-100 flex items-center justify-center" @click="viewPost(post)">
                  <span class="material-icons text-blue-500">visibility</span>
                </button>
                <button class="w-8 h-8 rounded-full hover:bg-green-100 flex items-center justify-center" @click="editPost(post)">
                  <span class="material-icons text-green-500">edit</span>
                </button>
                <button class="w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center" @click="deletePost(post)">
                  <span class="material-icons text-red-500">delete</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const posts = ref([]);
const searchQuery = ref('');

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const fetchPosts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/forum/posts', {
      params: { search: searchQuery.value }
    });
    posts.value = response.data;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    Swal.fire('Error', 'Could not fetch posts.', 'error');
  }
};

function viewPost(post) {
  // Implement viewing functionality
}

function editPost(post) {
  // Implement editing functionality
}

function deletePost(post) {
  // Implement deletion functionality
}

onMounted(fetchPosts);
</script>

<style scoped>
.material-icons {
  font-size: 1.25rem;  
}
</style>
