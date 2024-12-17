import { useEffect, useState } from 'react';
import styles from '../../../styles/Management.module.css';
import { ModalCreate } from './modal/ModalCreate';
import { ModalUpdate } from './modal/ModalUpdate';
import { Button, notification, Popconfirm, PopconfirmProps } from 'antd';
import { deleteStoreDiscountAPI, getStoreDiscountAPI } from '../../../services/api.service1';

const NumberToCurrency = (money: any) => {
    const formattedAmount = new Intl.NumberFormat('vi-VN').format(money);
    return `${formattedAmount} VNĐ`;
};
export const Promotion = (props: any) => {
    const { setIsSpinning } = props;
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
    const showModalCreate = () => {
        setIsModalCreateOpen(true);
    };
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
    const showModalUpdate = () => {
        setIsModalUpdateOpen(true);
    };
    const [dataPromotion, setDataPromotion] = useState<Object>({});
    const confirm: PopconfirmProps['onConfirm'] = async (e) => {
        try {
            const response: any = await deleteStoreDiscountAPI(Number(e));
            if (response.statusCode === 200 || response.data === "Delete successfully") {
                notification.success({
                    message: "Thành công",
                    description: "Xóa mã khuyến mãi thành công"
                });
                getDiscounts();
            }
            else {
                notification.error({
                    message: "Thất bại",
                    description: "Xóa mã khuyến mãi thất bại"
                });
            }
        }
        catch (error) {
            notification.error({
                message: "Lỗi",
                description: "Có lỗi xảy ra khi xóa mã khuyến mãi"
            })
        }
    };
    const [listPromotions, setListPromotions] = useState<any[]>([]);
    const getDiscounts = async () => {
        setIsSpinning(true);
        const response: any = await getStoreDiscountAPI();
        if (response.statusCode === 200) {
            setListPromotions(response.data);
        }
        setIsSpinning(false);

    }

    useEffect(() => {
        getDiscounts();
    }, []);

    useEffect(() => {
        console.log(listPromotions);
    }, [listPromotions]);

    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <div className={styles.Header}>
                    <h2 className={styles.Title}>Mã khuyến mãi</h2>
                    <Button
                        style={{
                            height: '50px',
                            width: '200px',
                            borderRadius: '5px',
                            left: '43%',
                            fontSize: '20px'
                        }}
                        type='primary'
                        onClick={() => showModalCreate()}
                    >Thêm mã khuyến mãi</Button>
                </div>

                {/* <table className={styles.Table}>
                    <thead className={styles.TableHeader}>
                        <tr>
                            <th>STT</th>
                            <th>Mã khuyến mãi</th>
                            <th>Số lượng</th>
                            <th>Tổng số tiền</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày hết hạn</th>
                            <th>Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody className={styles.TableBody}>
                        {listPromotions.map((promotion, index) => (
                            <tr key={promotion.id}>
                                <td>{index + 1}</td>
                                <td>{promotion.code}</td>
                                <td>{promotion.quantity}</td>
                                <td>{promotion.amount}</td>
                                <td>{promotion.start_date}</td>
                                <td>{promotion.expiration_date}</td>
                                <td>
                                    <Button
                                        type='primary'
                                        onClick={() => {
                                            setDataPromotion(promotion)
                                            showModalUpdate()
                                        }
                                        }
                                    >Edit</Button>
                                    <Popconfirm
                                        title="Delete product"
                                        description="Bạn có chắc muốn xóa sản phẩm này?"
                                        onConfirm={confirm.bind(null, promotion.id)}
                                        okText="Yes"
                                        cancelText="No"

                                    >
                                        <Button
                                            danger
                                            style={{ marginLeft: '10px' }}
                                        >Delete</Button>
                                    </Popconfirm>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
                <table className={styles.Table}>
                    <thead className={styles.TableHeader}>
                        <tr>
                            <th>STT</th>
                            <th>Mã khuyến mãi</th>
                            <th>Số lượng</th>
                            <th>Tổng số tiền</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày hết hạn</th>
                            <th>Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody className={styles.TableBody}>
                        {listPromotions.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ textAlign: 'center' }}>
                                    Chưa có dữ liệu
                                </td>
                            </tr>
                        ) : (
                            listPromotions.map((promotion, index) => (
                                <tr key={promotion.id}>
                                    <td>{index + 1}</td>
                                    <td>{promotion.code}</td>
                                    <td>{promotion.quantity}</td>
                                    <td>{NumberToCurrency(promotion.amount)}</td>
                                    <td>{promotion.start_date}</td>
                                    <td>{promotion.expiration_date}</td>
                                    <td>
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                setDataPromotion(promotion);
                                                showModalUpdate();
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Popconfirm
                                            title="Delete product"
                                            description="Bạn có chắc muốn xóa sản phẩm này?"
                                            onConfirm={confirm.bind(null, promotion.id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button
                                                danger
                                                style={{ marginLeft: '10px' }}
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

            <ModalCreate
                isModalCreateOpen={isModalCreateOpen}
                setIsModalCreateOpen={setIsModalCreateOpen}
                getDiscounts={getDiscounts}
            />
            <ModalUpdate
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataPromotion={dataPromotion}
                getDiscounts={getDiscounts}
            />
        </section>
    );
}

