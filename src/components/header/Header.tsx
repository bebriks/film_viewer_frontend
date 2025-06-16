import { ConfigProvider, Flex, Image, Layout } from 'antd';
import { UserOutlined, HeartOutlined, SearchOutlined } from '@ant-design/icons';
import logo from '../../../public/logo.svg'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserActions, TuseUserStore } from '../../store/user.store';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss'
import Search from 'antd/es/input/Search';

export const HeaderComponent = ({ store }: {store: (TuseUserStore & UserActions)}) => {
  const [inputView, setInputView] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?query=${encodeURIComponent(value)}`);
      setSearchQuery('');
      setInputView(false);
    }
  };
  
  useEffect(() => {

  }, [store.isAuth])

  useEffect(() => {
    if (inputView) {
      const searchInput = document.querySelector('.ant-input-search .ant-input') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    }
  }, [inputView]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: '#FFFFFF',
            headerHeight: 'fit-content'
          },
        },
      }}
    >
      <Layout.Header style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.25)' }}>
        <NavLink to={'/'}>
          <Image src={logo} preview={false} width={200}/>
        </NavLink>
        <Search 
          className={`${styles.input} ${inputView ? styles.input_active : ''}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          placeholder="Поиск фильмов..."
          enterButton
        />
        <Flex gap={15} align='center'>
          <SearchOutlined 
            className={styles.input_button} 
            onClick={() => {
              setInputView(prev => !prev);
              if (!inputView) {
                setTimeout(() => {
                  const searchInput = document.querySelector('.ant-input-search .ant-input') as HTMLInputElement;
                  if (searchInput) searchInput.focus();
                }, 0);
              }
            }} 
            style={{ cursor: 'pointer', fontSize: '30px' }} 
          />
          <NavLink to={'/favorites'}>
            <HeartOutlined style={{ fontSize: '30px' }} />
          </NavLink>
          <NavLink to={localStorage.getItem('access-token') ? '/profile' : '/registration'}>
            <UserOutlined style={{ fontSize: '30px', color: `${localStorage.getItem('access-token') ? 'primary' : 'black'}` }} />
          </NavLink>
        </Flex>
      </Layout.Header>
    </ConfigProvider>
  );
};