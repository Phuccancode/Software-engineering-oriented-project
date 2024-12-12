import React, { useState } from 'react';
import styles from '../styles/Form.module.css';
import backgroungImage from '../assets/images/background.jpg';
import { Button, Checkbox, DatePicker, Form, Input, notification, Radio } from 'antd';
import moment from 'moment';
import { registerAPI } from '../services/api.service1';
import { Link, useNavigate } from 'react-router-dom';
//import { registerAPI } from '../services/api.service1';

const RegisterPage: React.FC = () => {
    const [fName, setFName] = useState<string>('');
    const [lName, setLName] = useState<string>('');
    const [birthdate, setBirthdate] = useState<string>('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const data = {
                fname: fName,
                lname: lName,
                dob: birthdate,
                sex: gender,
                phone: phone,
                email: email,
                password: password
            }

            const response: any = await registerAPI(data);
            if (response.statusCode && response.statusCode >= 400) {
                notification.error({
                    message: `Lỗi ${response.statusCode}`,
                    description: response.message
                })
                setLoading(false);

            }
            else {
                notification.success({
                    message: 'Thành công',
                    description: 'Đăng ký thành công, vui lòng đăng nhập'
                });
                setLoading(false);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
        }
        catch (error: any) {
            notification.error({
                message: 'Error',
                description: `${error.toString()}`,
            });
            setLoading(false);

        }
    };

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
                        wrapperCol={{ span: 32 }}
                        initialValues={{ remember: true }}
                        //   onFinish={onFinish}
                        //   onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className={styles.loginFormContainer}
                        style={{
                            height: '650px',
                            scale: '1.3',
                            marginBottom: '2%',
                            marginTop: '2%',
                            position: 'relative',
                            left: '-5%'
                        }}
                    >
                        <Form.Item
                            label="Tên"
                            name="firstName"
                            rules={[{ required: true, message: 'Please input your first name!' }]}
                        >
                            <Input
                                value={fName}
                                onChange={(e) => setFName(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Họ và tên đệm"
                            name="lastName"
                            rules={[{ required: true, message: 'Please input your last name!' }]}
                        >
                            <Input
                                value={lName}
                                onChange={(e) => setLName(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ngày sinh"
                            name="birthday"
                            rules={[{ required: true, message: 'Please input your birthday!' }]}
                        >
                            <DatePicker
                                value={birthdate ? moment(birthdate) : null}
                                onChange={(date, dateString) => setBirthdate(date.format('YYYY-MM-DD'))}
                                style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            label="Giới tính"
                            name="gender"
                            rules={[{ required: true, message: 'Please select your gender!' }]}
                        >
                            <Radio.Group
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <Radio value="M">Male</Radio>
                                <Radio value="F">Female</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Item>

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

                        <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                            <Link to="/login">Bạn đã có tài khoản?</Link>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button
                                type="primary"
                                formAction='submit'
                                loading={loading}
                                onClick={() => handleSubmit()}
                                style={{ width: '100%', height: '60px', marginBottom: '-10%', marginTop: '-10%' }}
                            >
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </section>
        </main>
    );
};

export default RegisterPage;