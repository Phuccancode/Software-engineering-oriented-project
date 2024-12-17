import { UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, message, Modal, notification, Upload } from "antd"
import { useState } from "react";
import { createProductAPI, createStoreDiscountAPI } from "../../../../services/api.service1";

export const ModalCreate = (props: any) => {

    const { isModalCreateOpen, setIsModalCreateOpen, getDiscounts } = props;

    const [code, setCode] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [amount, setAmount] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [loading, setLoading] = useState(false);

    const resetModal = () => {
        setCode('');
        setQuantity(0);
        setAmount(0);
        setStartDate('');
        setExpirationDate('');
    }

    const handleOkCreate = async () => {
        try {
            setLoading(true);
            const response: any = await createStoreDiscountAPI({
                code: code,
                quantity: quantity,
                amount: amount,
                start_date: startDate,
                expiration_date: expirationDate
            })
            if (response.statusCode === 200) {
                notification.success({
                    message: 'Thành công',
                    description: 'Tạo mã giảm giá thành công'
                })
                setIsModalCreateOpen(false);
                resetModal();
                getDiscounts();
            }
            else {
                notification.error({
                    message: 'Thất bại',
                    description: 'Tạo mã giảm giá thất bại'
                })
            }
        }
        catch (err) {
            notification.error({
                message: 'Thất bại',
                description: 'Có lỗi xảy ra'
            })
        }
        setLoading(false);
    }

    const handleCancelCreate = () => {
        setIsModalCreateOpen(false);
        resetModal();
    }


    return (
        <>
            <Modal title="Thêm mã giảm giá"
                open={isModalCreateOpen}
                maskClosable={false}
                okText="Create"
                onCancel={handleCancelCreate}
                footer={[
                    <Button key="back" onClick={handleCancelCreate}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOkCreate}>
                        Create
                    </Button>,
                ]}

            >
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 32 }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Mã giảm giá"
                        name="code"
                        rules={[{ required: true, message: 'Please input your creation date!' }]}
                    >
                        <Input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[{ required: true, message: 'Please input your creation date!' }]}
                    >
                        <Input
                            value={quantity}
                            onChange={(e) => !isNaN(quantity) ? setQuantity(Number(e.target.value)) : setQuantity(0)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Số tiền giảm"
                        name="amount"
                        rules={[{ required: true, message: 'Please input your creation date!' }]}
                    >
                        <Input
                            value={amount}
                            onChange={(e) => !isNaN(amount) ? setAmount(Number(e.target.value)) : setAmount(0)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ngày bắt đầu"
                        name="startDate"
                        rules={[{ required: true, message: 'Please input your creation date!' }]}
                    >
                        <DatePicker
                            format="YYYY-MM-DD" // Đảm bảo định dạng đúng
                            onChange={(date, dateString: any) => setStartDate(dateString)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ngày hết hạn"
                        name="expirationDate"
                        rules={[{ required: true, message: 'Please input your creation date!' }]}
                    >
                        <DatePicker
                            format="YYYY-MM-DD" // Đảm bảo định dạng đúng
                            onChange={(date, dateString: any) => setExpirationDate(dateString)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}