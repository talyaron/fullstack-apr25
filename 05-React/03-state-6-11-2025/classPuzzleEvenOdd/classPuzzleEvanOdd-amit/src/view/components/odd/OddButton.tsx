type Props = {
    num: number;
    onCorrect: () => void;
    onWrong: () => void;
}

export const OddButton = ({ num, onCorrect, onWrong }: Props) => {
    
    function check() {
        if (num % 2 !== 0) {
            onCorrect();
        } else {
            onWrong();
        }
    }

    return (
        <div>
            <button onClick={check}>The Number Is Odd</button>
        </div>
    )
}