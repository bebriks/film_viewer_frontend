import React, { useState, useEffect } from 'react';
import { Layout, Menu, ConfigProvider, Typography, Divider, Skeleton, Button } from 'antd';
import { 
  HomeOutlined, 
  FireOutlined, 
  StarOutlined, 
  CalendarOutlined,
  TeamOutlined,
  AppstoreOutlined,
  HeartOutlined,
  LeftOutlined,
  RightOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getGenres } from '../../api/api_TMDB';
import { IGenre } from '../../api/types';

const { Sider } = Layout;
const { Title } = Typography;

export const SiderComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [movieGenres, setMovieGenres] = useState<IGenre[]>([]);
  const [tvGenres, setTvGenres] = useState<IGenre[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const [movieData, tvData] = await Promise.all([
          getGenres('movie'),
          getGenres('tv')
        ]);
        setMovieGenres(movieData.genres);
        setTvGenres(tvData.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Главная',
      onClick: () => handleNavigation('/')
    },
    {
      key: 'trending',
      icon: <UserOutlined />,
      label: 'Профиль',
      onClick: () => handleNavigation('/profile')
    },
    {
      key: 'favorites',
      icon: <HeartOutlined />,
      label: 'Избранное',
      onClick: () => handleNavigation('/favorites')
    }
    /* {
      key: 'movies',
      icon: <StarOutlined />,
      label: 'Фильмы',
      children: [
        {
          key: 'popular-movies',
          label: 'Популярные',
          onClick: () => handleNavigation('/movies/popular')
        },
        {
          key: 'now-playing',
          label: 'Сейчас в кино',
          onClick: () => handleNavigation('/movies/now-playing')
        },
        {
          key: 'top-rated-movies',
          label: 'Лучшие',
          onClick: () => handleNavigation('/movies/top-rated')
        },
        {
          key: 'upcoming',
          label: 'Ожидаемые',
          onClick: () => handleNavigation('/movies/upcoming')
        },
        {
          key: 'divider-movies',
          type: 'divider'
        },
        ...(loading ? [{ key: 'loading-movies', label: <Skeleton active paragraph={false} /> }] : []),
        ...movieGenres.map(genre => ({
          key: `movie-genre-${genre.id}`,
          label: genre.name,
          onClick: () => handleNavigation(`/movies/genre/${genre.id}`)
        })) */
      ]
    /* {
      key: 'tv',
      icon: <CalendarOutlined />,
      label: 'Сериалы',
      children: [
        {
          key: 'popular-tv',
          label: 'Популярные',
          onClick: () => handleNavigation('/tv/popular')
        },
        {
          key: 'airing-today',
          label: 'В эфире сегодня',
          onClick: () => handleNavigation('/tv/airing-today')
        },
        {
          key: 'top-rated-tv',
          label: 'Лучшие',
          onClick: () => handleNavigation('/tv/top-rated')
        },
        {
          key: 'on-the-air',
          label: 'Сейчас в эфире',
          onClick: () => handleNavigation('/tv/on-the-air')
        },
        {
          key: 'divider-tv',
          type: 'divider'
        },
        ...(loading ? [{ key: 'loading-tv', label: <Skeleton active paragraph={false} /> }] : []),
        ...tvGenres.map(genre => ({
          key: `tv-genre-${genre.id}`,
          label: genre.name,
          onClick: () => handleNavigation(`/tv/genre/${genre.id}`)
        }))
      ]
    }, */
    /* {
      key: 'people',
      icon: <TeamOutlined />,
      label: 'Актеры',
      onClick: () => handleNavigation('/people')
    },
    {
      key: 'favorites',
      icon: <HeartOutlined />,
      label: 'Избранное',
      onClick: () => handleNavigation('/favorites')
    } */

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: '#ffffff',
            headerBg: '#ffffff'
          },
          Menu: {
            itemBg: '#ffffff',
            subMenuItemBg: '#ffffff',
            itemSelectedBg: '#e6f7ff',
            itemHoverBg: '#f5f5f5',
            itemColor: '#595959',
            itemSelectedColor: '#1890ff',
            itemHoverColor: '#40a9ff'
          }
        }
      }}
    >
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        width={260}
        breakpoint="lg"
        collapsedWidth={64}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
          backgroundColor: '#ffffff',
          borderRight: '1px solid #f0f0f0'
        }}
        trigger={null}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '16px 16px 8px',
          borderBottom: collapsed ? 'none' : '1px solid #f0f0f0'
        }}>
          <Button
            type="text"
            icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: '#f5f5f5'
            }}
          />
        </div>
        
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['home']}
          defaultOpenKeys={['movies', 'tv']}
          items={menuItems}
          style={{ 
            backgroundColor: '#ffffff',
            borderRight: 'none',
            padding: collapsed ? '8px 0' : '0 8px'
          }}
          inlineCollapsed={collapsed}
          inlineIndent={16}
        />
        
        {!collapsed && (
          <div style={{ padding: '16px', color: '#8c8c8c', fontSize: 12 }}>
            <Divider />
            <div>© {new Date().getFullYear()} Film Viewer</div>
            <div>Данные предоставлены The Movie DB</div>
          </div>
        )}
      </Sider>
    </ConfigProvider>
  );
};