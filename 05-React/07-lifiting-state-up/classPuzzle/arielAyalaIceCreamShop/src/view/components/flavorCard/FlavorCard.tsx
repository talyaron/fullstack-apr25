import type { IceCream } from '../../../model/IceCreamModels';
interface FlavorCardProps {
    flavor: IceCream;
};

const FlavorCard = ({ flavor }: FlavorCardProps) => {
  return (
          <div  className="flavor-card">
            <img src={flavor.imageUrl} alt={flavor.flavor} />
            <div className="flavor-info">
              <h3 className="flavor-name">{flavor.flavor}</h3>
              <p className="flavor-description">Price: ${flavor.price.toFixed(2)}</p>
            </div>
          </div>
  )
}

export default FlavorCard
