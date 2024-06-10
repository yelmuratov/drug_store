import { IDrug } from '@/interfaces';
import { drugCartStore } from '@/store/cart.store';
import { Link } from 'react-router-dom';

const DrugCard = ({ drug }: { drug: IDrug }) => {
    const accessToken = localStorage.getItem("accessToken");
    const { drugsCart, setDrugs } = drugCartStore();

    const addCart = (drug: IDrug) => {
        const updatedCart = drugsCart.find((item) => item.id === drug.id)
            ? drugsCart.map((item) => item.id === drug.id ? { ...item, quantity: item.quantity + 1 } : item)
            : [...drugsCart, { ...drug, quantity: 1 }];
        
        setDrugs(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    const api = import.meta.env.VITE_BASE_URL;
    const { drug_name, image, description, price } = drug;

    return (
        <div className="flex flex-col cursor-pointer justify-center items-center space-y-3 bg-white border border-gray-200 hover:shadow-xl transition duration-700 ease-in-out transform hover:scale-105 p-4 box-border rounded-xl">
            <img className="w-full h-72" src={`${api}${image}`} alt={drug_name} />
            <h1 className="text-gray-600 poppins-black font-bold text-[25px] text-center">{drug_name}</h1>
            <p className="text-gray-500 font-medium text-center flex-grow">{description.slice(0, 70)}</p>
            {/* price  */}
            <h2 className="text-gray-900 text-center font-bold poppins-black font-bold text-3xl">${price}</h2>
            {/* rating  */}
            <div className="flex items-center space-x-2 font-medium poppins-black">
                Quantity:<span className="text-gray-600">{drug.quantity}</span>
            </div>
            <div>
            </div>
            {/* buttons */}
            <div className='flex'>
              <Link to={accessToken ? "" : "/signin"} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View</Link>
              {accessToken && <button onClick={() => addCart(drug)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add to Cart</button>}
            </div>
        </div>
    );
}

export default DrugCard;
