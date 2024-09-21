<template>
  <div class="w-full">
    <Account />

    <!-- Manage Pet Listings Header -->
    <div class="bg-white p-5 text-center shadow shadow-black border border-black mb-8 mx-6 rounded-lg">
      <h1 class="text-2xl text-gray-700 font-extrabold">Manage Pet Listings</h1>
    </div>

    <div class="p-8">
      <div v-if="pets.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="pet in pets" :key="pet.id"
          class="relative flex flex-col bg-gray-100 p-4 rounded-lg shadow-lg shadow-black transition-transform transform hover:scale-105">
          <!-- Pet Image -->
          <div class="relative group w-full h-48">
            <img :src="getImageUrl(pet.photoUrl[0])" alt="Report Picture"
              class="w-full h-full object-cover rounded-md mb-4 transition-transform duration-300 group-hover:scale-105">
            <div v-if="pet.photoUrl.length > 1"
              class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="flex space-x-2 overflow-auto">
                <img v-for="(photo, index) in pet.photoUrl" :key="index" :src="getImageUrl(photo)" alt="Report Photo"
                  class="w-24 h-24 object-cover rounded-md">
              </div>
            </div>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="mb-4">
              <div class="flex justify-center items-center mb-2">
                <h3 class="text-xl font-bold text-gray-800 ml-4 mr-2"><span>Pet Name : </span>{{ pet.PetName }}</h3>
                <span class="font-bold text-lg text-teal-800">
                  ({{ pet.PetID }})
                </span>
              </div>
              <h3 class="text-lg font-bold text-black text-center ml-4 mr-2 mb-2">Breed : <span class="text-white bg-teal-600 p-1 py-1 rounded-full ">{{ pet.Breed }}</span></h3>
              <h3 class="text-lg font-bold text-black text-center ml-4 mr-2 mb-2">Status : <span class="text-gray-700 font-serif">{{ pet.Status }}</span></h3>
            </div>

            <div class="mt-auto text-center">
              <button @click="editPet(pet)" class="bg-blue-500 text-white py-2 px-4 rounded flex-1 mr-2">
                Edit Pet
              </button>
              <button @click="deletePet(pet)" class="bg-red-500 text-white py-2 px-4 rounded flex-1"
                :disabled="pet.Status === 'Adopted'">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-center text-gray-600">You have no pets listed.</p>
    </div>
    <div v-if="editingPet" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6">
        <h2 class="text-2xl font-bold mb-4">Edit Pet</h2>

        <form @submit.prevent="updatePet" class="flex flex-wrap -mx-4">
          <div class="w-full lg:w-1/2 px-4 mb-4">
            <label for="petName" class="block mb-2">Name:</label>
            <input v-model="editingPet.PetName" id="petName" type="text" class="border rounded p-2 w-full" />
          </div>

          <div class="w-full lg:w-1/2 px-4 mb-4">
            <label for="type" class="block mb-2">Type:</label>
            <input v-model="editingPet.Type" id="type" type="text" class="border rounded p-2 w-full" />
          </div>

          <div class="w-full lg:w-1/2 px-4 mb-4">
            <label for="breed" class="block mb-2">Breed:</label>
            <input v-model="editingPet.Breed" id="breed" type="text" class="border rounded p-2 w-full" />
          </div>

          <div class="w-full lg:w-1/2 px-4 mb-4">
            <label for="markings" class="block mb-2">Markings:</label>
            <input v-model="editingPet.Markings" id="markings" type="text" class="border rounded p-2 w-full" />
          </div>

          <div class="w-full lg:w-1/2 px-4 mb-4">
            <label for="species" class="block mb-2">Species:</label>
            <input v-model="editingPet.Species" id="species" type="text" class="border rounded p-2 w-full" />
          </div>

          <div class="w-full lg:w-1/2 px-4 mb-4">
            <label for="sex" class="block mb-2">Sex:</label>
            <input v-model="editingPet.Sex" id="sex" type="text" class="border rounded p-2 w-full" />
          </div>

          <div class="w-full lg:w-1/2 px-4 mb-4">
            <label for="status" class="block mb-2">Status:</label>
            <select v-model="editingPet.Status" id="status" class="border rounded p-2 w-full">
              <option value="Adopted">Adopted</option>
              <option value="Available">Available</option>
            </select>
          </div>


          <div class="w-full px-4 mb-4">
            <label for="description" class="block mb-2">Description:</label>
            <textarea v-model="editingPet.Description" id="description" class="border rounded p-2 w-full"
              rows="4"></textarea>
          </div>

          <div class="w-full flex justify-between px-4 mt-4">
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Update Pet</button>
            <button @click="cancelEdit" class="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="selectedPet" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-24">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <img :src="selectedPet.PetPhoto" :alt="`Image of ${selectedPet.PetName}`"
          class="w-full h-48 object-cover mb-4" />
        <p><strong>Name:</strong> {{ selectedPet.PetName }}</p>
        <p><strong>Type:</strong> {{ selectedPet.Type }}</p>
        <p><strong>Breed:</strong> {{ selectedPet.Breed }}</p>
        <p><strong>Markings:</strong> {{ selectedPet.Markings }}</p>
        <p><strong>Species:</strong> {{ selectedPet.Species }}</p>
        <p><strong>Sex:</strong> {{ selectedPet.Sex }}</p>
        <p><strong>Status:</strong> {{ selectedPet.Status }}</p>
        <p><strong>Description:</strong> {{ selectedPet.Description }}</p>
        <div class="flex justify-end mt-4">
          <button @click="closeDetails" class="bg-red-500 text-white py-2 px-4 rounded">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Account from "@/views/user/Profile/Account.vue";
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  components: {
    Account,
  },
  data() {
    return {
      pets: [],
      selectedPet: null,
      photoPreview: null,
      editingPet: null,
    };
  },
  created() {
    this.fetchPets();
  },
  methods: {
    hoverPet(pet, isHovering) {
      if (isHovering && pet.alternatePhoto) {
        pet.currentPhoto = pet.alternatePhoto;
      } else {
        pet.currentPhoto = pet.petPhoto;
      }
    },
    async fetchPets() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/api/pets/byownerid', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.pets = response.data.map(pet => ({
          ...pet,
          // Check if pet.Photo exists and is a valid JSON string before parsing
          photoUrl: pet.PetPhoto ? JSON.parse(pet.PetPhoto) : [], // Check and parse PetPhoto
        }));
      } catch (error) {
        console.error('Error fetching pet listings:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to load pet listings',
          text: 'Please try again later.',
        });
      }
    },

    showDetails(pet) {
      this.selectedPet = pet;
    },
    closeDetails() {
      this.selectedPet = null;
    },
    async editPet(pet) {
      this.editingPet = { ...pet }; // Clone the pet object for editing
    },
    cancelEdit() {
      this.editingPet = null; // Close the edit form
    },
    async updatePet() {
      const token = localStorage.getItem('token');
      console.log('Editing Pet Data:', this.editingPet); // Debugging line

      if (!this.editingPet || !this.editingPet.PetID) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid pet ID.',
        });
        return;
      }

      try {
        await axios.put(`http://localhost:3000/api/pets/${this.editingPet.PetID}`, this.editingPet, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire({
          icon: 'success',
          title: 'Pet updated successfully',
          text: 'Your pet information has been updated.',
        });
        this.fetchPets(); // Refresh pet listings
        this.cancelEdit(); // Close the edit form
      } catch (error) {
        console.error('Error updating pet:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error updating pet',
          text: 'Please try again later.',
        });
      }
    },
    async deletePet(pet) {
      const token = localStorage.getItem('token');
      try {
        await Swal.fire({
          title: 'Are you sure?',
          text: "This action cannot be undone!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios.delete(`http://localhost:3000/api/pets/${pet.PetID}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire({
              icon: 'success',
              title: 'Pet deleted successfully',
              text: 'The pet has been removed from your listings.',
            });
            this.fetchPets(); // Refresh pet listings
          }
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error deleting pet',
          text: 'Please try again later.',
        });
      }
    },

    handlePhotoChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.newPhoto = file; // Set the new photo file
        this.photoPreview = URL.createObjectURL(file); // Show the photo preview
      }
    },
    getImageUrl(photoPath) {
      return photoPath ? `http://localhost:3000/${photoPath}` : 'https://via.placeholder.com/150'; // Default placeholder URL
    }
  },
};
</script>

<style scoped>
.pet-image {
  transition: transform 0.3s ease;
}

.pet-image:hover {
  transform: scale(1.1);
}
</style>
