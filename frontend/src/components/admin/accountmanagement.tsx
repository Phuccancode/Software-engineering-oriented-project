import React, { useEffect, useState } from "react";
import styles from "../../styles/admin.module.css";
import { fetchAllUsersAPI } from "../../services/api.service2.ts";

interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  creation_date: string;
}

const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const customersPerPage = 5;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetchAllUsersAPI();
        console.log('Fetched customers data:', response);
        setCustomers(response);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = (id: number) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers ? customers.slice(indexOfFirstCustomer, indexOfLastCustomer) : [];

  const totalPages = Math.ceil(customers.length / customersPerPage);

  return (
    <div className={styles.infoCard}>
      <h1 className={styles.infoTitle}>Danh sách khách hàng</h1>
      <table className={styles.Table}>
        <thead className={styles.TableHeader}>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody className={styles.TableBody}>
          {currentCustomers.map((customer, index) => (
            <tr key={customer.id}>
              <td>{indexOfFirstCustomer + index + 1}</td>
              <td>{customer.fullName}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{new Date(customer.creation_date).toLocaleDateString()}</td>
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
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? styles.active : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomerManagement;