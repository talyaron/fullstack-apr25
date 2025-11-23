const GummyBears = () => {
  return (
    <div className="gummybears-wrapper">
      <div className="gummybears-card">
        <div className="gummybears-image-container">
          <img
            src="https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800&q=80"
            alt="Colorful gummy bears"
            className="gummybears-image"
          />
        </div>

        <div className="gummybears-content">
          <h1 className="gummybears-title">Gummy Bears</h1>

          <p className="gummybears-description">
            Gummy bears are chewy, fruit-flavored candies shaped like adorable
            little bears that have delighted candy lovers since the 1920s. Made
            from gelatin, sugar, and fruit flavoring, these colorful treats come
            in a rainbow of vibrant hues and flavors including cherry, orange,
            lemon, pineapple, and raspberry. With their satisfying chewy texture
            and sweet-tart taste, gummy bears are perfect for snacking, sharing,
            or decorating desserts, bringing joy and playfulness to every bite.
          </p>

          <div className="gummybears-tags">
            <span className="tag">Chewy</span>
            <span className="tag">Colorful</span>
            <span className="tag">Fruity</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GummyBears;
