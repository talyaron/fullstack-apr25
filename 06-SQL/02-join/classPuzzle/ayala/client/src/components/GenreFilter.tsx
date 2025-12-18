import { useState } from "react"
import type {  BookWithAuthor, Genre } from "../types"
import styles from './GenreFilter.module.scss'
import { getBooksByGenre } from "../api"
interface Props {
    genres: Genre[];
    setBooks: React.Dispatch<React.SetStateAction<BookWithAuthor[]>>;
    setError:React.Dispatch<React.SetStateAction<string | null>>;
}
const GenreFilter = ({ genres, setBooks , setError}: Props) => {
    const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);


    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // ה-value מה-select תמיד מגיעה כסטרינג
        const value = event.target.value;
        // המרה ל-number או שמירה כ-null אם נבחרה האפשרות "כל הסוגות"
        const newGenreId = value === 'all' ? null : Number(value);
        setSelectedGenreId(newGenreId);
        if (newGenreId != null) loadBooksByGenre(newGenreId)
    };


    const loadBooksByGenre = async (id: number) => {
        try {
            console.log("load genres")
            const data = await getBooksByGenre(id);
            setBooks(data);
            setError(null);
        } catch {
            setError('Failed to load books. Make sure the server is running.');
        }
    };
    return (
        <div className={styles.filterContainer}>
            <label htmlFor="genre-select" className={styles.label}>
                GENRE
            </label>

            <select
                id="genre-select"
                onChange={handleGenreChange}
                value={selectedGenreId === null ? 'all' : selectedGenreId.toString()}
                className={styles.select}
            >
                {/* אפשרות ברירת מחדל לבחירת "כל הסוגות" (ללא פילטר) */}
                <option value="all">כל הסוגות</option>

                {/* יצירת האפשרויות מתוך מערך ה-genres */}
                {genres.map((genre) => (
                    <option key={genre.genre_id} value={genre.genre_id}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default GenreFilter
