import { lazy, memo, Suspense, useEffect } from "react"
import { useUserStore } from "../../store/user.store"
import { Flex, Layout } from "antd"
import { Loading } from "../../components/loading/Loading"
import { HeaderComponent } from "../../components/header/Header"
import { SiderComponent } from "../../components/sider/Sider"
import { TMovieDetails } from "../../api/types"
import { FooterComponent } from "../../components/footer/Footer"

const FavoriteCard = lazy(() => import('../../components/card-favorite/Card'));

const FavoritesPage = () => {
    const favorites = useUserStore(state => state.favorites);
    const favoritesDefault = useUserStore(state => state.favoritesDefault);
    const getDefaultFavorites = useUserStore(state => state.getDefaultFavorites);
    const getFavorites = useUserStore(state => state.getFavorites);
    const removeFromFavorites = useUserStore(state => state.removeFromFavorites);

    useEffect(() => {
        getDefaultFavorites();
        getFavorites();
    }, []);

    const handleRemove = async (dataDet: TMovieDetails) => {
        const favorite = favoritesDefault.find(el => Number(el.movieId) === dataDet.id);
        if (favorite) {
            await removeFromFavorites(favorite.id, dataDet);
        }
    }

    return (
        <Layout style={{ display: 'flex', maxWidth: '100vw', minHeight: '100vh' }}>
            <HeaderComponent store={useUserStore()} />
            <Layout>
                <SiderComponent />
                <Flex vertical>
                    {favorites.map(el => (
                        <Suspense key={el.id} fallback={<Loading />}>
                            <FavoriteCard 
                                movie={el} 
                                onRemove={() => handleRemove(el)} 
                            />
                        </Suspense>
                    ))}
                </Flex>
            </Layout>
            <FooterComponent />
        </Layout>
    )
}

export default memo(FavoritesPage);