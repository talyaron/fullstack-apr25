import Book from "./view/components/book/Book";
import styles from "./App.module.scss"

function App() {
  const books = [
    { id: 0, title: "", shortDesc: "", imageUrl: "", yearOfPublication: 0 }
  ]

  return (
    <>
      <header>
        <h1 className={styles.title}>Books</h1>
      </header>
      <div className={styles.container}>
        <Book id={0} imageUrl={"https://ik.imagekit.io/storybird/images/01af5014-6a0b-4c0d-ad1d-237099ad2265/7_583686947.webp?tr=q-80"} title={"lion"} yearOfPublication={1987} {...books} />
        <Book id={0} imageUrl={"https://www.shutterstock.com/image-vector/cartoon-dog-animated-character-full-600nw-2506326479.jpg"} title={"dog"} yearOfPublication={2022} {...books} />
        <Book id={0} imageUrl={"https://png.pngtree.com/png-vector/20230906/ourmid/pngtree-cute-cartoon-cat-png-image_10004760.png"} title={"cat"} yearOfPublication={2013} {...books} />
        <Book id={0} imageUrl={"https://www.shutterstock.com/image-vector/clownfish-vibrant-small-marine-fish-600nw-2488428137.jpg"} title={"fish"} yearOfPublication={2003} {...books} />
      </div>
    </>
  )
}

export default App
