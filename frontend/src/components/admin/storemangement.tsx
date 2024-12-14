import React, { useState } from "react";
import styles from "../../styles/admin.module.css";

const StoreManagement = () => {
  const [stores, setStores] = useState([
    { id: 1, name: "Cửa hàng A", email: "a@gmail.com", phone: "0123456789", address: "69 Tạ Quang Bửu" },
    { id: 2, name: "Cửa hàng B", email: "b@gmail.com", phone: "0987654321", address: "123 Nguyễn Văn Cừ" },
    { id: 3, name: "Cửa hàng C", email: "c@gmail.com", phone: "0912345678", address: "456 Trần Phú" },
  ]);

  const handleDelete = (id: number) => {
    setStores(stores.filter((store) => store.id !== id));
  };

  return (
    <div className={styles.infoCard}>
      <h1 className={styles.infoTitle}>Danh sách cửa hàng</h1>
      <table className={styles.Table}>
        <thead className={styles.TableHeader}>
          <tr>
            <th>#</th>
            <th>Tên cửa hàng</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody className={styles.TableBody}>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.id}</td>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.phone}</td>
              <td>{store.address}</td>
              <td>
                <button
                  className={`${styles.actionButton} ${styles.editButton}`}
                  onClick={() => alert(`Chỉnh sửa cửa hàng: ${store.name}`)}
                >
                  Sửa
                </button>
                <button
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  onClick={() => handleDelete(store.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className={styles.submitButton}
        onClick={() => alert("Thêm cửa hàng mới")}
      >
        Thêm cửa hàng
      </button>
    </div>
  );
};

export default StoreManagement;
