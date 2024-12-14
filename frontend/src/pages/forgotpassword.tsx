import React, { useState } from 'react';
import styles from '../styles/Form.module.css';
import backgroungImage from '../assets/images/bglogin.png';
import { Link } from 'react-router-dom';



const ForgotPassWordPage: React.FC = () => {
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
                            height: '380px',
                            marginTop: '105px',
                            marginBottom: '105px',
                        }}
                    >
                        <h1 className={styles.formTitle}>
                            Lấy lại mật khẩu
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

                        <button
                            type="submit"
                            className={styles.loginButton}
                            style={{
                                marginTop: '20px',
                            }}
                        >
                            Xác nhận
                        </button>
                        <nav className={styles.linksContainer}>
                            <Link to="/login" className={styles.forgotPasswordLink}> Trở về đăng nhập? </Link>
                        </nav>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default ForgotPassWordPage;