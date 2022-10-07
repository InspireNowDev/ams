<template>
    <div>
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

         <div class="role-inputs m-5 ml-auto mr-auto" v-if="showInput" >    
            <h2 class="mb-3">Input the details for what you want to enter</h2>
            <input type="text" v-model="new_roles.role_id" placeholder="role ID"/>
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
            "  @click="addRole()" >
            <span > Confirm </span>
          </button>
        </div>
    </div>
     <ul>
        <li v-for="role in roles" :key="role">
            <div class="flex flex-">
            <span>{{role.role_id}}</span>
            <span>{{role.role_title}}</span>
            <span>{{role.role_description}}</span>
            </div>
        </li>
     </ul>
    
</template>
<script>
export default {
    data() {
        return{
            roles:[
               
            ],        
            new_roles:{
                role_id:'',
                role_title:'',
                role_description:''
            },
            showInput :false,
        }
    },
    methods:{
        addRole(){
            const data =  {
                            role_id: this.new_roles.role_id,
                            role_title: this.new_roles.role_id,
                            role_description: this.new_roles.role_description
                        }
            this.roles = [...this.roles, data];
            this.new_roles.role_id = "";
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
    width: 300px;
    margin: 5px;
        align-items: center;
}
.addRoleBtn{
    width: 300px;
}
</style>
