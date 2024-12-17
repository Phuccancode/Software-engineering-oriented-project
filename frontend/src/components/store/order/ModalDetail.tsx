import { Button } from "antd";
import Modal from "antd/es/modal/Modal"
import moment from "moment";
import React, { useState } from "react";

const NumberToCurrency = (money: any) => {
    const formattedAmount = new Intl.NumberFormat('vi-VN').format(money);
    return `${formattedAmount} VNĐ`;
};

export const ModalDetail = (props: any) => {

    const { isModalDetailOpen, setIsModalDetailOpen, dataOrder } = props;

    const [loading, setLoading] = useState(false);

    const handleOk = () => {
        setIsModalDetailOpen(false);
    }

    const handleCancel = () => {
        setIsModalDetailOpen(false);
    }

    return (
        <Modal
            title="Chi tiết gói hàng"
            open={isModalDetailOpen}
            onOk={handleOk}
            maskClosable={false}
            onCancel={handleCancel}
            confirmLoading={loading}  // Bật trạng thái loading cho nút OK
            okText="Xác nhận"
            cancelText="Hủy"
            width={900}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
                <div style={{ flex: 1 }}>
                    {/* Các phần tử bên trái */}
                    <p style={{ color: 'red', fontWeight: 'bold', fontSize: '16px' }}>
                        <strong>Thông tin gói hàng:</strong> {/* Ví dụ thông tin bên trái */}
                    </p>
                    <p>Mã đơn hàng: <span style={{ fontWeight: 'bold' }}>{`SHOPPE${dataOrder.order_id}`}</span></p>
                    <p>Ngày tạo đơn: <span style={{ fontWeight: 'bold' }}>{moment(dataOrder.created_date).format('YYYY-MM-DD')}</span></p>
                    <p >Giá tiền: <span style={{ fontWeight: 'bold' }}>{NumberToCurrency(Math.round(dataOrder.total_price))}</span></p>
                    <p>Trạng thái: <span style={{ fontWeight: 'bold' }}>{dataOrder.status}</span></p>
                </div>
                <div style={{ flex: 1, paddingLeft: '180px' }}>
                    <p style={{ color: 'red', fontWeight: 'bold', fontSize: '16px' }}>Thông tin Shipper:</p>
                    <div style={{ marginTop: '10px' }}>
                        <p style={{ margin: '5px 0', color: 'black' }}>
                            Họ và tên: <span style={{ fontWeight: 'bold' }}>{dataOrder.shipper_name}</span>
                        </p>
                        <p style={{ margin: '5px 0', color: 'black' }}>
                            Số điện thoại: <span style={{ fontWeight: 'bold' }}>{dataOrder.shipper_phone}</span>
                        </p>
                        <p style={{ margin: '5px 0', color: 'black' }}>
                            Phí ship: <span style={{ fontWeight: 'bold' }}>{NumberToCurrency(Math.round(dataOrder.fee_ship))}</span>
                        </p>

                    </div>
                </div>
            </div>


            <p style={{ color: 'red', fontWeight: 'bold', marginTop: '1%' }}>Danh sách các sản phẩm:</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'center' }}>STT</th>
                        <th style={{ padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'center' }}>Tên sản phẩm</th>
                        <th style={{ padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'center' }}>Thương hiệu</th>
                        <th style={{ padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'center' }}>Số lượng</th>
                        <th style={{ padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'center' }}>Tổng giá tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {dataOrder?.products && dataOrder.products.length > 0 ? (
                        dataOrder.products.map((box: any, index: number) => {

                            return (
                                <React.Fragment key={index}>
                                    {/* Dòng chính */}
                                    <tr>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold', textAlign: 'center' }}>
                                            {index + 1}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid ##ddd', fontWeight: 'bold', textAlign: 'center' }}>
                                            {box.product_response?.name}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold', textAlign: 'center' }}>
                                            {moment(box.packing_date).format('YYYY-MM-DD')}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold', textAlign: 'center' }}>
                                            {box.buy_quantity}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold', textAlign: 'center' }}>
                                            {NumberToCurrency(Math.round(box.total_price))}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={10} style={{ textAlign: 'center', padding: '10px' }}>
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </Modal>
    )
}