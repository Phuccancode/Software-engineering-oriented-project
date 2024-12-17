import React, { useEffect, useState } from "react";
import styles from "../../styles/admin.module.css";
import { fetchAllStoresAPI } from "../../services/api.service2.ts";
import { useNavigate } from "react-router-dom";
interface Store {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const StoreManagement = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const storesPerPage = 5;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetchAllStoresAPI();
        console.log('Fetched stores data:', response);
        // Map the response to extract the email from the user object
        const storesData = response.map((store: any) => ({
          id: store.id,
          name: store.name,
          email: store.user.email,
          phone: store.user.phone,
          address: store.address,
        }));
        console.log('Mapped stores data:', storesData);
        setStores(storesData);
      } catch (error) {
        console.error('Error fetching stores:', error);
        navigate('/');
      }
    };

    fetchStores();
  }, []);

  const handleDelete = (id: number) => {
    setStores(stores.filter((store) => store.id !== id));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastStore = currentPage * storesPerPage;
  const indexOfFirstStore = indexOfLastStore - storesPerPage;
  const currentStores = stores.slice(indexOfFirstStore, indexOfLastStore);

  const totalPages = Math.ceil(stores.length / storesPerPage);

  return (
    <div className={styles.infoCard}>
      <h1 className={styles.infoTitle}>Danh sách cửa hàng</h1>
      <table className={styles.Table}>
        <thead className={styles.TableHeader}>
          <tr>
            <th>STT</th>
            <th>Tên cửa hàng</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            {/* <th>Hành động</th> */}
          </tr>
        </thead>
        <tbody className={styles.TableBody}>
          {currentStores.map((store, index) => (
            <tr key={store.id}>
              <td>{indexOfFirstStore + index + 1}</td>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.phone}</td>
              <td>{store.address}</td>
              {/* <td>
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
              </td> */}
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
      {/* <button
        className={styles.submitButton}
        onClick={() => alert("Thêm cửa hàng mới")}
      >
        Thêm cửa hàng
      </button> */}
    </div>
  );
};

export default StoreManagement;