import React from 'react';
import styles from '../styles/Store.module.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const StorePage: React.FC = () => {
    const handleCreateStore = () => {
        return
    };

    const handleManageStore = () => {
        // Handle manage store action
    };

    const handleDeleteStore = () => {
        // Handle delete store action
    };

    return (
        <div style={{
            backgroundColor: '#f5f5f5',
            height: '100vh',
            margin: 0,
            position: 'relative',
            width: '100%',
        }}>
            <main className={styles.Container}>
                <section className={styles.contentWrapper}>
                    <div className={styles.titleColumn}>
                        <h1 className={styles.Title}>
                            Chào mừng đến với kênh người bán
                        </h1>
                    </div>
                    <div className={styles.imageColumn}>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e050f8cc8117c2ca574058acc5437f6a9f6d3c62bc1aca0e9f2be64a37064f5?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea"
                            className={styles.Image}
                            alt=" illustration for seller channel"
                        />
                    </div>
                </section>
                <div className={styles.actionContainer}>
                    <Link to="/store/create">
                        <Button className={styles.actionButton} onClick={handleCreateStore} >Tạo cửa hàng</Button>
                    </Link>
                    <Link to="/store/manage">
                        <Button className={styles.actionButton} onClick={handleManageStore} > Quản lý cửa hàng</Button>
                    </Link>
                    <Link to="/store/delete">
                        <Button className={styles.actionButton} onClick={handleDeleteStore} > Xóa cửa hàng</Button>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default StorePage;