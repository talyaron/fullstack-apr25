import { useEffect, useState } from "react";
import AuthorCard from './AuthorCard'
import { getAuthors } from "../../api/getFuncitons";
import type { Author } from "../../model/types";
const AuthorStats = () => {

    const [authors, setAuthors] = useState<Author[]>([]);
    //const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState < 'name' | 'count' > ('name');
    const [order, setOrder] = useState < 'asc' | 'desc' > ('asc');

    useEffect(() => {
        const fetchAuthors = async () => {
            setAuthors(await getAuthors({search, sortBy, order}));
        };
        fetchAuthors();
    }, [search, setSearch, setSortBy, setOrder, sortBy, order]);

    useEffect(() => {
        const fetchAuthors = async () => {
            setAuthors(await getAuthors({ search, sortBy, order }));
        };
        fetchAuthors();
    }, []);

    // ... render table with search input and clickable headers

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
            />
            <div className="btns">
                <button className={sortBy === 'name' ? 'selected btn' : 'btn'} onClick={()=>setSortBy('name')}> sort by name</button>
                <button className={sortBy === 'count' ? 'selected btn' : 'btn'} onClick={()=>setSortBy('count')}> sort by book</button>
                <button className={order === 'asc' ? 'selected btn' : 'btn'} onClick={()=>setOrder('asc')} title="Low to High"> △</button>
                <button className={order === 'desc' ? 'selected btn' : 'btn'} onClick={()=>setOrder('desc')} title=" High to Low"> ▽</button>

            </div>
            <div className="authorsList">
                {authors.map((author:Author) => (
                    <AuthorCard
                        key={author.author_id}
                        author={author}
                    />
                ))
                }</div>
        </div>
    )
}

export default AuthorStats
