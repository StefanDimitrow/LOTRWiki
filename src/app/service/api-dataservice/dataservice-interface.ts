

export interface ApiResponse{
    count:number;
    results: Books[];
    links?: {
        first?:string;
        last?:string;
        prev?:string | null;
        next?:string | null
    };
}
export interface Books {
    id:number;
    title:string;
    author: string;
    publication_date:string;
    url:any;
}
export interface Films {
    id: number;
    title:string;
    release_date:string;
    director:string[];
    producer:string[];
}
export interface Characters {
    id:number;
    name:string;
    height:string;
    hair_color:string;
    eye_color:string;
    gender:string;
    date_of_birth: string;
    date_of_death: string;
    weapons: string[];
}
export interface Species {
    name:string;
    
}
export interface Realms {
    name:string;
    capital:string;
    founded_date:string;
    type:string;
    location:string;
    inhabitants:string[];

}