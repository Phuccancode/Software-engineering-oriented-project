
import { Button, DatePicker, Form, Input, notification, Spin } from 'antd';
import styles from '../../../styles/Management.module.css';
import { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { getInforStoreAPI, updateInforStoreAPI } from '../../../services/api.service1';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export const InforStore = (props: any) => {
    const { setIsSpinning } = props;
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [nameStore, setNameStore] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [creationDate, setCreationDate] = useState<string>('');
    const [taxId, setTaxId] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [loading, setLoading] = useState(false);

    const getInforStore = async () => {
        try {
            setIsSpinning(true);
            const response: any = await getInforStoreAPI();
            if (response.statusCode === 200) {
                form.setFieldsValue({
                    nameStore: response.data.name,
                    address: response.data.address,
                    creationDate: moment(response.data.creation_date, 'YYYY-MM-DD'),
                    taxId: response.data.tax_id,
                    description: response.data.description
                });
                setNameStore(response.data.name);
                setAddress(response.data.address);
                setCreationDate(response.data.creation_date);
                setTaxId(response.data.tax_id);
                setDescription(response.data.description);
            }
            else {
                notification.error({
                    message: 'Lỗi',
                    description: 'Bạn chưa tạo cửa hàng'
                });
                navigate('/store/create');
            }
        }
        catch (error) {
            console.log(error);
        }
        setIsSpinning(false);
    }

    useEffect(() => {
        getInforStore();

    }, []);


    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response: any = await updateInforStoreAPI({
                name: nameStore,
                address: address,
                tax_id: taxId,
                description: description
            })
            if (response.statusCode === 200) {
                notification.success({
                    message: 'Success',
                    description: 'Cập nhật thông tin thành công'
                });
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
        setLoading(false);
    }

    return (
        <section className={styles.mainSection}>
            <div className={styles.infoCard}>
                <h2 className={styles.infoTitle}>Thông tin</h2>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 32 }}
                    onLoad={getInforStore}
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
                        label="Tên cửa hàng"
                        name="nameStore"
                        rules={[{ required: true, message: 'Please input your store name!' }]}
                        initialValue={nameStore}
                    >
                        <Input
                            value={nameStore}
                            onChange={(e) => setNameStore(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Please input your store address!' }]}
                    >
                        <Input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ngày tạo"
                        name="creationDate"
                        rules={[{ required: true, message: 'Please input your creation date!' }]}
                        initialValue={creationDate}
                    >
                        <DatePicker
                            format="YYYY-MM-DD" // Đảm bảo định dạng đúng
                            onChange={(date, dateString: any) => setCreationDate(dateString)}
                            disabled
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mã số thuế"
                        name="taxId"
                        rules={[{ required: true, message: 'Please input your tax ID!' }]}
                        initialValue={taxId}
                    >
                        <Input
                            value={taxId}
                            onChange={(e) => setTaxId(e.target.value)}

                        />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                        initialValue={description}
                    >
                        <TextArea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
