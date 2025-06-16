import { ConfigProvider, Card, Image } from 'antd';
import Meta from 'antd/es/card/Meta';
import { TMovie } from '../../api/types';
import { NavLink } from 'react-router';
import { useMovieStore } from '../../store/movie.store';

const CardMovieComponent = ({ movie }: { movie: TMovie }) => {
  const movieStore = useMovieStore()
  return (
    <ConfigProvider
    theme={{
      components: {
        Image: {

        },
      },
    }}
  >    <NavLink to={'/movie'} onClick={() => movieStore.setCurrentMovie(movie)}>
        <Card
            hoverable
            style={{
            width: 240,
            height: 'fit-content', 
            }}
            cover={<Image preview={false} placeholder alt={movie.title} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} style={{ minHeight: '360px', minWidth: '240px' }} />}
        >
            <Meta title={movie.title} />
        </Card>
      </NavLink>
  </ConfigProvider>
  );
};

export default CardMovieComponent