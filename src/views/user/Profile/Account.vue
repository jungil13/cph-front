<template>
  <div class="mt-24">
    <div class="relative flex flex-col items-center justify-center text-center">
      <h1 class="text-gray-700 text-4xl font-extrabold mt-12">Account</h1>
      <div class="w-full bg-white shadow shadow-gray-400 p-6 rounded-lg mb-6 border border-black mt-12">
        <nav class="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-around">
          <router-link
            to="/summary"
            class="relative bg-white shadow-md shadow-gray-700 rounded-lg text-black px-4 py-3 font-semibold transform transition-transform duration-300 hover:scale-105"
            :class="{ 'border-b-2 border-teal-700': $route.path === '/summary' }"
          >
            Profile Summary
            <span v-if="$route.path === '/summary'" class="absolute bottom-0 left-0 right-0 h-1 bg-teal-700"></span>
          </router-link>

          <router-link
            to="/managepetlistings"
            class="relative bg-white shadow-md shadow-gray-700 rounded-lg text-black px-4 py-3 font-semibold transform transition-transform duration-300 hover:scale-105"
            :class="{ 'border-b-2 border-teal-700': $route.path === '/managepetlistings' }"
          >
            Manage Pet Listings
            <span v-if="$route.path === '/managepetlistings'" class="absolute bottom-0 left-0 right-0 h-1 bg-teal-700"></span>
          </router-link>

          <router-link
            to="/applicants"
            class="relative bg-white shadow-md shadow-gray-700 rounded-lg text-black px-4 py-3 font-semibold transform transition-transform duration-300 hover:scale-105"
            :class="{ 'border-b-2 border-teal-700': $route.path === '/applicants' }"
          >
            Adoption Applicants
            <span v-if="$route.path === '/applicants'" class="absolute bottom-0 left-0 right-0 h-1 bg-teal-700"></span>
          </router-link>

          <router-link
            to="/managereports"
            class="relative bg-white shadow-md shadow-gray-700 rounded-lg text-black px-4 py-3 font-semibold transform transition-transform duration-300 hover:scale-105"
            :class="{ 'border-b-2 border-teal-700': $route.path === '/managereports' }"
          >
            Manage Reports
            <span v-if="$route.path === '/managereports'" class="absolute bottom-0 left-0 right-0 h-1 bg-teal-700"></span>
          </router-link>
        </nav>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  // Add any necessary script here
};
</script>

<style scoped>
/* Optional: Scoped CSS for additional styling */
</style>
