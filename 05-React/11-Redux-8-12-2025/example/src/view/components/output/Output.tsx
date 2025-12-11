import type { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

const Output = () => {
  const text = useSelector((state: RootState) => state.text.text);

  return (
    <div>{text}</div>
  )
}

export default Output