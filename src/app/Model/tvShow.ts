export interface TvShow{
  page : number
  results : TvShows[];
  total_pages : number;
  total_results : number;
}
export interface TvShows{
  backdrop_path: string;
  first_air_date : string;
  genre_ids: number[];
  id: number;
  name : string;
  original_country : string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
