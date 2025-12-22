import type { Author } from '../../model/types'
interface Prop{
    author:Author
}

const AuthorCard = ({author}:Prop) => {

return (
  <div className="author-card">
    <div className="author-card__header">
      <h3 className="author-card__name">
        {author.first_name} {author.last_name}
      </h3>
    </div>

    <div className="author-card__body">
      <span className="author-card__label">Authoer Has {author.book_count||0} Books</span>
      <span className="author-card__count">

      </span>
    </div>
  </div>
);

}

export default AuthorCard
