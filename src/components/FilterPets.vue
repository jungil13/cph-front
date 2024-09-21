<template>
  <div class="flex justify-center mt-1 w-full bg-teal-50">
    <!-- Filter Form -->
    <form @submit.prevent="applyFilters" class="flex flex-col items-center bg-teal-50 p-4">
      <div class="w-full mb-4">
        <label for="type" class="block text-teal-900 text-xl font-extrabold mb-2 text-center">Filter by Pet Type</label>
        <select id="type" v-model="filters.type" class="text-white font-bold text-lg bg-teal-600 text-center block w-full mt-1 px-3 py-2 rounded-full border border-xl border-white focus:outline-none focus:ring focus:ring-blue-600 text-sm">
          <option value="">All</option>
          <option class v-for="type in petTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
      <button type="submit" class="mb-20 text-center bg-orange-600 text-white font-bold text-lg rounded-xl py-2 p-8 border border-white">
        Filter
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      filters: {
        type: ''
      },
      petTypes: [] // List of pet types fetched from the backend
    };
  },
  methods: {
    async fetchPetTypes() {
      try {
        const response = await axios.get('http://localhost:3000/api/pets/types');
        this.petTypes = response.data;
      } catch (error) {
        console.error('Error fetching pet types:', error);
      }
    },
    async applyFilters() {
      try {
        const response = await axios.get('http://localhost:3000/api/pets/bytypes', { params: { type: this.filters.type } });
        this.$emit('filteredPets', response.data); // Emit filtered pets
      } catch (error) {
        console.error('Error fetching filtered pets:', error);
      }
    }
  },
  mounted() {
    this.fetchPetTypes();
  }
};
</script>

<style scoped>
/* Centering the form and adjusting its size */
form {
  max-width: 400px; /* Limit the maximum width */
  width: 100%; /* Ensure it scales down on smaller screens */
}
</style>
