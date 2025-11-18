import axios from "axios";

const BASE_URL = "https://cryptography-as-a-service.vercel.app/api";
const DEV_URL = "http://localhost:8080/api"

export const postAPI = async (endpoint, requestBody) => {
    const url = `${DEV_URL}/${endpoint}`;
    return axios.post(url, requestBody);
}