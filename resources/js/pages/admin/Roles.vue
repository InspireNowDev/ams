<template>
    <div class="flex" >
      
        <div class=" p-5">
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
       
        <ul class="w-auto ml-10 list-container">
            
            <li  class="list-item table-header bg-slate-100"> <span  class="role_title px-5 w-1/2 "> Role Title</span> <span  class="role_description w-60 ">Role Description</span> </li>
             <span v-if="this.loading"> loading roles data</span>  
            <!-- list of permissions here -->
            <li v-for="role in roles" :key="role" class="list-item"  @dblclick="toggleEditMode">
                <div class="flex columns-edit">
                <!-- <span>{{role.role_id}}</span> -->
                    <span  v-if="!editMode" class="role_title px-5 w-1/2 ">{{role.role_title}}</span> <input v-show="editMode" type="text" v-model="role.role_title" class="editInputFields pl-4 mr-4 rounded w-1/2">
                    <span  v-if="!editMode" class="role_description ">{{role.role_desc}}</span> <input v-show="editMode" type="text" v-model="role.role_desc" class="editInputFields pl-4 mr-4 rounded w-1/2"/> 
                    <!-- @keyup.enter="editRole(role)" @focusout="editRole(role)" -->
                    <button  v-if="editMode" @click="editRole(role)" class="ml-auto group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600  py-2 px-4 text-sm font-medium text-white
                                        hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 editRoleBtn"  > Confirm </button>
                </div>
            </li>
            <!-- <RolesList />  -->
            <li  v-if="this.load_newrole" class="list-item" > item being added... </li>
            <div  class="flex justify-center items-center ">
                <span v-show="editMode" class="mr-5"> Edit mode: </span>
                <button v-show="editMode" @click = "exitEdit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600  py-2 px-4 text-sm
                    font-medium  text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
                    focus:ring-offset-2 addRoleBtn " > [Click to exit Edit mode] </button>
            </div>
        </ul>
          
    </div>
    <Toast class=""/>
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
            editMode: false
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
            .catch((error)=>{
                console.log(error);
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
            })
            .catch((error)=>{
                console.log(error);
                this.$store.commit("addToast", {
                    title: "unable to update",
                    type: "danger",
                    message: "Failed to update",
                });
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
              this.editMode = true;
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
            .catch((error) => {
                console.log(error);
                })
            .finally(() => {
                this.loading = false;
                });
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
