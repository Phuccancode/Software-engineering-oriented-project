import React, { useEffect, useState } from 'react';
import '../styles/ProductDetailPage.css';



const ProductDetailPage = ({ }) => {

    interface Product {
        id: number;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        variants: string[];
    }

    const [product, setProduct] = useState<Product | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    /*"useEffect(() => {
        fetch('https://5fb2e9c4-bfad-48ee-844c-44101b0784f2.mock.pstmn.io/product/1')
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error("Error fetching product:", error));
    }, []);*/

    useEffect(() => {
        // Sample product data
        const sampleProduct: Product = {
            id: 1,
            name: "Sample Product",
            description: "This is a sample product description.",
            price: 99.99,
            imageUrl: "https://via.placeholder.com/300",
            variants: ["Variant 1", "Variant 2", "Variant 3", " Variant 4", "Variant 5", "Variant 6", "Variant 7", "Variant 8", "Variant 9", " Variant 10", "Variant 11", "Variant 12"]

        };

        // Simulate fetching data
        setTimeout(() => {
            setProduct(sampleProduct);
        }, 1000);
    }, []);
    if (!product) return <p>Loading...</p>;

    const handleVariantClick = (variant: string) => {
        setSelectedVariant(variant);
    };
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
    };

    const handleAddToCart = () => {
        console.log(`Added ${quantity} of ${name} (${selectedVariant}) to cart.`);
    };

    const handleBuyNow = () => {
        console.log(`Bought ${quantity} of ${name} (${selectedVariant}).`);
    };

    const { id, name, description, price, imageUrl, variants } = product;
    return (
        <div className="product-detail-page1">
            <div className='product-container'>
                <img src={imageUrl} alt={name} />
                <div className="product-details">
                    <p className='name'>{name}</p>
                    <p >{description}</p>
                    <p>Price: ${price}</p>
                    {variants && variants.length > 0 && (
                        <div className="product-variants">
                            <h3>Mẫu mã:</h3>
                            <div className="variant-buttons">
                                {variants.map((variant: string, index: number) => (
                                    <button
                                        key={index}
                                        className={`variant-button ${selectedVariant === variant ? 'selected' : ''}`}
                                        onClick={() => handleVariantClick(variant)}
                                    >
                                        {variant}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
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
        </div>
    );
};

export default ProductDetailPage;

function setQuantity(arg0: number) {
    throw new Error('Function not implemented.');
}
