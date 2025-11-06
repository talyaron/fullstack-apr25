import './HobbyList.module.scss';

function HobbyList() {
  return (
    <div className="hobby-list">
      <h2 className="hobby-list__title">My Hobbies 🎯</h2>
      <ul className="hobby-list__list">
        <li className="hobby-list__item">⚽ Sport</li>
        <li className="hobby-list__item">🎵 Music</li>
        <li className="hobby-list__item">📖 Torah</li>
      </ul>
    </div>
  )
}

export default HobbyList;