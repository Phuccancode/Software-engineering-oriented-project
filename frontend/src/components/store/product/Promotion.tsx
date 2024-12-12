import styles from '../../../styles/Management.module.css';


const promotions = [
    { id: 1, code: 'KH10248', quantity: 10, expirationDate: '31/12/2024', discount: '10%', status: 'Còn' },
    { id: 2, code: 'KH38242', quantity: 15, expirationDate: '01/05/2025', discount: '10%', status: 'Còn' },
    { id: 3, code: 'KH10382', quantity: 10, expirationDate: '31/12/2024', discount: '5%', status: 'Còn' },
    { id: 4, code: 'KH33393', quantity: 35, expirationDate: '01/05/2025', discount: '5%', status: 'Còn' },
];

export const Promotion = () => {
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

