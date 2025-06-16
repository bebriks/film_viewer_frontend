import axios from "axios";
import { IGenre, TMovie, TPage } from "./types";

const API_KEY = 'efd4b8b047f08224952538ede3b4c71b';
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/original'
const amvera = 'http://proxy-film-viwer-dmitrii1234.amvera.io/3';
//${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&language=ru-RU
export const GetFilmsData  = async(page: number = 1) => {
    
    try {
        const response = await axios.get<Promise<TPage>>(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&language=ru-RU`
        );
        
        if(response !== undefined) {
            const data = await response.data;
            return data
        } else {
            console.error('Ошибка при загрузке данных');
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
}

export const GetFilmImagesById  = async(filmId: number) => {
    try {
        const response = await axios.get<Promise<TPage>>(
          `${BASE_URL}/movie/${filmId}/images`,
          {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmQ0YjhiMDQ3ZjA4MjI0OTUyNTM4ZWRlM2I0YzcxYiIsIm5iZiI6MTc0MDEzNjQ2Ny4zNjMwMDAyLCJzdWIiOiI2N2I4NjAxM2EyMjg0NjY2ZjFlYjU2NTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xjNHXip6Daj-ZHyeFGw_4iD4qY5nhgKs8T7pRxXab4w'
            }
          }
        );
        if(response !== undefined) {
            const data = await response.data;
            return data
        } else {
            return {}
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
}

export const GetFilmPosterById  = async(film: TMovie) => {
    try {
        const response = await axios.get<Promise<TPage>>(
          `${BASE_POSTER_URL}/${film.poster_path}`,
          {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmQ0YjhiMDQ3ZjA4MjI0OTUyNTM4ZWRlM2I0YzcxYiIsIm5iZiI6MTc0MDEzNjQ2Ny4zNjMwMDAyLCJzdWIiOiI2N2I4NjAxM2EyMjg0NjY2ZjFlYjU2NTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xjNHXip6Daj-ZHyeFGw_4iD4qY5nhgKs8T7pRxXab4w'
            }
          }
        );
        if(response !== undefined) {
            const data = await response.data;
            console.log(response)
            return data
        } else {
            return {}
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
}

export const GetMovieById = async(id: number) => {
    try {
        const response = await axios.get(
          `${BASE_URL}/movie/${id}?append_to_response=videos&language=ru-RU`,
          {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmQ0YjhiMDQ3ZjA4MjI0OTUyNTM4ZWRlM2I0YzcxYiIsIm5iZiI6MTc0MDEzNjQ2Ny4zNjMwMDAyLCJzdWIiOiI2N2I4NjAxM2EyMjg0NjY2ZjFlYjU2NTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xjNHXip6Daj-ZHyeFGw_4iD4qY5nhgKs8T7pRxXab4w'
            }
          }
        );
        if(response !== undefined) {
            const data = await response.data;
            return data
        } else {
            console.error('Ошибка при загрузке данных');
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
}

export const GetMovieReviewsById = async(id: number) => {
    try {
        const response = await axios.get(
          `${BASE_URL}/movie/${id}/reviews?language=ru-RU`,
          {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmQ0YjhiMDQ3ZjA4MjI0OTUyNTM4ZWRlM2I0YzcxYiIsIm5iZiI6MTc0MDEzNjQ2Ny4zNjMwMDAyLCJzdWIiOiI2N2I4NjAxM2EyMjg0NjY2ZjFlYjU2NTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xjNHXip6Daj-ZHyeFGw_4iD4qY5nhgKs8T7pRxXab4w'
            },
          }
        );
        if(response !== undefined) {
            const data = await response.data;
            return data
        } else {
            console.error('Ошибка при загрузке данных');
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
}

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    language: 'ru-RU'
  },
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmQ0YjhiMDQ3ZjA4MjI0OTUyNTM4ZWRlM2I0YzcxYiIsIm5iZiI6MTc0MDEzNjQ2Ny4zNjMwMDAyLCJzdWIiOiI2N2I4NjAxM2EyMjg0NjY2ZjFlYjU2NTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xjNHXip6Daj-ZHyeFGw_4iD4qY5nhgKs8T7pRxXab4w',
  }
});

export const getGenres = async (mediaType: 'movie' | 'tv'): Promise<{ genres: IGenre[] }> => {
  try {
    const response = await tmdbApi.get(`genre/${mediaType}/list`);
    return response.data;
  } catch (error) {
    // Подробная обработка ошибок
    if (axios.isAxiosError(error)) {
      throw new Error(`TMDB API Error: ${error.response?.status} - ${error.response?.data?.status_message || error.message}`);
    }
    throw new Error(`Unknown error: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const SearchMovies = async (query: string, page: number = 1): Promise<TPage> => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      language: 'ru-RU',
      query,
      page,
    },
  });
  return response.data;
};


