import React from 'react';
import styles from './OrderSummary.module.css';

interface OrderSummaryProps {
  totalAmount: number;
  
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ totalAmount}) => {
  const formattedTotalAmount = totalAmount !== undefined ? totalAmount.toLocaleString() : '0';
  
  return (
    <section className={styles.orderSummary}>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>Tổng tiền hàng</span>
        <span className={styles.summaryValue}>{formattedTotalAmount} VNĐ</span>
      </div>
      
      <div className={styles.summaryTotal}>
        <span className={styles.totalLabel}>Tổng thanh toán</span>
        <span className={styles.totalValue}>{(totalAmount).toLocaleString()} VNĐ</span>
      </div>
      <button className={styles.orderButton}>ĐẶT HÀNG</button>
    </section>
  );
};

export default OrderSummary;