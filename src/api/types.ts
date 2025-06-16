export type TMovie = {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string 
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}
export type TMovieDetails = {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: {
      id: number
      name: string
      poster_path: string
      backdrop_path: string | null
    }
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    origin_country: string[]
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    videos: TVideos
    vote_average: number
    vote_count: number
}
export type TVideos = {
    results: TVideo[]
}
export type TVideo = {
    id: string
    iso_639_1: string
    iso_3166_1: string
    key: string
    name: string
    official: boolean
    published_at: Date
    site: string
    size: number
    type: string

}
export type SpokenLanguage = {
    english_name: string
    iso_639_1: string
    name: string
}
export type Genre = {
    id: number
    name: string
}
  
  export type ProductionCompany = {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
}
  
export type ProductionCountry = {
    iso_3166_1: string
    name: string
}
export type TPage = {
    page: number
    results: TMovie[]
    total_pages: number
    total_results: number
}
export interface TUser {
  id: string;
  user_type_id: number;
  email: string | null;
  password: string;
  name: string;
  favorites?: IFavorite[]; // Made optional for flexibility
  refreshTokens?: IRefreshToken[];
  comments?: TComment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IFavorite {
  id: string;
  userId: string;
  movieId: string;
  createdAt: Date;
  user?: TUser; // Optional relation
}

export interface IRefreshToken {
  id: string;
  hashedToken: string;
  userId: string;
  revoked: boolean;
  createdAt: Date;
  updatedAt: Date;
  expireAt: Date;
  user?: TUser; // Optional relation
}

// Interface for Comment
export interface TComment {
  id: string;
  text: string;
  userId: string;
  movieId: string;
  createdAt: Date;
  parentId?: string | null;
  user?: TUser;
  parent?: TComment;
  replies?: TComment[];
}

export interface TCommentRequest {
  movieId: string,
  text: string,
  parentId: null | string
}

export type TRegistrationUser = {
    name: string
    email: string
    password: string
}
export type TLoginUser = {
    name: string
    email: string
    password: string
}

export type TCardProfile = {
    label: string
    icon: React.ComponentType
}
export interface TFavorites {
    id: string,
    userId: string,
    movieId: string,
    createdAt: string
}
export interface IGenre {
  id: number;
  name: string;
}