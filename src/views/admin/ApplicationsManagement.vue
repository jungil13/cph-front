<template>
    <div class="p-6 bg-white min-h-screen">
        <!-- Header and Search Bar -->
        <div class="flex flex-col items-center mb-6">
            <h1 class="text-3xl font-extrabold text-gray-800 mb-4">Applications Management</h1>
            <div class="relative w-full max-w-xl">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <span class="material-icons text-gray-500">search</span>
                </span>
                <input type="text"
                    class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    placeholder="Search applications..." />
            </div>
        </div>

        <!-- Content -->
        <div class="flex justify-center">
            <div class="w-full overflow-x-auto bg-white shadow-md rounded-lg shadow-black">
                <table class="min-w-full bg-white">
                    <thead class="bg-blue-600 text-white font-bold">
                        <tr>
                            <th class="py-3 px-6 text-left">Applicant</th>
                            <th class="py-3 px-6 text-left">Pet Name</th>
                            <th class="py-3 px-6 text-left">Pet Experience</th>
                            <th class="py-3 px-6 text-left">Reason For Adoption</th>
                            <th class="py-3 px-6 text-left">Status</th>
                            <th class="py-3 px-6 text-left">Date Submitted</th>
                            <th class="py-3 px-6 text-center">Profile</th>
                            <th class="py-3 px-6 text-center">Pet Photo</th>
                            <th class="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-500 font-bold text-sm">
                        <tr v-for="application in applications" :key="application.ApplicationID"
                            class="hover:bg-gray-100">
                            <td class="py-3 px-6 text-left">{{ application.ApplicantName }}</td>
                            <td class="py-3 px-6 text-left">{{ application.PetName }}</td>
                            <td class="py-3 px-6 text-left">{{ application.PetExperience }}</td>
                            <td class="py-3 px-6 text-left">{{ application.ReasonForAdoption }}</td>
                            <td class="py-3 px-6 text-center">
                                <span :class="application.Status === 'approved' ? 'bg-green-200 text-green-700' :
                                    application.Status === 'declined' ? 'bg-red-200 text-red-700' :
                                        'bg-blue-200 text-blue-700'" class="py-1 px-3 text-xs rounded-full">
                                    {{ application.Status }}
                                </span>
                            </td>

                            <td class="py-3 px-6 text-left">{{ application.DateSubmitted }}</td>
                            <td class="py-3 px-6 text-center">
                                <img :src="getProfilePhotoUrl(application.ApplicantProfilePhoto)" alt="Applicant Photo"
                                    class="h-20 w-20 rounded-full shadow-md shadow-black">
                            </td>
                            <td class="py-3 px-6 text-center">
                                <img :src="getProfilePhotoUrl(application.PetPhoto[0])" alt="Pet Photo"
                                    class="h-20 w-20 rounded-xl shadow-md shadow-black">
                            </td>
                            <td class="py-3 px-6 text-center flex justify-center space-x-4">
                                <span class="material-icons text-blue-500 hover:text-blue-700 cursor-pointer"
                                    @click="openModal(application)">visibility</span>
                                <span class="material-icons text-red-500 hover:text-red-700 cursor-pointer"
                                    @click="deleteApplication(application.ApplicationID)">delete</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal for Detailed View -->
        <div v-if="selectedApplication"
            class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
            <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full">
                <div class="flex justify-between items-center border-b p-4 text-xl">
                    <h3>{{ selectedApplication.ApplicantName }}'s Application</h3>
                    <span class="material-icons text-black hover:text-red-500 cursor-pointer"
                        @click="selectedApplication = null">close</span>
                </div>
                <div class="p-4 grid grid-cols-2 gap-4">
                    <div>
                        <img :src="getProfilePhotoUrl(selectedApplication.ApplicantProfilePhoto)" alt="Applicant Photo"
                            class="rounded-xl h-30 w-30 object-cover">
                    </div>
                    <div class="space-y-2">
                        <p><strong>Email:</strong> {{ selectedApplication.ApplicantEmail }}</p>
                        <p><strong>Address:</strong> {{ selectedApplication.ApplicantAddress }}</p>
                        <p><strong>Contact Number:</strong> {{ selectedApplication.ApplicantContactnumber }}</p>
                        <p><strong>Pet Experience:</strong> {{ selectedApplication.PetExperience }}</p>
                        <p><strong>Contact Number:</strong> {{ selectedApplication.ApplicantContactnumber }}</p>
                        <p><strong>Home Environment:</strong> {{ selectedApplication.HomeEnvironment }}</p>
                        <p><strong>Other Pets:</strong> {{ selectedApplication.OtherPets }}</p>
                        <p><strong>Children At Home:</strong> {{ selectedApplication.ChildrenAtHome }}</p>
                        <p><strong>Reason For Adoption:</strong> {{ selectedApplication.ReasonForAdoption }}</p>
                        <p><strong>Status:</strong> {{ selectedApplication.Status }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const applications = ref([]);
const selectedApplication = ref(null);
const isLoading = ref(true);
const isError = ref(false);

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const fetchApplications = async () => {
    isLoading.value = true;
    isError.value = false;
    try {
        const response = await axios.get('http://localhost:3000/api/applications');
        applications.value = response.data;
        isLoading.value = false;
    } catch (error) {
        console.error('Failed to fetch applications:', error);
        Swal.fire('Error', 'Could not fetch applications.', 'error');
        isLoading.value = false;
        isError.value = true;
    }
};

const approveApplication = async (applicationId) => {
    try {
        await axios.post(`http://localhost:3000/api/applications/${applicationId}/approve`);
        Swal.fire('Approved!', 'The application has been approved.', 'success');
        fetchApplications(); // Refresh the list
    } catch (error) {
        console.error('Failed to approve application:', error);
        Swal.fire('Error', 'Failed to approve application.', 'error');
    }
};

const rejectApplication = async (applicationId) => {
    try {
        await axios.post(`http://localhost:3000/api/applications/${applicationId}/decline`);
        Swal.fire('Rejected!', 'The application has been rejected.', 'success');
        fetchApplications(); // Refresh the list
    } catch (error) {
        console.error('Failed to reject application:', error);
        Swal.fire('Error', 'Failed to reject application.', 'error');
    }
};

const openModal = (application) => {
    selectedApplication.value = application;
};

const getProfilePhotoUrl = (photoPath) => {
    return photoPath ? `http://localhost:3000/${photoPath}` : '/default-image.jpg';
};

onMounted(fetchApplications);
</script>
