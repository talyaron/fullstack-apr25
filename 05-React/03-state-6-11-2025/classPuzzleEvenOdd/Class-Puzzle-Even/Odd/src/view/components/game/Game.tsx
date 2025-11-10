import { useState, useEffect } from "react";
import styles from './Game.module.scss';

const Game = ({ number }: { number: number }) => {
    // const [parity, setParity] = useState<'Even' | 'Odd'>(number % 2 === 0 ? 'Even' : 'Odd');
    const [backgroundColor, setBackgroundColor] = useState<'green' | 'red'| 'white'>('white');
  
  
    useEffect(() => {
        // setParity(number % 2 === 0 ? 'Even' : 'Odd'); //set parity when number changes
        setBackgroundColor('white'); // Reset background color when new number appears
    }, [number]); //use effect is triggered when number changes

    function checkParity(buttonPressed: 'Even' | 'Odd') {
        const parity = number % 2 === 0 ? 'Even' : 'Odd';
        if (buttonPressed === parity) {
            setBackgroundColor('green');
        } else {
            setBackgroundColor('red');
        }

    }

    return (
        <div className={styles.game} style={{backgroundColor}}>
            {/* <button onClick={() => setBackgroundColor(parity === 'Odd' ? 'green' : 'red')}>Odd</button>
            {number}
            <button onClick={() => setBackgroundColor(parity === 'Even' ? 'green' : 'red')}>Even</button> */}
            <button onClick={() => checkParity('Odd')}>Odd</button>
            {number}
            <button onClick={() => checkParity('Even')}>Even</button> 
        </div>
    )
}

export default Game