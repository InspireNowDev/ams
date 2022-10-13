const axiosinstance = axios.create();

axiosinstance.defaults.headers.common['customInstance'] ="instance leela";

export default axiosinstance;

//interceptor axios header examples, can make however many interceptors as you want