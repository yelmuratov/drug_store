import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

const $axios = axios.create({
    withCredentials: true,
    baseURL: baseURL,
});

export default $axios;