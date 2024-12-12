import React, { useState } from 'react';
import styles from '../styles/StoreCreation.module.css';
const CreateStore: React.FC = () => {
    const [nameStore, setNameStore] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [tax, setTax] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleChangeDescription = (e: any) => {
        setDescription(e.target.value);
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight - 60}px`;
    };

    return (




        <div
            style={{
                backgroundColor: '#f5f5f5',
                height: '100%',
                margin: 0,
                position: 'relative',
                width: '100%',
            }}>
            <main className={styles.container}>
                <div className={styles.header}
                    style={{
                        padding: '1rem',
                        display: 'flex',
                        position: 'relative',
                        top: '10px',
                    }}>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c93adb32ee2e88741de4a7617131539b10630a741a8230afc46608de1a1cf39d?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea" alt="Store creation logo" className={styles.logo} />
                    <h1 className={styles.title}>Tạo cửa hàng</h1>
                </div>
                <section className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <h2 className={styles.sectionTitle}>Thông tin cửa hàng</h2>
                    </div>
                    <form style={{
                        position: 'relative',
                        left: '40%',
                        top: '-60px',
                    }}>
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
                            <label htmlFor="address" className={styles.infoLabel}>Địa chỉ:</label>
                            <input
                                type="text"
                                name="address"
                                className={styles.infoValue}
                                placeholder="Địa chỉ"
                                style={{ outline: 'none' }}
                            />
                        </div>
                        <div className={styles.infoRow}>
                            <label htmlFor="tax" className={styles.infoLabel}>Mã số thuế:</label>
                            <input
                                type="text"
                                name="tax"
                                className={styles.infoValue}
                                placeholder="Mã số thuế"
                                style={{ outline: 'none' }}
                            />
                        </div>

                        <div className={styles.infoRow}>
                            <label htmlFor="description" className={styles.infoLabel}>Mô tả:</label>
                            <textarea
                                name="description"
                                className={styles.infoValue}
                                value={description}
                                onChange={(e) => handleChangeDescription(e)}
                                placeholder="Mô tả"

                                style={{
                                    fontFamily: 'Lato, sans-serif',
                                    height: '25px',
                                }}

                            />
                        </div>
                    </form>
                    <button
                        type="button"
                        className={styles.submitButton}
                        style={{
                            position: 'relative',
                            top: '-60px',
                        }}

                        onClick={() => { alert('Đã tạo cửa hàng thành công!') }}
                    >Hoàn tất</button>
                </section>
            </main>
        </div>
    );
};

export default CreateStore;