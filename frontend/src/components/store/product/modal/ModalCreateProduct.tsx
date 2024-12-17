import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, notification, Select, Upload } from "antd"
import { useEffect, useState } from "react";
import { createProductAPI, getAllCategoryAPI, uploadImageAPI } from "../../../../services/api.service1";

export const ModalCreate = (props: any) => {

    const { isModalCreateOpen, setIsModalCreateOpen, fetchProducts, listCategories } = props;

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

    const [loading, setLoading] = useState(false);

    const handleOkCreate = async () => {
        try {
            setLoading(true);
            const data = {
                name: productName,
                brand: brand,
                price: price,
                quantity: quantity,
                category_id: category,
                description: description
                // images: fileList.map((file: any) => file.originFileObj)
            }
            const response: any = await createProductAPI(data);
            console.log(response);
            if (response.statusCode === 200) {

                const responseUpload: any = await uploadImageAPI({ id: response.data.id, files: fileList.map((file: any) => file.originFileObj) });
                if (responseUpload.statusCode === 200 || responseUpload.data === "Upload successfully!") {
                    notification.success({
                        message: 'Thành công',
                        description: 'Tạo sản phẩm thành công'
                    })
                    resetModal();
                    setIsModalCreateOpen(false);
                    fetchProducts();

                }
                else {
                    notification.error({
                        message: `Lỗi ${responseUpload.statusCode}`,
                        description: responseUpload.message
                    })
                    console.log(responseUpload);
                }
            }
            else {
                notification.error({
                    message: `Lỗi ${response.statusCode}`,
                    description: response.message
                })
            }
        }
        catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Đã có lỗi xảy ra'
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
            <Modal title="Thêm sản phẩm"
                open={isModalCreateOpen}
                onCancel={() => {
                    handleCancelCreate()
                }}
                maskClosable={false}
                okText="Create"
                footer={[
                    <Button key="back" onClick={handleCancelCreate}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOkCreate}>
                        Create
                    </Button>,
                ]}

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
                        <Select
                            value={category}
                            onChange={(e) => setCategory(Number(e))}
                            style={{ width: '100%' }}
                        >
                            <Select.Option value={0}>Chọn danh mục</Select.Option>
                            {listCategories.map((category: any, index: number) => (
                                <Select.Option key={index + 1} value={category.id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
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
                            <Button
                                icon={<UploadOutlined />}
                            >Chọn ảnh</Button>
                        </Upload>
                    </div>
                </div>
            </Modal>
        </>
    )
}