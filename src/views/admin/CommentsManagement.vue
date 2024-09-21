<template>
  <div class="p-6 min-h-screen shadow-md shadow-black">
    <div class="mb-6">
      <h1 class="text-3xl font-extrabold mb-4 text-gray-800 text-center">Forum Comments</h1>
      <div class="flex items-center justify-center">
        <div class="relative w-1/3">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="material-icons text-gray-500">search</span>
          </span>
          <input
            type="text"
            class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search comments..."
            v-model="searchQuery"
            @input="fetchComments"
          />
        </div>
      </div>
    </div>

    <div class="overflow-x-auto bg-white shadow-md shadow-black rounded-lg">
      <table class="min-w-full bg-white">
        <thead class="bg-blue-600 text-white uppercase text-sm leading-normal font-semibold">
          <tr>
            <th class="py-3 px-6 text-left">Comment_ID</th>
            <th class="py-3 px-6 text-left">Post_ID</th>
            <th class="py-3 px-6 text-left">Commenter Name</th>
            <th class="py-3 px-6 text-left">Comment</th>
            <th class="py-3 px-6 text-center">Date</th>
            <th class="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-semibold">
          <tr v-for="comment in comments" :key="comment.id" class="border-b border-gray-200 hover:bg-gray-100">
            <td class="py-3 px-6 text-left whitespace-nowrap">{{ comment.CommentID }}</td>
            <td class="py-3 px-6 text-left whitespace-nowrap">{{ comment.PostID }}</td>
            <td class="py-3 px-6 text-left">{{ comment.CommenterName }}</td>
            <td class="py-3 px-6 text-left">{{ comment.Content }}</td>
            <td class="py-3 px-6 text-center">{{ comment.CommentDate }}</td>
            <td class="py-3 px-6 text-center">
              <button class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-100" @click="editComment(comment)">
                <span class="material-icons text-blue-500">edit</span>
              </button>
              <button class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-100" @click="deleteComment(comment)">
                <span class="material-icons text-red-500">delete</span>
              </button>
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

const comments = ref([]);
const searchQuery = ref('');

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const fetchComments = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/forum/comments`, {
      params: { search: searchQuery.value }
    });
    comments.value = response.data;
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    Swal.fire('Error', 'Could not fetch comments.', 'error');
  }
};

function editComment(comment) {
  // Implement editing functionality
}

function deleteComment(comment) {
  // Implement deletion functionality
}

onMounted(fetchComments);
</script>

<style scoped>
.material-icons {
  font-size: 1.25rem;  
}
</style>
