<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold">Add New Topic</h3>
        <form @submit.prevent="submitTopic">
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" placeholder="Type a post title here..." v-model="newTopic.title"
            class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow shadow-black focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Content</label>
          <textarea placeholder="Type a content here..." v-model="newTopic.content" rows="4"
            class="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm shadow-black focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required></textarea>
        </div>
        <div class="flex justify-between mt-6">
          <button type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
            Submit
          </button>
          <button @click="$emit('close')" type="button"
            class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
            Cancel
          </button>
        </div>
      </form>
      </div>
    </div>
  </template>
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';  // Import SweetAlert2
  
  export default {
    data() {
      return {
        newTopic: {
          title: '',
          content: '',
        }
      };
    },
    methods: {
      submitTopic() {
        if (!this.newTopic.title || !this.newTopic.content) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Both title and content are required!'
          });
          return; // Prevent the submission if data is missing
        }
        // Prepare the data for submission
        const postData = {
          title: this.newTopic.title,
          content: this.newTopic.content,
          categoryID: 3  // This should be dynamic based on your application logic
        };
  
        // Make an API call to create a new topic
        axios.post('http://localhost:3000/api/forum/posts', postData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
          .then(response => {
            this.$emit('topic-created', { ...response.data, AuthorFullName: 'Current User' });
            this.newTopic = { title: '', content: '' }; // Reset the form
            this.$emit('close'); // Close the modal upon successful submission
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Your topic has been added successfully!'
            });
          })
          .catch(error => {
            console.error('Failed to add new topic:', error);
            Swal.fire({
              icon: 'error',
              title: 'Failed to Post',
              text: `Could not add your topic. Please try again. Error: ${error.message}`
            });
          });
      }
    }
  };
  </script>
  