import { IDrug } from "@/interfaces";
import { drugCartStore } from "@/store/cart.store";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/orders.store";

const DrugCard = ({ drug }: { drug: IDrug }) => {
  const accessToken = localStorage.getItem("accessToken");
  const { setDrugs } = drugCartStore();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { setCartQuantity } = useCartStore();

  const [isDrugInCart, setIsDrugInCart] = useState(false);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("cart") || "[]") as IDrug[];
    setIsDrugInCart(orders.some((item) => item.id === drug.id));
  }, [drug.id]);

  const addCart = (drug: IDrug) => {
    const orders = JSON.parse(localStorage.getItem("cart") || "[]") as IDrug[];
    const updatedCart = orders.find((item) => item.id === drug.id)
      ? orders.map((item) =>
          item.id === drug.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...orders, { ...drug, quantity: 1 }];

    setDrugs(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Drug added to cart");
    setIsDrugInCart(true);

    setCartQuantity(
      updatedCart.reduce((total, item) => total + item.quantity, 0)
    );
  };

  const api = import.meta.env.VITE_BASE_URL;
  const { drug_name, image, description, price } = drug;

  return (
    <div className="flex flex-col z-[-100] cursor-pointer justify-center items-center space-y-3 bg-white border border-gray-200 hover:shadow-xl transition duration-700 ease-in-out transform hover:scale-105 p-4 box-border rounded-xl">
      <img className="w-full h-72" src={`${api}${image}`} alt={drug_name} />
      <h1 className="text-gray-600 poppins-black font-bold text-[25px] text-center">
        {drug_name}
      </h1>
      <p className="text-gray-500 font-medium text-center flex-grow">
        {description.slice(0, 70)}
      </p>
      <h2 className="text-gray-900 text-center font-bold poppins-black font-bold text-3xl">
        ${price}
      </h2>
      <div className="flex items-center space-x-2 font-medium poppins-black">
        Quantity:<span className="text-gray-600">{drug.quantity}</span>
      </div>
      <div className="flex">
        <Link
          to={accessToken ? `/products/${drug.id}` : "/signin"}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          View
        </Link>
        {accessToken && user?.role === "buyer" && (
          <button
            onClick={() => addCart(drug)}
            type="button"
            disabled={isDrugInCart}
            className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none focus:ring-4 ${
              isDrugInCart
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            }`}
          >
            {isDrugInCart ? "Added to Cart" : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
};

export default DrugCard;
