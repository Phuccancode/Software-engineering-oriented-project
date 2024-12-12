import React, { useState } from 'react';
import styles from '../styles/Form.module.css';
import backgroungImage from '../assets/images/background.jpg';
import { Link } from 'react-router-dom';
import { Button, Form, GetProps, Input, notification } from 'antd';



const ForgotPassWordPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [showInput, setShowInput] = useState(true);
    const [loading, setLoading] = useState(false);


    type OTPProps = GetProps<typeof Input.OTP>;

    const onChange: OTPProps['onChange'] = (text) => {
        setOtp(text);
    };
    const sharedProps: OTPProps = {
        onChange,
    };
    const handleSubmit = async () => {
        setLoading(true);
        setTimeout(() => {

            if (showInput) {
                setShowInput(false);
                notification.success({
                    message: 'Success',
                    description: 'Mã otp đã được gửi về email của bạn'
                })
            }
            else {
                notification.success({
                    message: 'Success',
                    description: 'Đổi mật khẩu thành công'
                })
            }

            setLoading(false);
        }, 3000);

        console.log({ email, password, otp });
    }

    return (
        <main className={styles.loginPage}>
            <section className={styles.mainContent}>
                <div className={styles.formWrapper}>
                    <img
                        loading="lazy"
                        src={backgroungImage}
                        className={styles.backgroundImage}
                        alt=""
                    />
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        //   onFinish={onFinish}
                        //   onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className={styles.loginFormContainer}
                        style={{
                            height: '100%',
                            scale: '1.5',
                            marginTop: '8.6%',
                            marginBottom: '8.6%',
                            position: 'relative',
                            left: '-5%',

                        }}
                    >

                        <Form.Item
                            hidden={!showInput}
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                        >
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            hidden={showInput}
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            hidden={showInput}
                            label="Xác nhận mật khẩu"
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Item>



                        <Form.Item
                            hidden={showInput}
                            label="OTP"
                            name="otp"
                        >
                            <Input.OTP
                                value={otp}
                                length={6} formatter={(str) => str.toUpperCase()} {...sharedProps} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button
                                type="primary"
                                loading={loading}
                                onClick={() => handleSubmit()}
                                style={{ width: '100%', height: '40px' }}
                            >
                                Xác nhận
                            </Button>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 14, span: 16 }}>
                            <Link to="/login">Trở về đăng nhập</Link>
                        </Form.Item>


                    </Form>
                </div>
            </section>
        </main>
    );
};

export default ForgotPassWordPage;