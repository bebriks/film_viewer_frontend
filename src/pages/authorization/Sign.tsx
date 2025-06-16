import { useState, useEffect } from 'react';
import { Form, Input, Layout, Image, Button, message, Spin, Card } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../../public/logo.svg';
import '../../App.css';
import { UserActions, TuseUserStore } from '../../store/user.store';
import { TLoginUser } from '../../api/types';

const { Content } = Layout;

function Sign({ store }: { store: (TuseUserStore & UserActions) }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.isAuth) {
      navigate('/');
    }
  }, [store.isAuth, navigate]);

  const onFinish = async (values: TLoginUser) => {
    try {
      setLoading(true);
      await store.login(values);
      message.success('Авторизация прошла успешно!');
      navigate('/');
    } catch (error) {
      message.error(`${error} Неверный email или пароль`);
      form.setFields([
        {
          name: 'password',
          errors: ['Неверный пароль'],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

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
            <h2 style={{ marginBottom: 0 }}>Вход в аккаунт</h2>
          </div>

          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            disabled={loading}
          >
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
                { required: true, message: 'Пожалуйста, введите ваш пароль' },
                { min: 6, message: 'Пароль должен содержать минимум 6 символов' },
              ]}
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
                {loading ? <Spin indicator={<LoadingOutlined style={{ color: '#fff' }} spin />} /> : 'Войти'}
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <span style={{ marginRight: 8 }}>Нет аккаунта?</span>
              <Link to="/registration">Зарегистрироваться</Link>
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

export default Sign;