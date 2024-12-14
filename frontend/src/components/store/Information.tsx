import React, { useState } from 'react';
import styles from '../../styles/Management.module.css';

interface InfoItem {
    label: string;
    value: string;
}

interface InformationProps {
    activeIndex: Number;
}

const infoItems: InfoItem[] = [
    { label: "Tên cửa hàng", value: "Cửa hàng MVP" },
    { label: "Email", value: "mvp_harmonie@gmail.com" },
    { label: "Số điện thoại", value: "032xxxxxxx" },
    { label: "Địa chỉ", value: "69 Tạ Quang Bửu, Dĩ An, Bình Dương" },
];


const InforStore = () => {
    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <h2 className={styles.infoTitle}>Thông tin</h2>
                <form>
                    <div className={styles.infoRow}>
                        <label htmlFor="nameStore" className={styles.infoLabel}>Tên cửa hàng:</label>
                        <input
                            type="text"
                            name="nameStore"
                            className={styles.infoValue}
                            placeholder="Tên cửa hàng"
                            style={{ outline: 'none' }}
                        />
                    </div>
                    <div className={styles.infoRow}>
                        <label htmlFor="Email" className={styles.infoLabel}>Email:</label>
                        <input
                            type="email"
                            name="email"
                            className={styles.infoValue}
                            placeholder="Email"
                            style={{ outline: 'none' }}
                        />
                    </div>
                    <div className={styles.infoRow}>
                        <label htmlFor="Phone" className={styles.infoLabel}>Số điện thoại:</label>
                        <input
                            type="text"
                            name="phone"
                            className={styles.infoValue}
                            placeholder="Số điện thoại"
                            style={{ outline: 'none' }}
                        />
                    </div>
                    <div className={styles.infoRow}>
                        <label htmlFor="address" className={styles.infoLabel}>Địa chỉ:</label>
                        <input
                            type="text"
                            name="address"
                            className={styles.infoValue}
                            placeholder="Địa chỉ"
                            style={{ outline: 'none' }}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Hoàn tất</button>
                </form>
            </div>
        </section>
    );
}

const promotions = [
    { id: 1, code: 'KH10248', quantity: 10, expirationDate: '31/12/2024', discount: '10%', status: 'Còn' },
    { id: 2, code: 'KH38242', quantity: 15, expirationDate: '01/05/2025', discount: '10%', status: 'Còn' },
    { id: 3, code: 'KH10382', quantity: 10, expirationDate: '31/12/2024', discount: '5%', status: 'Còn' },
    { id: 4, code: 'KH33393', quantity: 35, expirationDate: '01/05/2025', discount: '5%', status: 'Còn' },
];

