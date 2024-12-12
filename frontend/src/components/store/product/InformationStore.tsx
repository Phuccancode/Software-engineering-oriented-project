
import styles from '../../../styles/Management.module.css';


export const InforStore = () => {
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
