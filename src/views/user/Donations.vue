<template>
  <div class="flex flex-col items-center justify-center min-h-screen mt-24">
    <div class="bg-teal-50 flex flex-col md:flex-row items-center justify-center text-center py-12">
      <!-- Text Content on the left -->
      <div class="flex flex-col md:flex-row items-center justify-center text-center">
        <!-- Text Content on the left -->
        <div>
          <h1 class="text-4xl sm:text-5xl font-extrabold mb-2 text-teal-800">
            Support Our Mission
          </h1>
          <h2 class="text-3xl sm:text-4xl font-bold mb-2">
            no matter how small, makes a significant impact.
          </h2>
          <h2 class="text-3xl sm:text-4xl font-bold mb-12 md:mb-0 text-orange-500">Thank you for your support in helping
            us</h2>
          <div class="mt-16">
          </div>
        </div>
        <img src="/dons.png" alt="Happy family with a pet" class="ml-6" width="500">
      </div>
    </div>
    <section class="bg-teal-50 py-8 md:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <!-- Image Section -->
        <div class="md:flex-1 mb-6 md:mb-0">
          <img src="/gcash.jpg" alt="Descriptive Alt Text" class="mx-auto rounded-lg "
            style="max-width: 90%; height: auto;">
        </div>

        <!-- Text Section -->
        <div class="md:flex-1">
          <h1 class="text-lg md:text-xl poppins-semibold text-gray-700 text-center md:text-left mb-6">
            At <span class="poppins-extrabold text-teal-800">Cordova Pet Hub</span>, we are dedicated to creating a safe
            and loving environment for pets in need. To keep our system running smoothly and to expand our services, we
            rely on the generosity of our community. Your donations help us cover operational costs, provide essential
            care for our furry friends, and fund outreach programs.
          </h1>
          <div class="text-center md:text-right">
          </div>
        </div>
      </div>
    </section>
  </div>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
      <div class="flex items-center mb-4 md:mb-0">
        <img src="/cphlogo.png" alt="Cordova Pet Hub Logo" class="rounded-full w-24 h-24 mr-3 object-cover" />
        <div>
          <h5 class="text-lg font-semibold">Pet Adoption</h5>
          <p class="mt-2 text-sm">Contact us: <a href="mailto:cph@gmail.com"
              class="underline hover:text-gray-400">cph@gmail.com</a></p>
        </div>
      </div>
      <div class="text-sm space-y-2 md:space-y-0 md:block">
        <p>© 2024 Cordova Pet Hub. All rights reserved.</p>
        <p>Developed by: Team Alas</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.input {
  width: 100%;
  border: 2px solid #E2E8F0;
  /* Cool gray border */
  border-radius: 0.5rem;
  transition: border-color 0.3s;
  font-size: 1rem;
  color: #4A5568;
  /* Cool gray text */
}

.input:focus {
  border-color: #38B2AC;
  /* Teal focus border */
  outline: none;
}

.btn {
  background-color: #38B2AC;
  /* Teal background */
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  transition: background-color 0.3s;
  cursor: pointer;
}

.btn:hover {
  background-color: #2C7A7B;
  /* Darker teal */
}
</style>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      amount: 0
    };
  },
  methods: {
    async submitDonation() {
      try {
        const response = await axios.post('http://localhost:3000/create-source', { amount: this.amount * 100 });
        window.location.href = response.data.data.attributes.redirect.checkout_url;
      } catch (error) {
        console.error('Error:', error.response.data);
        alert('Failed to initiate payment.');
      }
    },

  }
}
</script>
