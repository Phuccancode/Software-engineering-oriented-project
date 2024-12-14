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
                <h2 className={styles.infoTitle}>Thông tin tài khoản</h2>
                <form>
                    <div className={styles.infoRow}>
                        <label htmlFor="name" className={styles.infoLabel}>Họ và tên:</label>
                        <input
                            type="text"
                            name="name"
                            className={styles.infoValue}
                            placeholder="Họ và tên"
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

const ChangePassword = () => {
    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <h2 className={styles.infoTitle}>Đổi mật khẩu</h2>
                <form>
                    <div className={styles.infoRow}>
                        <label htmlFor="oldPassword" className={styles.infoLabel}>Mật khẩu hiện tại:</label>
                        <input
                            type="password"
                            name="oldPassword"
                            className={styles.infoValue}
                            placeholder="Mật khẩu hiện tại"
                            style={{ outline: 'none' }}
                        />
                    </div>
                    <div className={styles.infoRow}>
                        <label htmlFor="newPassword" className={styles.infoLabel}>Mật khẩu mới:</label>
                        <input
                            type="password"
                            name="newPassword"
                            className={styles.infoValue}
                            placeholder="Mật khẩu mới"
                            style={{ outline: 'none' }}
                        />
                    </div>
                    <div className={styles.infoRow}>
                        <label htmlFor="confirmPassword" className={styles.infoLabel}>Xác nhận mật khẩu:</label>
                        <input
                            type="password"
                            name="passwordConfirm"
                            className={styles.infoValue}
                            placeholder="Xác nhận mật khẩu"
                            style={{ outline: 'none' }}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Hoàn tất</button>
                </form>
            </div>
        </section>
    );
}


const disburses = [
    { id: 1, code: 'KH13249', date: '06/11/2024', totalCost: '100.202' },
    { id: 2, code: 'KH13523', date: '07/11/2024', totalCost: '100.423' },
    { id: 3, code: 'KH10232', date: '08/11/2024', totalCost: '248.348' },
    { id: 4, code: 'KH14548', date: '09/11/2024', totalCost: '358.248' },
];

const Disburse = () => {
    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <div className={styles.Header}>
                    <h2
                        className={styles.Title}
                        style={{
                            position: 'relative',
                            left: '-250%'
                        }}
                    >Chi tiêu</h2>
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
                        {disburses.map((disburse) => (
                            <tr key={disburse.id}>
                                <td>{disburse.id}</td>
                                <td>{disburse.date}</td>
                                <td>{disburse.totalCost}</td>
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
                                <td>{order.status}</td>
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
                return <Disburse />;
            case 1:
                return <Order />;
            case 2:
                return <ChangePassword />;
            default:
                return <InforStore />;
        }
    }
};
