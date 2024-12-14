import styles from '../../styles/Management.module.css';

interface SidebarItem {
    icon: string;
    text: string;
    isActive?: boolean;
}


interface SidebarProps {
    activeIndex: Number;
    setActiveIndex: (index: Number) => void;
}
const Sidebar = (props: SidebarProps) => {
    const { activeIndex, setActiveIndex } = props;
    const sidebarItems: SidebarItem[] = [
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a0207c6d2a4732d0426b75f695ecaa47bfb38aa02d5807ffa7ba01e543ff66d4?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea", text: "Chi tiêu", isActive: false },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a8de16bc7a825385805703737431dc3d4a96dfa2cb3a9354459cf63cb948f83?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea", text: "Quản lý đơn hàng", isActive: true },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4897fc59d287a81eec5204c519939e461789a117ae531933c03a4f07847cd60c?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea", text: "Đổi mật khẩu", isActive: true },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b328b17599cad2b4a63641be83519929de0f022ca1eba692c776f32482b4e7b0?placeholderIfAbsent=true&apiKey=f0873bf2dfbf4fd991f254a2ddabbdea", text: "Thông tin", isActive: true },
    ];
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.sidebarContent}>
                {sidebarItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`${styles.sidebarItem} ${index === activeIndex ? styles.activeItem : ''}`}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={item.icon} alt="" className={styles.sidebarIcon} />
                        <span className={styles.sidebarText}>{item.text}</span>
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;