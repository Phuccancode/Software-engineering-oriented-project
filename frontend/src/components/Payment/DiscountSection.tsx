// DiscountSection.tsx

import React from 'react';
import styles from './DiscountSection.module.css';

interface DiscountOption {
  id: number;
  name: string;
  amount: number;
  type: 'fixed' | 'percentage';
}

interface DiscountSectionProps {
  discount: DiscountOption | null;
}

const DiscountSection: React.FC<DiscountSectionProps> = ({ discount }) => {
  if (!discount) {
    return null; // Do not render anything if there's no discount
  }

  const formatDiscountAmount = (discount: DiscountOption) => {
    return discount.type === 'fixed'
      ? `- ${discount.amount.toLocaleString('vi-VN')} VND`
      : `- ${discount.amount}%`;
  };

  return (
    <section className={styles.discountSection}>
      <h2 className={styles.sectionTitle}>Mã Giảm Giá</h2>
      <div className={styles.discountDetails}>
        <span className={styles.discountName}>{discount.name}</span>
        <span className={styles.discountAmount}>
          {formatDiscountAmount(discount)}
        </span>
      </div>
    </section>
  );
};

export default DiscountSection;