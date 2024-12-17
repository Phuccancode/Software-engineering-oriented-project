import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  // Hàm để quay lại trang chủ
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Thanh toán thành công!</h1>
      <p style={styles.message}>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xử lý thành công.</p>
      <button style={styles.button} onClick={handleBackToHome}>
        Quay lại trang chủ
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    textAlign: 'center' as 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#28a745',
  },
  message: {
    fontSize: '1rem',
    marginBottom: '20px',
    color: '#333',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default SuccessPage;
