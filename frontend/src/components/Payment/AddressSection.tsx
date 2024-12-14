import React from 'react';
import styles from './AddressSection.module.css';

const AddressSection: React.FC = () => {
  return (
    <section className={styles.addressSection}>
      <h2 className={styles.sectionTitle}>Địa chỉ nhận hàng</h2>
      <div className={styles.addressInfo}>
        <div className={styles.userDetails}>
          <p className={styles.userName}>Tên người dùng</p>
          <p className={styles.userPhone}>032xxxxxxx</p>
        </div>
        <div className={styles.addressDetails}>
          <p className={styles.addressText}>
            Ký túc xá khu A, Đường Tạ Quang Bửu, Khu phố 6, Thủ Đức, Hồ Chí Minh, Việt Nam
          </p>
          <span className={styles.defaultTag}>Mặc định</span>
          <button className={styles.changeButton}>Thay đổi</button>
        </div>
      </div>
    </section>
  );
};

export default AddressSection;