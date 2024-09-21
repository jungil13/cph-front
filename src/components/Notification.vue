<template>
    <div class="relative inline- mr-6">
      <button @click="toggleDropdown" class="focus:outline-none">
    <span class="material-icons text-3xl text-black rounded-full bg-white shadow outlined rounded-full p-1 px-3">notifications</span>
        <span v-if="unreadCount" class="absolute top-0 left-9 bg-red-500 text-white text-md rounded-full px-2">{{ unreadCount }}</span>
      </button>
      <div v-if="isDropdownOpen" class="absolute right-0 top-14 mt-2 w-48 bg-white text-gray-600 shadow-lg shadow-black rounded-lg z-50">
        <ul class="max-h-60 overflow-y-auto">
          <li v-for="(notification, index) in notifications" :key="index" class="px-4 py-2">
            {{ notification.message }}
          </li>
        </ul>
        <div class="px-4 py-2 text-xs text-gray-600 cursor-pointer " @click="markAllAsRead">
          Mark all as read
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const notifications = ref([
    { message: "New comment on your post." },
    { message: "User123 liked your photo." },
    { message: "Your profile has been updated." },
  ]);
  
  const unreadCount = ref(notifications.value.length);
  const isDropdownOpen = ref(false);
  
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };
  
  const markAllAsRead = () => {
    notifications.value = [];
    unreadCount.value = 0;
  };
  </script>
  
  <style scoped>
  .material-icons {
    font-size: 24px;
  }
  </style>
  