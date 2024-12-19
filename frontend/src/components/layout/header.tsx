import { Menu, MenuProps, notification } from "antd";
import { AppstoreOutlined, BellOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, MenuOutlined, SettingOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import './header.css'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserLoginAPI } from "../../services/api.service1";

import logo from '../../assets/images/logo2.jpg';
const Header = (props: any) => {
    type MenuItem = Required<MenuProps>['items'][number];
    const navigate = useNavigate();
    const { user, setUser, setIsSpinning } = props;
    const handleLogout = () => {
        localStorage.removeItem("access_token"); // Xóa token
        //setIsLogin(false);
        navigate('/login');
        setUser(null);
    };
    const getUserLogin = async () => {
        try {
            const response: any = await getUserLoginAPI();
            if (response.statusCode === 200) {
                setUser(response.data);
            }
            else {
                setUser(null);
            }

        }
        catch (error) {
            setUser(null);
        }
        setIsSpinning(false);
    }
    useEffect(() => {
        getUserLogin();
    }, []);
    const items: MenuItem[] = [
        {

            key: 'logo',
            icon: <img
                src={logo}  // Đường dẫn đến logo của bạn
                alt="Logo"
                style={{
                    position: 'relative',
                    top: '5px',
                    width: '40px',
                    height: '30px',
                }}
            />,

        },
        {
            label: (
                <Link to="/">Trang chủ</Link>
            ),
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: 'Thông báo',
            key: 'notification',
            icon: <BellOutlined />,
        },
        user ?
            {
                key: 'login',
                label: `Xin chào ${user.full_name}`,
                icon: <UserOutlined />,
                style: {
                    right: 10,
                    position: 'absolute',
                    color: 'black',
                    textDecoration: 'none',
                },
                children: [
                    {
                        label: <Link to="/account">Thông tin cá nhân</Link>,
                        key: 'setting:1',
                        icon: <SettingOutlined />,
                        style: {
                            color: 'black'
                        },

                    },
                    user.role === 'ADMIN' ?
                        {
                            label: <Link to="/admin">Quản lý hệ thống</Link>,
                            key: 'setting:2',
                            icon: <AppstoreOutlined />
                        } : null,
                    {
                        label: <Link to="/store">Trở thành người bán hàng</Link>,
                        key: 'setting:3',
                        icon: <ShopOutlined />
                    },
                    {
                        label: <Link to="/cart">Giỏ hàng</Link>,
                        key: 'contact',
                        icon: <ShoppingCartOutlined />,
                    },
                    {
                        label: "Đăng xuất",
                        key: 'setting:5',
                        icon: <LogoutOutlined />,
                        onClick: () => handleLogout()
                    }
                ]
            } : {
                label: (
                    <Link to="/login" style={{ color: "black" }}>Đăng nhập</Link>
                ),
                key: 'login',
                icon: <LoginOutlined />,
                style: {
                    right: 10,
                    position: 'absolute',
                    color: 'black'
                },
            }

    ];
    return (
        <Menu
            mode="horizontal"
            items={items}
            style={{ position: 'fixed', width: '100%', zIndex: 100 }}
        />
    );
}

export default Header;