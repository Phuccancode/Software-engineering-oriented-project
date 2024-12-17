import axios from './axios.customize';

const getAccessToken = () => {
    return localStorage.getItem('access_token');
}


const registerAPI = (data: any) => {
    const URL_BACKEND = "api/v1/users/register"
    return axios.post(URL_BACKEND, data)
}

const loginAPI = (data: any) => {
    const URL_BACKEND = "api/v1/users/login"
    return axios.post(URL_BACKEND, data)
}

const loginGoogleAPI = (tokenGoogle: any) => {
    const URL_BACKEND = "api/v1/users/login-social"
    const config = {
        headers: {
            Authorization: `Bearer ${tokenGoogle}`,
        },
    }
    return axios.post(URL_BACKEND, {}, config)
}


const logoutAPI = () => {
    const URL_BACKEND = "api/v1/auth/logout"
    return axios.post(URL_BACKEND)
}

const forgotPasswordAPI = (data: any) => {
    const URL_BACKEND = "api/v1/users/forgot-password"
    return axios.post(URL_BACKEND, data)
}

const updatePasswordAPI = (data: any) => {
    const URL_BACKEND = "api/v1/users/update-password"
    return axios.put(URL_BACKEND, data)
}

const getUserLoginAPI = () => {
    const URL_BACKEND = "api/v1/users/get-user"
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.get(URL_BACKEND, config)
}

const getProfileAPI = () => {
    const URL_BACKEND = "api/v1/users/profile"
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.get(URL_BACKEND, config)
}


const updateProfileAPI = (data: any) => {
    const URL_BACKEND = "api/v1/users/profile"
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.put(URL_BACKEND, data, config)
}

const changePasswordAPI = (data: any) => {
    const URL_BACKEND = "api/v1/users/password"
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.put(URL_BACKEND, data, config)
}

const createDeliveryAPI = (data: any) => {
    const URL_BACKEND = "api/v1/user/delivery/create"
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.post(URL_BACKEND, data, config)
}

const getAllDelivery = () => {
    const URL_BACKEND = "api/v1/user/delivery/all"
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.get(URL_BACKEND, config)
}

const updateDeliveryAPI = (id: number, data: any) => {
    const URL_BACKEND = `api/v1/user/delivery/update/${id}`
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.put(URL_BACKEND, data, config)
}

const deleteDeliveryAPI = (id: number) => {
    const URL_BACKEND = `api/v1/user/delivery/delete/${id}`
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.delete(URL_BACKEND, config)
}


const getOrderAPI = async () => {
    const URL_BACKEND = `api/v1/order/user`
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return await axios.get(URL_BACKEND, config)
}



const createProductAPI = async (data: any) => {
    const URL_BACKEND = "api/v1/products"
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await axios.post(URL_BACKEND, data, config);
}

const uploadImageAPI = async (data: any) => {
    const URL_BACKEND = `api/v1/products/uploads/${data.id}`
    console.log(URL_BACKEND)
    console.log(data.files)
    const files = new FormData();
    files.append('id', data.id.toString());
    data.files.forEach((file: any) => {
        files.append('files', file);
    });
    const token = getAccessToken()
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };
    return await axios.post(URL_BACKEND, files, config);
}

const updateProductAPI = async (data: any, id: number) => {
    const URL_BACKEND = `api/v1/products/${id}`
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await axios.put(URL_BACKEND, data, config);
}

const deleteProductAPI = async (id: number) => {
    const URL_BACKEND = `api/v1/products/${id}`
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await axios.delete(URL_BACKEND, config);
}


const fetchAllProductsinStore = async () => {
    const URL_BACKEND = `api/v1/store/all/product`
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await axios.get(URL_BACKEND, config);
}


const createStoreAPI = async (data: any) => {
    const URL_BACKEND = `api/v1/store/create`
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return await axios.post(URL_BACKEND, data, config)
}

const getInforStoreAPI = async () => {
    const URL_BACKEND = `api/v1/store/info`
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return await axios.get(URL_BACKEND, config)
}

const updateInforStoreAPI = async (data: any) => {
    const URL_BACKEND = `api/v1/store/update`
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return await axios.put(URL_BACKEND, data, config)
}
const deleteStoreAPI = async (password: string) => {
    const URL_BACKEND = `api/v1/store/delete?password=${encodeURIComponent(password)}`;
    const token = getAccessToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await axios.delete(URL_BACKEND, config);
};


const createStoreDiscountAPI = async (data: any) => {
    const URL_BACKEND = `api/v1/add/store_discount`
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return await axios.post(URL_BACKEND, data, config)
}

const getStoreDiscountAPI = async () => {
    const URL_BACKEND = `api/v1/store_discount`
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return await axios.get(URL_BACKEND, config)
}

const updateStoreDiscountAPI = async (data: any, id: number) => {
    const URL_BACKEND = `api/v1/store_discount/${id}`
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return await axios.put(URL_BACKEND, data, config)
}

const deleteStoreDiscountAPI = async (id: number) => {
    const URL_BACKEND = `api/v1/store_discount/${id}`
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return await axios.delete(URL_BACKEND, config)
}

const getStoreBoxesAPI = async () => {
    const URL_BACKEND = `api/v1/store/all/box`
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return await axios.get(URL_BACKEND, config)
}

const getAllCategoryAPI = async () => {
    const URL_BACKEND = `api/v1/categories`
    return await axios.get(URL_BACKEND)
}

const getAllProductAPI = async () => {
    const URL_BACKEND = `api/v1/products`
    return await axios.get(URL_BACKEND)
}

export {
    registerAPI, loginAPI, loginGoogleAPI, logoutAPI, changePasswordAPI,
    getUserLoginAPI, forgotPasswordAPI, updatePasswordAPI, getProfileAPI, updateProfileAPI,
    getAllDelivery, createDeliveryAPI, updateDeliveryAPI, deleteDeliveryAPI,
    getInforStoreAPI, updateInforStoreAPI, createStoreAPI, deleteStoreAPI,
    createStoreDiscountAPI, getStoreDiscountAPI, updateStoreDiscountAPI, getStoreBoxesAPI,
    getOrderAPI, deleteStoreDiscountAPI, getAllCategoryAPI, getAllProductAPI,
    createProductAPI, updateProductAPI, fetchAllProductsinStore, uploadImageAPI, deleteProductAPI
}