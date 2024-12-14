import React, { useState } from "react";
import Sidebar from "../components//admin/sidebar";
import StoreManagement from "../components/admin/storemangement";
import CustomerManagement from "../components/admin/accountmanagement";
import styles from "../styles/admin.module.css";

const ManagerPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return <StoreManagement />;
      case 1:
        return <CustomerManagement />;
      default:
        return <div>Chọn mục từ Sidebar</div>;
    }
  };

  return (
    <div className={styles.managerContainer}>
      <Sidebar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <main className={styles.mainContent}>{renderContent()}</main>
    </div>
  );
};

export default ManagerPage;
