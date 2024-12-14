import { Menu, MenuProps } from "antd";
import { AppstoreOutlined, BellOutlined, HomeOutlined, LoginOutlined, MailOutlined, MenuOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import './header.css'
import { Link } from "react-router-dom";
const Header = (props: any) => {
    type MenuItem = Required<MenuProps>['items'][number];
    const { isLogin } = props;
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
        {
            key: 'login',
            label: isLogin === false ? (<Link to="/login">Đăng nhập</Link>) : ("Xin chào"),
            icon: isLogin === false ? <LoginOutlined /> : <UserOutlined />,
            style: {
                right: 0,
                position: 'absolute',
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