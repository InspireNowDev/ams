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
                <input type="text" v-model="new_roles.role_title" placeholder="role Title" />
                <input type="text" v-model="new_roles.role_description" placeholder="Role Description" />
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
            <li v-for="role in roles" :key="role" class="list-item">
                <div class="flex flex-">
                <!-- <span>{{role.role_id}}</span> -->
                
                    <span class="role_title px-5 w-36 ">{{role.role_title}}</span>
                    <span class="role_description ">{{role.role_description}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return{
            roles:[
               
            ],        
            new_roles:{
                role_title:'',
                role_description:''
            },
            showInput :false,
        }
    },
    methods:{
        addRole(){
            const data =  {
                           // role_id: this.new_roles.role_id,
                            role_title: this.new_roles.role_title,
                            role_description: this.new_roles.role_description
                        }
            this.roles = [...this.roles, data];
            //this.new_roles.role_id = "";
            this.new_roles.role_title = "";  
            this.new_roles.role_description = "";   
            console.log(this.roles);
            this.showInput = false;
        },
        showInputs(){
            this.showInput = true;
        }

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
    width: 100%

}
</style>
