import { create } from 'zustand'
import { TMovie, TMovieDetails } from '../api/types'
import { GetMovieById } from '../api/api_TMDB'

export type MovieActions = {
    setCurrentMovie: (movie: TMovie) => void
}
export type TuseMovieStore = {
    currentMovie: null | TMovie
}
export const useMovieStore = create<TuseMovieStore & MovieActions>((set) => ({
    currentMovie: null,
    currentMovies: [],
    setCurrentMovie: async(movie: TMovie | TMovieDetails) => {
        try {
            const data = await GetMovieById(movie.id)
            localStorage.setItem('current_movie', JSON.stringify(data))

        } catch (error) {
            throw new Error(`${error}`)
        }
        set({ currentMovie: movie as TMovie })
    },
}))