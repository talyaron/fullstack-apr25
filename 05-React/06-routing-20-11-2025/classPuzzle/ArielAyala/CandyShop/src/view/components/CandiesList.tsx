import { Link } from 'react-router'

const CandiesList = () => {
  return (
    <div>
      <h2>List of Candies</h2>
      <ul>
        <Link to="marshmello"><li>Marshmello</li></Link>
        <Link to="chocolate"><li>Chocolate</li></Link>
        <Link to="gummybears"><li>Gummy Bears</li></Link>
      </ul>
    </div>
  )
}

export default CandiesList