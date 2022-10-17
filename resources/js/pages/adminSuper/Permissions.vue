<template>
  <!-- permissions page -->
  <div class="flex flex-row">
    <span class="ml-2 rounded bg-slate-100 p-4 w-"> Feature </span>
    <div v-for= "role in roles"  :key="role" class="ml-2 rounded bg-slate-100 p-4 "> {{role.role_title}}</div>
  </div>
  <div v-for="permission in feature_roles" :key="permission"  class="flex flex-row">
    
    <span  v-for="(key, index) in Object.keys(permission)" :key="index" class="ml-2 rounded bg-slate-100 p-4 "><span v-if="key == 'feature_id' ">{{permission.feature_id}}</span>
    <span v-else-if="key=='feature_desc'"> Permission: {{permission.feature_desc}}</span> <input v-else type="checkbox" v-model="permission[key]"/>
         <!-- <span >{{key}} - {{permission[key]}} <input type="checkbox" v-model="permission[key]"/> </span> -->
         </span>
  </div>
<button @click="outConsole"> CLICK</button>
</template>
<script>

export default{
    data() {
        return{
            roles:[],
            features:[ "Edit","Add","Delete", "View User" ],
            feature_roles :[
                {  feature_id: 1, feature_desc:" User can ask permission", role2: false, role3: false},
                 { 
                    feature_id: 2,
                    feature_desc:" User can do whatever",
                    role1: true,
                    role2: false,
                },
                 { 
                    feature_id: 3,
                    feature_desc:" User can download",
                    role1: true,
                    role2: false,
                }
            ]
        }

    },
    created(){

        //get roles

        axios.get("/api/roles")
            .then((response) => {
            this.roles = response.data.role;
                })
            .finally(() => {
                this.loading = false;
                });
    },
    methods:{
        outConsole(){
            console.log(this.feature_roles);
        }
    }
}
</script>
