import axios from './axios.customize';
    const accessToken = localStorage.getItem('access_token'); 

const fetchCartItemsAPI = async () => {
    const URL_BACKEND = "/api/v1/productincart/1";

    try {
        const response = await axios.get(URL_BACKEND, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('API response:', response.data);
        return response;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};


const fetchProductImagesAPI = async (productId: number, numImages: number) => {
    const imageUrls = Array.from({ length: numImages }, (_, i) => 
        `/images/${productId}/${i + 1}.jpg`
    );

    try {
        const imagePromises = imageUrls.map(url => 
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                responseType: 'blob' // Ensure the response is a blob (binary data)
            })
        );

        const responses = await Promise.all(imagePromises);
        const images = responses.map(response => response.data);
        console.log('API ima responses:', images);
        return images; // Return the array of image data
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};
const deleteCartItemAPI = async (userId: number, productId: number) => {
    const URL_BACKEND = `/api/v1/delete/${userId}/${productId}`;


    try {
        const response = await axios.delete(URL_BACKEND, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('API response:', response.data);
        return response;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};
const fetchProductDetailAPI = async (productId: number) => {
    const URL_BACKEND = `/api/v1/products/${productId}`;
    
    try {
        const response = await axios.get(URL_BACKEND, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('API response:', response.data);
        return response;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};
const fetchProductReviewsAPI = async (productId: number) => {
    const URL_BACKEND = `/api/v1/review/all/${productId}`;
   
    try {
        const response = await axios.get(URL_BACKEND, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('API response:', response.data);
        return response.data; // Return the data directly
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};
const addProductToCartAPI = async (userId: number, productId: number) => {
    const URL_BACKEND = `/api/v1/add/${userId}/${productId}`;

    try {
        const response = await axios.post(URL_BACKEND, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('API response:', response);
        return response;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};

const fetchUserDeliveryAddressesAPI = async (userId: number) => {
    const URL_BACKEND = `/api/v1/user/delivery/all/${userId}`;

    try {
        const response = await axios.get(URL_BACKEND, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('API response:', response.data);
        return response; // Return the data directly
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};
const fetchStoreDiscountAPI = async (storeId: number) => {
    const URL_BACKEND = `/api/v1/store_discount/${storeId}`;

    try {
        const response = await axios.get(URL_BACKEND, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('API response:', response.data);
        return response.data; // Return the data directly
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};
const createOrderAPI = async (orderData: {
    consignee_information_id: number;
    system_discount_id: number | null;
    pay_method: string;
    products: { id: number; quantity: number }[];
    store_discounts_ids: number[];
    shipping_discounts_id: number | null;
}) => {
    const URL_BACKEND = `/api/v1/order`;

    try {
        const response = await axios.post(URL_BACKEND, orderData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('API response:', response.data);
        return response.data; // Return the data directly
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};
const fetchShippingDiscountAPI = async () => {
    const URL_BACKEND = `/api/v1/shipping_discount`;

    try {
        const response = await axios.get(URL_BACKEND, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('API response:', response.data);
        return response.data; // Return the data directly
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};
    const fetchSystemDiscountAPI = async () => {
        const URL_BACKEND = `/api/v1/system_discount`;

        try {
            const response = await axios.get(URL_BACKEND, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log('API response:', response.data);
            return response.data; // Return the data directly
        } catch (error) {
            console.error('API error:', error);
            throw error;
        }
    };
export {
    fetchCartItemsAPI,
    deleteCartItemAPI,
    fetchProductDetailAPI,
    fetchProductReviewsAPI,
    addProductToCartAPI,
    fetchUserDeliveryAddressesAPI,
    fetchStoreDiscountAPI,
    createOrderAPI,
    fetchShippingDiscountAPI,
    fetchSystemDiscountAPI,
    fetchProductImagesAPI
};