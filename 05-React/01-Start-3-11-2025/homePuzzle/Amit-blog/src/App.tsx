import styles from "./App.module.scss";
import image from "./assets/image.jpg";

function App() {
  return (
    <div className={styles.container}>
      <h1>About Me</h1>
      <img src={image} alt="amit photo"></img>

      <p>
        Hi! My name is Amit, I’m 24 years old. I’ve been in a
        relationship for two years with my girlfriend, Maya.
        We currently live together in Kfar Yona, but I
        originally come from Jerusalem.
      </p>

      <p>
        I work at a café called “Nomi” located in Emek Hefer.
      </p>

      <p>
        I come from a family of four siblings — I have one older sister and two
        brothers, and I’m the youngest.
      </p>

      <p>
        In my free time, I enjoy playing football, hanging out with friends, and
        I get excited when I manage to solve computer problems (lol).
      </p>

    </div>
  );
}

export default App;
