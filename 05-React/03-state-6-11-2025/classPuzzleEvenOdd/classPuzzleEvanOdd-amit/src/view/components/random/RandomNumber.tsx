type Props = {
    onGenerate: (num: number) => void;
}


export const RandomNumber = ({ onGenerate }: Props) => {

    function generate() {
        const number = Math.floor(Math.random() * 100);
        onGenerate(number);
    }

    return (
        <div>
            <button onClick={generate}>Get Random Number</button>
        </div>
    )
}