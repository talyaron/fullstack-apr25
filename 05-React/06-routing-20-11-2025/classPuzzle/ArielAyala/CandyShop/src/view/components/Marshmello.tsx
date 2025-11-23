const Marshmello = () => {
  return (
    <div className="marshmallow-wrapper">
      <div className="marshmallow-card">
        <div className="marshmallow-image-container">
          <img
            src="https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800&q=80"
            alt="Fluffy colorful marshmallows"
            className="marshmallow-image"
          />
        </div>

        <div className="marshmallow-content">
          <h1 className="marshmallow-title">Marshmallow</h1>

          <p className="marshmallow-description">
            Marshmallows are soft, pillowy confections made from sugar, water,
            and gelatin, whipped to a fluffy, cloud-like consistency. These
            delightful treats have a light, airy texture that melts in your
            mouth and are loved for their sweet, vanilla flavor. Perfect for
            roasting over campfires, floating in hot chocolate, or enjoying
            straight from the bag, marshmallows bring a sense of nostalgia and
            comfort with their squishy, bouncy texture and pastel colors.
          </p>

          <div className="marshmallow-tags">
            <span className="tag">Fluffy</span>
            <span className="tag">Soft</span>
            <span className="tag">Nostalgic</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marshmello;
