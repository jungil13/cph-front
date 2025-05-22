<template>
    <div class="min-h-screen bg-teal-50 flex flex-col items-center py-10">
        <!-- Header -->
        <h1 class="text-4xl font-extrabold text-teal-700 mb-8 font-serif" data-aos="fade-up">User Reviews</h1>

        <!-- Reviews Section -->
        <div class="w-full max-w-4xl flex items-center justify-between " data-aos="fade-left">
            <!-- Reviews Carousel -->
            <div class="relative w-full">
                <!-- Single Review Card -->
                <div v-if="reviews.length" :key="currentIndex"
                    class="bg-stone-600 shadow-lg rounded-lg p-6 text-center">
                    <!-- User Profile Photo -->
                    <img :src="getProfilePhotoUrl(reviews[currentIndex].ProfilePhoto)"
                        @click="openProfilePhotoModal" alt="User Profile" data-aos="fade-left"
                        class="w-16 h-16 rounded-full mx-auto shadow-md border shadow-black mb-4 cursor-pointer" />

                    <!-- Review Content Transition -->
                    <transition name="slide-fade" mode="out-in">
                        <div key="content">
                            <!-- User Name -->
                            <h2 class="text-2xl font-semibold text-white mb-12 md:mb-4"data-aos="fade-left">
                                @ {{ reviews[currentIndex].Username }}
                            </h2>
                            <!-- Review Content -->
                            <p class="text-gray-100"data-aos="fade-left">{{ reviews[currentIndex].ReviewText }}</p>
                            <!-- Rating -->
                            <div class="flex justify-center items-center mb-4"data-aos="fade-left">
                                <span v-for="star in reviews[currentIndex].Rating" :key="star"
                                    class="text-yellow-500 text-2xl">
                                    ★
                                </span>
                                <span v-for="empty in 5 - reviews[currentIndex].Rating" :key="empty"
                                    class="text-gray-300 text-2xl">
                                    ☆
                                </span>
                            </div>
                            <p class="text-gray-100 mb-4"data-aos="fade-left">{{ reviews[currentIndex].FormattedDate }}</p>
                        </div>
                    </transition>
                </div>

                <!-- Navigation Buttons -->
                <button @click="prevReview"
                    class="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full shadow-md shadow-black transition flex items-center">
                    <span class="material-icons"><span class="material-symbols-outlined">
                            arrow_back_ios
                        </span> </span>
                </button>
                <button @click="nextReview"
                    class="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full shadow-md shadow-black transition flex items-center">
                    <span class="material-icons"> <span class="material-symbols-outlined">
                            arrow_forward_ios
                        </span> </span>
                </button>
            </div>
        </div>

        <!-- Add Review Section -->
        <div class="w-full max-w-3xl bg-white shadow-md rounded-lg p-12 mt-8 text-center shadow-md shadow-black"
            data-aos="fade-right">
            <h2 class="text-2xl font-bold font-serif text-teal-600 mb-4">Add Your Review 😻</h2>
            <form @submit.prevent="addReview">
                <!-- Review Content -->
                <textarea v-model="newReview.content" placeholder="Write your review..."
                    class="w-full p-3 border border-gray-400 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows="3" required></textarea>
                <!-- Rating -->
                <div class="mb-4">
                    <label class="block text-gray-900 mb-2">Rating:</label>
                    <select v-model="newReview.rating"
                        class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required>
                        <option disabled value="">Select Rating</option>
                        <option v-for="n in 5" :key="n" :value="n">{{ n }} Stars</option>
                    </select>
                </div>
                <!-- Submit Button -->
                <button type="submit"
                    class="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition font-semibold">
                    Submit Review
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';

export default {
    setup() {
        const reviews = ref([]);
        const currentIndex = ref(0);
        const newReview = ref({
            content: '',
            rating: '',
        });

        onMounted(async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/reviews/');
                console.log('API Response:', response.data); // Check the response
                reviews.value = response.data; // Set reviews from API
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        });

        const nextReview = () => {
            currentIndex.value = (currentIndex.value + 1) % reviews.value.length;
        };

        const prevReview = () => {
            currentIndex.value = (currentIndex.value - 1 + reviews.value.length) % reviews.value.length;
        };

        const addReview = async () => {
            if (newReview.value.content && newReview.value.rating) {
                try {
                    await axios.post('http://localhost:3000/api/reviews/add', {
                        userID: localStorage.getItem('userID'), // Assuming userID is stored in localStorage
                        reviewText: newReview.value.content,
                        rating: newReview.value.rating,
                    });
                    Swal.fire('Success', 'Review submitted successfully!', 'success');
                    reviews.value.push({
                        Username: newReview.value.user,
                        ProfilePhoto: '', // Add a placeholder for the new review (optional)
                        ReviewText: newReview.value.content,
                        Rating: newReview.value.rating,
                        FormattedDate: new Date().toISOString(),
                    });
                    newReview.value = { content: '', rating: '' };
                    window.location.reload();
                } catch (error) {
                    Swal.fire('Error 😂', 'You must logged in to write a Review', 'error');
                }
            }
        };

        // Method to get the full URL of the profile photo
        const getProfilePhotoUrl = (photoPath) => {
            return photoPath ? `http://localhost:3000/${photoPath}` : '/path/to/default/image.jpg';
        };

        // Placeholder for opening profile photo modal
        const openProfilePhotoModal = () => {
            Swal.fire({
                imageUrl: getProfilePhotoUrl(reviews.value[currentIndex.value].ProfilePhoto),
                imageAlt: 'User Profile Photo',
                confirmButtonText: 'Watdaa 😲', // Replaces the default "OK" button with "Wow"
            });
        };

        return {
            reviews,
            currentIndex,
            newReview,
            nextReview,
            prevReview,
            addReview,
            getProfilePhotoUrl,
            openProfilePhotoModal,
        };
    },
};
</script>
