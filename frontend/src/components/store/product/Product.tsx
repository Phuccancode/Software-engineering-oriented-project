import { Button, notification, Popconfirm, PopconfirmProps } from 'antd';
import styles from '../../../styles/Management.module.css';
import { useEffect, useState } from 'react';
import { ModalCreate } from './modal/ModalCreateProduct';
import { ModalUpdate } from './modal/ModalUpdateProduct';
import { fetchAllProductsinStore } from '../../../services/api.service1';
import { AxiosResponse } from 'axios';
const products = [
    {
        "id": 1,
        "name": "Sản phẩm A",
        "brand": "Thương hiệu A",
        "price": 250000,
        "quantity": 150,
        "description": "Mô tả chi tiết về sản phẩm A.",
        "category_id": 1,
        "countImage": 3
    },
    {
        "id": 2,
        "name": "Sản phẩm B",
        "brand": "Thương hiệu B",
        "price": 350000,
        "quantity": 80,
        "description": "Mô tả chi tiết về sản phẩm B.",
        "category_id": 2,
        "countImage": 3
    },
    {
        "id": 3,
        "name": "Sản phẩm C",
        "brand": "Thương hiệu C",
        "price": 150000,
        "quantity": 200,
        "description": "Mô tả chi tiết về sản phẩm C.",
        "category_id": 3,
        "countImage": 3
    }
]

export const Product = () => {


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

    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        notification.success({
            message: "Xoa dia chi thanh cong",
            description: "Xoa dia chi thanh cong"
        });

    };

    const handleFileList = (product: any) => {
        const fileLists: any[] = [];
        for (let i = 1; i <= product.countImage; i++) {
            fileLists.push({
                uid: `-${i}`,
                name: `${i}.jpg`,
                status: 'done',
                url: `http://localhost:9091/images/${product.id}/${i}.jpg`
            })
        }
        return fileLists;
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const response: any = await fetchAllProductsinStore(12);
            if (response.statusCode === 200) {
                await setListProducts(response.data);
            }
            else {
                notification.error({
                    message: `Lỗi ${response.statusCode}`,
                    description: response.data.message
                });
            }
        }
        fetchProducts();
    }, []);

    useEffect(() => {
        console.log(listProducts);
    }, [dataProduct, listProducts]);

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
                            {listProducts.map((product, index) => (
                                <tr key={product.id}>

                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>
                                        {Array.from({ length: product.num_image }, (_, i) => (
                                            <img
                                                key={i} // Thêm key cho mỗi phần tử trong danh sách
                                                src={`http://localhost:9091/images/${product.id}/${i + 1}.jpg`} // Đảm bảo index bắt đầu từ 1
                                                alt={`Image ${i + 1}`}
                                                className={styles.productImage}
                                            />
                                        ))}
                                    </td>
                                    <td>{product.brand}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.description}</td>
                                    <td>{product.category_id}</td>
                                    <td>
                                        <Button
                                            type='primary'
                                            onClick={() => {
                                                setDataProduct({
                                                    id: product.id,
                                                    name: product.name,
                                                    brand: product.brand,
                                                    description: product.description,
                                                    price: product.price,
                                                    quantity: product.quantity,
                                                    category_id: product.category_id,
                                                    fileList: handleFileList(product)
                                                })
                                                showModalUpdate();
                                            }}
                                        >Edit</Button>
                                        <Popconfirm
                                            title="Delete product"
                                            description="Bạn có chắc muốn xóa sản phẩm này?"
                                            onConfirm={confirm}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button
                                                danger
                                                style={{ marginTop: '10px' }}
                                            >Delete</Button>
                                        </Popconfirm>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            <ModalCreate
                isModalCreateOpen={isModalCreateOpen}
                setIsModalCreateOpen={setIsModalCreateOpen}
            />
            <ModalUpdate
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataProduct={dataProduct}
            />


        </>
    );
}