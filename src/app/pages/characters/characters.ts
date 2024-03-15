export interface ApiResponse {
    count: number;
    results: Characters[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
      };
    
}
export interface Characters {
    id: number;
    name:string;
    realm:any [];
    height:number;
    hair_color: string;
    eye_color:string;
    date_of_birth: Date;
    date_of_death: Date;
    gender: string;
    species: any[];
    race: any[];
    group: any[];
    weapons:string[];
    languages:string[];
    films:string[];
    books:string[];
}