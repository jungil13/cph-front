<template>
  <div class="p-6 rounded-lg shadow-lg shadow-black min-h-screen">
    <h1 class="text-3xl font-extrabold mb-8 text-center">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div class="bg-blue-600 shadow-lg shadow-black rounded-lg p-5 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-white">Users</h2>
          <p class="text-3xl font-bold text-white">{{ usersCount }}</p>
        </div>
        <div class="text-white">
          <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </div>

      <div class="bg-orange-600 shadow-lg shadow-black rounded-lg p-12 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-white"> Pets</h2>
          <p class="text-3xl font-bold text-white">{{ petsCount }}</p>
        </div>
        <div class="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-white bg-white rounded-full" fill="none"
            viewBox="0 0 128 128" id="pets">
            <circle cx="29" cy="59" r="9" stroke="#1F1F1F" stroke-width="7" transform="rotate(180 29 59)"></circle>
            <circle cx="9" cy="9" r="9" stroke="#1F1F1F" stroke-width="7" transform="matrix(1 0 0 -1 89 68)"></circle>
            <circle cx="47" cy="35" r="9" stroke="#1F1F1F" stroke-width="7" transform="rotate(180 47 35)"></circle>
            <circle cx="9" cy="9" r="9" stroke="#1F1F1F" stroke-width="7" transform="matrix(1 0 0 -1 71 44)"></circle>
            <path stroke="#1F1F1F" stroke-width="7"
              d="M54.8737 60.5977C57.0288 57.7033 60.4097 56 64 56C67.5903 56 70.9711 57.7033 73.1262 60.5977L90.745 84.2612C97.3711 93.1606 88.2727 105.239 77.9884 101.196L71.9698 98.8305C66.8446 96.8156 61.1554 96.8156 56.0302 98.8305L50.0116 101.196C39.7273 105.239 30.6289 93.1606 37.255 84.2612L54.8737 60.5977Z">
            </path>
          </svg>
        </div>
      </div>

      <div class="bg-teal-600 shadow-lg shadow-black rounded-lg p-5 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-white">Reports</h2>
          <p class="text-3xl font-bold text-white">{{ reportsCount }}</p>
        </div>
        <div class="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="reports"
            class="h-12 w-12 text-white bg-white rounded-xl">
            <path
              d="m285.79,116.41c-4.88-4.88-4.88-12.8,0-17.68l31.39-31.39c4.88-4.88,12.8-4.88,17.68,0l31.39,31.39c4.88,4.88,4.88,12.8,0,17.68-2.44,2.44-5.64,3.66-8.84,3.66s-6.4-1.22-8.84-3.66l-10.05-10.05v48.43c0,6.9-5.6,12.5-12.5,12.5s-12.5-5.6-12.5-12.5v-48.43l-10.05,10.05c-4.88,4.88-12.8,4.88-17.68,0Zm38.24,93.31c0,6.9,5.6,12.5,12.5,12.5h42.86c6.9,0,12.5-5.6,12.5-12.5s-5.6-12.5-12.5-12.5h-42.86c-6.9,0-12.5,5.6-12.5,12.5Zm55.36,35.04h-42.86c-6.9,0-12.5,5.6-12.5,12.5s5.6,12.5,12.5,12.5h42.86c6.9,0,12.5-5.6,12.5-12.5s-5.6-12.5-12.5-12.5Zm-227.1-27.81l10.05-10.05v48.43c0,6.9,5.6,12.5,12.5,12.5s12.5-5.6,12.5-12.5v-48.43l10.05,10.05c2.44,2.44,5.64,3.66,8.84,3.66s6.4-1.22,8.84-3.66c4.88-4.88,4.88-12.8,0-17.68l-31.39-31.39c-4.88-4.88-12.8-4.88-17.68,0l-31.39,31.39c-4.88,4.88-4.88,12.8,0,17.68,4.88,4.88,12.8,4.88,17.68,0Zm75.91,80.81h-106.72c-6.9,0-12.5,5.6-12.5,12.5s5.6,12.5,12.5,12.5h106.72c6.9,0,12.5-5.6,12.5-12.5s-5.6-12.5-12.5-12.5Zm0,47.54h-106.72c-6.9,0-12.5,5.6-12.5,12.5s5.6,12.5,12.5,12.5h106.72c6.9,0,12.5-5.6,12.5-12.5s-5.6-12.5-12.5-12.5Zm233.16,43.67c0,57.89-47.1,104.99-104.99,104.99-35.31,0-66.61-17.53-85.65-44.34-4.44,1.58-9.22,2.45-14.2,2.45H93.14c-23.43,0-42.5-19.06-42.5-42.5v-248.48c0-23.43,19.07-42.5,42.5-42.5h108.69v-58.03c0-23.44,19.06-42.5,42.5-42.5h163.38c23.43,0,42.5,19.06,42.5,42.5v248.47c0,8.11-2.29,15.69-6.24,22.14,10.98,16.59,17.39,36.46,17.39,57.8ZM226.83,118.58h29.69c23.44,0,42.5,19.07,42.5,42.5v139.99c16.5-10.8,36.2-17.09,57.35-17.09,26.3,0,50.36,9.72,68.8,25.75,0-.24.04-.47.04-.71V60.55c0-9.65-7.86-17.5-17.5-17.5h-163.38c-9.65,0-17.5,7.85-17.5,17.5v58.03Zm31.66,308.37c-4.59-11.79-7.11-24.59-7.11-37.98,0-24.55,8.47-47.15,22.64-65.05v-162.83c0-9.64-7.85-17.5-17.5-17.5H93.14c-9.65,0-17.5,7.86-17.5,17.5v248.48c0,9.65,7.85,17.5,17.5,17.5h163.38c.67,0,1.33-.04,1.97-.11Zm177.86-37.98c0-44.11-35.88-79.99-79.99-79.99s-79.99,35.88-79.99,79.99,35.88,79.99,79.99,79.99,79.99-35.88,79.99-79.99Zm-71.15-52.35c-4.88-4.88-12.8-4.88-17.68,0l-34.75,34.75c-4.88,4.88-4.88,12.8,0,17.68,4.88,4.88,12.8,4.88,17.68,0l13.41-13.41v56.85c0,6.9,5.6,12.5,12.5,12.5s12.5-5.6,12.5-12.5v-56.85l13.41,13.41c2.44,2.44,5.64,3.66,8.84,3.66s6.4-1.22,8.84-3.66c4.88-4.88,4.88-12.8,0-17.68l-34.75-34.75Z">
            </path>
          </svg>
        </div>
      </div>
      <div class="bg-yellow-300 shadow-lg shadow-black rounded-lg p-5 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold">Forum Posts</h2>
          <p class="text-3xl font-bold">{{ forumCount }}</p>
        </div>
        <div class="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="forum"
            class="bg-white rounded-full h-12 w-12">
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path
              d="M15 4v7H5.17L4 12.17V4h11m1-2H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm5 4h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1z">
            </path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Dashboard',
  data() {
    return {
      usersCount: 0,
      petsCount: 0,
      reportsCount: 0,
      forumCount: 0
    };
  },
  created() {
    this.fetchUserCount();
    this.fetchPetCount();
    this.fetchReportCount();
    this.fetchForumCount();
  },
  methods: {
    fetchUserCount() {
      const token = localStorage.getItem('token');
      axios.get('http://localhost:3000/admin/user-count', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {

          this.usersCount = response.data.count;
        })
        .catch(error => {
          console.error('Error fetching user count:', error);
          this.usersCount = 'Error';
        });
    },
    fetchPetCount() {
      const token = localStorage.getItem('token');
      axios.get('http://localhost:3000/admin/pet-count', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {

          this.petsCount = response.data.count;
        })
        .catch(error => {
          console.error('Error fetching pets count:', error);
          this.petsCount = 'Error';
        });
    },
    fetchReportCount() {
      const token = localStorage.getItem('token');
      axios.get('http://localhost:3000/admin/report-count', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {

          this.reportsCount = response.data.count;
        })
        .catch(error => {
          console.error('Error fetching reports count:', error);
          this.reportsCount = 'Error';
        });
    },
    fetchForumCount() {
      const token = localStorage.getItem('token');
      axios.get('http://localhost:3000/admin/forum-count', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {

          this.forumCount = response.data.count;
        })
        .catch(error => {
          console.error('Error fetching reports count:', error);
          this.forumCount = 'Error';
        });
    }
  }
};
</script>

<style scoped>
</style>
