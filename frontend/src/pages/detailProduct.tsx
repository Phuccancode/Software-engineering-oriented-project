import React, { useEffect, useState } from 'react';
import '../styles/ProductDetailPage.css';
import { useParams } from 'react-router-dom';
import { fetchProductDetailAPI, fetchProductReviewsAPI, addProductToCartAPI, fetchProductImagesAPI } from '../services/api.service2.ts';

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    interface Review {
        id: number;
        rating: number;
        text: string;
        time: string;
    }

    interface Product {
        id: number;
        name: string;
        brand: string;
        description: string;
        price: number;
        quantity: number;
        store_id: number;
        buying_count: number;
        rating_count: number;
        avg_rating: number;
        num_image: number;
        status: string;
        category_id: number;
        category_name: string;
    }

    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [images, setImages] = useState<string[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const reviewsPerPage = 3; // Số bài review hiển thị trên mỗi trang
    const [totalReviews, setTotalReviews] = useState<number>(0);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetchProductDetailAPI(Number(id));
                const productData = response.data;
                console.log('Fetched product data:', productData);
                setProduct(productData);

                // Fetch product images
                const imagesData = await fetchProductImagesAPI(productData.id, productData.num_image);
                const imageUrls = imagesData.map((image: Blob) => URL.createObjectURL(image));
                console.log('Fetched image URLs:', imageUrls);
                setImages(imageUrls);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        const fetchProductReviews = async () => {
            try {
                const reviewsData = await fetchProductReviewsAPI(Number(id));
                console.log('Fetched reviews data:', reviewsData);
                setReviews(reviewsData);
                setTotalReviews(reviewsData.length);
            } catch (error) {
                console.error('Error fetching product reviews:', error);
            }
        };

        fetchProductDetails();
        fetchProductReviews();
    }, [id]);

    useEffect(() => {
        if (images.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 5000); // Change image every 5 seconds

            return () => clearInterval(interval); // Cleanup interval on component unmount
        }
    }, [images]);

    useEffect(() => {
        console.log('Current image index:', currentImageIndex);
    }, [currentImageIndex]);

    if (!product) return <p>Loading...</p>;

    console.log('Product state:', product);
    console.log('Review state:', reviews);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
    };

    const handleAddToCart = async () => {
        try {
            await addProductToCartAPI(1, product.id); // Replace 1 with the actual user ID
            console.log(`Added ${quantity} of ${product.name} to cart.`);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleBuyNow = () => {
        console.log(`Bought ${quantity} of ${product.name}.`);
    };

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const totalPages = Math.ceil(totalReviews / reviewsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const { name, description, price, avg_rating, rating_count, buying_count } = product;

    return (
        <div className="product-detail-page1">
            <div className='product-container'>
                <div className="product-images">
                    {images.length > 0 && (
                        <img
                            src={images[currentImageIndex]}
                            alt={`Image ${currentImageIndex + 1}`}
                            className="productImage"
                        />
                    )}
                </div>
                <div className="product-details">
                    <p className='name'>Tên: {name}</p>
                    <p>{description}</p>
                    <p>Price: ${price}</p>
                    
                    <div className="quantity">
                        <label htmlFor="quantity">Số lượng:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                        />
                    </div>
                    <div className="action-buttons">
                        <button className="add-to-cart-button" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                        <button className="buy-now-button" onClick={handleBuyNow}>Mua ngay</button>
                    </div>
                </div>
            </div>

            <div className="review-section">
                <h3>Đánh giá sản phẩm</h3>
                <div className="review-details">
                    <p><strong>Đánh giá trung bình:</strong>  {avg_rating} ★</p>
                    <p><strong>Số lượng đánh giá:</strong> {rating_count}</p>
                    <p><strong>Số lượng mua:</strong> {buying_count}</p>
                </div>

                <h4>Bài đánh giá:</h4>
                <div className="reviews-list">
                    {currentReviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <div className="review-header">
                                <span className="review-user">{review.id}</span>
                                <span className="review-date">{new Date(review.time).toLocaleDateString()}</span>
                            </div>
                            <div className="review-rating">
                                {review.rating} ★
                            </div>
                            <p className="review-comment">{review.text}</p>
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;