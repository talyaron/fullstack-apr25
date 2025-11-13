import { useState } from "react";
import Card from "./view/components/card/Card";
import "./App.scss";

interface Book {
  id: number;
  title: string;
  imgUrl: string;
  yearOfPublication: number;
}

function App() {
  const [booksList, setBooksList] = useState<Book[]>([
    {
      id: 1,
      title: "הדרקון הראשון שלי",
      imgUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
      yearOfPublication: 2000,
    },
    {
      id: 2,
      title: "ספר שני",
      imgUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
      yearOfPublication: 2010,
    },
    {
      id: 3,
      title: "ספר שלישי",
      imgUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
      yearOfPublication: 2015,
    },
  ]);

  return (
    <div>
      <h1>ספריית הספרים שלי</h1>

      <div className="books-container">
        {booksList.map((aBook) => (
          <Card
            key={aBook.id}
            title={aBook.title}
            imgUrl={aBook.imgUrl}
            yearOfPublication={aBook.yearOfPublication}
          />
        ))}
      </div>
    </div>
  );
}

export default App;