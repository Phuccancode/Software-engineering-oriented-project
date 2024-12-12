import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, notification, Upload } from "antd"
import { useState } from "react";
import { createProductAPI } from "../../../../services/api.service1";

export const ModalCreate = (props: any) => {

    const { isModalCreateOpen, setIsModalCreateOpen } = props;

    const [productName, setProductName] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<number>(0);
    const [fileList, setFileList] = useState([]);

    const handleFileChange = (newFileList: any) => {
        setFileList(newFileList);
    };

    const resetModal = () => {
        setProductName('');
        setBrand('');
        setPrice(0);
        setQuantity(0);
        setCategory(0);
        setDescription('');
        setFileList([]);
    }

    const handleOkCreate = async () => {
        try {
            const data = {
                store_id: 12,
                name: productName,
                brand: brand,
                price: price,
                quantity: quantity,
                category_id: category,
                description: description
                // images: fileList.map((file: any) => file.originFileObj)
            }

            const response: any = await createProductAPI(data);
            if (response.statusCode === 200) {
                notification.success({
                    message: 'Thành công',
                    description: 'Tạo sản phẩm thành công'
                })
                resetModal();
                setIsModalCreateOpen(false);
            }
            else {
                notification.error({
                    message: `Lỗi ${response.statusCode}`,
                    description: response.message
                })
            }
        }
        catch (error) {
            console.log(error);

        }

    }

    const handleCancelCreate = () => {
        setIsModalCreateOpen(false);
        resetModal();
    }


    return (
        <>
            <Modal title="Thêm sản phẩm"
                open={isModalCreateOpen}
                onOk={() => {
                    handleOkCreate()
                }}
                onCancel={() => {
                    handleCancelCreate()
                }}
                maskClosable={false}
                okText="Create"

            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Tên sản phẩm</span>
                        <Input
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Brand</span>
                        <Input
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Giá bán</span>
                        <Input
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
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
                        <span>Danh mục</span>
                        <Input
                            value={category}
                            onChange={(e) => setCategory(Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <span>Mô tả</span>
                        <Input.TextArea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>


                    <div>
                        <span>Ảnh</span>
                        <Upload
                            action="/upload" // API upload file, thay đổi theo backend của bạn
                            listType="picture-card"
                            fileList={fileList}
                            beforeUpload={() => false}  // Tắt upload tự động, xử lý thủ công khi nhấn ok
                            onChange={(info) => handleFileChange(info.fileList)}
                            multiple
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </div>
                </div>
            </Modal>
        </>
    )
}