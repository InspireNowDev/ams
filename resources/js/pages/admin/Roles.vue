<template>
    <div>
     <ul>
        <li v-for="role in roles" :key="role">
            <span>{{role.role_id}}</span>
            <span>{{role.role_title}}</span>
            <span>{{role.role_description}}</span>
        </li>
     </ul>
     <input type="text" v-model="role_id" />
     <input type="text" v-model="role_title" />
     <input type="text" v-model="role_description" />
     <button @click="addRole()">
        Click me to add the role
     </button>

    </div>
</template>
<script>
export default {
    data() {
        return{
            roles:[
                {
                    role_id : '1',
                    role_title : 'Shopper',
                    role_description : 'Role is for free user or whatever'
                },
                 {
                    role_id : '2',
                    role_title : 'Manager',
                    role_description : 'Role is for free user or whatever no real reason'
                },
                 {
                    role_id : '3',
                    role_title : 'Test',
                    role_description : 'Role is for free user or whatever'
                }
            ],          
            role_id:'',
            role_title:'',
            role_description:''
            
        }
    },
    methods:{
        addRole(data){
            
            let obj1 = {
                role_id: this.role_id,
                role_title: this.role_title,
                role_description: this.role_description
            }
            console.log(obj1);
            this.new_role.role_id = '';
            this.new_role.role_title = '';
            this.new_role.role_description = '';
            //this.roles.push(...this.role, data);
            //this.roles = {...this.roles, ...data};
            console.log(this.roles);
        }
    }
}
</script>
