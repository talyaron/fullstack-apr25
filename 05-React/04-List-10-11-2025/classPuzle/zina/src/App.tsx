
import './App.css'
import Card from './view/components/card/Card'
const texts: {id: number, text: string, imgUrl: string}[] = [
  {id: 1, text: 'Hello', imgUrl: 'https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt134818d279038650/6668df6434f6fb5cd48aac34/beautiful-flowers-rose.jpeg?q=70&width=3840&auto=webp'},
   {id: 2, text: 'Bonjour', imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/1200px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg'}, 
   {id: 3, text: 'Hola', imgUrl: 'https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt134818d279038650/6668df6434f6fb5cd48aac34/beautiful-flowers-rose.jpeg?q=70&width=3840&auto=webp'}, 
   {id: 4, text: 'Ciao', imgUrl: 'https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt134818d279038650/6668df6434f6fb5cd48aac34/beautiful-flowers-rose.jpeg?q=70&width=3840&auto=webp'}, 
   {id: 5, text: 'Hallo', imgUrl: 'https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt134818d279038650/6668df6434f6fb5cd48aac34/beautiful-flowers-rose.jpeg?q=70&width=3840&auto=webp'}];

function App() {
 
  

  return (
    <>
      {texts.map((text) => (
        <Card key={text.id} text={text.text} imgUrl={text.imgUrl} />
      ))}
    </>
  )
}

export default App
