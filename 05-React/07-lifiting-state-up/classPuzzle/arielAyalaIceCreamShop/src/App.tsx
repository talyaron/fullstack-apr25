import { useState } from 'react'
import { iceCreamsModels } from './model/IceCreamModels'
import type { IceCream } from './model/IceCreamModels'
import './App.scss'
import FlavorCard from './view/components/flavorCard/FlavorCard'
import Form from './view/components/from/Form'

function App() {
  const [flavors, setFlavors] = useState<IceCream[]>(iceCreamsModels)

  return (
    <div className="Shop">
      <h1>Ice Cream Shop</h1>
      <div className="flavors-list">
        {flavors.map((flavor, index) => (<FlavorCard key={index} flavor={flavor} />))}
        <Form flavors={flavors} setFlavors={setFlavors} />
      </div>
    </div>
  )
}

export default App
