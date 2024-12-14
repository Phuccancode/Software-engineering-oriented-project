import React, { useState } from "react";
import styles from "../../styles/admin.module.css";

const CustomerManagement = () => {
    const [customers, setCustomers] = useState([
      { id: 1, name: "Nguyen Van A", email: "a@gmail.com", phone: "0123456789" },
      { id: 2, name: "Le Thi B", email: "b@gmail.com", phone: "0987654321" },
    ]);
  
    const handleDelete = (id: number) => {
      setCustomers(customers.filter((customer) => customer.id !== id));
    };
  
    return (
      <div className={styles.infoCard}>
        <h1 className={styles.infoTitle}>Danh sách khách hàng</h1>
        <table className={styles.Table}>
          <thead className={styles.TableHeader}>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody className={styles.TableBody}>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => handleDelete(customer.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

export default CustomerManagement;
