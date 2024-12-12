import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Modal, notification, Upload } from "antd"
import { useEffect, useState } from "react";
import { updateProductAPI } from "../../../../services/api.service1";

export const ModalUpdate = (props: any) => {

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataProduct } = props;
    const [id, setId] = useState<number>(0);
    const [productName, setProductName] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<number>(0);
    const [fileList, setFileList] = useState<any[]>([]);
    useEffect(() => {
        setId(dataProduct.id);
        setProductName(dataProduct.name);
        setBrand(dataProduct.brand);
        setPrice(dataProduct.price);
        setQuantity(dataProduct.quantity);
        setCategory(dataProduct.category_id);
        setDescription(dataProduct.description);
        setFileList(dataProduct.fileList);
    }, [dataProduct]);

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

    const handleOkUpdate = async () => {
        // console.log(fileList);
        console.log(dataProduct.fileList)
    }

    const handleCancelUpdate = () => {
        setIsModalUpdateOpen(false);
        resetModal();
    }


    return (
        <>
            <Modal title="Thêm sản phẩm"
                open={isModalUpdateOpen}
                onOk={() => {
                    handleOkUpdate()
                }}
                onCancel={() => {
                    handleCancelUpdate()
                }}
                maskClosable={false}
                okText="Update"

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