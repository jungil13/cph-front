<template>
  <div class="mt-24">
    <!-- Header Section with Background Image -->
    <div class="bg-teal-50 flex flex-col md:flex-row items-center justify-center text-center py-12">
      <div class="flex flex-col md:flex-row items-center justify-center text-center">
        <div>
          <h1 class="text-4xl sm:text-5xl font-extrabold mb-2 text-teal-800">
           Spot a Pet?
          </h1>
          <h2 class="text-3xl sm:text-4xl font-bold mb-12 md:mb-0 text-orange-500">Report It,<span
              class="text-teal-800 font-bold">Lost or Found!</span></h2>
          <div class="mt-16">
          </div>
        </div>
        <img src="/missing.png" alt="Happy family with a pet" class="ml-3 text-center border rounded-full bg-yellow-100 shadow-md shadow-black" width="500">
      </div>
    </div>
    <!-- Content Section -->
    <!-- <div class="relative flex flex-col items-center justify-center text-center my-8 space-y-6">
      <div class="w-full max-w-7xl p-6 bg-white border rounded-xl shadow-black shadow-lg">
        <nav class="flex flex-col md:flex-row justify-between items-center gap-4 ">
          <router-link
            to="/lostpet"
            class="border border-black bg-teal-500 hadow-lg shadow-gray-500 rounded-lg text-black px-6 py-3 font-bold transform transition-transform duration-300 hover:scale-105"
          >
            Report a Pet
          </router-link>
          <router-link
            to="/lostlist"
            class=" bg-teal-500 border border-black shadow-lg shadow-gray-500 rounded-lg text-black px-6 py-3 font-bold transform transition-transform duration-300 hover:scale-105"
          >
            Reports Lists
          </router-link>
          <router-link
            to="/reports"
            class=" bg-teal-500 border border-black shadow-lg shadow-gray-500 rounded-lg text-black px-6 py-3 font-bold transform transition-transform duration-300 hover:scale-105"
          >
            My Reports
          </router-link>
        </nav>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'LostAndFoundPets'
}
</script>

<style scoped>
/* Additional styles for visual enhancements */
</style>
