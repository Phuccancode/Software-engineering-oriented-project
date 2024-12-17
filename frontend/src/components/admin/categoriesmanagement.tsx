import React, { useEffect, useState } from "react";
import styles from "../../styles/admin.module.css";
import { fetchCategoriesAPI, addCategoryAPI, updateCategoryAPI, deleteCategoryAPI } from "../../services/api.service2.ts";

interface Category {
    id: number;
    name: string;
    description: string;
    creation_date: string;
}

const CategoriesManagement = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [newCategoryName, setNewCategoryName] = useState<string>("");
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const categoriesPerPage = 5;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetchCategoriesAPI();
                console.log('Fetched categories data:', response);
                if (response) {
                    setCategories(response);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);
    const handleAddCategory = async () => {
        try {
          await addCategoryAPI({ name: newCategoryName });
          setIsModalOpen(false);
          setNewCategoryName("");
          
          const response = await fetchCategoriesAPI();
          if (response) {
              setCategories(response);
          }
        } catch (error) {
          console.error('Error adding category:', error);
        }
      };
    
      const handleEditCategory = async () => {
        if (editCategory) {
            try {
                await updateCategoryAPI(editCategory.id, { name: editCategory.name });
                setIsEditModalOpen(false);
                setEditCategory(null);
                const response = await fetchCategoriesAPI();
                if (response) {
                    setCategories(response);
                }
            } catch (error) {
                console.error('Error updating category:', error);
            }
        }
    };
    
    const handleDelete = async (id: number) => {
        try {
            const response =await deleteCategoryAPI(id);
            if(response){
            setCategories(categories.filter((category) => category.id !== id));}
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories ? categories.slice(indexOfFirstCategory, indexOfLastCategory) : [];

    const totalPages = Math.ceil(categories.length / categoriesPerPage);

    return (
        <div className={styles.infoCard}>
            <h1 className={styles.infoTitle}>Danh sách danh mục</h1>
            <table className={styles.Table}>
                <thead className={styles.TableHeader}>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody className={styles.TableBody}>
                    {currentCategories.map((category, index) => (
                        <tr key={category.id}>
                            <td>{indexOfFirstCategory + index + 1}</td>
                            <td>{category.name}</td>
                        
                            <td>
                                <button
                                    className={`${styles.actionButton} ${styles.deleteButton}`}
                                    onClick={() => handleDelete(category.id)}
                                >
                                    Xóa
                                </button>
                                <button
                  className={`${styles.actionButton} ${styles.editButton}`}
                  onClick={() => {
                    setEditCategory(category);
                    setIsEditModalOpen(true);
                }}
                >
                  Sửa
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
            <button
        className={styles.submitButton}
        onClick={() => setIsModalOpen(true)}
      >
        Thêm Danh Mục
      </button>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Thêm Tên Danh Mục</h2>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Tên danh mục"
              className="input"
            />
            <button
              className={styles.submitButton}
              onClick={handleAddCategory}
              disabled={!newCategoryName.trim()}
            >
              Thêm
            </button>
            <button
              className={styles.cancelButton}
              onClick={() => setIsModalOpen(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
       {isEditModalOpen && editCategory && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Chỉnh Sửa Danh Mục</h2>
                        <input
                            type="text"
                            value={editCategory.name}
                            onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                            placeholder="Tên danh mục"
                            className="input"
                        />
                        <button
                            className={styles.submitButton}
                            onClick={handleEditCategory}
                            disabled={!editCategory.name.trim()}
                        >
                            Cập Nhật
                        </button>
                        <button
                            className={styles.cancelButton}
                            onClick={() => setIsEditModalOpen(false)}
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesManagement;