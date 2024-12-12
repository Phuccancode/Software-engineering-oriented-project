import React, { useState, useEffect } from 'react';
import styles from './PaymentMethodSection.module.css';

interface PaymentMethod {
  id: number;
  name: string;
  icon: string;
}

interface Bank {
  id: number;
  name: string;
  icon: string;
}

const paymentMethods: PaymentMethod[] = [
  { id: 1, name: 'Tài khoản ngân hàng', icon: '' },
  { id: 3, name: 'Thanh toán khi nhận hàng', icon: '' }
];

const banks: Bank[] = [
  {
    id: 1,
    name: 'BIDV',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1a317a31eb2ce056fc6bfbf04eab3656131a19b8494c701aa4f9aa232f1a39b3?apiKey=1030477bbfe341728a648dc69cf63b1d&'
  },
  {
    id: 2,
    name: 'VietinBank',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/5b7d1447e13966aec0308cd6b868cb425318db4bf65fad7a8d4b06f231fab247?apiKey=1030477bbfe341728a648dc69cf63b1d&'
  },
  {
    id: 3,
    name: 'MB',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/cdfe2a64fbd7fc62057f4b8c91d12baf24ed4a6bbeafa1027dd7dd79af8d017b?apiKey=1030477bbfe341728a648dc69cf63b1d&'
  }
];

interface PaymentMethodSectionProps {
  onPaymentMethodChange: (methodId: number) => void;
}

const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({ onPaymentMethodChange }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(paymentMethods[0].id);
  const [selectedBank, setSelectedBank] = useState<number | null>(null);

  useEffect(() => {
    onPaymentMethodChange(selectedPaymentMethod);
  }, [selectedPaymentMethod, onPaymentMethodChange]);

  const handlePaymentMethodClick = (methodId: number) => {
    setSelectedPaymentMethod(methodId);

    

    if (methodId !== 1) {
      setSelectedBank(null);
    }
  };

  const handleBankSelection = (bankId: number) => {
    setSelectedBank(bankId);
  };

  

  return (
    <section className={styles.paymentMethodSection}>
      <h2 className={styles.sectionTitle}>Phương thức thanh toán</h2>

      <div className={styles.paymentOptions}>
        <div className={styles.paymentMethods}>
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              className={`${styles.paymentMethod} ${selectedPaymentMethod === method.id ? styles.active : ''}`}
              onClick={() => handlePaymentMethodClick(method.id)}
            >
              {method.icon && <img src={method.icon} alt="" className={styles.methodIcon} />}
              <span>{method.name}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedPaymentMethod === 1 && (
        <div className={styles.bankList}>
          <button className={styles.linkBankButton}>Liên kết ngân hàng khác</button>
          {banks.map((bank) => (
            <label
              key={bank.id}
              className={`${styles.bankOption} ${selectedBank === bank.id ? styles.activeBank : ''}`}
            >
              <input
                type="radio"
                name="bank"
                className={styles.radio}
                checked={selectedBank === bank.id}
                onChange={() => handleBankSelection(bank.id)}
              />
              <img src={bank.icon} alt={bank.name} className={styles.bankIcon} />
              <span className={styles.bankName}>{bank.name}</span>
            </label>
          ))}
        </div>
      )}

      <div className={styles.paymentDetails}>
        {selectedPaymentMethod === 1 && (
          <div className={styles.bankAccountDetails}>
            <h3>Thông Tin Tài Khoản Ngân Hàng</h3>
            <p>Vui lòng chọn ngân hàng từ danh sách trên.</p>
          </div>
        )}

        {selectedPaymentMethod === 3 && (
          <div className={styles.amountDetails}>
            <h3>Thanh toán khi nhân hàng</h3>
            <p>khi nhận hàng, hãy thanh toán cho shipper</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentMethodSection;