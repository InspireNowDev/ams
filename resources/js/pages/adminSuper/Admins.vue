<template>
<div>
     <FloatingInput
            class="mt-4 mb-4"
            id="OnInput"
            label="OnInput "
            type="text"
            name="OnInput"
            placeholder=" "
            @custom-change="onInput"
            
          />
     <div class="flex items-start justify-end m-4">
    <input type="text" v-model="new_role" @keyup.enter="appendList" placeholder="add a new Role" class="m-4 p-2 rounded-md border-2 border-stone-300 bg-slate-100" >
     <select name="" id="" v-model="selected_role" class="m-4">
        <option :value="role" v-for="role in roles"  :key="role" >{{role}}</option>
    </select>
    </div>
     <div class="flex"> 
        <div class="ml-2 " >ID</div><div class="ml-4">Name</div><div class="ml-auto mr-10">Role</div><div class="mr-5">Sub_role</div>
    </div>
   <Admin v-for="admin in admins" :key="admin" :admin="admin" :roles="roles" :filter="selected_role" class="admin-list"/>
   
</div>    
</template>
<script>
import Admin from './AdminsList.vue'
import FloatingInput from "@/components/FloatingInput.vue"
export default{
    components:{
        Admin,
        FloatingInput,
    },
    data() {

        return{
            admins:[
                {
                    id:'1',
                    name:'admin1',
                    role:'users',
                    sub_role:'subrole_1',

                },
                  {
                    id:'2',
                    name:'admin2',
                    role:'admin',
                    sub_role:'subrole_2',

                },
                  {
                    id:'3',
                    name:'admin3',
                    role:'Super-admin',
                    sub_role:'subrole_3',

                },
                  {
                    id:'4',
                    name:'admin4',
                    role:'Super-admin',
                    sub_role:'subrole_4',

                },
            ],
            roles:["All","admin","Super-admin","users",],
            selected_role: "All",
            new_role:'',
            expanded: false,
        }
    },
    methods:{
        expand(e){
            this.expanded = !this.expanded;
        },
        handleInput(s) {
            this.new_role = s;
        },
        appendList(){
            this.roles.push(this.new_role);
            this.new_role = ""
        },
         // watcher functions
        onInput(s) {
        this.new_role = s;
        },
    },
    computed:{
       
    },
    }

</script>
<style scoped>
.admin-list{
    border:1px solid rgb(212, 212, 212);
    margin: 5px 0px;
    padding: 7px;
    display: flex;
    border-radius: 6px;
}
.admin-list div{
    margin: 0px 5px;
}

</style>
