import React, { useEffect, useState } from 'react';
import styles from '../styles/StoreCreation.module.css';
import { Button, Form, Input, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { createStoreAPI, getInforStoreAPI } from '../services/api.service1';
import { useNavigate } from 'react-router-dom';
const CreateStore: React.FC = () => {
    const [nameStore, setNameStore] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [taxId, setTaxId] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getInforStore = async () => {
        try {
            const response: any = await getInforStoreAPI();
            if (response.statusCode === 200) {
                notification.warning({
                    message: 'Thông báo',
                    description: `Bạn đã tạo cửa hàng rồi!`
                })
                navigate('/store/manage');
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getInforStore();
    }, []);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response: any = await createStoreAPI({
                name: nameStore,
                address: address,
                tax_id: taxId,
                description: description
            })

            if (response.statusCode === 200) {
                notification.success({
                    message: 'Thông báo',
                    description: `Tạo cửa hàng thành công!`
                })
                navigate('/store/manage');
            }
            else {
                notification.error({
                    message: 'Thông báo',
                    description: `Tạo cửa hàng thất bại!`
                })
            }
        }
        catch (error) {
            console.log(error);
            notification.error({
                message: 'Thông báo',
                description: `Tạo cửa hàng thất bại!`
            })
        }
        setLoading(false);
    }

    return (
        <div
            style={{
                backgroundColor: '#f5f5f5',
                height: '100%',
                margin: 0,
                position: 'relative',
                width: '100%',
            }}>
            <main className={styles.container}>
                <div className={styles.header}
                    style={{
                        padding: '1rem',
                        display: 'flex',
                        position: 'relative',
                        top: '10px',
                    }}>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c93adb32ee2e88741de4a7617131539b10630a741a8230afc46608de1a1cf39d?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea" alt="Store creation logo" className={styles.logo} />
                    <h1 className={styles.title}>Tạo cửa hàng</h1>
                </div>
                <section className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <h2 className={styles.sectionTitle}>Thông tin cửa hàng</h2>
                    </div>
                    <Form
                        name="basic"
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        //   onFinish={onFinish}
                        //   onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className={styles.loginFormContainer}
                        style={{
                            height: '100%',
                            width: '80%',
                            scale: '1.5',
                            marginTop: '8.6%',
                            marginBottom: '8.6%',
                            position: 'relative',

                        }}
                    >

                        <Form.Item

                            label="Tên cửa hàng"
                            name="nameStore"
                            rules={[{ required: true, message: 'Please input your store name!' }]}
                        >
                            <Input
                                value={nameStore}
                                onChange={(e) => setNameStore(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Please input your store address!' }]}
                        >
                            <Input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Mã số thuế"
                            name="taxId"
                            rules={[{ required: true, message: 'Please input your tax ID!' }]}
                        >
                            <Input
                                value={taxId}
                                onChange={(e) => setTaxId(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[{ required: true, message: 'Please input your store description!' }]}
                        >
                            <TextArea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                            <Button
                                type="primary"
                                loading={loading}
                                onClick={() => handleSubmit()}
                                style={{ width: '70%', height: '40px' }}


                            >
                                Tạo cửa hàng
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </main>
        </div>
    );
};

export default CreateStore;