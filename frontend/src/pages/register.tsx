import React, { useState } from 'react';
import styles from '../styles/Form.module.css';
import backgroungImage from '../assets/images/bglogin.png';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const RegisterPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

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
                    <form
                        className={styles.loginFormContainer}
                        style={{
                            marginTop: '-5px',
                            marginBottom: '-5px',
                        }}
                    >
                        <h1 className={styles.formTitle}>
                            Thông tin đăng ký
                        </h1>

                        <label htmlFor="fullName" className={styles['visually-hidden']}>
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            className={styles.inputField}
                            placeholder="Họ và tên"
                            style={{ outline: 'none' }}
                        />

                        <label htmlFor="email" className={styles['visually-hidden']}>
                            Email
                        </label>
                        <input
                            type="email"
                            className={styles.inputField}
                            placeholder="Email"
                            style={{ outline: 'none' }}
                        />

                        <div className={styles.passwordContainer}>
                            <label htmlFor="password" className={styles['visually-hidden']}>
                                Mật khẩu
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Mật khẩu"
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: '24px',
                                    width: '100%',
                                    height: '100%',
                                    outline: 'none',
                                }}
                            />
                            <Button
                                icon={showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                onClick={() => setShowPassword(!showPassword)}
                                role="button"
                                style={{
                                    color: '#000',
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                }}
                            />
                        </div>

                        <button type="submit" className={styles.loginButton}>
                            Đăng ký
                        </button>

                        <nav className={styles.linksContainer}>
                            <Link to="/login" className={styles.forgotPasswordLink}> Đã có tài khoản? </Link>
                            <Link to="/forgot-password" className={styles.forgotPasswordLink}> Quên mật khẩu? </Link>

                        </nav>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default RegisterPage;