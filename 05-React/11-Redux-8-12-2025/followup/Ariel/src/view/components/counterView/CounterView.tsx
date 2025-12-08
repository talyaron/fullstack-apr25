
import { useSelector } from 'react-redux'
import type { RootState } from '../../../redux/storage'

const CounterView = () => {

const count = useSelector((state:RootState) => state.counter.value)

  return (
    <div>This is the counter: {count}</div>
  )
}

export default CounterView;