const Promotion = () => {
    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <div className={styles.Header}>
                    <h2 className={styles.Title}>Mã khuyến mãi</h2>
                    <button className={styles.addButton}>Thêm mã khuyến mãi</button>
                </div>

                <table className={styles.Table}>
                    <thead className={styles.TableHeader}>
                        <tr>
                            <th>STT</th>
                            <th>Mã khuyến mãi</th>
                            <th>Số lượng</th>
                            <th>Ngày hết hạn</th>
                            <th>% Giảm</th>
                            <th>Trạng thái</th>
                            <th>Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody className={styles.TableBody}>
                        {promotions.map((promotion) => (
                            <tr key={promotion.id}>
                                <td>{promotion.id}</td>
                                <td>{promotion.code}</td>
                                <td>{promotion.quantity}</td>
                                <td>{promotion.expirationDate}</td>
                                <td>{promotion.discount}</td>
                                <td>{promotion.status}</td>
                                <td>
                                    <button className={`${styles.actionButton} ${styles.editButton}`}>Edit</button>
                                    <button className={`${styles.actionButton} ${styles.deleteButton}`}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

const products = [
    {
        id: 1,
        name: 'IP 16 promax',
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/628847716364a6384e7dbbdc2a500eda53f38cccdb3cfe29a83253f5b6ac5407?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea',
        description: 'Sản phẩm mới ra mắt của Apple với dung lượng ....',
        price: '30.000.000',
        quantity: 10,
    },
    {
        id: 2,
        name: 'Apilewitch',
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bf18860965edd3f3bff690d816f70641ff2a5a45220988651736285a78aafa28?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea',
        description: 'Vừa đeo vừa tập gym kêu tít tít ....',
        price: '10.999.000',
        quantity: 15,
    },
    {
        id: 3,
        name: 'Dio Sauvage',
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/cabaa6a09cc5e2b4beb11023a550103d14ff37f3d10cea17d8eb4c4d648630b7?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea',
        description: 'Với hương thơm nam tính quyến rũ...',
        price: '2.999.000',
        quantity: 30,
    },
];

const Product = () => {
    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <div className={styles.Header}>
                    <h2
                        className={styles.Title}
                        style={{
                            position: 'relative',
                            left: '-80%'
                        }}
                    >Sản phẩm</h2>
                    <button
                        className={styles.addButton}
                        style={{
                            position: 'relative',
                            left: '80%'
                        }}
                        onClick={() => alert('Add product')}
                    >Thêm sản phẩm</button>
                </div>
                <table className={styles.Table}>
                    <thead className={styles.TableHeader}>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Hình ảnh</th>
                            <th>Mô tả</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody className={styles.TableBody}>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>
                                    <img src={product.image} alt={product.name} className={styles.productImage} />
                                </td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button className={`${styles.actionButton} ${styles.editButton}`}>Edit</button>
                                    <button className={`${styles.actionButton} ${styles.deleteButton}`}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}


const renenues = [
    { id: 1, code: 'KH13249', date: '06/11/2024', totalCost: '100.202' },
    { id: 2, code: 'KH13523', date: '07/11/2024', totalCost: '100.423' },
    { id: 3, code: 'KH10232', date: '08/11/2024', totalCost: '248.348' },
    { id: 4, code: 'KH14548', date: '09/11/2024', totalCost: '358.248' },
];

const Revenue = () => {
    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <div className={styles.Header}>
                    <h2
                        className={styles.Title}
                        style={{
                            position: 'relative',
                            left: '-170%'
                        }}
                    >Doanh thu</h2>
                </div>

                <table className={styles.Table}>
                    <thead className={styles.TableHeader}>
                        <tr>
                            <th>STT</th>
                            <th>Ngày</th>
                            <th>Tổng số tiền</th>
                            <th>Thống kê</th>
                        </tr>
                    </thead>
                    <tbody className={styles.TableBody}>
                        {renenues.map((revenue) => (
                            <tr key={revenue.id}>
                                <td>{revenue.id}</td>
                                <td>{revenue.date}</td>
                                <td>{revenue.totalCost}</td>
                                <td>
                                    <button
                                        style={{
                                            textDecoration: 'underline',
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                        }}
                                    >Chi tiết</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}


const orders = [
    { id: 1, code: 'KH13249', date: '06/11/2024', totalCost: '100.202', status: 'Đã giao' },
    { id: 2, code: 'KH13523', date: '07/11/2024', totalCost: '100.423', status: 'Chưa giao' },
    { id: 3, code: 'KH10232', date: '08/11/2024', totalCost: '248.348', status: 'Chưa giao' },
    { id: 4, code: 'KH14548', date: '09/11/2024', totalCost: '358.248', status: 'Đã giao' },
];

const Order = () => {
    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <div className={styles.Header}>
                    <h2
                        className={styles.Title}
                        style={{
                            position: 'relative',
                            left: '-170%'
                        }}
                    >Đơn hàng</h2>
                </div>

                <table className={styles.Table}>
                    <thead className={styles.TableHeader}>
                        <tr>
                            <th>STT</th>
                            <th>Mã đơn hàng</th>
                            <th>Ngày tạo đơn</th>
                            <th>Giá tiền</th>
                            <th>Trạng thái</th>
                            <th>Thống kê</th>
                        </tr>
                    </thead>
                    <tbody className={styles.TableBody}>
                        {orders.map((order) => (

                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.code}</td>
                                <td>{order.date}</td>
                                <td>{order.totalCost}</td>
                                <td>
                                    <button
                                        style={{
                                            textDecoration: 'underline',
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            color: order.status === 'Đã giao' ? 'green' : 'red',
                                        }}
                                    >{order.status}</button>
                                </td>
                                <td>
                                    <button
                                        style={{
                                            textDecoration: 'underline',
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                        }}
                                    >Chi tiết</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}




export const Information = (props: InformationProps) => {
    const { activeIndex } = props;
    {
        switch (activeIndex) {
            case 0:
                return <Revenue />;
            case 2:
                return <Order />;
            case 1:
                return <Product />;
            case 3:
                return <Promotion />;
            default:
                return <InforStore />;
        }
    }
};
