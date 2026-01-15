import { useState } from "react";

function generateRandom() {
    return Math.ceil(Math.random() * 100);
}

function useRandom() {

    const [randomNumber, setRandomNumber] = useState(generateRandom());

    setInterval(() => {
        setRandomNumber(generateRandom());
    }, 1000);

    return randomNumber;
}

export default useRandom;