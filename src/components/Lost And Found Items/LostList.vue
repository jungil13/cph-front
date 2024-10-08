<template>
  <div class="mt-24">
  <div class="bg-teal-50 flex flex-col md:flex-row items-center justify-center text-center py-12">
      <!-- Text Content on the left -->
      <div class="flex flex-col md:flex-row items-center justify-center text-center">
      <!-- Text Content on the left -->
      <div>
        <h1 class="text-3xl sm:text-3xl font-extrabold mb-2 text-teal-800">
          Reuniting Paws with Purpose
        </h1>
        <h2 class="text-4xl sm:text-5xl font-extrabold mb-2 text-gray-700">
          Every Pet Deserves to 
        </h2>
        <h2 class="text-4xl sm:text-5xl font-extrabold mb-12 md:mb-0 text-orange-500">Find Its Way Home.</h2>
        <div class="mt-16">
      </div>
      </div>
      <!-- Image on the right -->
      <img src="/iro.png" alt="Happy family with a pet" class="ml-6 border rounded-full bg-orange-50 shadow-md shadow-black">
    </div>
  </div>
<h1 class="text-4xl font-extrabold mb-6 text-center text-teal-900">Reports Listings</h1>
  <div class=" p-5 rounded-lg shadow-lg ">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center ">
      <!-- Pet Card -->
      <div v-for="report in reports" :key="report.ReportID" class="max-w-6xl mx-auto p-2 bg-white border rounded-lg shadow-lg shadow-black overflow-hidden relative group transform transition-transform duration-300 hover:scale-105">
        <!-- Pet Image -->
        <div class="relative group">
          <img :src="getImageUrl(report.Photo)[0]" alt="Pet Picture" class="w-full h-48 object-cover">
          <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="flex overflow-hidden">
              <img 
                v-for="(photo, index) in getImageUrl(report.Photo)" 
                :key="index" 
                :src="photo" 
                class="w-20 h-20 object-cover m-1" 
                alt="Additional Pet Picture"
              />
            </div>
          </div>
        </div>
        <span :class="report.Status === 'Closed' ? 'bg-red-500' : 'bg-green-500'" class="absolute top-3 left-4 text-white font-semibold px-2 py-1 rounded">
            {{ report.Status }}
          </span>
        <!-- Pet Details -->
        <div class="p-4 font-bold">
          <h2 class="text-xl font-bold text-gray-800 mb-2">({{ report.Description }})<span class="m-1 text-md text-red-700">{{report.ReportType}}</span></h2>
          <h2 class="font-bold text-gray-800 mb-2">Reporters Name : <span class="bg-teal-500 rounded-lg p-1 text-white">{{ report.reporterFullName }}</span></h2>
          <p class="text-gray-600 mb-6">Location : <span>{{ report.Location }}</span></p>
          <!-- View Details Button -->
          <router-link :to="`/lostpetdetails/${report.ReportID}`" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            View Details
          </router-link>
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
import axios from 'axios';


export default {
  data() {
    return {
      reports: [] // Initialize reports as an empty array
    };
  },
  mounted() {
    this.fetchReports();
  },
  methods: {
    fetchReports() {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      // Set up the Axios header with the retrieved token
      const config = {
        headers: {
          Authorization: `Bearer ${token}` // Append the token as a Bearer token
        }
      };

      axios.get('http://localhost:3000/api/reports', config)
        .then(response => {
          this.reports = response.data; // Assign fetched reports to data property
        })
        .catch(error => {
          console.error('Error fetching reports:', error);
          alert('Failed to fetch reports. Please make sure you are logged in.');
        });
    },
    getImageUrl(photo) {
      let photos = [];
      try {
        photos = photo ? JSON.parse(photo) : [];
      } catch (error) {
        console.error('Failed to parse photo data:', error);
        // Handle error or return a default value
      }
      return photos.map(p => `http://localhost:3000/${p}`);
    }
  }
};
</script>

<style scoped>
/* Additional styles for hover effects */
.group-hover\:opacity-100 {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>
