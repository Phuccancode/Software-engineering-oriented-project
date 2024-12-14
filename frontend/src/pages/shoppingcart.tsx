import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ShoppingCart.module.css';
import ShippingSection from '../components/Payment/ShippingSection';
import DiscountSection from '../components/Payment/DiscountSection';


interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    variant?: string;
    shipping: {
        method: string;
        cost: number;
        estimatedDelivery: string;
    };
    discount?: {
        id: number;
        name: string;
        amount: number;
        type: 'fixed' | 'percentage';
    };
}

const cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Dầu gội The Original Hair Shampoo',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4b5b1dc11ace265e82cba697b6945861f502226766f239a22091c596707b1afe?apiKey=1030477bbfe341728a648dc69cf63b1d&',
      price: 299000,
      quantity: 1,
      shipping: {
          method: 'Standard Shipping',
          cost: 30000,
          estimatedDelivery: '3-5 days'
        },
      discount: {
        id: 1,
        name: 'Mã giảm giá của cửa hàng',
        amount: 10000,
        type: 'fixed',
      },
    },
    {
      id: 2,
      name: 'Dầu gội The Original Hair Shampoo',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4b5b1dc11ace265e82cba697b6945861f502226766f239a22091c596707b1afe?apiKey=1030477bbfe341728a648dc69cf63b1d&',
      price: 299000,
      quantity: 1,
      shipping: {
          method: 'Standard Shipping',
          cost: 30000,
          estimatedDelivery: '3-5 days'
        },
      discount: {
        id: 1,
        name: 'Mã giảm giá của cửa hàng',
        amount: 10000,
        type: 'fixed',
      },
    },
];

const ShoppingCart: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const navigate = useNavigate();

    const handleCheckboxChange = (id: number) => {
        setSelectedItems(prevSelectedItems =>
            prevSelectedItems.includes(id)
                ? prevSelectedItems.filter(item => item !== id)
                : [...prevSelectedItems, id]
        );
    };

    const handleCheckout = () => {
        const selectedProducts = cartItems.filter(item => selectedItems.includes(item.id));
        navigate('/payment', { state: { selectedProducts } });
    };

    const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
    const totalAmount = selectedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalShippingCost = selectedCartItems.reduce((sum, item) => sum + item.shipping.cost, 0);
    const totalDiscount = selectedCartItems.reduce((sum, item) => sum + (item.discount?.amount || 0), 0);

    return (
        <div className={styles.shoppingCart}>
            <div className={styles.productcart}>
                <h1 className={styles.sectionTitle}>Shopping Cart</h1>
                <div className={styles.cartHeader}>
                    <span>Sản phẩm</span>
                    <span>Đơn giá</span>
                    <span>Số lượng</span>
                    <span>Thành tiền</span>
                </div>
            {cartItems.map(item => (
                    <div key={item.id} className={styles.cartItem}>
                        <div className={styles.cartInfo}>
                            <input
                                type="checkbox"
                                className={styles.cartCheckbox}
                                checked={selectedItems.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                            <img src={item.image} alt={item.name} className={styles.cartImage} />
                            <div className={styles.cartDetails}>
                                <h3 className={styles.cartName}>{item.name}</h3>
                                {item.variant && <p className={styles.cartVariant}>{item.variant}</p>}
                            </div>
                            <div className={styles.cartPricing}>
                                <span className={styles.cartPrice}>{item.price.toLocaleString()} VNĐ</span>
                                <span className={styles.cartQuantity}>Số lượng: {item.quantity}</span>
                                <span className={styles.cartTotal}>{(item.price * item.quantity).toLocaleString()} VNĐ</span>
                            </div>
                        </div>
                        <div className={styles.extraSections}>
                            <ShippingSection shipping={item.shipping} />
                            <DiscountSection discount={item.discount || null} />
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.container}>
                <div className={styles.details}>
                    <h4 className={styles.label}>Tổng tiền hàng: <span>{totalAmount.toLocaleString()} VNĐ</span></h4>
                    <h4 className={styles.label}>Phí vận chuyển: <span>{totalShippingCost.toLocaleString()} VNĐ</span></h4>
                    <h4 className={styles.label}>Tổng cộng mã giảm giá: <span>{totalDiscount.toLocaleString()} VNĐ</span></h4>
                    <h4 className={styles.finalTotal}>Tổng thanh toán: <span>{(totalAmount + totalShippingCost - totalDiscount).toLocaleString()} VNĐ</span></h4>
                </div>
                <button className={styles.checkoutButton} onClick={handleCheckout}>
                    ĐẶT HÀNG
                </button>
            </div>
        </div>
    );
};

export default ShoppingCart;