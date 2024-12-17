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
        setExpandedRows([]); // Đóng tất cả các dòng được mở rộng trước khi đóng modal
        setIsModalDetailOpen(false);
    }
    const [expandedRows, setExpandedRows] = useState<number[]>([]);
    const handleToggleDetails = (index: number) => {
        setExpandedRows((prevExpandedRows) =>
            prevExpandedRows.includes(index)
                ? prevExpandedRows.filter((i) => i !== index) // Nếu đã mở rộng, đóng lại
                : [...prevExpandedRows, index] // Nếu chưa mở rộng, mở ra
        );
    };

    return (
        <Modal
            title="Chi tiết đơn hàng"
            open={isModalDetailOpen}
            onOk={handleOk}
            maskClosable={false}
            onCancel={handleCancel}
            confirmLoading={loading}  // Bật trạng thái loading cho nút OK
            okText="Xác nhận"
            cancelText="Hủy"
            width={1000}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
                <div style={{ flex: 1 }}>
                    {/* Các phần tử bên trái */}
                    <p style={{ color: 'red', fontWeight: 'bold', fontSize: '16px' }}>
                        <strong>Thông tin đơn hàng:</strong> {/* Ví dụ thông tin bên trái */}
                    </p>
                    <p>Mã đơn hàng: <span style={{ fontWeight: 'bold' }}>{dataOrder.code}</span></p>
                    <p>Ngày tạo đơn: <span style={{ fontWeight: 'bold' }}>{dataOrder.date}</span></p>
                    <p >Giá tiền: <span style={{ fontWeight: 'bold' }}>{dataOrder.totalCost}</span></p>
                    <p >Phương thức thanh toán: <span style={{ fontWeight: 'bold' }}>{dataOrder.payment}</span></p>
                </div>
                <div style={{ flex: 1, paddingLeft: '180px' }}>
                    <p style={{ color: 'red', fontWeight: 'bold', fontSize: '16px' }}>Thông tin người nhận:</p>
                    <div style={{ marginTop: '10px' }}>
                        <p style={{ margin: '5px 0', color: 'black' }}>
                            <strong>Họ và tên:</strong> <span style={{ fontWeight: 'bold' }}>{dataOrder.delivery ? dataOrder.delivery.consignee_name : null}</span>
                        </p>
                        <p style={{ margin: '5px 0', color: 'black' }}>
                            <strong>Số điện thoại:</strong> <span style={{ fontWeight: 'bold' }}>{dataOrder.delivery ? dataOrder.delivery.phone_number : null}</span>
                        </p>
                        <p style={{ margin: '5px 0', color: 'black' }}>
                            <strong>Địa chỉ:</strong> <span style={{ fontWeight: 'bold' }}>
                                {dataOrder.delivery ? `${dataOrder.delivery.road_number}, ${dataOrder.delivery.ward}, ${dataOrder.delivery.district}, ${dataOrder.delivery.city}` : null}
                            </span>
                        </p>
                    </div>
                </div>
            </div>


            <p style={{ color: 'red', fontWeight: 'bold', marginTop: '1%' }}>Danh sách các gói hàng:</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ddd' }}>STT</th>
                        <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ddd' }}>Ngày đóng gói</th>
                        <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ddd' }}>Ngày nhận</th>
                        <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ddd' }}>Tên shipper</th>
                        <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ddd' }}>SĐT shipper</th>
                        <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ddd' }}>Phí ship</th>
                        <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ddd' }}>Giá tiền</th>
                        <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ddd' }}>Trạng thái</th>
                        <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ddd' }}>Sản phẩm</th>


                    </tr>
                </thead>
                <tbody>
                    {dataOrder?.boxes && dataOrder.boxes.length > 0 ? (
                        dataOrder.boxes.map((box: any, index: number) => {
                            const isExpanded = expandedRows.includes(index); // Kiểm tra dòng này có được mở rộng không

                            return (
                                <React.Fragment key={index}>
                                    {/* Dòng chính */}
                                    <tr>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
                                            {index + 1}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
                                            {moment(box.packing_date).format('YYYY-MM-DD')}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
                                            {box.predicted_delivery_date}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
                                            {box.shipper_name}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
                                            {box.shipper_phone}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
                                            {NumberToCurrency(box.fee_ship ? Math.round(box.fee_ship) : 0)}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
                                            {NumberToCurrency(Math.round(box.total_price))}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
                                            {box.status}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                            <Button
                                                style={{
                                                    textDecoration: 'underline',
                                                    border: 'none',
                                                    backgroundColor: 'transparent',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                    color: '#000000',
                                                    position: 'relative',
                                                    top: '-5px',
                                                }}
                                                onClick={() => handleToggleDetails(index)} // Gọi hàm toggle khi nhấn vào nút Chi tiết
                                            >
                                                {!isExpanded ? 'Xem' : 'Ẩn'}
                                            </Button>
                                        </td>
                                    </tr>
                                    {isExpanded && (
                                        <tr>
                                            <td colSpan={10} style={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
                                                <div>
                                                    {box.products && box.products.length > 0 ? (
                                                        <table style={{ width: '100%', borderCollapse: 'collapse', }}>
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>STT</th>
                                                                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>Tên sản phẩm</th>
                                                                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>Thương hiệu</th>
                                                                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>Số lượng</th>
                                                                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>Giá tiền</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {box.products.map((product: any, productIndex: number) => (
                                                                    <tr key={productIndex}>
                                                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                                                                            {productIndex + 1}
                                                                        </td>
                                                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                                                                            {(product && product.product_response) ? product.product_response.name : null}
                                                                        </td>
                                                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                                                                            {(product && product.product_response) ? product.product_response.brand : null}
                                                                        </td>
                                                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                                                                            {(product && product.product_response) ? product.product_response.quantity : null}
                                                                        </td>
                                                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                                                                            {NumberToCurrency(Math.round((product) ? product.total_price : 0))}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>


                                                    ) : (
                                                        <p style={{ textAlign: 'center', padding: '10px' }}>Không có sản phẩm nào</p>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
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