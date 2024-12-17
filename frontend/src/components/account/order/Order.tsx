
import { Button } from 'antd';
import styles from '../../../styles/Management.module.css';
import { useEffect, useState } from 'react';
import { ModalDetail } from './ModalOrderDetail';
import { getOrderAPI } from '../../../services/api.service1';
import moment from 'moment';

const NumberToCurrency = (money: any) => {
    const formattedAmount = new Intl.NumberFormat('vi-VN').format(money);
    return `${formattedAmount} VNĐ`;
};

export const Order = (props: any) => {
    const { setIsSpinning } = props;

    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

    const [dataOrder, setDataOrder] = useState<Object>({});

    const [listOrder, setListOrder] = useState<any>([]);

    const showModalDetail = () => {
        setIsModalDetailOpen(true);
    };

    const getAllOrder = async () => {
        try {
            setIsSpinning(true);
            const response: any = await getOrderAPI();
            if (response.statusCode === 200) {
                setListOrder(response.data);
                console.log(response.data);
            }
            else {
                console.log(response.message);
            }
        }
        catch (error) {
            console.log("Error: ", error);
        }
        setIsSpinning(false);
    }
    useEffect(() => {
        getAllOrder();
    }, []);

    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <div className={styles.Header}>
                    <h2
                        className={styles.Title}
                        style={{
                            position: 'relative',
                            left: '-170%'
                        }}
                    >Đơn hàng</h2>
                </div>
                <table className={styles.Table}>
                    <thead className={styles.TableHeader}>
                        <tr>
                            <th>STT</th>
                            <th>Mã đơn hàng</th>
                            <th>Ngày tạo đơn</th>
                            <th>Giá tiền</th>
                            <th>Thanh toán</th>
                            <th>Thống kê</th>
                        </tr>
                    </thead>
                    <tbody className={styles.TableBody}>
                        {listOrder.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '10px' }}>
                                    Chưa có dữ liệu
                                </td>
                            </tr>
                        ) : (
                            listOrder.map((order: any, index: number) => (
                                <tr key={order.order_id}>
                                    <td>{index + 1}</td>
                                    <td>{`SHOPEE${order.order_id}`}</td>
                                    <td>{moment(order.created_date).format('YYYY-MM-DD')}</td>
                                    <td>{NumberToCurrency(Math.round(order.total_price))}</td>
                                    <td>{order.pay_method}</td>
                                    <td>
                                        <Button
                                            style={{
                                                textDecoration: 'underline',
                                                border: 'none',
                                                backgroundColor: 'transparent',
                                                fontSize: '16px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                color: '#000000',
                                                position: 'relative',
                                                top: '-5px'
                                            }}
                                            onClick={() => {
                                                setDataOrder({
                                                    id: order.order_id,
                                                    code: `SHOPEE${order.order_id}`,
                                                    date: moment(order.created_date).format('YYYY-MM-DD'),
                                                    totalCost: NumberToCurrency(Math.round(order.total_price)),
                                                    payment: order.pay_method,
                                                    delivery: order.delivery_information,
                                                    boxes: order.boxes,
                                                });
                                                showModalDetail();
                                            }}
                                        >
                                            Chi tiết
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

            </div>
            <ModalDetail
                isModalDetailOpen={isModalDetailOpen}
                setIsModalDetailOpen={setIsModalDetailOpen}
                dataOrder={dataOrder}
            />
        </section>
    );
}
