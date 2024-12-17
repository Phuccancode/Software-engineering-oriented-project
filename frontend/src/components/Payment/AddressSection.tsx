import React, { useState, useEffect } from 'react';
import styles from './AddressSection.module.css';
import { fetchUserDeliveryAddressesAPI } from '../../services/api.service2.ts';

interface Address {
  id: number;
  city: string;
  district: string;
  ward: string;
  consignee_name: string;
  phone_number: string;
  road_number: string;
}

interface AddressSectionProps {
  onAddressSelect: (addressId: number) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({ onAddressSelect }) => {
  const [data, setData] = useState<Address[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const result = await fetchUserDeliveryAddressesAPI(1);
        setData(result.data);
        setSelectedAddress(result.data[0]); // Hiển thị địa chỉ đầu tiên
        onAddressSelect(result.data[0].id); // Pass the first address ID to the parent component
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAddresses();
  }, [onAddressSelect]);

  const handleChangeClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    setIsModalOpen(false); // Đóng modal sau khi chọn địa chỉ
    onAddressSelect(address.id); // Pass the selected address ID to the parent component
  };

  if (!data || !selectedAddress) {
    return <div>Loading...</div>;
  }

  const addressText = `${selectedAddress.road_number}, ${selectedAddress.ward}, ${selectedAddress.district}, ${selectedAddress.city}`;

  return (
    <section className={styles.addressSection}>
      <h2 className={styles.sectionTitle}>Địa chỉ nhận hàng</h2>
      <div className={styles.addressInfo}>
        <div className={styles.userDetails}>
          <p className={styles.userName}>{selectedAddress.consignee_name}</p>
        </div>
        <div className={styles.addressDetails}>
          <p className={styles.userPhone}>SĐT: {selectedAddress.phone_number}</p>
          <p className={styles.addressText}>{addressText}</p>
          <button className={styles.changeButton} onClick={handleChangeClick}>Thay đổi</button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Chọn địa chỉ để thay đổi</h3>
            {data.map((address, index) => (
              <button 
                key={index} 
                className={styles.addressOptionButton} 
                onClick={() => handleSelectAddress(address)}
              >
                {`${address.road_number}, ${address.ward}, ${address.district}, ${address.city}`}
              </button>
            ))}
            <button onClick={handleModalClose}>Đóng</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AddressSection;