import React, { useState, useEffect } from 'react';
import styles from './ProductSection.module.css';
import PaymentMethodSection from './PaymentMethodSection';
import { fetchStoreDiscountAPI, createOrderAPI, fetchShippingDiscountAPI, fetchSystemDiscountAPI } from '../../services/api.service2.ts';

interface Product {
  id: number;
  name: string;
  brand: string;
  catogoryName: string;
  price: number;
  quantity: number;
  productURL: string;
  store_id: number;
  store_name: string;
}

interface Voucher {
  id: number;
  code: string;
  quantity: number;
  amount: number;
  release_date: string;
  start_date: string;
  expiration_date: string;
}

interface Discount {
  id: number;
  code: string;
  quantity: number;
  release_date: string;
  start_date: string;
  expiration_date: string;
  max_amount: number;
  min_bill_amount?: number;
  percentage?: number;
}

interface ProductSectionProps {
  products: Product[];
  selectedAddressId: number | null;
}

const ProductSection: React.FC<ProductSectionProps> = ({ products, selectedAddressId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVouchers, setSelectedVouchers] = useState<{ [productID: number]: number | null }>({});
  const [activeProductID, setActiveProductID] = useState<number | null>(null);
  const [productVouchers, setProductVouchers] = useState<{ [productID: number]: Voucher[] }>({});
  const [orderResponse, setOrderResponse] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(1);
  const [selectedShippingDiscount, setSelectedShippingDiscount] = useState<number | null>(null);
  const [shippingDiscounts, setShippingDiscounts] = useState<Discount[]>([]);
  const [selectedSystemDiscount, setSelectedSystemDiscount] = useState<number | null>(null);
  const [systemDiscounts, setSystemDiscounts] = useState<Discount[]>([]);
  const shippingCost = 15000;
  const voucherDiscount = 0;

  useEffect(() => {
    const fetchVouchers = async () => {
      const vouchersData: { [key: number]: Voucher[] } = {};
      for (const product of products) {
        try {
          const result = await fetchStoreDiscountAPI(product.store_id);
          console.log(`Vouchers for product ${product.id}:`, result.data);
          vouchersData[product.id] = result;
        } catch (error) {
          console.error(`Error fetching vouchers for product ${product.id}:`, error);
        }
      }
      setProductVouchers(vouchersData);
    };

    fetchVouchers();
  }, [products]);

  useEffect(() => {
    const fetchShippingDiscounts = async () => {
      try {
        const data = await fetchShippingDiscountAPI();
        setShippingDiscounts(data);
      } catch (error) {
        console.error('Error fetching shipping discounts:', error);
      }
    };

    fetchShippingDiscounts();
  }, []);

  useEffect(() => {
    const fetchSystemDiscounts = async () => {
      try {
        const data = await fetchSystemDiscountAPI();
        setSystemDiscounts(data);
      } catch (error) {
        console.error('Error fetching system discounts:', error);
      }
    };

    fetchSystemDiscounts();
  }, []);

  if (!products || products.length === 0) {
    return <div>Không có sản phẩm trong giỏ hàng.</div>;
  }

  const groupedProducts = (products || []).reduce((acc: { [key: string]: Product[] }, product) => {
    const store_id = product.store_id ?? '0';
    if (!acc[store_id]) acc[store_id] = [];
    acc[store_id].push(product);
    return acc;
  }, {});

  const totalCost = Object.keys(groupedProducts).reduce((acc, store_id) => {
    const storeProducts = groupedProducts[store_id];
    const storeTotalCost = storeProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const storeFinalCost = storeTotalCost - storeProducts.reduce((acc, product) => acc + (selectedVouchers[product.id] ?? voucherDiscount), 0);
    return acc + storeFinalCost + shippingCost - (selectedShippingDiscount ? shippingDiscounts.find(discount => discount.id === selectedShippingDiscount)?.max_amount ?? 0 : 0);
  }, 0);

  const toggleModal = (productID: number) => {
    if (productID !== null) {
      setActiveProductID(productID);
      setIsModalOpen(prev => !prev);
    }
  };

  const handleVoucherSelect = (voucherDiscount: number, voucherId: number) => {
    if (activeProductID !== null) {
      setSelectedVouchers(prev => ({ ...prev, [activeProductID]: voucherId }));
      toggleModal(activeProductID);
    }
  };

  const handlePaymentMethodChange = (methodId: number) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleShippingDiscountChange = (discountId: number | null) => {
    setSelectedShippingDiscount(discountId);
  };

  const handleSystemDiscountChange = (discountId: number | null) => {
    setSelectedSystemDiscount(discountId);
  };

  const handlePayment = async () => {
    if (selectedAddressId === null) {
      alert('Please select a delivery address.');
      return;
    }
    const selectedVoucherIds = Object.values(selectedVouchers).filter(voucher => voucher !== null) as number[];

    const orderData = {
      consignee_information_id: selectedAddressId, // Use the selected address ID
      system_discount_id: selectedSystemDiscount?? null, // Use the selected system discount ID
      pay_method: selectedPaymentMethod === 1 ? "Credit" : "Cash",
      products: products.map(product => ({ id: product.id, quantity: product.quantity })),
      store_discounts_ids: selectedVoucherIds,
      shipping_discounts_id: selectedShippingDiscount ?? null // Use the selected shipping discount ID or default to null
    };

    try {
      console.log('Order created successfully:', orderData);
      const response = await createOrderAPI(orderData);
      setOrderResponse(response);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <section className={styles.productSection}>
      <h2 className={styles.sectionTitle}>Sản Phẩm</h2>

      {Object.keys(groupedProducts).map((store_id) => {
        const storeProducts = groupedProducts[store_id];
        const storeTotalCost = storeProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
        const storeFinalCost = storeTotalCost - storeProducts.reduce((acc, product) => acc + (selectedVouchers[product.id] ?? voucherDiscount), 0);

        return (
          <div key={store_id} className={styles.storeContainer}>
            <h3>{storeProducts[0].store_name}</h3>

            {storeProducts.map((product) => {
              const productTotal = product.price * product.quantity;

              return (
                <div key={product.id} className={styles.productContainer}>
                  <div className={styles.productRow}>
                    <div className={styles.productInfo}>
                      <img src={product.productURL} alt={product.name} className={styles.productImage} />
                      <div className={styles.productDetails}>
                        <h3 className={styles.productName}>{product.name}</h3>
                      </div>
                    </div>
                    <div className={styles.productPricing}>
                      <span>{product.price.toLocaleString()} VND</span>
                      <span>x {product.quantity}</span>
                      <span className={styles.productTotal}>{productTotal.toLocaleString()} VND</span>
                    </div>
                  </div>

                  <div className={styles.voucherRow}>
                    <span>Voucher của Sản phẩm</span>
                    <button className={styles.voucherButton} onClick={() => toggleModal(product.id)}>Chọn Voucher Khác</button>
                    <span className={styles.voucherDiscount}>
                      -{(productVouchers[product.id]?.find(v => v.id === selectedVouchers[product.id])?.amount ?? voucherDiscount).toLocaleString()} VND
                    </span>
                  </div>

                  <div className={styles.totalRow}>
                    <span className={styles.totalText}>Tổng số tiền:</span>
                    <span className={styles.totalAmount}>{productTotal.toLocaleString()} VND</span>
                  </div>
                </div>
              );
            })}

            <div className={styles.shippingRow}>
              <span>Phí vận chuyển</span>
              <span>{shippingCost.toLocaleString()} VND</span>
            </div>

            <div className={styles.totalCostRow}>
              <span className={styles.totalCostText}>Tổng chi phí cửa hàng {storeProducts[0].store_name}:</span>
              <span className={styles.totalCostAmount}>
                {storeFinalCost.toLocaleString()} VND
              </span>
            </div>
          </div>
        );
      })}
      <PaymentMethodSection onPaymentMethodChange={handlePaymentMethodChange} />
      <div className={styles.discountSection}>
        <h3>Chọn Giảm Giá Vận Chuyển</h3>
        <select onChange={(e) => handleShippingDiscountChange(e.target.value ? Number(e.target.value) : null)}>
          <option value="">Không chọn</option>
          {shippingDiscounts.map(discount => (
            <option key={discount.id} value={discount.id}>
              {discount.code} - Giảm {discount.max_amount.toLocaleString()} VND
            </option>
          ))}
        </select>
      </div>
      <div className={styles.discountSection}>
        <h3>Chọn Giảm Giá Hệ Thống</h3>
        <select onChange={(e) => handleSystemDiscountChange(e.target.value ? Number(e.target.value) : null)}>
          <option value="">Không chọn</option>
          {systemDiscounts.map(discount => (
            <option key={discount.id} value={discount.id}>
              {discount.code} - Giảm {discount.max_amount.toLocaleString()} VND
            </option>
          ))}
        </select>
      </div>
      <div className={styles.totalCostRow}>
        <span className={styles.totalCostText}>Tổng chi phí giỏ hàng: </span>
        <span className={styles.totalCostAmount}>{totalCost.toLocaleString()} VND</span>
      </div>
      <button className={styles.paymentButton} onClick={handlePayment}>Thanh toán</button>
      {isModalOpen && activeProductID !== null && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Chọn Voucher</h3>
            <div className={styles.voucherOptions}>
              {productVouchers[activeProductID]?.map(voucher => (
                <button
                  key={voucher.id}
                  className={`${styles.voucherOption} ${selectedVouchers[activeProductID] === voucher.id ? styles.selectedVoucher : ''}`}
                  onClick={() => handleVoucherSelect(voucher.amount, voucher.id)}
                >
                  {voucher.code} - Giảm {voucher.amount.toLocaleString()} VND
                </button>
              ))}
            </div>
            <button className={styles.closeButton} onClick={() => toggleModal(activeProductID!)}>Đóng</button>
          </div>
        </div>
      )}
      {orderResponse && (
        <div className={styles.orderResponse}>
          <h3>Order Response:</h3>
          <pre>{JSON.stringify(orderResponse, null, 2)}</pre>
        </div>
      )}
    </section>
  );
};

export default ProductSection;