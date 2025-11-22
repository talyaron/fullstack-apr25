import { useParams } from 'react-router';

const Book = () => {

    const { bookId } = useParams();

    // get book by id from some data source (omitted for brevity)

    return (
        <div>
            <h1>Books:</h1>
            <p>Book ID: {bookId}</p>
        </div>
    )
}

export default Book