import React from "react";
import styles from "../../styles/admin.module.css";

interface SidebarItem {
  icon: string;
  text: string;
  isActive?: boolean;
}

interface SidebarProps {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Sidebar = (props: SidebarProps) => {
  const { activeIndex, setActiveIndex } = props;

  const sidebarItems: SidebarItem[] = [
    { icon: "https://cdn.icon-icons.com/icons2/1580/PNG/96/2849824-basket-buy-market-multimedia-shop-shopping-store_107977.png", text: "Quản lý cửa hàng" },
    { icon: "https://cdn.icon-icons.com/icons2/1622/PNG/96/3741756-bussiness-ecommerce-marketplace-onlinestore-store-user_108907.png", text: "Quản lý khách hàng" },
    { icon: "https://cdn-icons-png.flaticon.com/512/2603/2603910.png", text: "Quản lý danh mục" },
    
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className={`${styles.sidebarItem} ${
              activeIndex === index ? styles.activeItem : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={item.icon} alt={item.text} className={styles.sidebarIcon} />
            <span className={styles.sidebarText}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
