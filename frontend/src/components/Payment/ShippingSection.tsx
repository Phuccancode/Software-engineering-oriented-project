import React from 'react';
import styles from './ShippingSection.module.css';


interface Shipping {
  method: string;
  cost: number;
  estimatedDelivery: string;
}

interface ShippingSectionProps {
  shipping: Shipping;
}

const ShippingSection: React.FC<ShippingSectionProps> = ({ shipping }) => {
  return (
    <section className={styles.shippingSection}>
      <h2 className={styles.sectionTitle}>Vận chuyển</h2>
      <div className={styles.shippingOption}>
        <p>Phương thức: {shipping.method}</p>
        <p>Giá: {shipping.cost.toLocaleString()} VND</p>
        <p>Thời gian giao hàng: {shipping.estimatedDelivery}</p>
      </div>
    </section>
  );
};

export default ShippingSection;