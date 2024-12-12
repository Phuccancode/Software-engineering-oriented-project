
import styles from '../../../styles/Management.module.css';
const orders = [
    { id: 1, code: 'KH13249', date: '06/11/2024', totalCost: '100.202', status: 'Đã giao' },
    { id: 2, code: 'KH13523', date: '07/11/2024', totalCost: '100.423', status: 'Chưa giao' },
    { id: 3, code: 'KH10232', date: '08/11/2024', totalCost: '248.348', status: 'Chưa giao' },
    { id: 4, code: 'KH14548', date: '09/11/2024', totalCost: '358.248', status: 'Đã giao' },
];

export const Order = () => {
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
                                            color: '#000000'
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
