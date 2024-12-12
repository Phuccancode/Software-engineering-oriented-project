import { Button, DatePicker, Form, Input, notification, Radio } from 'antd';
import styles from '../../styles/Management.module.css';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { getProfileAPI } from '../../services/api.service1';



export const InformationAccount = () => {

    const [form] = Form.useForm();

    let info: any = {}

    useEffect(() => {
        info = {
            fullName: 'Nguyễnkjn Văn A',
            birthdate: '2004-01-01',
            gender: 'M',
            phone: '123456789',
            email: 'nguyenvana@gmail.com'
        }
    }, []);

    const [fullName, setFullName] = useState<string>(info.fullName);
    const [birthdate, setBirthdate] = useState<string>(info.birthdate);
    const [gender, setGender] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        console.log({ fullName, birthdate, gender, phone, email });
    }

    useEffect(() => {

        const getInformation = async () => {
            try {
                const response: any = await getProfileAPI();
                if (response.statusCode === 200) {
                    form.setFieldsValue({
                        fullName: response.data.fullName,
                        birthdate: response.data.dob ? moment(response.data.dob, 'YYYY-MM-DD') : null, // Chuyển đổi thành moment
                        gender: response.data.sex,
                        phone: response.data.phone,
                        email: response.data.email,
                    });
                    setFullName(response.data.fullName);
                    setBirthdate(response.data.dob);
                    setGender(response.data.sex);
                    setPhone(response.data.phone);
                    setEmail(response.data.email);
                }
                else {
                    notification.error({
                        message: 'Error',
                        description: 'Đã có lỗi xảy ra'
                    });
                }
            }
            catch (error) {
                console.log(error);
            }

        }


        getInformation();
    }, []);

    // useEffect(() => {
    //     console.log({ fullName, birthdate, gender, phone, email });

    // }, [fullName, birthdate, gender, phone, email]);

    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <h2 className={styles.infoTitle}>Thông tin cá nhân</h2>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 32 }}
                    //   onFinish={onFinish}
                    //   onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    //className={styles.loginFormContainer}
                    style={{
                        height: '650px',
                        scale: '1.5',
                        width: '80%',
                        position: 'relative',
                        top: '30%',
                        left: '-10%'
                    }}
                >
                    <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                        initialValue={fullName}
                    >
                        <Input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ngày sinh"
                        name="birthdate"
                        rules={[{ required: true, message: 'Please input your birthday!' }]}
                    >
                        <DatePicker
                            format="YYYY-MM-DD" // Đảm bảo định dạng đúng
                            onChange={(date, dateString: any) => setBirthdate(dateString)}

                        />
                    </Form.Item>

                    <Form.Item
                        label="Giới tính"
                        name="gender"
                        rules={[{ required: true, message: 'Please select your gender!' }]}
                        initialValue={gender}
                    >
                        <Radio.Group
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <Radio value="M">Male</Radio>
                            <Radio value="F">Female</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                        initialValue={phone}
                    >
                        <Input
                            value={phone}
                            // onChange={(e) => setPhone(e.target.value)}
                            disabled
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                        initialValue={email}
                    >
                        <Input
                            value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            disabled
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                        <Button
                            type="primary"
                            formAction='submit'
                            loading={loading}
                            onClick={() => handleSubmit()}
                            style={{ width: '100%', height: '60px' }}
                        >
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}