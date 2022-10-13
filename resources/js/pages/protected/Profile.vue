<template>
  <div class="flex">
    <UserCard />
    <!-- edit user here -->
    <div class="w-full bg-color align-left"> 
      <button   @click="openModal"> Edit </button>
      {{changedName}}
      <Modal
        v-show="showModal"
        @close="closeModal"
      >
        <template v-slot:header>
          Edit Profile
        </template>
        <template v-slot:body>
        <form>

            <input type="text" placeholder="edit name" v-model="changedName">
        </form>
      </template>
      </Modal>
    </div>
  </div>
</template>
<script>
import UserCard from "@/components/userCard.vue";
import Modal from '@/components/Modal.vue';

export default {
  components: {
    UserCard,
    Modal,
  },
  data() {
    return {
      showModal: false,
      changedName:'' 
    };
  },
  methods:{
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      }
  }
};
</script>