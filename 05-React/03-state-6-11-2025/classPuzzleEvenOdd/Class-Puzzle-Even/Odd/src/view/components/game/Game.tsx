import { useState, useEffect } from "react";

const Game = ({ number }: { number: number }) => {
    const [parity, setParity] = useState<'Even' | 'Odd'>(number % 2 === 0 ? 'Even' : 'Odd');
    const [backgroundColor, setBackgroundColor] = useState<'green' | 'red'| 'white'>('white');
  
  
    useEffect(() => {
        setParity(number % 2 === 0 ? 'Even' : 'Odd');
        setBackgroundColor('white'); // Reset background color when new number appears
    }, [number]);

    return (
        <div style={{backgroundColor}}>
            <button onClick={() => setBackgroundColor(parity === 'Odd' ? 'green' : 'red')}>Odd</button>
            {number}
            <button onClick={() => setBackgroundColor(parity === 'Even' ? 'green' : 'red')}>Even</button>
        </div>
    )
}

export default Game