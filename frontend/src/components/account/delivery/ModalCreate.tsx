import { Button, Input, Modal, notification } from "antd"
import { useState } from "react";
import { createDeliveryAPI } from "../../../services/api.service1";

export const ModalCreate = (props: any) => {

    const { isModalCreateOpen, setIsModalCreateOpen, getDataDelivery } = props;
    const [consigneeName, setConsigneeName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [roadNumber, setRoadNumber] = useState("");
    const [ward, setWard] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);


    const handleOkCreate = async () => {
        try {
            setLoading(true);
            const response: any = await createDeliveryAPI({ consignee_name: consigneeName, phone_number: phoneNumber, road_number: roadNumber, ward: ward, district: district, city: city });
            if (response.statusCode === 200) {
                notification.success({
                    message: "Thành công",
                    description: response.message
                })
                resetForm();
                setIsModalCreateOpen(false);
                getDataDelivery();
            }
            else {
                notification.error({
                    message: "Lỗi",
                    description: response.message
                })
            }
        }
        catch (error) {
            notification.error({
                message: "Lỗi",
                description: "Có lỗi xảy ra khi tạo địa chỉ nhận hàng"
            })
            console.log("Error: ", error);
        }
        setLoading(false);
    }

    const handleCancelCreate = () => {
        setIsModalCreateOpen(false);
        resetForm();
    }

    const resetForm = () => {
        setConsigneeName("");
        setPhoneNumber("");
        setRoadNumber("");
        setWard("");
        setDistrict("");
        setCity("");
    }

    return (
        <>
            <Modal title="Thêm địa chỉ nhận hàng"
                open={isModalCreateOpen}
                onOk={() => handleOkCreate()}
                onCancel={() => handleCancelCreate()}
                maskClosable={false}
                footer={[
                    <Button key="back" onClick={handleCancelCreate}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOkCreate}>
                        Thêm
                    </Button>,
                ]}

            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Tên người nhận</span>
                        <Input
                            value={consigneeName}
                            onChange={(e) => setConsigneeName(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Số điện thoại</span>
                        <Input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Số đường</span>
                        <Input
                            value={roadNumber}
                            onChange={(e) => setRoadNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Phường, xã</span>
                        <Input
                            value={ward}
                            onChange={(e) => setWard(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Quận, huyện</span>
                        <Input
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Tỉnh, thành phố</span>
                        <Input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}