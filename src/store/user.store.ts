import { create } from 'zustand'
import { TComment, TCommentRequest, TFavorites, TLoginUser, TMovieDetails, TRegistrationUser, TUser } from '../api/types'
import { DeleteComment, DeleteFavorites, GetComments, GetFavorites, GetProfile, Login, PostComment, PostToFavorites, Registration } from '../api/api_user'
import { GetMovieById } from '../api/api_TMDB'

export type UserActions = {
    profile: () => Promise<void>
    registration: (data: TRegistrationUser) => Promise<void>
    login: (data: TLoginUser) => Promise<void>
    logout: () => Promise<void>
    getDefaultFavorites: () => Promise<void>
    getFavorites: () => Promise<void>
    addToFavorites: (userId: string, movieId: string) => Promise<void>
    removeFromFavorites: (favoriteId: string, favoriteMovie: TMovieDetails) => Promise<void>
    getComments: (id: number) => Promise<void>
    addComment: ({ data }: { data: TCommentRequest }) => Promise<TComment>
    deleteComment: (id: string) => Promise<void>
}
export type TuseUserStore = {
    user: TUser | null
    isAuth: boolean
    error: string | null
    favoritesDefault: TFavorites[]
    favorites: TMovieDetails[]
    message: ''
    comments: TComment[]
}
export const useUserStore = create<TuseUserStore & UserActions>((set) => ({
    user: null,
    isAuth: !!localStorage.getItem('access-token'),
    favoritesDefault: [],
    favorites: [],
    error: null,
    message: '',
    comments: [],
    profile: async() => {
        try {
            const response = await GetProfile()
            console.log(response)
            if (response) {
                set({
                    user: response,
                    isAuth: true
                })
                localStorage.setItem('user',  JSON.stringify(response))
            } else {
                set({
                    user: null,
                })
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
    },
    login: async(data: TLoginUser) => {
        try {
            const response = await Login(data)
            if (response) {
                localStorage.setItem('access-token', response.accessToken)
                localStorage.setItem('refresh-token', response.refreshToken)
                set({
                    isAuth: !!localStorage.getItem('access-token')
                })
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
    },
    registration: async(data: TRegistrationUser) => {
        try {
            const response = await Registration(data)
            if (response) {
                localStorage.setItem('access-token', response.accessToken)
                localStorage.setItem('refresh-token', response.refreshToken)
                console.log(localStorage.getItem('access-token'))
                set({
                    isAuth: !!localStorage.getItem('access-token')
                })
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
    },
    logout: async() => {
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')
        set({ isAuth: false, user: null, favorites: [] })
    },
    getDefaultFavorites: async() => {
        try {
            const response = await GetFavorites();
            if (response) {
                set({ favoritesDefault: response });
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
    },
    getFavorites: async() => {
        try {
            const response = await GetFavorites();
            if (response) {
                const promises = response.map(el => GetMovieById(Number(el.movieId)));
                const favoritesDetails = await Promise.all(promises);
                console.log(favoritesDetails)
                set({ favorites: favoritesDetails });
            } else {
                set({ favorites: [] });
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
    },
    addToFavorites: async(userId: string, movieId: string) => {
        try {
            const response = await PostToFavorites(userId, movieId)
            if (response) {
                const favoriteDetails = await GetMovieById(Number(response.movieId))
                set((state) => ({
                    favorites: [...state.favorites, favoriteDetails]
                }));
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
    },
    removeFromFavorites: async(favoriteId: string, favoriteMovie: TMovieDetails) => {
        try {
            const response = await DeleteFavorites(favoriteId)
            if (response) {
                set({
                    message: response
                });
                set((state) => ({
                    favorites: state.favorites.filter(
                        movie => movie.id !== favoriteMovie.id
                    )
                }));
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
    },
    getComments: async(id: number) => {
        try {
            const response = await GetComments(id);
            if (response) {
                set({ comments: response });
            } else {
                set({ comments: [] });
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
    },
    addComment: async ({ data }: { data: TCommentRequest }) => {
        try {
            const response = await PostComment(data);
            if (!response) {
                throw new Error('Failed to create comment: No response from server');
            }
            set((state) => ({
                comments: [...state.comments, response]
            }));
            return response;
        } catch (error) {
            throw new Error(`${error}`);
        }
    },
    deleteComment: async(id: string) => {
        try {
            const response = await DeleteComment(id)
            if (response) {
                set({
                    message: response
                });
                set((state) => ({
                    comments: state.comments.filter(
                        comment => comment.id !== id
                    )
                }));
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
    },
    })

)