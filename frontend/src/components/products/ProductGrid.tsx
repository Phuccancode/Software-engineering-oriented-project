import React, { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import styles from '../../styles/ProductGird.module.css';
import ipad from '../../assets/images/ipad.png';
import iphone from '../../assets/images/iphone.png';
import macbook from '../../assets/images/macbook.png';
import watch from '../../assets/images/watch.png';
import { getAllProductAPI } from '../../services/api.service1';



const NumberToCurrency = (money: any) => {
  const formattedAmount = new Intl.NumberFormat('vi-VN').format(money);
  return `${formattedAmount} VNĐ`;
};

export const ProductGird = (props: any) => {
  const { setIsSpinning } = props;
  const [listProduct, setListProduct] = useState([])
  const getAllProducts = async () => {
    setIsSpinning(true)
    const response: any = await getAllProductAPI()
    if (response.statusCode === 200) {
      setListProduct(response.data.products)
    }
    setIsSpinning(false)
  }
  useEffect(() => {
    getAllProducts()
  }, [])

  useEffect(() => {
    console.log(listProduct)
  }, [listProduct])

  return (

    <>
      <section className={styles.container_top}>
        <div className={styles.contaier_top_title}>
          <h1>Your One-Stop</h1>
          <h1>Solution for</h1>
          <h1 style={{ marginBottom: "1rem" }}
          >Buying and Selling.</h1>
          <p>Harmonie Shop là giải pháp toàn diện, nơi người mua và</p>
          <p> người bán có thể thực hiện mọi giao dịch chỉ trong một nền tảng.</p>
          <button>Mua Ngay</button>
        </div>
        <div className={styles.contaier_top_image}>
          <img className={styles.ipad} src={ipad} alt="ipad" />
          <img className={styles.macbook} src={macbook} alt="macbook" />
          <img className={styles.iphone} src={iphone} alt="iphone" />
          <img className={styles.watch} src={watch} alt="watch" />
        </div>
      </section>
      <section className={styles.container}>
        <h2 className={styles.heading}>Bán chạy nhất</h2>
        <div className={styles.productsGrid}>
          {listProduct && listProduct.map((product: any, index: number) => (
            <ProductCard
              key={index + 1}
              id={product.id}
              imageUrl={`http://localhost:9091/images/${product.id}/1.jpg`}
              title={product.name}
              price={NumberToCurrency(product.price)}
              altText={product.description}
            />
          ))}
        </div>
      </section>
    </>
  );
};