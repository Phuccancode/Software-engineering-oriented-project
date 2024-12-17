import { Button, DatePicker, Input, message, Modal, notification, Upload } from "antd"
import moment from "moment";
import { useEffect, useState } from "react";
import { updateStoreDiscountAPI } from "../../../../services/api.service1";

export const ModalUpdate = (props: any) => {

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataPromotion, getDiscounts } = props;

    const [code, setCode] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [amount, setAmount] = useState(0);
    const [releaseDate, setReleaseDate] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [expirationDate, setExpirationDate] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCode(dataPromotion.code);
        setQuantity(dataPromotion.quantity);
        setAmount(dataPromotion.amount);
        setReleaseDate(dataPromotion.release_date);
        setStartDate(dataPromotion.start_date);
        setExpirationDate(dataPromotion.expiration_date);
    }, [dataPromotion]);

    const resetModal = () => {
        setCode('');
        setQuantity(0);
        setAmount(0);
        setReleaseDate('');
        setStartDate('');
        setExpirationDate('');
    }

    const handleOkUpdate = async () => {
        try {
            setLoading(true);
            const response: any = await updateStoreDiscountAPI({
                code: code,
                quantity: quantity,
                amount: amount,
                start_date: startDate,
                expiration_date: expirationDate
            }, dataPromotion.id)
            if (response.statusCode === 200) {
                notification.success({
                    message: 'Thành công',
                    description: 'Cập nhật mã giảm giá thành công'
                })
                setIsModalUpdateOpen(false);
                resetModal();
                getDiscounts();
            }
            else {
                notification.error({
                    message: 'Thất bại',
                    description: 'Cập nhật mã giảm giá thất bại'
                })
            }
            setLoading(false);
        }
        catch (err) {
            notification.error({
                message: 'Thất bại',
                description: 'Có lỗi xảy ra'
            })
        }
    }

    const handleCancelUpdate = () => {
        setIsModalUpdateOpen(false);
        resetModal();
    }
    return (
        <>
            <Modal title="Cập nhật mã giảm giá"
                open={isModalUpdateOpen}
                onCancel={() => {
                    handleCancelUpdate()
                }}
                maskClosable={false}
                okText="Update"
                footer={[
                    <Button key="back" onClick={handleCancelUpdate}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOkUpdate}>
                        Update
                    </Button>,
                ]}

            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Mã khuyến mãi</span>
                        <Input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Số lượng</span>
                        <Input
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <span>Số tiền giảm</span>
                        <Input
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <span>Ngày phát hành</span>
                        <DatePicker
                            style={{ width: '100%' }}
                            value={releaseDate?.length > 0 ? moment(releaseDate) : undefined}
                            format="YYYY-MM-DD" // Đảm bảo định dạng đúng
                            onChange={(date, dateString: any) => setReleaseDate(dateString)}
                            disabled
                        />
                    </div>
                    <div>
                        <span>Ngày bắt đầu</span>
                        <DatePicker
                            style={{ width: '100%' }}
                            value={startDate?.length > 0 ? moment(startDate) : undefined}
                            format="YYYY-MM-DD" // Đảm bảo định dạng đúng
                            onChange={(date, dateString: any) => setStartDate(dateString)}

                        />
                    </div>

                    <div>
                        <span>Ngày hết hạn</span>
                        <DatePicker
                            style={{ width: '100%' }}
                            value={expirationDate?.length > 0 ? moment(expirationDate) : undefined}
                            format="YYYY-MM-DD" // Đảm bảo định dạng đúng
                            onChange={(date, dateString: any) => setExpirationDate(dateString)}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}