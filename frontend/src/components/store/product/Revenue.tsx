import styles from '../../../styles/Management.module.css';


const renenues = [
    { id: 1, code: 'KH13249', date: '06/11/2024', totalCost: '100.202' },
    { id: 2, code: 'KH13523', date: '07/11/2024', totalCost: '100.423' },
    { id: 3, code: 'KH10232', date: '08/11/2024', totalCost: '248.348' },
    { id: 4, code: 'KH14548', date: '09/11/2024', totalCost: '358.248' },
];



export const Revenue = () => {
    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <div className={styles.Header}>
                    <h2
                        className={styles.Title}
                        style={{
                            position: 'relative',
                            left: '-170%'
                        }}
                    >Doanh thu</h2>
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
                        {renenues.map((revenue) => (
                            <tr key={revenue.id}>
                                <td>{revenue.id}</td>
                                <td>{revenue.date}</td>
                                <td>{revenue.totalCost}</td>
                                <td>
                                    <button
                                        style={{
                                            textDecoration: 'underline',
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                        }}
                                    >Chi tiết</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}