<template>
  <div class="mt-24">
    <div class="container mx-auto px-12 py-24">
      <div v-if="topic" class="bg-zinc-700 rounded-lg shadow-lg shadow-black p-6 mb-6">
        <h1 class="text-2xl font-bold text-white">{{ topic.Title }}</h1>
        <p class="text-gray-300 mt-8 mb-8">{{ topic.Content }}</p>
        <div class="flex items-center space-x-4 mb-6">
          <img :src="getImageUrl(topic.AuthorProfilePhoto)" alt="Author's Profile Photo"
            class="w-12 h-12 rounded-full shadow-md shadow-black border border-white" />
          <div class="text-sm font-semibold text-white">{{ topic.AuthorFullName }}</div>
        </div>
        <p class="text-sm text-gray-100">{{ topic.PostDate }}</p>
      </div>

      <div class="bg-white rounded-2xl px-10 py-8 shadow-md shadow-black transition duration-500">
        <h2 class="text-2xl font-extrabold text-gray-600 mb-4">Comments:</h2>
        <div v-for="comment in comments" :key="comment.CommentID" class="mt-4 border-b border-gray-200 pb-4 mb-6">
          <div class="flex items-center space-x-4">
            <img :src="getImageUrl(comment.CommenterProfilePhoto)" alt="Commenter's Profile Photo"
              class="w-12 h-12 rounded-full" />
            <div class="text-sm font-semibold text-gray-900">{{ comment.CommenterFullName }} • <span
                class="font-normal text-gray-500">{{ comment.CommentDate }}</span></div>
          </div>
          <p class="mt-2 text-md text-gray-600 mb-6">{{ comment.Content }}</p>
          <div v-if="isLoggedIn(comment.CommenterID)" class="flex space-x-4">
            <button @click="openEditModal(comment)" class="text-blue-500 hover:underline text-sm">
               Edit
            </button>
            <button @click="deleteComment(comment.CommentID)" class="text-red-500 hover:underline text-sm">
              Delete
            </button>
          </div>
        </div>
        <div class="mt-6 flex items-center">
  <textarea v-model="newComment" placeholder="Write a comment..."
    class="border-gray-300 border p-2 w-full rounded mr-2"></textarea>
  <button @click="addComment"
    class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-150 ease-in-out">
    <span class="material-symbols-outlined">send</span>
  </button>
</div>
      </div>
      <edit-comment-modal v-if="showEditModal" :comment="currentComment" @close="closeEditModal"
        @update="updateComment" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import EditCommentModal from './EditCommentModal.vue';

export default {
  components: {
    EditCommentModal,
  },
  props: ['id'],
  data() {
    return {
      topic: null,
      comments: [],
      newComment: '',
      currentComment: null,
      showEditModal: false,
    };
  },
  created() {
    if (this.id) {
      this.fetchTopic();
      this.fetchComments();
    } else {
      console.error('No topic ID provided');
    }
  },
  methods: {
    openEditModal(comment) {
      this.currentComment = comment;
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.currentComment = null;
    },
    getImageUrl(path) {
      return path ? `http://localhost:3000/${path.replace(/\\/g, '/')}` : '/path/to/default/image.jpg';
    },
    isLoggedIn(CommenterID) {
      return localStorage.getItem('userID') === CommenterID?.toString();
    },
    fetchTopic() {
      axios.get(`http://localhost:3000/api/forum/posts/id/${this.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(response => {
          this.topic = response.data;
        })
        .catch(error => {
          console.error('Failed to fetch topic:', error);
          Swal.fire('Error', 'Failed to load topic details.', 'error');
        });
    },
    fetchComments() {
      axios.get(`http://localhost:3000/api/forum/comments/post/${this.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(response => {
          this.comments = response.data;
        })
        .catch(error => {
          console.error('Failed to fetch comments:', error);
          Swal.fire('Error', 'Failed to load comments.', 'error');
        });
    },
    addComment() {
      if (!this.newComment.trim()) {
        Swal.fire('Error', 'Please enter a comment before posting!', 'error');
        return;
      }

      axios.post('http://localhost:3000/api/forum/comments', {
        postID: this.id,
        content: this.newComment
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(response => {
          this.comments.push(response.data);
          this.newComment = '';
          Swal.fire('Success', 'Comment added successfully!', 'success');
          this.fetchComments();
        })
        .catch(error => {
          console.error('Failed to add comment:', error);
          Swal.fire('Error', 'Failed to post comment.', 'error');
        });
    },
    updateComment(CommentId, content) {
      axios.put(`http://localhost:3000/api/forum/comments/${CommentId}`, { content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(() => {
          Swal.fire('Success', 'Comment updated successfully!', 'success');
          this.fetchComments();
          this.closeEditModal(); // Close the modal upon success
        })
        .catch(error => {
          console.error('Failed to edit comment:', error);
          Swal.fire('Error', 'Failed to update comment.', 'error');
        });
    },

    deleteComment(commentId) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:3000/api/forum/comments/${commentId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
            .then(() => {
              Swal.fire('Deleted!', 'Your comment has been deleted.', 'success');
              this.fetchComments();
            })
            .catch(error => {
              console.error('Failed to delete comment:', error);
              Swal.fire('Error', 'Failed to delete comment.', 'error');
            });
        }
      });
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
