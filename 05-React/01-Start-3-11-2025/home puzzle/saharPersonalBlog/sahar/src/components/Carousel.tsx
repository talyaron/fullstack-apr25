import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import styles from "../styles/Carousel.module.scss";
function Carousel() {
  return (
    <div
      className="carouselContainer"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        width: "80%",
      }}
    >
      <div
        id="carouselExampleSlidesOnly"
        className={styles.carousel}
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://i.pinimg.com/736x/fe/76/02/fe76021a101f7ae6103d72e65cda437e.jpg"
              className={`d-block w-100 ${styles.item}`}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://picsum.photos/id/1018/1200/400"
              className={`d-block w-100 ${styles.item}`}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://picsum.photos/id/1025/1200/400"
              className={`d-block w-100 ${styles.item}`}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://picsum.photos/id/1043/1200/400"
              className={`d-block w-100 ${styles.item}`}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://picsum.photos/id/1059/1200/400"
              className={`d-block w-100 ${styles.item}`}
              alt="..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
