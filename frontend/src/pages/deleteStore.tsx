import React, { useEffect, useState } from 'react';
import styles from '../styles/Management.module.css';
import { Information } from '../components/store/Information';
import { Button, Form, Input, Modal, notification } from 'antd';
import { deleteStoreAPI, getInforStoreAPI } from '../services/api.service1';
import { useNavigate } from 'react-router-dom';

const StoreDeletion: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [nameStore, setNameStore] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleOk = async () => {
        try {
            setLoading(true);
            const response: any = await deleteStoreAPI(password);
            if (response.statusCode === 200) {
                notification.success({
                    message: 'Thông báo',
                    description: 'Xóa cửa hàng thành công',
                })
                navigate('/store');
            }
            else {
                notification.error({
                    message: 'Thông báo',
                    description: response.message
                })
            }
        }
        catch (err) {
            console.log(err);
        }
        setLoading(false);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const getInformation = async () => {
        try {
            const response: any = await getInforStoreAPI();
            if (response.statusCode !== 200) {
                notification.warning({
                    message: 'Thông báo',
                    description: 'Bạn chưa có cửa hàng nào',
                })
                navigate('/store/create');
            }
            else {
                form.setFieldsValue({
                    nameStore: response.data.name,
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getInformation();
    }, []);


    const handleSubmit = async () => {
        setOpen(true);
    }
    return (
        <div className={styles.storeManagement}>
            <main className={styles.mainContent}>
                <h1 className={styles.pageTitle}>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff19f771dc8df0eda0a082237c089ff9de160bd43e9d56b2386f6fef06895b4f?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea" alt="" className={styles.titleIcon} />
                    <span>Xóa cửa hàng</span>
                </h1>
                <div className={styles.contentWrapper}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        position: 'relative',
                        marginTop: '-110px',
                        marginBottom: '-5px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <section className={styles.mainSection}>
                        <div className={styles.infoCard}>
                            <Form
                                form={form}
                                name="basic"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                //   onFinish={onFinish}
                                //   onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                className={styles.loginFormContainer}
                                style={{
                                    height: '100%',
                                    width: '60%',
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
                                    initialValue={nameStore}
                                >
                                    <Input
                                        value={nameStore}
                                        onChange={(e) => setNameStore(e.target.value)}
                                        disabled
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                                    <Button
                                        type="primary"
                                        onClick={() => handleSubmit()}
                                        style={{ width: '70%', height: '40px' }}


                                    >
                                        Xóa cửa hàng
                                    </Button>
                                </Form.Item>
                            </Form>

                            <Modal
                                open={open}
                                title="Xác nhận xóa cửa hàng"
                                onCancel={handleCancel}
                                footer={[
                                    <Button key="back" onClick={handleCancel}>
                                        Hủy
                                    </Button>,
                                    <Button key="submit" type="primary" onClick={handleOk} loading={loading}>
                                        Xác nhận
                                    </Button>,
                                ]}
                            >
                                <p style={{
                                }}>
                                    ⚠️ Bạn có chắc chắn muốn xóa cửa hàng không?
                                </p>
                            </Modal>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default StoreDeletion;