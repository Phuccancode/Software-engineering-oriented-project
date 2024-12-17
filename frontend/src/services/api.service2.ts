
import axios from './axios.customize';
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
const accessToken = localStorage.getItem('access_token');

const fetchCartItemsAPI = async () => {
    const URL_BACKEND = "/api/v1/productincart";

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
    const URL_BACKEND = `/api/v1/delete/${productId}`;


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
    const URL_BACKEND = `/api/v1/add/${productId}`;

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
    const URL_BACKEND = `/api/v1/user/delivery/all`;

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
        console.log('API order response:', response.data);
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
const fetchAllUsersAPI = async () => {
    const URL_BACKEND = `/api/v1/admin/user`;

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
const fetchAllStoresAPI = async () => {
    const URL_BACKEND = `/api/v1/admin/store`;

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
const fetchCategoriesAPI = async () => {
    const URL_BACKEND = `/api/v1/categories`;

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
const addCategoryAPI = async (categoryData: { name: string }) => {
    const URL_BACKEND = `/api/v1/categories`;
    const response = await axios.post(URL_BACKEND, categoryData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    try {

        console.log('API response:', response.data);
        notification.success({
            message: 'Category Added',
            description: 'The category has been added successfully.',
        });
        return response.data; // Return the data directly
    } catch (error) {
        console.error('API error:', error);

        // Extract status code and message from the error response
        const statusCode = response?.status;
        const errorMessage = response?.data?.message || 'An error occurred';

        notification.error({
            message: `Error ${statusCode}`,
            description: errorMessage,
        });
        throw error;
    }
};
const updateCategoryAPI = async (categoryId: number, categoryData: { name: string }) => {
    const URL_BACKEND = `/api/v1/categories/${categoryId}`;

    try {
        const response = await axios.put(URL_BACKEND, categoryData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('API response:', response.data);
        notification.success({
            message: 'Category Updated',
            description: 'The category has been updated successfully.',
        });
        return response.data; // Return the data directly
    } catch (error) {
        console.error('API error:', error);

        // Extract status code and message from the error response


        notification.error({
            message: `Đã xảy ra lỗi `,
            description: 'Cập nhật danh mục không thành công',
        });
        throw error;
    }
};
const deleteCategoryAPI = async (categoryId: number) => {
    const URL_BACKEND = `/api/v1/categories/${categoryId}`;

    try {
        const response = await axios.delete(URL_BACKEND, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.status === 200) {
            console.log('API response:', response.data);
            notification.success({
                message: 'Category Deleted',
                description: 'The category has been deleted successfully.',
            });
        }
        else {
            notification.error({
                message: 'Error',
                description: 'Failed to delete the category.',
            });
        }
        return response.data; // Return the data directly
    } catch (error) {
        console.error('API error:', error);



        notification.error({
            message: 'Error',
            description: 'Failed to delete the category.',
        });
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
    fetchProductImagesAPI,
    fetchAllUsersAPI,
    fetchAllStoresAPI,
    fetchCategoriesAPI,
    addCategoryAPI,
    updateCategoryAPI,
    deleteCategoryAPI
};

