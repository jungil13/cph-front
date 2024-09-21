<template>
  <div class="min-h-screen mt-24">
    <!-- Hero Section -->
    <div class="bg-teal-50 flex flex-col md:flex-row items-center justify-center text-center py-12">
      <!-- Text Content on the left -->
      <div class="flex flex-col md:flex-row items-center justify-center text-center">
      <!-- Text Content on the left -->
      <div>
        <h1 class="text-3xl sm:text-3xl font-extrabold mb-2 text-teal-800">
          Adopt a Pet.
        </h1>
        <h2 class="text-4xl sm:text-5xl font-extrabold mb-2 text-gray-700">
          Find the right friend
        </h2>
        <h2 class="text-4xl sm:text-5xl font-extrabold mb-12 md:mb-0 text-orange-500">for you.</h2>
        <div class="mt-16">
      </div>
      </div>
      <!-- Image on the right -->
      <img src="/find.png" alt="Happy family with a pet" class="ml-6" width="500">
    </div>
  </div>
    <!-- Filters and Pet Cards -->
    <div class="px-5 py-6">
  <FilterPets @filteredPets="updatePets" />
  <div class="container mx-auto">
    <h2 class="text-4xl font-extrabold text-center text-teal-900 mb-6">Browse for Pets</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="pet in pets" :key="pet.id" class="relative bg-white shadow-lg border border-gray-300 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        <div class="relative group">
          <img :src="getPetPhotoUrl(pet.photoUrl[0])" alt="Animal Image" class="w-full h-48 object-cover">
          <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="flex overflow-hidden">
              <img v-for="(photo, index) in pet.photoUrl" :key="index" :src="getPetPhotoUrl(photo)" class="w-20 h-20 object-cover m-1 rounded-full" />
            </div>
          </div>
        </div>
        <div class="p-4">
          <span :class="pet.status === 'Adopted' ? 'bg-red-500' : 'bg-green-500'" class="absolute top-2 left-2 text-white font-semibold px-2 py-1 rounded">
            {{ pet.status }}
          </span>
          <h3 class="text-lg font-bold text-teal-900">{{ pet.name }}</h3>
          <p class="text-teal-600">Breed: {{ pet.breed }}</p>
          <p class="text-teal-600">Owner: <span class="text-gray-800 font-semibold">{{ pet.ownerFullName }}</span></p>
          <router-link :to="`/petdetails/${pet.id}`" class="mt-3 text-orange-600 font-bold inline-flex items-center hover:underline">View Details</router-link>
        </div>
      </div>
    </div>
  </div>
</div>
    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-4">
  <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
    <div class="flex items-center mb-4 md:mb-0">
      <img src="/cphlogo.png" alt="Cordova Pet Hub Logo" class="rounded-full w-24 h-24 mr-3 object-cover" />
      <div>
        <h5 class="text-lg font-semibold">Pet Adoption</h5>
        <p class="mt-2 text-sm">Contact us: <a href="mailto:cph@gmail.com" class="underline hover:text-gray-400">cph@gmail.com</a></p>
      </div>
    </div>
    <div class="text-sm space-y-2 md:space-y-0 md:block">
      <p>© 2024 Cordova Pet Hub. All rights reserved.</p>
      <p>Developed by: Team Alas</p>
    </div>
  </div>
</footer>
    </div>
    
</template>
<script>
import axios from 'axios';
import FilterPets from '@/components/FilterPets.vue';
import CarouselComponent from '@/components/CarouselComponent.vue';
import Swal from 'sweetalert2'; // Ensure SweetAlert2 is installed

export default {
  components: {
    CarouselComponent,
    FilterPets
  },
  data() {
    return {
      pets: []
    };
  },
  
  async created() {
    try {
        const response = await axios.get('http://localhost:3000/api/pets/approved', {
        });
        this.pets = response.data.map(pet => ({
            id: pet.PetID,
            photoUrl: pet.PetPhoto ? JSON.parse(pet.PetPhoto) : [], // Ensure photos are parsed if they are stored as JSON
            name: pet.PetName,
            breed: pet.Breed,
            status: pet.Status,
            ownerFullName: pet.ownerFullName || 'Unknown',
        }));
    } catch (error) {
        console.error('There was an error fetching the pets:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch approved pet data. Please try again later.',
        });
    }
},

  methods: {
    getPetPhotoUrl(photoPath) {
      return photoPath ? `http://localhost:3000/${photoPath}` : '/default-image.jpg'; // Replace with a valid default image path
    },
    
    updatePets(filteredPets) {
      this.pets = filteredPets.map(pet => ({
        id: pet.PetID,
        photoUrl: pet.PetPhoto ? JSON.parse(pet.PetPhoto) : [],
        name: pet.PetName,
        breed: pet.Breed,
        status: pet.Status,
        ownerFullName: pet.ownerFullName || 'Unknown',
        ownerId: pet.OwnerID,
        status: pet.Status  // Ensure status is included in the mapping
      }));
    }
  }
};
</script>

