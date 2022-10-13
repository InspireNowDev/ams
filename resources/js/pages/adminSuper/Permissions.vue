<template>
    <span v-for ="role in roles" :key="role"> " " {{role.role_title}}  " " </span> 
    <div v-for ="role in roles" :key="role"> {{role.role_title}}  </div>
</template>
<script>

export default{
    data() {
        return{
            roles:[],
        }

    },
    created(){

        // get roles

        axios.get("/api/roles")
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
