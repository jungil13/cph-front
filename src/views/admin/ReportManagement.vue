<template>
  <div class="p-6 min-h-screen shadow-md shadow-black">
    <div class="mb-6">
      <h1 class="text-3xl font-extrabold mb-4 text-gray-800 text-center">Lost and Found Pet Reports</h1>
      <div class="flex items-center justify-center">
        <div class="relative w-1/3">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="material-icons text-gray-500">search</span>
          </span>
          <input
            type="text"
            class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search reports..."
            v-model="searchQuery"
            @input="fetchReports"
          />
        </div>
      </div>
    </div>

    <div class="overflow-x-auto bg-white shadow-md shadow-black rounded-lg">
      <table class="min-w-full bg-white">
        <thead class="bg-blue-600 text-white uppercase text-sm leading-normal font-semibold">
          <tr>
            <th class="py-3 px-6 text-left">Report ID</th>
            <th class="py-3 px-6 text-left">Photo</th>
            <th class="py-3 px-6 text-left">Reporter Name</th>
            <th class="py-3 px-6 text-left">Location</th>
            <th class="py-3 px-6 text-left">Pet Description</th>
            <th class="py-3 px-6 text-center">Type</th>
            <th class="py-3 px-6 text-center">Status</th>
            <th class="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-semibold">
          <tr v-for="report in reports" :key="report.id" class="border-b border-gray-200 hover:bg-gray-100">
            <td class="py-3 px-6 text-left whitespace-nowrap">{{ report.ReportID }}</td>
            <td class="py-3 px-6 text-left">
              <img :src="getReportPhotoUrl(report.photoUrl[0])" alt="Report Photo" class="object-cover w-20 h-20 rounded-xl shadow-md shadow-black">
            </td>
            <td class="py-3 px-6 text-left">{{ report.reporterFullName }}</td>
            <td class="py-3 px-6 text-left">{{ report.Location }}</td>
            <td class="py-3 px-6 text-left">{{ report.Description }}</td>
            <td class="py-3 px-6 text-center">
              <span class="py-1 px-3 text-xs rounded-full bg-blue-200 text-blue-600">{{ report.ReportType }}</span>
            </td>
            <td class="py-3 px-6 text-center">
              <span :class="report.Status === 'Open' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'" class="py-1 px-3 text-xs rounded-full">
                {{ report.Status }}
              </span>
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex items-center justify-center space-x-2">
                <button class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-100" @click="viewReport(report)">
                  <span class="material-icons text-blue-500">visibility</span>
                </button>
                <button class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-100" @click="deleteReport(report)">
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

const reports = ref([]);
const searchQuery = ref('');

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const fetchReports = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/reports`, {
      params: { search: searchQuery.value }
    });
    reports.value = response.data.map(report => ({
      ...report,
      photoUrl: report.Photo ? JSON.parse(report.Photo) : ['/default-image.jpg']
    }));
  } catch (error) {
    console.error('Failed to fetch reports:', error);
    Swal.fire('Error', 'Could not fetch reports.', 'error');
  }
};

function getReportPhotoUrl(photoPath) {
  return photoPath ? `http://localhost:3000/${photoPath}` : '/default-profile.png';
}

function viewReport(report) {
  // Implement viewing functionality
}

function markAsResolved(report) {
  // Implement resolution functionality
}

function deleteReport(report) {
  // Implement deletion functionality
}

onMounted(fetchReports);
</script>

<style scoped>
.material-icons {
  font-size: 1.25rem;  
}
</style>
