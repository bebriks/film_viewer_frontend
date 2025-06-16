import {  Avatar, Button, Card, Flex, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router'
import { TuseUserStore, UserActions } from '../../../store/user.store';

const CardProfileMainComponent = (store: (TuseUserStore & UserActions)) => {

  return (
    <Card hoverable style={{ height: 'fit-content' }}>
              <Flex gap={25} style={{ width: '100%' }}>
                  <Avatar
                    size={{
                      xs: 20,
                      sm: 60,
                      md: 80,
                      lg: 120,
                      xl: 160,
                      xxl: 200,
                    }}
                    icon={<UserOutlined />}
                  />
                  <Flex justify='space-between' style={{ width: '85%' }} >
                    <Flex vertical>
                      <Typography.Title level={5} style={{ margin: 0 }}>{store.user?.id}</Typography.Title>
                      <Typography.Title style={{ margin: 0 }}>{store.user?.name}</Typography.Title>
                      <Typography.Title style={{ margin: 0 }}>{store.user?.email}</Typography.Title>
                    </Flex>
                    <NavLink onClick={store.logout} to={'/'} style={{ marginTop: 'auto' }}>
                      <Button>
                        Выход
                      </Button>
                    </NavLink>
                  </Flex>
              </Flex>
            </Card>
  );
};

export default CardProfileMainComponent