import type { IceCream } from '../../../model/IceCreamModels'
interface FormProps {
    flavors: IceCream[];
    setFlavors: React.Dispatch<React.SetStateAction<IceCream[]>>;

}
const Form = ({ flavors, setFlavors }: FormProps) => {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const flavor = data.get('flavor') as string;
        const imageUrl = data.get('imageUrl') as string;
        const price = parseFloat(data.get('price') as string);

        if(!flavor || !imageUrl || isNaN(price)) {
            console.log('error: all fields are required');
            return;
        }

        const newFlavor: IceCream = {
            flavor,
            imageUrl,
            price
        };
console.log(newFlavor);
        setFlavors([...flavors, newFlavor]);

        form.reset();
    }

    return (
        <div className='add-flavor-form'>
            <h2>add another flavor of ice cream</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="flavor" placeholder='flavor name' />
                <input type="text" name="imageUrl" placeholder='image url' />
                <input type="number" name="price" placeholder='price' step="0.01" />
                <button type='submit'>add flavor</button>
            </form>
        </div>
    )
}

export default Form
