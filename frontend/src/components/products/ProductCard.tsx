import React from 'react';
import styles from '../../styles/ProductCard.module.css';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    id: number;
    imageUrl: string;
    title: string;
    price: string;
    altText: string;

}

export const ProductCard: React.FC<ProductCardProps> = ({
    id,
    imageUrl,
    title,
    price,
    altText,
}) => {
    return (
        <article
            className={styles.productCard}
            style={{ cursor: 'pointer' }}
        >

            <div className={styles.imageWrapper}>
                <Link
                    to={`/product/${id}`}
                    style={{
                        textDecoration: 'none'
                    }}
                >
                    <img
                        loading="lazy"
                        src={imageUrl}
                        className={styles.productImage}
                        alt={altText}
                    />
                </Link>
            </div>
            <h3 className={styles.productTitle}>{title}</h3>
            <p className={styles.productPrice}>{price}</p>

        </article>
    );
};