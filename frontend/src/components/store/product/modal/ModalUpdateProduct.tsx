import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Modal, notification, Select, Upload } from "antd"
import { useEffect, useState } from "react";
import { updateProductAPI, uploadImageAPI } from "../../../../services/api.service1";

export const ModalUpdate = (props: any) => {

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataProduct, fetchProducts, listCategories } = props;
    const [id, setId] = useState<number>(0);
    const [productName, setProductName] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [category_id, setCategoryId] = useState<number>(0);
    const [category_name, setCategoryName] = useState<string>('');
    const [fileList, setFileList] = useState<any[]>([]);
    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setId(dataProduct.product && dataProduct.product.id);
        setProductName(dataProduct.product && dataProduct.product.name);
        setBrand(dataProduct.product && dataProduct.product.brand);
        setPrice(dataProduct.product && dataProduct.product.price);
        setQuantity(dataProduct.product && dataProduct.product.quantity);
        setCategoryId(dataProduct.product && dataProduct.product.category_id);
        setCategoryName(dataProduct.product && dataProduct.product.category_name);
        setDescription(dataProduct.product && dataProduct.product.description);
        setStatus(dataProduct.product && dataProduct.product.status);
        setFileList(dataProduct.product && dataProduct.fileList);
    }, [dataProduct]);

    const handleFileChange = (newFileList: any) => {
        setFileList(newFileList);
    };

    const resetModal = () => {
        setProductName('');
        setBrand('');
        setPrice(0);
        setQuantity(0);
        setCategoryName('');
        setDescription('');
        setFileList([]);
    }

    const handleOkUpdate = async () => {
        try {
            setLoading(true);
            const response: any = await updateProductAPI({
                name: productName,
                brand: brand,
                price: price,
                quantity: quantity,
                description: description,
                category_id: category_id,
                buying_count: dataProduct.product.buying_count,
                avg_rating: dataProduct.product.avg_rating,
                rating_count: dataProduct.product.rating_count,
                status: status,
            }, dataProduct.product.id);
            if (response.statusCode === 200 || response.data === `Product with id ${id} is updated`) {
                const responseUpload: any = await uploadImageAPI({ id, files: fileList.map((file: any) => file.originFileObj) });
                if (responseUpload.statusCode === 200 || responseUpload.data === "Upload successfully!") {
                    notification.success({
                        message: "Thành công",
                        description: "Cập nhật sản phẩm thành công"
                    });
                }
                setIsModalUpdateOpen(false);
                resetModal();
                fetchProducts();
            }
            else {
                notification.error({
                    message: `Lỗi ${response.statusCode}`,
                    description: response.data.message
                });
            }
        }
        catch (error) {
            notification.error({
                message: "Lỗi",
                description: 'Có lỗi xảy ra, vui lòng thử lại sau'
            });
        }
        setLoading(false);
    }


    const handleCancelUpdate = () => {
        setIsModalUpdateOpen(false);
        resetModal();
    }


    return (
        <>
            <Modal title="Thêm sản phẩm"
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

                    {/* <div>
                        <span>Danh mục</span>
                        <Input
                            value={category_name}
                            onChange={(e) => setCategoryName(e.target.value)}
                            disabled={true}
                        />
                    </div> */}

                    <div>
                        <span>Danh mục</span>
                        <Select
                            value={category_id}
                            onChange={(e) => setCategoryId(Number(e))}
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
                        <span>Trạng thái</span>
                        <Select
                            value={status}
                            disabled={false}
                            style={{ width: '100%' }}
                            onChange={(value) => setStatus(value)}
                        >
                            <Select.Option value="enable">Enable</Select.Option>
                            <Select.Option value="disable">Disable</Select.Option>
                        </Select>
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