import '../../global_components/global.css';
import './card.css';

type CardProps = {
    name: string;
    description: string;
};

function Card({ name, description }: CardProps) {

    return (
        <>
            <div className='Box flex flex-wrap flex-col flex justify-center items-center'>
                <div className='Container font-serif'>
                    <h1 className='text-3xl font-bold'>
                        {name}
                    </h1>
                    <h3 className='Description text-2xl'>
                        {description}
                    </h3>
                </div>
            </div>
        </>
    )
}

export default Card
