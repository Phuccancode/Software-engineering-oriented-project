import React from 'react';
import { ProductCard } from './ProductCard';
import styles from '../../styles/ProductGird.module.css';
import ipad from '../../assets/images/ipad.png';
import iphone from '../../assets/images/iphone.png';
import macbook from '../../assets/images/macbook.png';
import watch from '../../assets/images/watch.png';

interface Product {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
  altText: string;
}

const products: Product[] = [
  {
    id: 1,
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/ab65e3f852932b7b9e6fb8b762569d7f54dc81dadf9d3ad9d7a988fb161be782?placeholderIfAbsent=true&apiKey=e5378003e02141e69ac883f589108e36",
    title: "Iphone 16 ProMax 512GB\nChính Hãng VNA",
    price: "41.999.000 VND",
    altText: "iPhone 16 ProMax 512GB"
  },
  {
    id: 2,
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d6d0e77385947a2536ff53769d5141ca60f9e1fac644f8407d3049768618ff5?placeholderIfAbsent=true&apiKey=e5378003e02141e69ac883f589108e36",
    title: "Nồi áp suất Alpha AS-60\nHàng chính hãng",
    price: "1.999.000 VND",
    altText: "Nồi áp suất Alpha AS-60"
  },
  {
    id: 3,
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/9ad30b786cb0de40fbdf6ced782adaae5ee850e11e0fe0481a95e15938ed838e?placeholderIfAbsent=true&apiKey=e5378003e02141e69ac883f589108e36",
    title: "MacBook Pro 2022\nSpace Gray (Chính Hãng)",
    price: "34.990.000 VND",
    altText: "MacBook Pro 2022 Space Gray"
  },
  {
    id: 4,
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4e4b9e5a1a139e934c7750b1eda35c8172be00ddb4be74ec286cffe15dae212?placeholderIfAbsent=true&apiKey=e5378003e02141e69ac883f589108e36",
    title: "Apple Watch SE (2nd Gen)",
    price: "4.999.000 VND",
    altText: "Apple Watch SE 2nd Generation"
  },
  {
    id: 5,
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b5409f4a749c34b7260a18237f3e2cea4f58a3341616e1be95f2f5d32a51384?placeholderIfAbsent=true&apiKey=e5378003e02141e69ac883f589108e36",
    title: "Áo thun cổ tròn",
    price: "99.000 VND",
    altText: "Áo thun cổ tròn"
  },
  {
    id: 6,
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/fe0a69f96b0ccb6beaf63bd2a7ec853110cc99b1207ec42df3f39574afb1e960?placeholderIfAbsent=true&apiKey=e5378003e02141e69ac883f589108e36",
    title: "Dầu gội The Original\nHair Shampoo",
    price: "299.000 VND",
    altText: "Dầu gội The Original Hair Shampoo"
  },
  {
    id: 7,
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/2bed8450868a36d4c1ac0f0d8b9433330db031e34d26cf719d419f1cdb4c71f6?placeholderIfAbsent=true&apiKey=e5378003e02141e69ac883f589108e36",
    title: "Nước Hoa Nam Dior Sauvage\nEDP - 60ml",
    price: "2.199.000 VND",
    altText: "Nước hoa Dior Sauvage EDP"
  },
  {
    id: 8,
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/d0a4c26d3f40498a9c015e5e47dfc682ac9012ec741392368e9965c12108e532?placeholderIfAbsent=true&apiKey=e5378003e02141e69ac883f589108e36",
    title: "Giày New Balance\nWmns Pro Court 'Beige Green'",
    price: "2.499.000 VND",
    altText: "Giày New Balance Pro Court"
  }
];

export const ProductGird: React.FC = () => {
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
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageUrl={product.imageUrl}
              title={product.title}
              price={product.price}
              altText={product.altText}
            />
          ))}
        </div>
      </section>
    </>
  );
};