import axios from "axios";
import { TComment, TCommentRequest, TFavorites, TLoginUser, TRegistrationUser } from "./types";

const DATABASE_API = 'http://localhost:3001'
const LLM = 'http://26.248.83.92:1234/v1/embeddings'
export const Registration = async(data: TRegistrationUser) => {
    try {
        const response = await axios.post(`${DATABASE_API}/register`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const Login = async(data: TLoginUser) => {
    try {
        const response = await axios.post(`${DATABASE_API}/login`, data, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access-token')}`
        }})
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const Logout = async() => {
    try {
        const response = await axios.post(`${DATABASE_API}/logout`, {}, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const GetProfile = async() => {
    try {
        const response = await axios.get(`${DATABASE_API}/profile`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`
            },
        })
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw new Error(`${error}`)
    }
}

interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }
  
  interface ChatCompletionRequest {
    model: string;
    messages: Message[];
    temperature?: number;
    max_tokens?: number;
    stream?: boolean;
  }
  
/*   export const POSTPrompt = async (userMessage: string = 'грустно меланхолия') => {
    const systemMessage: string = 'Всегда отвечай на русском и кратко. Подбери список фильмов по этим параметрам'
    try {
      const requestData: ChatCompletionRequest = {
        model: 't-lite-it-1.0',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: -1,
        stream: false
      };
  
      const response = await axios.post('http://localhost:1234/v1/chat/completions', requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Unexpected status code: ${response.status}`);
    } catch (error) {
      throw new Error(`Request failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }; */

export const POSTFavoriteMovie = async(movie: TMovie) => {
    try {
        const response = await axios.post(
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

export const GetFavorites = async() => {
    try {
        const response = await axios.get(`${DATABASE_API}/favorites`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`
            },
        })
        if (response.status === 200) {
            return response.data as TFavorites[]
        }
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const PostToFavorites = async(userId: string, movieId: string) => {
    try {
        const response = await axios.post(`${DATABASE_API}/favorites`, {
            userId,
            movieId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`
            },
        })
        if (response.status === 200) {
            return response.data as TFavorites
        }
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const DeleteFavorites = async(id: string) => {
    try {
        const response = await axios.delete(`${DATABASE_API}/favorites/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`
            },
        })
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const GetComments = async(id: number) => {
    try {
        const response = await axios.get(`${DATABASE_API}/movies/${id}/comments`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`
            },
        })
        if (response.status === 200) {
            return response.data as TComment[]
        }
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const PostComment = async(data: TCommentRequest) => {
    try {
        const response = await axios.post(`${DATABASE_API}/comments`, {
            movieId: data.movieId,
            text: data.text,
            parentId: data.parentId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`
            },
        })
        if (response.status === 200) {
            return response.data as TComment
        }
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const DeleteComment = async(id: string) => {
    try {
        const response = await axios.delete(`${DATABASE_API}/comments/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`
            },
        })
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw new Error(`${error}`)
    }
}