import React, { useState } from 'react';
import styles from '../styles/Management.module.css';
import { Information } from '../components/store/Information';

const StoreDeletion: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<Number>(4);
    return (
        <div className={styles.storeManagement}>
            <main className={styles.mainContent}>
                <h1 className={styles.pageTitle}>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff19f771dc8df0eda0a082237c089ff9de160bd43e9d56b2386f6fef06895b4f?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea" alt="" className={styles.titleIcon} />
                    <span>Xóa cửa hàng</span>
                </h1>
                <div className={styles.contentWrapper}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        position: 'relative',
                        marginTop: '-110px',
                        marginBottom: '-5px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <section className={styles.mainSection}>
                        <div className={styles.infoCard}>
                            <form>
                                <div className={styles.infoRow}
                                >
                                    <label htmlFor="selectStore" className={styles.infoLabel}>Chọn cửa hàng cần xóa:</label>
                                    <select
                                        name="selectStore"
                                        className={styles.infoValue}
                                        style={{
                                            outline: 'none',
                                            width: '370px',
                                        }}
                                    >
                                        <option defaultChecked hidden>Chọn cửa hàng</option>
                                        <option value="store1">Cửa hàng 1</option>
                                        <option value="store2">Cửa hàng 2</option>
                                        <option value="store3">Cửa hàng 3</option>
                                    </select>
                                </div>
                                <div className={styles.infoRow}>
                                    <label htmlFor="reasonDelete" className={styles.infoLabel}>Lý do xóa:</label>
                                    <input
                                        type="text"
                                        name="reasonDelete"
                                        className={styles.infoValue}
                                        placeholder="Lý do xóa"
                                        style={{
                                            outline: 'none',
                                            width: '330px',
                                        }}
                                    />
                                </div>
                                <div className={styles.infoRow}>
                                    <label htmlFor="passwordConfirmation" className={styles.infoLabel}>Xác nhận mật khẩu:</label>
                                    <input
                                        type="password"
                                        name="passwordConfirmation"
                                        className={styles.infoValue}
                                        placeholder="Mật khẩu"
                                        style={{
                                            outline: 'none',
                                            width: '330px',
                                        }}
                                    />
                                </div>
                                <button type="submit" className={styles.submitButton}>Hoàn tất</button>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default StoreDeletion;