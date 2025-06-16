import { Layout, Image, Flex, Rate, Card, Button, Tag, Space } from 'antd';
import { ClockCircleOutlined, DollarOutlined, GlobalOutlined, PlusOutlined } from '@ant-design/icons';
import { HeaderComponent } from '../../components/header/Header';
import { FooterComponent } from '../../components/footer/Footer';
import '../../App.css';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Loading } from '../../components/loading/Loading';
import { useUserStore } from '../../store/user.store';
import { TCommentRequest, TMovieDetails } from '../../api/types';
import Title from 'antd/es/typography/Title';
import { Typography } from 'antd';
import { GetMovieReviewsById } from '../../api/api_TMDB';
import { CommentSection } from '../../components/comment/comment';

const { Text } = Typography;
const { Meta } = Card;

function Movie() {
    const currentMovieString = localStorage.getItem('current_movie');
    const currentMovie: TMovieDetails = currentMovieString !== null ? JSON.parse(currentMovieString) : null;
    //const [reviews] = useState(GetMovieReviewsById(currentMovie.id));
    const [activeTab, setActiveTab] = useState('overview');
    const [refreshFlag, setRefreshFlag] = useState(0);

    const user = useUserStore(state => state.user);
    const comments = useUserStore(state => state.comments);
    const getComments = useUserStore(state => state.getComments);
    const addToFavorites = useUserStore(state => state.addToFavorites);
    const addComment = useUserStore(state => state.addComment);
    const deleteComment = useUserStore(state => state.deleteComment);

    const currentMovieComments = useMemo(() => 
        comments.filter(el => el.movieId === currentMovie.id.toString()),
        [comments, currentMovie.id]
    );

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const handleAddToFavorite = () => {
        if(!user?.id) return;
        addToFavorites(user.id, currentMovie.id.toString());
    };

    useEffect(() => {
        getComments(currentMovie.id);
    }, [currentMovie.id, refreshFlag]);

    const handleAddComment = async (text: string, parentId: string | null) => {
        if (!user?.id) return;
        
        const data: TCommentRequest = {
            movieId: currentMovie.id.toString(),
            text,
            parentId 
        };
        
        try {
            await addComment({ data });
        } catch (error) {
            console.error("Ошибка при добавлении комментария:", error);
        }
        setRefreshFlag(prev => prev + 1);
    };

    const handleDeleteComment = async (id: string) => {
        try {
            await deleteComment(id);
        } catch (error) {
            console.error("Ошибка при удалении комментария:", error);
        }
        setRefreshFlag(prev => prev - 1);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <>
                        <Text>{currentMovie.overview}</Text>
                        {currentMovie.tagline && (
                            <Text italic style={{ display: 'block', marginTop: 16 }}>
                                "{currentMovie.tagline}"
                            </Text>
                        )}
                    </>
                );
            case 'details':
                return (
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <div>
                            <Text strong>Release Date: </Text>
                            <Text>{new Date(currentMovie.release_date).toLocaleDateString()}</Text>
                        </div>
                        <div>
                            <Text strong>Runtime: </Text>
                            <Text>{formatRuntime(currentMovie.runtime)}</Text>
                        </div>
                        <div>
                            <Text strong>Budget: </Text>
                            <Text>{formatCurrency(currentMovie.budget)}</Text>
                        </div>
                        <div>
                            <Text strong>Revenue: </Text>
                            <Text>{formatCurrency(currentMovie.revenue)}</Text>
                        </div>
                        <div>
                            <Text strong>Status: </Text>
                            <Text>{currentMovie.status}</Text>
                        </div>
                        <div>
                            <Text strong>Original Language: </Text>
                            <Text>{currentMovie.original_language.toUpperCase()}</Text>
                        </div>
                        <div>
                            <Text strong>Production Companies: </Text>
                            {currentMovie.production_companies.map(company => (
                                <Tag key={company.id}>{company.name}</Tag>
                            ))}
                        </div>
                    </Space>
                );
            case 'reviews':
                return (
                    <CommentSection comments={currentMovieComments} currentUser={user!} onAddComment={handleAddComment} onDeleteComment={handleDeleteComment} />
                );
            default:
                return null;
        }
    };

    return (
        <Layout style={{ display: 'flex', maxWidth: '100vw', minHeight: '100vh' }}>
            <HeaderComponent store={useUserStore()} />
            <Layout>
                <Suspense fallback={<Loading />}>
                    <Flex gap={50} style={{ padding: '35px 50px' }}>
                        <Flex vertical>
                            <Image
                                preview={false}
                                placeholder
                                alt={currentMovie.title}
                                src={`https://image.tmdb.org/t/p/original${currentMovie.poster_path}`}
                                style={{ borderRadius: '6px', height: '720px', width: '480px' }}
                            />
                            <Flex vertical style={{ marginTop: 20 }}>
                                <Title level={3}>Трейлеры</Title>
                                <Flex style={{ maxWidth: '480px', overflowX: 'auto', gap: 10 }}>
                                    {currentMovie.videos.results.map((el) => (
                                        <iframe
                                            key={el.id}
                                            width="320"
                                            height="165"
                                            src={`https://www.youtube.com/embed/${el.key}`}
                                            title={el.name}
                                            allowFullScreen
                                        />
                                    ))}
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex vertical style={{ flex: 1 }}>
                            <Flex justify='space-between' align='center'>
                                <Title>{currentMovie.title}</Title>
                                <Button icon={<PlusOutlined />} onClick={handleAddToFavorite}>Избранное</Button>
                            </Flex>
                            <Text type="secondary" style={{ fontSize: 18, marginBottom: 16 }}>
                                {currentMovie.original_title} ({new Date(currentMovie.release_date).getFullYear()})
                            </Text>

                            <Flex wrap gap={15} style={{ marginBottom: 24 }}>
                                {currentMovie.genres.map((el) => (
                                    <Button key={el.id} style={{ padding: '10px 15px' }}>
                                        <Title level={5} style={{ margin: 0 }}>{el.name}</Title>
                                    </Button>
                                ))}
                            </Flex>

                            <Flex align="center" gap={20} style={{ marginBottom: 24 }}>
                                <Rate
                                    count={10}
                                    style={{ color: 'rgba(0, 13, 255, 0.7)' }}
                                    disabled
                                    allowHalf
                                    defaultValue={currentMovie.vote_average}
                                />
                                <Text strong>{currentMovie.vote_average.toFixed(1)}/10</Text>
                                <Text>({currentMovie.vote_count} votes)</Text>
                            </Flex>

                            <Flex gap={16} style={{ marginBottom: 24 }}>
                                <Tag icon={<ClockCircleOutlined />} color="default">
                                    {formatRuntime(currentMovie.runtime)}
                                </Tag>
                                <Tag icon={<DollarOutlined />} color="default">
                                    {formatCurrency(currentMovie.budget)}
                                </Tag>
                                {currentMovie.imdb_id && (
                                    <Tag icon={<GlobalOutlined />} color="default">
                                        <a
                                            href={`https://www.imdb.com/title/${currentMovie.imdb_id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            IMDB
                                        </a>
                                    </Tag>
                                )}
                            </Flex>
                            <Title level={4}>Production Companies</Title>
                            <Flex wrap="wrap" gap={16} style={{ marginBottom: 24 }}>
                                {currentMovie.production_companies.map(company => (
                                    company.logo_path && (
                                        <Card
                                            key={company.id}
                                            hoverable
                                            style={{ width: 120 }}
                                            cover={
                                                <img
                                                    alt={company.name}
                                                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                                    style={{ padding: 10, objectFit: 'contain', height: 60 }}
                                                />
                                            }
                                        >
                                            <Meta title={company.name} />
                                        </Card>
                                    )
                                ))}
                            </Flex>
                            <div style={{ marginBottom: 24 }}>
                                <Button.Group>
                                    <Button
                                        type={activeTab === 'overview' ? 'primary' : 'default'}
                                        onClick={() => setActiveTab('overview')}
                                    >
                                        Overview
                                    </Button>
                                    <Button
                                        type={activeTab === 'details' ? 'primary' : 'default'}
                                        onClick={() => setActiveTab('details')}
                                    >
                                        Details
                                    </Button>
                                    <Button
                                        type={activeTab === 'reviews' ? 'primary' : 'default'}
                                        onClick={() => setActiveTab('reviews')}
                                    >
                                        Reviews
                                    </Button>
                                </Button.Group>
                            </div>

                            <div style={{ marginBottom: 24 }}>
                                {renderContent()}
                            </div>

                            {currentMovie.belongs_to_collection && (
                                <Card
                                    hoverable
                                    style={{ width: '100%', marginBottom: 24 }}
                                    cover={
                                        <img
                                            alt={currentMovie.belongs_to_collection.name}
                                            src={`https://image.tmdb.org/t/p/original${currentMovie.belongs_to_collection.backdrop_path}`}
                                        />
                                    }
                                >
                                    <Meta
                                        title={`Part of ${currentMovie.belongs_to_collection.name}`}
                                        description="Explore the full collection"
                                    />
                                </Card>
                            )}
                        </Flex>
                    </Flex>
                </Suspense>
            </Layout>
            <FooterComponent />
        </Layout>
    );
}

export default Movie;