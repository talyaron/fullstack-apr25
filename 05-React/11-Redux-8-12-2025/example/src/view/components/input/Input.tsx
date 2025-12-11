import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';
import { updateText } from '../../../redux/slices/textSlice';

const Input = () => {

    const dispatch = useDispatch();
    const text = useSelector((state: RootState) => state.text.text);


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        // dispatch action to update the text in the store
        dispatch(updateText(e.target.value));
    }

  return (
    <input value={text} onChange={handleChange} />
  )
}

export default Input