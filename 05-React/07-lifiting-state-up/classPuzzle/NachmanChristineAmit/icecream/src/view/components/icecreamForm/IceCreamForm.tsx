import type { Dispatch, SetStateAction } from "react";
import type { IceCream } from "../../../App";
import type React from "react";

interface IceCreamProps {
  iceCreams: IceCream[];
  setIceCreams: Dispatch<SetStateAction<IceCream[]>>;
}
const IceCreamForm = ({ iceCreams, setIceCreams }: IceCreamProps) => {

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const image = data.get("image") as string;
    const name = data.get("title") as string;
    const price = data.get("price") as string;

    if(!image || !name || !price) throw new Error("Missing paramters");
    
    const iceCream: IceCream = {
      image,
      name,
      price: Number(price),
    };

    setIceCreams([...iceCreams, iceCream])


  }
  return (
    <div>
      <form name="iceCreamForm" onSubmit={handleSubmit} className="">
        <input type="text" name="image" placeholder="imageUrl" autoFocus required />
        <input type="text" name="title" placeholder="title" required />
        <input type="number" name="price" placeholder="price" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default IceCreamForm
