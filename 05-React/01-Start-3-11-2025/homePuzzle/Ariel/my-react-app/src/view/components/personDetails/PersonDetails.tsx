import './PersonDetails.module.scss';

function PersonDetails() {
  return (
    <div className="person-details">
      <p className="person-details__text">
        Hello! My name is <span className="person-details__highlight">Ariel Izraelov</span>, and I am <span className="person-details__highlight">full stack developer</span>.
      </p>
      <p className="person-details__text">
        I am <span className="person-details__highlight">24</span> year's old from <span className="person-details__highlight">Be'er sheva - Israel</span>.
      </p>
      <p className="person-details__text">
        Now I am learning <span className="person-details__highlight">React</span>!
      </p>
      <p className="person-details__text">
        Wish me good luck 🤞 🎉
      </p>
    </div>
  )
}

export default PersonDetails;