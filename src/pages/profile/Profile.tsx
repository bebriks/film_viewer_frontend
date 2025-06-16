import { Flex, Layout, Card, Typography, Avatar, Divider, Button, Badge } from 'antd';
import { HeaderComponent } from '../../components/header/Header';
import { SiderComponent } from '../../components/sider/Sider';
import { FooterComponent } from '../../components/footer/Footer';
import { UserActions, TuseUserStore } from '../../store/user.store';
import { memo, Suspense, useEffect, useState } from 'react';
import { Loading } from '../../components/loading/Loading';
import { 
  UserOutlined, 
  HeartOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { NavLink, useNavigate } from 'react-router-dom';
import { TUser } from '../../api/types';

dayjs.extend(relativeTime);

const { Title, Text } = Typography;

const Profile =  memo(({ store }: { store: (TuseUserStore & UserActions) }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        await store.profile();
        await store.getFavorites();
        setUserData(store.user);
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (store.isAuth) {
      loadProfile();
    } else {
      navigate('/');
    }
  }, [store.isAuth]);

  const handleLogout = async () => {
    try {
      await store.logout();
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout style={{ display: 'flex', maxWidth: '100vw', minHeight: '100vh' }}>
      <HeaderComponent store={store} />
      <Layout>
        <SiderComponent />
        <Layout.Content style={{ padding: '24px', background: '#f0f2f5' }}>
          <Suspense fallback={<Loading />}>
            <Card style={{ marginBottom: 24 }} bodyStyle={{ padding: 24 }}>
              <Flex align="center" gap={24}>
                <Badge count={userData?.user_type_id === 1 ? "ADMIN" : null}>
                  <Avatar 
                    size={128} 
                    icon={<UserOutlined />} 
                    //src={userData?.avatar} 
                    style={{ backgroundColor: '#1890ff' }}
                  />
                </Badge>
                
                <Flex vertical style={{ flex: 1 }}>
                  <Flex justify="space-between" align="flex-start">
                    <div>
                      <Title level={2} style={{ marginBottom: 0 }}>
                        {store.user?.name || 'Пользователь'}
                      </Title>
                      <Text type="secondary">
                        {store.user?.email || 'Email не указан'}
                      </Text>
                    </div>
                  </Flex>
                  
                  <Divider />
                  
                  <Flex gap={32}>
                    <div>
                      <Text strong>Дата регистрации:</Text>
                      <div>
                        {store.user?.createdAt ? dayjs(store.user?.createdAt).format('DD.MM.YYYY') : 'Неизвестно'}
                      </div>
                    </div>
                    <div>
                      <Text strong>На сайте:</Text>
                      <div>
                        {store.user?.createdAt ? dayjs(store.user?.createdAt).fromNow() : 'Неизвестно'}
                      </div>
                    </div>
                    <Button 
                      type="primary" 
                      danger 
                      style={{ marginLeft: 'auto' }} 
                      onClick={handleLogout}
                    >
                      Выйти
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
            <NavLink to={'/favorites'}>
              <Card hoverable style={{ maxWidth: '50%' }}>
                <Flex justify='space-between'
                align='end'>
                  <Flex vertical>
                    <Title>Избранное</Title>
                    <HeartOutlined style={{ fontSize: '128px' }} />
                  </Flex>
                  <Typography.Text type="secondary">{ store.favorites.length }</Typography.Text>
                </Flex>
              </Card>
            </NavLink>
          </Suspense>
        </Layout.Content>
      </Layout>
      <FooterComponent />
    </Layout>
  );
});

export default Profile;