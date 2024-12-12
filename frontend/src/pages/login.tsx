import React, { useState } from 'react';
import styles from '../styles/Form.module.css';
import backgroungImage from '../assets/images/background.jpg';
import { Button, Col, DatePicker, Form, Input, notification, Radio, Row } from 'antd';
import { loginAPI } from '../services/api.service1';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        setLoading(true);
        const data = { email, password }
        const response: any = await loginAPI(data);
        if (response.statusCode === 200) {
            notification.success({
                message: 'Success',
                description: 'Login successfully'
            })
            localStorage.setItem('access_token', response.data.token);
            setLoading(false);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
        else {
            notification.error({
                message: `Lỗi ${response.statusCode}`,
                description: response.message
            })
            setLoading(false);

        }

    }

    const hanleLoginGoogle = (response: any) => {
        const token = response.credential;
        console.log(token);
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
                        labelCol={{ span: 4 }}
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
                            wrapperCol={{ offset: 14, span: 16 }}
                            style={{ marginBottom: '0px', marginTop: '-5%' }}
                        >
                            <Link to="/forgot-password">Quên mật khẩu?</Link>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                            <Button
                                type="primary"
                                loading={loading}
                                onClick={() => handleSubmit()}
                                style={{ width: '100%', height: '40px' }}


                            >
                                Đăng nhập
                            </Button>
                        </Form.Item>


                        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                                <div>
                                    <h1>Login with Google</h1>

                                    <GoogleLogin
                                        onSuccess={(response) => hanleLoginGoogle(response)}
                                        onError={() => { alert('Login Failed') }}
                                    />

                                </div>
                            </GoogleOAuthProvider>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 14, span: 16 }}>
                            <Link to="/register">Bạn chưa có tài khoản?</Link>
                        </Form.Item>


                    </Form>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;