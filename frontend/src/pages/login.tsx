import React, { useState } from 'react';
import styles from '../styles/Form.module.css';
import backgroungImage from '../assets/images/bglogin.png';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';


const LoginPage: React.FC = () => {
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
                            height: '500px',
                            marginTop: '45px',
                            marginBottom: '45px',
                        }}
                    >
                        <h1 className={styles.formTitle}>
                            Thông tin đăng nhập
                        </h1>

                        <label htmlFor="email" className={styles['visually-hidden']}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="username"
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
                                id="password"
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
                            Đăng nhập
                        </button>

                        <nav className={styles.linksContainer}>
                            <Link to="/register" className={styles.registerLink}>Bạn chưa có tài khoản?</Link>
                            <Link to="/forgot-password" className={styles.forgotPasswordLink}>Quên mật khẩu?</Link>
                        </nav>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;