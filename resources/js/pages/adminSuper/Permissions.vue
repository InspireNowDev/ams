<template>
  <!-- permissions page -->
   <div class="text-left w-full font-semibold"> Permissions page </div>
   <table class="border-separate border border-green-800  mt-5 w-full">
            <thead class="bg-emerald-200 text-left">
                <tr>
                <th class="border border-green-600 font-semibold p-3">Permissions</th>
                <th v-for= "role in roles" :key="role" class="border border-green-600 font-semibold  text-center p-3">{{role.role_title}}</th>
                </tr>
            </thead>
            <tbody class="text-left">
                <tr v-for="titleF in featureList" :key="titleF" class="h-8">
                    <td class="border border-green-600 pl-3">{{titleF.persmission_title}}</td>
                    <td class="border border-green-600 w-20 text-center" v-for="roles in permissions" :key="roles" v-show="titleF.id === roles.permission_id"><label :for="roles.status"></label><input type="checkbox" v-model="roles.status"/> </td>
                </tr>
            </tbody>
    </table> 
    <div class="w-full text-right">
        <button @click="reset" class="rounded bg-green-200 p-4 pt-2 pb-2 m-3 mr-0">cancel</button>
        <button @click="sendPermission" class="rounded bg-blue-200 p-4 pt-2 pb-2 m-3 mr-0">submit</button>
        </div>
    
  

</template>




<script>
export default{
    data() {
        return{
            roles:[],
            initialData:[],
            permissions:[],
            featureList:[],
        }

    },
    async created(){

        //get roles

        await axios.get("/api/roles")
            .then((response) => {
            this.roles = response.data.role;
                })
            .finally(() => {
                this.loading = false;
                });

        await axios.get('api/permissions')
        .then((response) => {
            console.log(response.data)
            this.permissions = response.data.feature;  
            this.featureList = response.data.permission;
        })
         .finally(() => {
        });
        const initdata = this.permissions;
        this.initialData = initdata;
    },
    methods:{
        outConsole(){
            console.log(this.feature_roles);
        },
        async sendPermission(){

            await axios.post('api/permissions', this.permissions)
            .then((response)=>{ console.log(response)})
            .catch((error)=>{
                console.log(error);
            })
        },
        reset(){
            console.log( this.initialData);
            this.permissions = this.initialData;
        }
    }
}
</script>
