<template>
  <div class="p-6 min-h-screen shadow-md shadow-black">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-extrabold text-gray-800 mb-4 text-center">Pet Management</h1>
      <div class="justify-center flex items-center">
        <div class="relative w-1/3">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="material-icons text-gray-500">search</span>
          </span>
          <input type="text"
            class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search pets..." v-model="searchQuery" @input="fetchPets" />
        </div>
      </div>
    </div>

    <!-- Pets Table -->
    <div class="overflow-x-auto bg-white shadow-lg rounded-lg shadow-black">
      <table class="min-w-full whitespace-nowrap bg-white">
        <thead class="bg-blue-600 text-white uppercase text-sm leading-normal">
          <tr>
            <th class="py-3 px-6 text-left">Pet Photo</th>
            <th class="py-3 px-6 text-left">Pet ID</th>
            <th class="py-3 px-6 text-left">Current Owner</th>
            <th class="py-3 px-6 text-left">Type</th>
            <th class="py-3 px-6 text-left">Name</th>
            <th class="py-3 px-6 text-left">Breed</th>
            <th class="py-3 px-6 text-center">Description</th>
            <th class="py-3 px-6 text-center">Status</th>
            <th class="py-3 px-6 text-center">Date Added</th>
            <th class="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-semibold">
          <tr v-for="pet in pets" :key="pet.PetID" class="border-b border-gray-200 hover:bg-yellow-100">
            <td class="py-3 px-6 text-left">
              <img :src="getPetPhotoUrl(pet.photoUrl[0])" alt="Animal Image"
                class="w-20 h-20 object-cover rounded-full shadow-md shadow-black">
            </td>
            <td class="py-3 px-6 text-left">{{ pet.PetID }}</td>
            <td class="py-3 px-6 text-left">{{ pet.ownerFullName }}</td>
            <td class="py-3 px-6 text-left">{{ pet.Type }}</td>
            <td class="py-3 px-6 text-left">{{ pet.PetName }}</td>
            <td class="py-3 px-6 text-left">{{ pet.Breed }}</td>
            <td class="py-3 px-6 text-center">{{ pet.Description }}</td>
            <td class="py-3 px-6 text-center">{{ pet.Status }}</td>
            <td class="py-3 px-6 text-center">{{ pet.DateAdded }}</td>
            <td class="py-3 px-6 text-center">
              <div class="flex items-center justify-center space-x-2">
                <button class="w-8 h-8 rounded-full hover:bg-blue-100 flex items-center justify-center"
                  @click="viewPet(pet.PetID)">
                  <span class="material-icons text-blue-500">visibility</span>
                </button>
                <button class="w-8 h-8 rounded-full hover:bg-yellow-100 flex items-center justify-center"
                  @click="editPet(pet.PetID)">
                  <span class="material-icons text-yellow-500">edit</span>
                </button>
                <button class="w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center"
                  @click="deletePet(pet.PetID)">
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
      <div class="bg-white rounded-lg p-6 shadow-lg max-w-4xl w-full">
        <h2 class="text-2xl font-bold mb-4">{{ isEditing ? 'Edit Pet' : 'Pet Details' }}</h2>
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Pet Image Section -->
          <div class="flex-1">
            <img :src="getPetPhotoUrl(selectedPet.PetPhoto[0])" alt="Pet Image"
              class="w-full h-auto object-cover rounded-lg mb-4" />
            <h3 class="text-lg font-semibold">Additional Photos:</h3>
            <div class="flex overflow-x-auto space-x-2">
              <img v-for="(photo, index) in selectedPet.PetPhoto" :key="index" :src="getPetPhotoUrl(photo)"
                class="w-20 h-20 object-cover rounded-md" />
            </div>
            <h3 class="text-lg font-semibold mt-4">Vaccination Certificate:</h3>
            <div class="flex overflow-x-auto space-x-2">
              <img v-for="(cert, index) in selectedPet.VaccinationCertificate" :key="index" :src="getPetPhotoUrl(cert)"
                class="w-20 h-20 object-cover rounded-md" />
            </div>
          </div>

          <!-- Pet Info Section -->
          <div class="flex-1">
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="petName">Pet Name</label>
              <input v-model="selectedPet.PetName" id="petName" type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :readonly="!isEditing" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="petType">Type</label>
              <input v-model="selectedPet.Type" id="petType" type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :readonly="!isEditing" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="petBreed">Breed</label>
              <input v-model="selectedPet.Breed" id="petBreed" type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :readonly="!isEditing" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="petDescription">Description</label>
              <textarea v-model="selectedPet.Description" id="petDescription"
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :readonly="!isEditing"></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="petStatus">Status</label>
              <select v-model="selectedPet.Status" id="petStatus"
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :disabled="!isEditing">
                <option value="Available">Available</option>
                <option value="Adopted">Adopted</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="dateAdded">Date Added</label>
              <input v-model="selectedPet.DateAdded" id="dateAdded" type="date"
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :readonly="!isEditing" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="petOwner">Current Owner</label>
              <input v-model="selectedPet.ownerFullName" id="petOwner" type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" readonly />
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button type="button" @click="userModalVisible = false"
            class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Cancel</button>
          <button v-if="isEditing" type="button" @click="updatePet(selectedPet.PetID)"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-4">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const pets = ref([]);
const searchQuery = ref('');
const userModalVisible = ref(false);
const isEditing = ref(false);
const selectedPet = ref(null);

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// Fetch pets based on the search query
const fetchPets = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/pets`, {
      params: { search: searchQuery.value }
    });
    pets.value = response.data.map(pet => ({
      ...pet,
      photoUrl: pet.PetPhoto ? JSON.parse(pet.PetPhoto) : ['/default-image.jpg']
    }));
  } catch (error) {
    console.error('Failed to fetch pets:', error);
  }
};

onMounted(fetchPets);

// View pet details in a modal
function viewPet(petId) {
  axios.get(`http://localhost:3000/api/pets/${petId}`)
    .then(response => {
      selectedPet.value = response.data;
      userModalVisible.value = true;
      isEditing.value = false;
    })
    .catch(error => {
      console.error('Error fetching pet details:', error);
    });
}

// Edit pet details
function editPet(petId) {
  axios.get(`http://localhost:3000/api/pets/${petId}`)
    .then(response => {
      selectedPet.value = response.data;
      userModalVisible.value = true;
      isEditing.value = true;
    })
    .catch(error => {
      console.error('Error fetching pet for editing:', error);
    });
}

// Delete pet
async function deletePet(petId) {
  if (confirm('Are you sure you want to delete this pet?')) {
    try {
      await axios.delete(`http://localhost:3000/admin/pets/${petId}`);
      fetchPets(); // Refresh the pet list
    } catch (error) {
      console.error('Failed to delete pet:', error);
    }
  }
}

// Update pet details
async function updatePet() {
  try {
    const updatedPet = { ...selectedPet.value };
    await axios.put(`http://localhost:3000/admin/pets/${updatedPet.PetID}`, updatedPet);
    Swal.fire('Success', 'Pet details updated successfully', 'success');
    fetchPets();
    userModalVisible.value = false;
  } catch (error) {
    Swal.fire('Error', 'An error occurred while updating pet details', 'error');
    console.error('Error updating pet:', error);
  }
}

// Get pet photo URL
function getPetPhotoUrl(photoPath) {
  return photoPath ? `http://localhost:3000/${photoPath}` : '/default-image.jpg';
}
</script>

<style scoped>
.material-icons {
  font-size: 1.25rem;
  /* Adjust icon size */
}
</style>
