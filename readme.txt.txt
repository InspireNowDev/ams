
>>> make sure WAMP is running before running commands in terminal
>>> composer update
>>> php artisan migrate
>>> php artisan passport:install
>>> php artisan serve
>>> npm install 
>>> npm run dev
>>> php artisan db:seed

>>>for local mail host in .env file , replace
    MAIL_MAILER=smtp
    MAIL_HOST=smtp.mailtrap.io
    MAIL_PORT=2525
    MAIL_USERNAME=9be507d31cafda
    MAIL_PASSWORD=b9f74d40ef719a
    MAIL_ENCRYPTION=tls
    MAIL_FROM_ADDRESS="hello@example.com"
    MAIL_FROM_NAME="${APP_NAME}"



>>>>FRONT END<<<<<<

COMPONENTS ,now contain the below list of components and its descriptions and dependencies
- Toast - shows toast notification that takes from the store , data that is comitted  from anywhere,
        - you can customize the toast itself by looking into the ToastContainer and styling it from the file
    import toast from anuwhere in the page
    --->'import Toast form '@/components/ToastComponents/ToastContainer.vue'
    --  then import like you would import any component 

    --->  components: {
                Toasts,
            },

    --- to initiate the toast, from a function or a return call, call the toast you can commit to an array in the store, 

    --->  store.commit("addToast", {
                title: error.response.request.status,
                type: "danger",
                message: error.response.data.message,
              });
    --- the toast will clear by itself in a few milisec, based on callback function
    
-Topbar - outside topbar 
-DashboardTopbar - inside topbar, renders based on the permissions of the user, now is statically typed, dynamic change incoming after permissions module is done

- Modal , modal just contains the generic styling, which can be customized under the @components/Modal.vue

- PassStrength , custom component to gauge password strengh, to be improved in the future


ROUTING 
Routing is done by Vue-router that helps in the fact that vue has a route guard in the front , statically typed for now, however super admins can set the users to a role admins
and the role