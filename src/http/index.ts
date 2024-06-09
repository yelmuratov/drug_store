import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

const $axios = axios.create({
    baseURL: baseURL,
});

export default $axios;