<template>
  <div>This view is protected only to be seen by super admins or admins only</div>
</template>
<script>

export default {
  data() {
    return{
        user:[
          { 
              id: '1',
              username: 'user name satu',
              email: "emai@gmail.com",
              role : 'Manager',
          },
           {
              id: '2',
              username: 'user name 2',
              email: "emai@gmail.com",
              role : 'User',

          },
           {
              id: '3',
              username: 'user name 3',
              email: "emai@gmail.com",
              role : 'generic',
          },
           {
              id: '4',
              username: 'user name 4',
              email: "emai@gmail.com",
              role : 'role 2',
          },
        ]
    }
  },
}
</script>
