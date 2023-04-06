import axios from "axios";
import { getEnvVariables } from "../helpers";


const { VITE_API_URL } = getEnvVariables();


const calendarApi = axios.create({
    baseURL: VITE_API_URL,
});


// TODO: Configurar interceptores
calendarApi.interceptors.request.use( config => {

    config.headers = {
        /*Usámos el operador spread para agregar los posibles header
        que se encuentren configurados en config*/
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default calendarApi;