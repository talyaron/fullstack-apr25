import './FavoriteMovies.module.scss';

function FavoriteMovies() {
  return (
    <div className="favorite-movies">
      <h2 className="favorite-movies__title">Favorite Movies 🎬</h2>
      <ul className="favorite-movies__list">
        <li className="favorite-movies__item">The Penguins of Madagascar</li>
        <li className="favorite-movies__item">Blood and Bone</li>
        <li className="favorite-movies__item">Rocky</li>
        <li className="favorite-movies__item">Fast and Furious</li>
      </ul>
    </div>
  )
}

export default FavoriteMovies;