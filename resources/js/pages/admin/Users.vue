<template>
<ul>
 <li v-for="user in  users" :key="user" class="w-100% justify-between m-3 ">
            <div class="flex justify-between w-100% rounded border-2  border-gray-200 p-3">
            <span class="" >{{user.id}}</span>
            <span>{{user.name}}</span>
            <span>{{user.roles }}</span>
            <select id="roles_select" v-model="user.roles">
              <option v-for="role in roles" :key="role" >{{role.role_title}}</option>
            </select>
            <!-- <select name="" id="roles_select" v-model="this.admin.sub_role"><option :value="role" v-for="role in this.roles" :key="role" >{{role}}</option> </select> -->
            </div>
        </li>
    </ul>
</template>
<script>

export default {
  data() {
    return{
        users:[],
        roles:[],

    }
  },
  async created(){
     const response = await axios.get("http://localhost:8000/api/users")
     console.log(response);
      //this.$store.commit("setUsers",response.data.users);
      this.users = response.data.users;
      console.log(this.$store.state.users);

      this.roles = this.$store.getters.userRoles;
      
  }

}
</script>
