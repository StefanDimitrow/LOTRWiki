export interface ApiResponse {
    count: number;
    results: any[]; 
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
  }