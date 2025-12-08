import { useSelector } from "react-redux"
import type { RootState } from "../../../redux/store"

const CounterView = () => {

    const count = useSelector((state: RootState) => state.counter.value)

  return (
    <div>
        This count is {count}
    </div>
  )
}

export default CounterView
