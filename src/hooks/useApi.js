import axios from "axios";

const BASE_URL = "https://cryptography-as-a-service.vercel.app/api";

export const postAPI = async (endpoint, requestBody) => {
    const url = `${BASE_URL}/${endpoint}`;
    return axios.post(url, requestBody);
}