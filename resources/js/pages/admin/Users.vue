<template>
<ul>
  <span v-show="this.loading"> loading user data ...</span>
 <li v-for="user in  users" :key="user" class="w-100% justify-between m-3 ">
            <div class="flex justify-between w-100% rounded border-2  border-gray-200 p-3">
            <span class="" >{{user.id}}</span>
            <span>{{user.name}}</span>
            <span>{{user.roles.id}}</span>
            <span>{{roleTitle(user.roles.id)}} </span>
            
            <select id="roles_select" v-model="user.roles.id" @change="updateUser(user.id , user.roles.id)">
              <option v-for="role in roles" :key="role" :value="role.id">{{role.role_title}}</option>
            </select>
            <!-- <select name="" id="roles_select" v-model="this.admin.sub_role"><option :value="role" v-for="role in this.roles" :key="role" >{{role}}</option> </select> -->
            </div>
        </li>
    </ul>
</template>
<script>
//import axiosinstance from '@/axios/axiosinstance'
export default {
  data() {
    return{
        users:[],
        roles:[],
        loading : false
    }
  },
  async created(){
    this.loading = true;
    let id = 3;//users only
    await axios.get("/api/users/roles/"+id)
    .then((response) => {
      console.log(response.data);
      this.users = response.data.users;
      this.roles = response.data.role;
        })
      .finally(() => {
          this.loading = false;
        });

   },
   computed:{
     
   },
   methods:{
    async updateUser(user_id, role_id){
      console.log(user_id);
      console.log(role_id);
      const body = {
                roles : role_id, 
          } 
       await axios.put("/api/users/roles/"+user_id , body )
        .then((response) =>{
            console.log(response);
        })
        .finally(()=>{
            console.log("edit function fired");
        })
    },
    changedData(data){
      console.log(data);
    },
    roleTitle(data){
      return this.roles.find(  role => role.id === data).role_title;
       //caseFiles.find(cf => cf.id === state.activeCaseFile);
     }


   }

}
</script>
