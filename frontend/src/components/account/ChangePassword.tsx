import { Button, Form, Input, notification } from 'antd';
import styles from '../../styles/Management.module.css';
import { useState } from 'react';
import { changePasswordAPI } from '../../services/api.service1';


export const ChangePassword = () => {
    const [form] = Form.useForm();
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response: any = await changePasswordAPI({
                oldPassword: oldPassword,
                newPassword: newPassword
            })
            if (response.statusCode === 200) {
                notification.success({
                    message: "Thành công",
                    description: "Cập nhật mật khẩu thành công"
                })
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
                description: "Có lỗi xảy ra khi cập nhật mật khẩu"
            })
            console.log("Error: ", error);
        }
        setLoading(false);

    }

    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <h2 className={styles.infoTitle}>Đổi mật khẩu</h2>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 32 }}
                    //   onFinish={onFinish}
                    //   onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    //className={styles.loginFormContainer}
                    style={{
                        height: '650px',
                        scale: '1.5',
                        width: '60%',
                        position: 'relative',
                        top: '30%',
                        left: '0%'
                    }}
                >
                    <Form.Item
                        label="Mật khẩu hiện tại"
                        name="oldPassword"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu mới"
                        name="confirm"
                        dependencies={['newPassword']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                        <Button
                            type="primary"
                            formAction='submit'
                            loading={loading}
                            onClick={() => handleSubmit()}
                            style={{ width: '100%', height: '60px' }}
                        >
                            Cập nhật mật khẩu
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}