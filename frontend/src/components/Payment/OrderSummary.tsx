import React from 'react';
import styles from './OrderSummary.module.css';

interface OrderSummaryProps {
  totalAmount: number;
  totalShippingCost: number;
  totalDiscount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ totalAmount, totalShippingCost , totalDiscount}) => {
  const formattedTotalAmount = totalAmount !== undefined ? totalAmount.toLocaleString() : '0';
  const formattedTotalShippingCost = totalShippingCost !== undefined ? totalShippingCost.toLocaleString() : '0';
  const formattedTotalDiscount = totalDiscount !== undefined ? totalDiscount.toLocaleString() : '0';
  return (
    <section className={styles.orderSummary}>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>Tổng tiền hàng</span>
        <span className={styles.summaryValue}>{formattedTotalAmount} VNĐ</span>
      </div>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>Phí vận chuyển</span>
        <span className={styles.summaryValue}>{formattedTotalShippingCost} VNĐ</span>
      </div>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>Tổng cộng mã giảm giá</span>
        <span className={styles.summaryValue}>-{formattedTotalDiscount} VNĐ</span>
      </div>
      <div className={styles.summaryTotal}>
        <span className={styles.totalLabel}>Tổng thanh toán</span>
        <span className={styles.totalValue}>{(totalAmount + totalShippingCost).toLocaleString()} VNĐ</span>
      </div>
      <button className={styles.orderButton}>ĐẶT HÀNG</button>
    </section>
  );
};

export default OrderSummary;