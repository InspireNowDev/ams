<template>
    <div class="flex relative" >
      
        <div class=" p-5" v-if="role === 'super-admin'">
            <button class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600  py-2 px-4 text-sm
                font-medium
                text-white
                hover:bg-indigo-700
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
                focus:ring-offset-2
                addRoleBtn
                mr-auto ml-auto
                " @click="showInputs">Add new role</button>
               

            <div class="role-inputs m-5 ml-auto mr-auto p-5 rounded bg-slate-100" v-if="showInput" >    
                <h2 class="mb-3">Input the details for what you want to enter</h2>
                <!-- <input type="text" v-model="new_roles.role_id" placeholder="role ID"/> -->
                <input type="text" v-model="new_roles.role_title" placeholder="role Title"  class="p-3"/>
                <input type="textarea" v-model="new_roles.role_desc" placeholder="Role Description" class="p-3" />
                <button   class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600  py-2 px-4 text-sm
                font-medium
                text-white
                hover:bg-indigo-700
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
                focus:ring-offset-2
                mt-5
                "  @click="addRole()" >
                <span > Confirm </span>
            </button>
            </div>
        </div>
        
        <ul class="w-auto ml-10 list-container relative">
            <Toast class="absolute top-0 right-0 "/>
            <li  class="list-item table-header bg-slate-100"> 
                <span  class="role_title px-5 w-1/2 "> Role Title</span>
                 <span  class="role_description w-60 ">Role Description</span>
            </li>
             <span v-if="this.loading"> loading roles data</span>  
           
            <li v-for="role in roles" :key="role" class="list-item"  @dblclick="toggleEditMode">
                <div class="flex columns-edit">
          
                    <span  v-if="!editMode" class="role_title px-5 w-1/2 ">{{role.role_title}}</span> <input v-show="editMode" type="text" v-model="role.role_title" class="editInputFields pl-4 mr-4 rounded w-1/2">
                    <span  v-if="!editMode" class="role_description ">{{role.role_desc}}</span> <input v-show="editMode" type="text" v-model="role.role_desc" class="editInputFields pl-4 mr-4 rounded w-1/2"/> 
               
                    <button  v-if="editMode" @click="editRole(role)" class="ml-auto group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600  py-2 px-4 text-sm font-medium text-white
                                        hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 editRoleBtn"  > Confirm </button>
                </div>
            </li>
            <li  v-if="this.load_newrole" class="list-item" > item being added... </li>
            <div  class="flex justify-center items-center ">
                <span v-show="editMode" class="mr-5"> Edit mode: </span>
                <button v-show="editMode" @click = "exitEdit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600  py-2 px-4 text-sm
                    font-medium  text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
                    focus:ring-offset-2 addRoleBtn " > [Click to exit Edit mode] </button>
            </div>
           
        </ul>
        <!-- <table class="border-separate border border-green-800 w-full mt-5">
            <thead class="bg-emerald-200 text-left">
                <tr>
                <th class="border border-green-600 ...">Role Title</th>
                <th class="border border-green-600 ...">Role Description</th>
                <th class="border border-green-600 ...">Actions</th>
                </tr>
            </thead>
            <tbody class="text-left">
                <tr v-for="role in roles" :key="role"  @dblclick="toggleEditMode" class="h-8">
                    <td  v-if="!editMode" class="border border-green-600 w-1/2">{{role.role_title}}</td><td v-show="editMode" class="border border-green-600"> <input  type="text" v-model="role.role_title" class="w-full" ></td>
                    <td  v-if="!editMode" class="border border-green-600 w-1/2">{{role.role_desc}}</td><td v-show="editMode" class="border border-green-600"> <input  type="text" v-model="role.role_desc" class="w-full" ></td>
                    <td  v-if="editMode" class="border border-green-600 bg-blue-200"  @click="editRole(role)"> Confirm </td><td v-if="!editMode" class="border border-green-600 bg-blue-200" > - </td>        
                </tr>
                <tr v-if="this.load_newrole">
                    <td> item being added...</td>
                </tr>
                <tr v-show="editMode" @click = "exitEdit" > 
                    [Click to exit Edit mode]
                </tr>
            </tbody>
        </table> -->
         
    </div>
   
</template>
<script>
//import RolesList from './component/RolesList.vue'
import Toast from '../../components/ToastComponents/ToastContainer.vue'

export default {
    components:{
       // RolesList,
       Toast
    },
    data() {
        return{
            roles:[],        
            new_roles:{
                role_title:'',
                role_desc:'',
            },
            showInput :false,
            loading :false,
            load_newrole :false,
            editMode: false,

            currentRole:"",
        }
    },
    methods:{
        async addRole(){
            // post api here
            this.load_newrole = true;
            const data =  {
                           // role_id: this.new_roles.role_id,
                            role_title: this.new_roles.role_title,
                            role_desc: this.new_roles.role_desc
                        }
            await axios.post("api/roles/",data)
            .then((response) =>{
                console.log(response);
                // catch response here and append to array
                 this.roles = [...this.roles, response.data.role ];
            })
            .finally(() =>{
                this.load_newrole = false;
            })
          
            this.new_roles.role_title = "";  
            this.new_roles.role_desc = "";   
            this.showInput = false; //hide input field
        },
        async editRole(role){
            console.log(role);
            const body = {
                  role_title : role.role_title,
                  role_desc  : role.role_desc
            }
            const id = role.id;
            await axios.put("api/roles/"+id,body)
            .then((response) =>{
                console.log(response);
                this.$store.commit('addToast',{
                    title: response,
                    type: "success",
                    message: response.data.message,
              })
            })
            .finally(()=>{
                console.log("edit function fired");
            })
        },
        deleteRole(){

        },
        showInputs(){
            this.showInput = true;
        },
        toggleEditMode(){
            if( this.currentRole === 'super-admin'){
                this.editMode = true;
            }
            
        },
        exitEdit(){
                this.editMode = false;
        }

    },
    async created(){
            this.loading = true;
        
            await axios.get("/api/roles")
            .then((response) => {
            this.roles = response.data.role;
                })
            .finally(() => {
                this.loading = false;
                });
    },
     computed: {
        role(){
            this.currentRole = this.$store.getters.userRole;
            return this.$store.getters.userRole;
        },

    }
}
</script>
<style scoped>
.role-inputs{
    display: flex;
    flex-direction: column;
     align-items: center;
     width: 300px;
}
.role-inputs input{
    width: 100%;
    margin: 5px;
    align-items: center;
}
.addRoleBtn{
    width: 300px;
}
.editRoleBtn{
  width: 100px;
}
.list-container{
    padding: 10px;
    width: 100%;
}
.list-item{
    margin: 10px;
    padding: 5px;
    display: flex;
    border-radius: 6px;
    border: 1px solid grey;
    width: 100%;
    text-align: left;
    height: 50px;
}
.columns-edit{
    width: 100%;
}
</style>
