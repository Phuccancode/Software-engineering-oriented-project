import React, { useState } from 'react';
import styles from '../styles/Management.module.css';
import Sidebar from '../components/store/Sidebar';
import { Information } from '../components/store/Information';

const StoreManagement: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<Number>(4);
    return (
        <div className={styles.storeManagement}>
            <main className={styles.mainContent}>
                <h1 className={styles.pageTitle}>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff19f771dc8df0eda0a082237c089ff9de160bd43e9d56b2386f6fef06895b4f?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea" alt="" className={styles.titleIcon} />
                    <span>Quản lý cửa hàng</span>
                </h1>
                <div className={styles.contentWrapper}>
                    <Sidebar
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    />
                    <Information
                        activeIndex={activeIndex}
                    />
                </div>
            </main>
        </div>
    );
};

export default StoreManagement;