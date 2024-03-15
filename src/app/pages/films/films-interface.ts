export interface ApiResponse {
    count: number;
    results: Film[];
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
  }
  export interface Film {
    id: number;
    title: string;
    release_date: string;
    director: string[];
    producer: string[];
    characters: string[];
    url: string;
  }