import { Layout, Pagination } from 'antd';
import { HeaderComponent } from '../../components/header/Header';
import { SiderComponent } from '../../components/sider/Sider';
import { FooterComponent } from '../../components/footer/Footer';
import '../../App.css'
import { lazy, Suspense, useEffect, useState } from 'react';
import { GetFilmsData } from '../../api/api_TMDB';
import { TMovie } from '../../api/types';
import { Loading } from '../../components/loading/Loading';
import { TuseUserStore, UserActions } from '../../store/user.store';

const ContentComponent = lazy(() => import('../../components/content/Content'))

function Home({ userStore }: {userStore: (TuseUserStore & UserActions)}) {
  const [movies, setMovies] = useState<TMovie[]>([])
  const [totalPages, setTotalPages] = useState(500)
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage')
    return savedPage ? parseInt(savedPage) : 1
  })

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await GetFilmsData(currentPage)
      if (data) {
        setMovies(data.results || [])
        setTotalPages(Math.min(data.total_pages, 500))
      }
    }
    fetchMovies()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    localStorage.setItem('currentPage', page.toString())
    setCurrentPage(page)
  }

  return (
    <Layout style={{ display: 'flex', maxWidth: '100vw', minHeight: '100vh' }}>
      <HeaderComponent store={userStore}/>
      <Layout>
        <SiderComponent />
        <Suspense fallback={<Loading />}>
          <Layout style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
            <ContentComponent data={movies} />
            <Pagination 
              current={currentPage}
              total={totalPages * 20}
              pageSize={20}
              showSizeChanger={false}
              onChange={handlePageChange}
              style={{ margin: '20px 0' }}
            />
          </Layout>
        </Suspense>
      </Layout>
      <FooterComponent />
    </Layout>
  )
}

export default Home