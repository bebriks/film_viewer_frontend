import { Card, Image, Typography, Rate, Button, Space, Divider } from 'antd';
import { StarFilled, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { TMovieDetails } from '../../api/types';
import { NavLink } from 'react-router-dom';
import { useMovieStore } from '../../store/movie.store';

const { Title, Text, Paragraph } = Typography;

interface FavoriteCardProps {
  movie: TMovieDetails;
  onRemove: (movieId: number) => void;
}

const FavoriteCard = ({ movie, onRemove }: FavoriteCardProps) => {
  const movieStore = useMovieStore();
  
  // Обработчик для кнопки удаления
  const handleRemoveClick = (e: React.MouseEvent<HTMLElement>, movieId: number) => {
    e.stopPropagation();
    e.preventDefault();
    onRemove(movieId);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card
        style={{ width: '100%', marginBottom: 16, borderRadius: 8, height: 'fit-content' }}
        hoverable
      >
        <div style={{ display: 'flex' }}>
          <div style={{ width: 200, flexShrink: 0 }}>
            <NavLink to={'/movie'} onClick={() => movieStore.setCurrentMovie(movie)}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                preview={false}
                style={{ 
                  width: '100%', 
                  height: 300,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  objectFit: 'cover'
                }}
              />
            </NavLink>
          </div>
          
          {/* Информация о фильме */}
          <div style={{ flex: 1, padding: 24, position: 'relative' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              {/* Заголовок и рейтинг */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <NavLink to={'/movie'} onClick={() => movieStore.setCurrentMovie(movie)}>
                  <Title level={4} style={{ margin: 0 }}>
                    {movie.title}
                  </Title>
                </NavLink>
                
                <div>
                  <Rate 
                    disabled 
                    allowHalf 
                    value={movie.vote_average / 2} 
                    count={5} 
                    character={<StarFilled />}
                    style={{ color: '#faad14', fontSize: 16 }}
                  />
                  <Text strong style={{ marginLeft: 8 }}>
                    {movie.vote_average.toFixed(1)}
                  </Text>
                </div>
              </div>
              
              {/* Год выпуска и жанры */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Space>
                  <CalendarOutlined />
                  <Text>{movie.release_date.substring(0, 4)}</Text>
                </Space>
                
                <Divider type="vertical" />
                
                <Text type="secondary">
                  {movie.genres?.map(g => g.name).join(', ') || 'Жанры не указаны'}
                </Text>
              </div>
              
              {/* Краткое описание */}
              <Paragraph 
                ellipsis={{ rows: 3, expandable: true, symbol: 'подробнее' }}
                style={{ marginTop: 8 }}
              >
                {movie.overview || 'Описание отсутствует'}
              </Paragraph>
            </Space>
            
            {/* Кнопка удаления */}
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => handleRemoveClick(e, movie.id)}
              style={{ position: 'absolute', bottom: 24, right: 24 }}
            >
              Удалить из избранного
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FavoriteCard;