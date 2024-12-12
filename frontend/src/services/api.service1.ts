import axios from './axios.customize';



const registerAPI = (data: any) => {
    const URL_BACKEND = "api/v1/users/register"
    return axios.post(URL_BACKEND, data)
}

const loginAPI = (data: any) => {
    const URL_BACKEND = "api/v1/users/login"
    return axios.post(URL_BACKEND, data)
}



const logoutAPI = () => {
    const URL_BACKEND = "api/v1/auth/logout"
    return axios.post(URL_BACKEND)
}


interface ICreateProduct {
    store_id: number;
    name: string;
    brand: string;
    price: number;
    quantity: number;
    category_id: number;
    description: string;
}

interface IUpdateProduct {
    id: number;
    name: string;
    brand: string;
    price: number;
    quantity: number;
    category_id: number;
    description: string;
}

const token = localStorage.getItem('access_token');

const createProductAPI = async (data: ICreateProduct) => {
    const URL_BACKEND = "api/v1/products"
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await axios.post(URL_BACKEND, data, config);
}

const updateProductAPI = async (data: IUpdateProduct) => {
    const URL_BACKEND = "api/v1/products/1"
    return await axios.put(URL_BACKEND, data);
}


const fetchAllProductsinStore = async (store_id: number) => {
    const URL_BACKEND = `api/v1/store/${store_id}/all/product`
    return await axios.get(URL_BACKEND);
}



export {
    registerAPI, loginAPI, logoutAPI,
    createProductAPI, updateProductAPI, fetchAllProductsinStore,
}