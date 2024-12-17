import styles from '../../../styles/Management.module.css';
import { Button, message, notification, Popconfirm, PopconfirmProps } from "antd";
import { ModalUpdate } from "./ModalUpdate";
import { useEffect, useState } from "react";
import { ModalCreate } from './ModalCreate';
import { deleteDeliveryAPI, getAllDelivery } from '../../../services/api.service1';

export const Delivery = (props: any) => {
    const { setIsSpinning } = props;
    const confirm: PopconfirmProps['onConfirm'] = async (e) => {
        try {
            const response: any = await deleteDeliveryAPI(Number(e));
            if (response.statusCode === 200 || response.data === "Delete successfully") {
                notification.success({
                    message: "Xoa dia chi thanh cong",
                    description: "Xoa dia chi thanh cong"
                });
                getDataDelivery()
            }
            else {
                notification.error({
                    message: "Xoa dia chi that bai",
                    description: "Xoa dia chi that bai"
                });
            }
        }
        catch (error) {
            notification.error({
                message: "Lỗi",
                description: "Có lỗi xảy ra khi xóa địa chỉ nhận hàng"
            })
            console.log("Error: ", error);
        }

    };

    const [allInfo, setAllInfo] = useState([])
    const [dataDelivery, setDataDelivery] = useState({});

    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const showModalCreate = () => {
        setIsModalCreateOpen(true);
    };

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const showModalUpdate = () => {
        setIsModalUpdateOpen(true);
    };
    const getDataDelivery = async () => {
        try {
            setIsSpinning(true);
            const response: any = await getAllDelivery();
            if (response.statusCode === 200) {
                setAllInfo(response.data);
            }
        }
        catch (error) {
        }
        setIsSpinning(false);
    }

    useEffect(() => {
        getDataDelivery();
    }, []);

    useEffect(() => {
        console.log(dataDelivery);
    }, [dataDelivery]);


    return (
        <>
            <section className={styles.mainSection}>
                <div className={styles.infoCard}>
                    <div className={styles.Header}>
                        <h2
                            className={styles.Title}
                            style={{
                                position: 'relative',
                                left: '-30%'
                            }}
                        >Thông tin giao hàng</h2>
                        <Button
                            type="primary"
                            onClick={showModalCreate}
                            style={{
                                position: 'relative',
                                left: '23%',
                                height: '50px',
                                width: '200px',
                            }}
                        >
                            Thêm địa chỉ nhận hàng
                        </Button>
                        <ModalCreate
                            isModalCreateOpen={isModalCreateOpen}
                            setIsModalCreateOpen={setIsModalCreateOpen}
                            getDataDelivery={getDataDelivery}
                        />
                    </div>
                    <table className={styles.Table}>
                        <thead className={styles.TableHeader}>
                            <tr>
                                <th>STT</th>
                                <th>Tên người nhận</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className={styles.TableBody}>
                            {allInfo.length > 0 ? (
                                allInfo.map((recipient: any, index) => (
                                    <tr key={recipient.id}>
                                        <td>{index + 1}</td>
                                        <td>{recipient.consignee_name}</td>
                                        <td>{recipient.phone_number}</td>
                                        <td>{`${recipient.road_number}, ${recipient.ward}, ${recipient.district}, ${recipient.city}`}</td>
                                        <td>
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    showModalUpdate();
                                                    setDataDelivery(recipient);
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Popconfirm
                                                title="Delete the task"
                                                description="Bạn có chắc muốn xóa địa chỉ này?"
                                                onConfirm={confirm.bind(null, recipient.id)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button danger style={{ marginTop: '10px' }}>
                                                    Delete
                                                </Button>
                                            </Popconfirm>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '10px' }}>
                                        <p style={{ textAlign: 'center', padding: '10px' }}>Chưa có dữ liệu</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </section>

            <ModalUpdate
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataDelivery={dataDelivery}
                getDataDelivery={getDataDelivery}
            />

        </>
    );
}