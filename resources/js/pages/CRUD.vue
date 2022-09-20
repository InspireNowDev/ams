<template>
  <h1>Profiles</h1>
  <input
    type="text"
    v-model="firstname"
    @keyup.enter="addBook"
    placeholder="firstname"
  />
  <input
    type="text"
    v-model="lastname"
    @keyup.enter="addProfile"
    placeholder="lastname"
  />
  <button @click="addProfile">click to Add</button>
  <ul>
    <li
      v-for="profile of profileComponentData"
      :key="profile.id"
      class="name-list"
    >
      user_id: {{ profile.id }} FN: {{ profile.firstname }} LN:
      {{ profile.lastname }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      profileComponentData: [],
      profileComp: {
        firstname: "",
        lastname: "",
      },
    };
  },
  computed: {
    // profilesData() {
    //   return this.$store.state.profiles;
    // },
  },
  async created() {
    const { data } = await axios.get("/api/profiles");
    this.profileComponentData = data.profile;
    console.log(this.profileComponentData);
  },
  methods: {
    async addProfile() {
      const { data } = await axios.post("/api/profiles", {
        firstname: this.firstname,
        lastname: this.lastname,
      });
      //this.profileComponentData = [...this.profileComponentData, data];
      this.profileComponentData.push = {};
      this.profileComponentData = this.firstname = "";
      this.lastname = "";
    },
  },
};
</script>

<style>
.name-list {
  border: 1px solid grey;
  padding: 10px;
  width: 600px;
  text-align: left;
  margin: 5px auto;
}
</style>