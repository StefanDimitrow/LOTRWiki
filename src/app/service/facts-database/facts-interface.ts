export interface ApiResponse {
    count: number;
    results: Facts[];
    links?: {
      first?: string;
      last?: string;
      prev?: string | null;
      next?: string | null;
    };
  }
  
  export interface Facts {
    id: number;
    title: string;
    text: string;
  }