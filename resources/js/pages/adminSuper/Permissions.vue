<template>
  <!-- permissions page -->
  permissions page
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
