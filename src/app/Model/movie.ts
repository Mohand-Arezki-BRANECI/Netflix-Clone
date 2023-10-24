export interface Movie {
  page: number;
  results: Movies[]; // Assuming each result is a movie, you can create a Movie interface
  total_pages: number;
  total_results: number;
}

export interface Movies {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
