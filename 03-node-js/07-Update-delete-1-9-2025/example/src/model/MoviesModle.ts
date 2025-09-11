// This file defines the interface used in the application to represent a movie object.
// It ensures that all movie objects have a consistent structure.

export interface Movie {
    id: string ;
    title: string;
    year: number;
    genre: string;
    rating: number;
    poster: string;
    description: string;
    color?: string;
} 
