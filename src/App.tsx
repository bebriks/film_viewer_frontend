import { Routes, Route} from 'react-router';
import '@ant-design/v5-patch-for-react-19';

import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import NotFound from './pages/not-found/NotFound';
import Registration from './pages/authorization/Registration';
import { useUserStore } from './store/user.store';
import Sign from './pages/authorization/Sign';
import { Suspense, useEffect } from 'react';
import Movie from './pages/movie/Movie';
import FavoritesPage from './pages/favorites/Favorites';
import SearchPage from './pages/search/Search';
import { Loading } from './components/loading/Loading';

const App = () => {
  const userStore = useUserStore()
  useEffect(() => {
    userStore.profile()
    userStore.getFavorites()
  },[])
  return (
    <div>
      <Routes>
        <Route index path='/' element={<Suspense fallback={<Loading />}><Home userStore={userStore}/></Suspense>} />
        <Route path='profile' element={<Suspense fallback={<Loading />}><Profile store={userStore} /></Suspense>} />
        <Route path='favorites' element={<FavoritesPage />} />
        <Route path='movie' element={<Movie />} />
        <Route path="/search" element={<SearchPage store={userStore}/>} />
        <Route path='registration' element={<Registration store={userStore} />} />
        <Route path='sign' element={<Sign store={userStore} />} />
        <Route path='*' element={<NotFound store={userStore} />} />
      </Routes>
    </div>
  );
}

export default App
