import { Layout, Pagination } from 'antd';
import { TMovie } from '../../api/types';
import { Suspense, lazy } from 'react';
import { Loading } from '../loading/Loading';

const CardMovieComponent = lazy(() => import('../card-movie/Card'))

const ContentComponent = ({data}: { data: TMovie[] }) => {
  return (
      <Layout.Content style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
        <Layout.Content style={{ display: 'flex', flexFlow: 'row wrap', maxWidth: '100%', gap: '15px', justifyContent: 'center', padding: '20px' }}>
          <Suspense fallback={<Loading />}>
            {data.map((el, index) => (
              <CardMovieComponent key={index} movie={el}/>
            ))}
          </Suspense>
        </Layout.Content>
        {/* <Pagination total={100} /> */}
      </Layout.Content>
  );
};
export default ContentComponent