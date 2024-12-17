import { Button, notification, Popconfirm, PopconfirmProps } from 'antd';
import styles from '../../../styles/Management.module.css';
import { useEffect, useState } from 'react';
import { ModalCreate } from './modal/ModalCreateProduct';
import { ModalUpdate } from './modal/ModalUpdateProduct';
import { deleteProductAPI, fetchAllProductsinStore, getAllCategoryAPI } from '../../../services/api.service1';


const NumberToCurrency = (money: any) => {
    const formattedAmount = new Intl.NumberFormat('vi-VN').format(money);
    return `${formattedAmount} VNĐ`;
};

export const Product = (props: any) => {

    const { setIsSpinning } = props;
    const [listProducts, setListProducts] = useState<any[]>([]);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const showModalCreate = () => {
        setIsModalCreateOpen(true);
    };

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const showModalUpdate = () => {
        setIsModalUpdateOpen(true);

    };
    const [dataProduct, setDataProduct] = useState<Object>({})

    const [listCategories, setListCategories] = useState<any[]>([]);

    const confirm: PopconfirmProps['onConfirm'] = async (e) => {
        try {
            const response: any = await deleteProductAPI(Number(e));
            if (response.statusCode === 200 || response.data === `Product deleted with id ${Number(e)}`) {
                notification.success({
                    message: 'Thành công',
                    description: 'Xóa sản phẩm thành công'
                });
                fetchProducts();
            }
            else {
                notification.error({
                    message: `Lỗi ${response.statusCode}`,
                    description: response.data.message
                });
            }
        }
        catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Có lỗi xảy ra khi xóa sản phẩm'
            });
        }
    };
    const fileLists: any[] = [];
    const handleFileList = (product: any) => {

        for (let i = 1; i <= product.num_image; i++) {
            fileLists.push({
                uid: `-${i}`,
                name: `${i}.jpg`,
                status: 'done',
                url: `http://localhost:9091/images/${product.id}/${i}.jpg`
            })
        }

        return fileLists;
    }

    const getAllCategories = async () => {
        const response: any = await getAllCategoryAPI();
        if (response.statusCode === 200) {
            setListCategories(response.data);
        }
    }
    const fetchProducts = async () => {
        setIsSpinning(true);
        const response: any = await fetchAllProductsinStore();
        if (response.statusCode === 200) {
            setListProducts(response.data);
        }
        setIsSpinning(false);
    }
    useEffect(() => {
        fetchProducts();
        getAllCategories();
    }, []);

    useEffect(() => {
        //console.log(handleFileList(products[0]));
        console.log(listProducts);
    }, [dataProduct, listProducts, fileLists]);

    return (
        <>
            <section className={styles.mainSection}>
                <div className={styles.infoCard}>
                    <div className={styles.Header}>
                        <h2
                            className={styles.Title}
                            style={{
                                position: 'relative',
                                left: '-80%'
                            }}
                        >Sản phẩm</h2>
                        <Button
                            className={styles.addButton}
                            style={{
                                position: 'relative',
                                left: '80%',
                            }}
                            type='primary'
                            onClick={() => showModalCreate()}
                        >Thêm sản phẩm</Button>

                    </div>
                    <table className={styles.Table}>
                        <thead className={styles.TableHeader}>
                            <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Hình ảnh</th>
                                <th>Thương hiệu</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Mô tả</th>
                                <th>Danh mục</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className={styles.TableBody}>
                            {listProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={9} style={{ textAlign: 'center' }}>
                                        Chưa có dữ liệu
                                    </td>
                                </tr>
                            ) : (
                                listProducts.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>
                                            {/* {Array.from({ length: product.num_image }, (_, i) => (
                                                <img
                                                    key={i} // Thêm key cho mỗi phần tử trong danh sách
                                                    src={`http://localhost:9091/images/${product.id}/${i + 1}.jpg`} // Đảm bảo index bắt đầu từ 1
                                                    alt={`Image ${i + 1}`}
                                                    className={styles.productImage}
                                                />
                                            ))} */}
                                            <img
                                                src={`http://localhost:9091/images/${product.id}/1.jpg`} // Đảm bảo index bắt đầu từ 1
                                                alt={`Image`}
                                                className={styles.productImage}
                                            />
                                        </td>
                                        <td>{product.brand}</td>
                                        <td>{NumberToCurrency(product.price)}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.description}</td>
                                        <td>{product.category_name}</td>
                                        <td>
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    setDataProduct({
                                                        product: product,
                                                        fileList: handleFileList(product)
                                                    });
                                                    showModalUpdate();
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Popconfirm
                                                title="Delete product"
                                                description="Bạn có chắc muốn xóa sản phẩm này?"
                                                onConfirm={confirm.bind(null, product.id)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button
                                                    danger
                                                    style={{ marginTop: '10px' }}
                                                >
                                                    Delete
                                                </Button>
                                            </Popconfirm>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                </div>
            </section>
            <ModalCreate
                isModalCreateOpen={isModalCreateOpen}
                setIsModalCreateOpen={setIsModalCreateOpen}
                fetchProducts={fetchProducts}
                listCategories={listCategories}
            />
            <ModalUpdate
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataProduct={dataProduct}
                fetchProducts={fetchProducts}
                listCategories={listCategories}
            />


        </>
    );
}