
import { Button } from 'antd';
import styles from '../../../styles/Management.module.css';

const disburses = [
    { id: 1, code: 'KH13249', date: '06/11/2024', totalCost: '100.202' },
    { id: 2, code: 'KH13523', date: '07/11/2024', totalCost: '100.423' },
    { id: 3, code: 'KH10232', date: '08/11/2024', totalCost: '248.348' },
    { id: 4, code: 'KH14548', date: '09/11/2024', totalCost: '358.248' },
];

export const Disburse = () => {
    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <div className={styles.Header}>
                    <h2
                        className={styles.Title}
                        style={{
                            position: 'relative',
                            left: '-250%'
                        }}
                    >Chi tiêu</h2>
                </div>

                <table className={styles.Table}>
                    <thead className={styles.TableHeader}>
                        <tr>
                            <th>STT</th>
                            <th>Ngày</th>
                            <th>Tổng số tiền</th>
                            <th>Thống kê</th>
                        </tr>
                    </thead>
                    <tbody className={styles.TableBody}>
                        {disburses.map((disburse) => (
                            <tr key={disburse.id}>
                                <td>{disburse.id}</td>
                                <td>{disburse.date}</td>
                                <td>{disburse.totalCost}</td>
                                <td>
                                    <Button

                                        style={{
                                            textDecoration: 'underline',
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            color: '#000000'
                                        }}
                                    >Chi tiết</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
