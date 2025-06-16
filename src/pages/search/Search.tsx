import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Pagination, Empty } from 'antd';
import { SearchMovies } from '../../api/api_TMDB';
import { TMovie, TPage } from '../../api/types';
import ContentComponent from '../../components/content/Content';
import { HeaderComponent } from '../../components/header/Header';
import { SiderComponent } from '../../components/sider/Sider';
import { FooterComponent } from '../../components/footer/Footer';
import { TuseUserStore, UserActions } from '../../store/user.store';
import { Loading } from '../../components/loading/Loading';

const SearchPage = ({ store }: {
    store: (TuseUserStore & UserActions);
}) => {
  const location = useLocation();
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        setLoading(true);
        try {
          const data: TPage = await SearchMovies(searchQuery, currentPage);
          setMovies(data.results || []);
          setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        } catch (error) {
          console.error('Ошибка поиска:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSearchResults();
  }, [searchQuery, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (loading) return <Loading />;

  return (
    <Layout style={{ display: 'flex', maxWidth: '100vw', minHeight: '100vh' }}>
      <HeaderComponent store={store} />
      <Layout>
        <SiderComponent />
        <Layout.Content style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Результаты поиска: "{searchQuery}"</h2>
          
          {movies.length > 0 ? (
            <>
              <ContentComponent data={movies} />
              <Pagination
                current={currentPage}
                total={totalPages * 20}
                pageSize={20}
                onChange={handlePageChange}
                style={{ margin: '20px 0', justifyContent: 'center' }}
              />
            </>
          ) : (
            <Empty description="Ничего не найдено" style={{ margin: '50px 0' }} />
          )}
        </Layout.Content>
      </Layout>
      <FooterComponent />
    </Layout>
  );
};

export default SearchPage;