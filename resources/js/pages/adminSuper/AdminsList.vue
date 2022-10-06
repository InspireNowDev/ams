<template>
<div @click="expanding" v-if=" this.admin.role == this.filter || this.filter=='All' ">
   
    <div class="id oreo">{{this.admin.id}}</div>
    <div class="name oreo">{{this.admin.name}}</div>
    <div class="role oreo">{{this.admin.role}}</div> <select name="" id="roles_select" v-model="this.admin.sub_role"><option :value="role" v-for="role in this.roles" :key="role" >{{role}}</option> </select><div/>
    <div class="subrole oreo">{{this.admin.sub_role}}</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            expanded :false,
            selected_element: null,
        }
    },
     props: {
        admin: { type: Object },
        roles: { type: Array },
        filter: { type:String}
  },
  methods:{
    expanding(){
        this.expanded = !this.expanded;
    }  
}
}
</script>
<style scoped>
    .oreo{
        margin: 0px 4px;
    }
    .name.oreo{
        margin-left:15px;
    }
    .role.oreo{
        margin-left: auto;
        margin-right: 20px;
        min-width: 200px;
        text-align: right;
    }
    .subrole.oreo{
        min-width: 163px;
    }
    .expanded{
        height: 60px;
    }
</style>

