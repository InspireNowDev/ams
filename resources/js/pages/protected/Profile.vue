<template>
  <div class="flex">
    <UserCard  />
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
        <form  v-on:submit.prevent="editProfile()"> 
          <div>
            <label for=""> First name </label> <br>
            <input type="text" :placeholder="userName" v-model=" newDetails.name ">
          </div>
           <div>
             <label for=""> Last Name </label> <br>
            <input type="email" :placeholder="userEmail" v-model=" newDetails.email ">
          </div>
           <button type="submit"> Confirm </button>
        </form>
      </template>
      <template>
            <button @click="editProfile"> Confirm </button>
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
      changedName:'', 
      profile: null,

      newDetails:{
            name :'',
            email:'',
      }
    };
  },
  methods:{
      editProfile(){

        // here is put call to change data of user
        console.log(this.newDetails);

        // down here is space to update in vuex
          this.closeModal()
      },
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      }
  },
   computed: {
    userName() {
      return this.$store.getters.userName;
    },
    userEmail() {
      return this.$store.getters.userEmail;
    },
    userRole() {
      return this.$store.getters.userRole;
    },
  },
};
</script>