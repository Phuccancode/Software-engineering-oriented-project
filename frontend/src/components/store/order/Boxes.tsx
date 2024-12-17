
import { useEffect, useState } from 'react';
import { getStoreBoxesAPI } from '../../../services/api.service1';
import styles from '../../../styles/Management.module.css';
import { Button } from 'antd';
import moment from 'moment';
import { ModalDetail } from './ModalDetail';


const NumberToCurrency = (money: any) => {
    const formattedAmount = new Intl.NumberFormat('vi-VN').format(money);
    return `${formattedAmount} VNĐ`;
};

export const Boxes = (props: any) => {

    const { setIsSpinning } = props;
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

    const [dataOrder, setDataOrder] = useState<Object>({});

    const [listOrders, setListOrders] = useState([]);

    const getAllBoxes = async () => {
        setIsSpinning(true);
        const res: any = await getStoreBoxesAPI();
        if (res.statusCode === 200) {
            setListOrders(res.data);
            console.log(res.data);
        }
        setIsSpinning(false);
    }
    useEffect(() => {
        getAllBoxes();
    }, []);


    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <div className={styles.Header}>
                    <h2
                        className={styles.Title}
                        style={{
                            position: 'relative',
                            left: '-90%'
                        }}
                    >Quản lý gói hàng</h2>
                </div>

                {/* <table className={styles.Table}>
                    <thead className={styles.TableHeader}>
                        <tr>
                            <th>STT</th>
                            <th>Mã đơn hàng</th>
                            <th>Ngày tạo</th>
                            <th>Ngày nhận</th>
                            <th>Giá tiền</th>
                            <th>Trạng thái</th>
                            <th>Thống kê</th>
                        </tr>
                    </thead>
                    <tbody className={styles.TableBody}>
                        {listOrders.map((order: any, index: number) => (

                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{`SHOPEE${order.order_id}`}</td>
                                <td>{moment(order.created_date).format('YYYY-MM-DD')}</td>
                                <td>{moment(order.predicted_delivery_date).format('YYYY-MM-DD')}</td>
                                <td>{NumberToCurrency(Math.round(order.total_price))}</td>
                                <td>
                                    {order.status}
                                </td>
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
                                            setIsModalDetailOpen(true);
                                            setDataOrder(order);
                                        }}
                                    >
                                        Chi tiết
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
                <table className={styles.Table}>
                    <thead className={styles.TableHeader}>
                        <tr>
                            <th>STT</th>
                            <th>Mã đơn hàng</th>
                            <th>Ngày tạo</th>
                            <th>Ngày nhận</th>
                            <th>Giá tiền</th>
                            <th>Trạng thái</th>
                            <th>Thống kê</th>
                        </tr>
                    </thead>
                    <tbody className={styles.TableBody}>
                        {listOrders.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                                    Chưa có dữ liệu
                                </td>
                            </tr>
                        ) : (
                            listOrders.map((order: any, index: number) => (
                                <tr key={order.id}>
                                    <td>{index + 1}</td>
                                    <td>{`SHOPEE${order.order_id}`}</td>
                                    <td>{moment(order.created_date).format('YYYY-MM-DD')}</td>
                                    <td>{moment(order.predicted_delivery_date).format('YYYY-MM-DD')}</td>
                                    <td>{NumberToCurrency(Math.round(order.total_price))}</td>
                                    <td>{order.status}</td>
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
                                                setIsModalDetailOpen(true);
                                                setDataOrder(order);
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


                <ModalDetail
                    isModalDetailOpen={isModalDetailOpen}
                    setIsModalDetailOpen={setIsModalDetailOpen}
                    dataOrder={dataOrder}
                />
            </div>
        </section>
    );
}
