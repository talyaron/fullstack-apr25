import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../redux/store"
import { changeName, deleteName } from "../../../redux/slices/nameSlice"
const Name = () => {
    const dispatch = useDispatch()
    const name = useSelector((state:RootState)=>state.name.value)
  return (
    <div>
your name is: {name}
    <br/>
   <input type="text" placeholder="change your name" onChange={(e) => dispatch(changeName(e.target.value))}/>
   <button onClick={() => dispatch(deleteName())}>Delete Name</button>
    </div>
  )
}

export default Name
