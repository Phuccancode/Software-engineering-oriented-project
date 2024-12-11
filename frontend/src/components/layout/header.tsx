import { Menu, MenuProps } from "antd";
import { AppstoreOutlined, BellOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, MenuOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import './header.css'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserLoginAPI } from "../../services/api.service1";
const Header = () => {
    type MenuItem = Required<MenuProps>['items'][number];
    //const { isLogin } = props;
    const navigate = useNavigate();
    //const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState<any>({});
    const handleLogout = () => {
        localStorage.removeItem("access_token"); // Xóa token
        //setIsLogin(false);
        navigate('/login');
    };
    useEffect(() => {
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
        }
        getUserLogin();
    }, []);
    const items: MenuItem[] = [
        {
            label: 'logo',
            key: 'logo',
            icon: <MenuOutlined />,

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
                    {
                        label: <Link to="/store">Trở thành người bán hàng</Link>,
                        key: 'setting:2',
                        icon: <AppstoreOutlined />
                    },
                    {
                        label: <Link to="/cart">Giỏ hàng</Link>,
                        key: 'contact',
                        icon: <ShoppingCartOutlined />,
                    },
                    {
                        label: "Đăng xuất",
                        key: 'setting:3',
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