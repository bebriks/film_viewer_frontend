import { useState, useEffect } from 'react';
import { Form, Input, Layout, Image, Button, message, Spin, Card, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../../public/logo.svg';
import '../../App.css';
import { UserActions, TuseUserStore } from '../../store/user.store';
import { TRegistrationUser } from '../../api/types';

const { Content } = Layout;
const { Text } = Typography;

function Registration({ store }: { store: (TuseUserStore & UserActions) }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.isAuth) {
      navigate('/');
    }
  }, [store.isAuth, navigate]);

  const onFinish = async (values: TRegistrationUser) => {
    try {
      setLoading(true);
      await store.registration(values);
      message.success('Регистрация прошла успешно!');
      message.info('Теперь вы можете войти в систему');
      navigate('/sign');
    } catch (error: any) {
      let errorMessage = 'Произошла ошибка при регистрации';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      message.error(errorMessage);
  
      if (errorMessage.includes('email')) {
        form.setFields([{ name: 'email', errors: [errorMessage] }]);
      } else if (errorMessage.includes('name')) {
        form.setFields([{ name: 'name', errors: [errorMessage] }]);
      }
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Пароли не совпадают!'));
    },
  });

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          style={{
            width: '100%',
            maxWidth: 420,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: 8,
          }}
          bodyStyle={{ padding: 32 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Image
              src={logo}
              preview={false}
              width={120}
              style={{ marginBottom: 16 }}
            />
            <h2 style={{ marginBottom: 0 }}>Создать аккаунт</h2>
            <Text type="secondary">Заполните форму для регистрации</Text>
          </div>

          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            disabled={loading}
          >
            <Form.Item
              label="Имя пользователя"
              name="name"
              rules={[
                { required: true, message: 'Пожалуйста, введите ваше имя' },
                { min: 3, message: 'Имя должно содержать минимум 3 символа' },
                { max: 20, message: 'Имя должно быть не длиннее 20 символов' },
              ]}
            >
              <Input placeholder="Придумайте имя пользователя" size="large" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Пожалуйста, введите ваш email' },
                { type: 'email', message: 'Введите корректный email' },
              ]}
            >
              <Input placeholder="example@mail.com" size="large" />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[
                { required: true, message: 'Пожалуйста, введите пароль' },
                { min: 6, message: 'Пароль должен содержать минимум 6 символов' },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="••••••" size="large" />
            </Form.Item>

            <Form.Item
              label="Подтвердите пароль"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Пожалуйста, подтвердите пароль' },
                validatePassword,
              ]}
              hasFeedback
            >
              <Input.Password placeholder="••••••" size="large" />
            </Form.Item>

            <Form.Item style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                disabled={loading}
              >
                {loading ? <Spin indicator={<LoadingOutlined style={{ color: '#fff' }} spin />} /> : 'Зарегистрироваться'}
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <span style={{ marginRight: 8 }}>Уже есть аккаунт?</span>
              <Link to="/sign">Войти</Link>
            </div>

            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <Link to="/">Вернуться на главную</Link>
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
}

export default Registration;