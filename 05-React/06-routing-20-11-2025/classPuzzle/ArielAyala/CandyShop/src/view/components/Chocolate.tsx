import React from "react";
import "./Chocolate.scss";

const Chocolate: React.FC = () => {
  return (
    <div className="chocolate-wrapper">
      <div className="chocolate-card">
        <div className="chocolate-image-container">
          <img
            src="https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80"
            alt="Delicious chocolate bars"
            className="chocolate-image"
          />
        </div>

        <div className="chocolate-content">
          <h1 className="chocolate-title">Chocolate</h1>

          <p className="chocolate-description">
            Chocolate is a beloved confection made from roasted cacao beans,
            combined with sugar and milk to create one of the world's most
            popular treats. From rich dark chocolate to creamy milk chocolate,
            this delightful indulgence has captivated taste buds for centuries.
            Whether enjoyed as a bar, truffle, or hot beverage, chocolate brings
            joy and comfort with its smooth texture and complex flavors ranging
            from sweet to bitter, often with hints of fruit, nuts, or vanilla.
          </p>

          <div className="chocolate-tags">
            <span className="tag">Sweet</span>
            <span className="tag">Indulgent</span>
            <span className="tag">Irresistible</span>
          </div>
        </div>
      </div>    
    </div>
  );
};

export default Chocolate;
