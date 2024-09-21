<template>
  <Forum />
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-teal-800 p-6 rounded-xl shadow-md shadow-black">
    <div class="text-center">
      <button @click="showAddHealthModal = true"
        class="mb-6 bg-yellow-300 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
        Add New Topic
      </button>
    </div>
    <div class="mx-auto lg:mx-0">
      <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">Health and Nutrition Forum</h2>
      <p class="mt-2 text-lg leading-8 text-white text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa illo quaerat distinctio.</p>
    </div>
    <div class="">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:grid-cols-3">
          <article v-for="topic in topics" :key="topic.id" class="flex flex-col bg-white justify-between border rounded-xl p-6 shadow-md shadow-black border-gray-400 pt-10">
            <div class="flex items-center gap-x-4 text-xs">
              <time :datetime="topic.PostDate" class="text-gray-500">{{ topic.PostDate }}</time>
              <a href="#" class="relative z-10 rounded-full bg-pink-300 px-3 py-1.5 poppins-bold text-gray-600 hover:bg-gray-100">Health</a>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a href="#">
                  <span class="absolute inset-0"></span>
                  {{ topic.Title }}
                </a>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ topic.Content }}</p>
            </div>
            <div class="relative mt-8 flex items-center gap-x-4 text-center">
              <img :src="getImageUrl(topic.AuthorProfilePhoto)" alt="Author's Profile Photo" class="w-12 h-12 rounded-full shadow-md shadow-black border border-white" />
              <div class="text-sm leading-6">
                <p class="font-semibold text-gray-900">
                  <a href="#">
                    <span class="absolute inset-0"></span>
                    {{ topic.AuthorFullName }}
                  </a>
                </p>
              </div>
            </div>
            <div class="mt-8 text-center">
            <router-link :to="`/topic/${topic.PostID}`" class="text-blue-600 font-bold p-2 rounded-full">View Post</router-link>
          </div>
          </article>
        </div>
      </div>
    </div>
    <AddHealthModal v-if="showAddHealthModal" @close="showAddHealthModal = false" @submit="addNewTopic" />
  </div>
  <footer class="bg-gray-800 text-white py-8 mt-16">
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <div class="text-center md:text-left mb-4 md:mb-0">
        <h5 class="text-lg font-semibold">Pet Adoption</h5>
        <p class="mt-2 text-sm">Contact us: <a href="mailto:info@petadoption.com" class="underline hover:text-gray-400">info@petadoption.com</a></p>
      </div>
      <div class="text-center md:text-right text-sm">
        <p>© 2024 Pet Adoption. All rights reserved.</p>
        <p>Developed by: Jun Gil</p>
      </div>
    </div>
  </footer>
</template>

<script>
import axios from 'axios';
import Forum from "@/views/user/Forum.vue";
import AddHealthModal from "@/components/ForumItems/AddHealthModal.vue";

export default {
components: {
  Forum,
  AddHealthModal
},
data() {
  return {
    topics: [],
    showAddHealthModal: false
  };
},
created() {
  this.fetchPosts();
},
methods: {
  getImageUrl(path) {
      return path ? `http://localhost:3000/${path.replace(/\\/g, '/')}` : '/path/to/default/image.jpg';
    },
  async fetchPosts() {
    try {
      const response = await axios.get('http://localhost:3000/api/forum/posts/2', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      this.topics = response.data;
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  },
  addNewTopic(newTopic) {
    axios.post('http://localhost:3000/api/forum/posts', {
      categoryID: 2,
      title: newTopic.title,
      content: newTopic.content
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      this.topics.unshift(response.data); 
      this.showAddHealthModal = false; 
      this.fetchUserDetails();
    })
    .catch(error => {
      console.error('Failed to add new topic:', error);
      location.reload();
    });
  },
  viewTopic(topicId) {
    this.$router.push({ name: "TopicDetail", params: { id: topicId } });
  }
}
};
</script>
