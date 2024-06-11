import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import $axios from "@/http"; // Import your axios instance
import { IDrug } from "@/interfaces";
import { Fade } from "react-awesome-reveal";
import { drugCartStore } from '@/store/cart.store';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [drug, setDrug] = useState<IDrug | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  const accessToken = localStorage.getItem("accessToken");
  const { drugsCart, setDrugs } = drugCartStore();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchDrug = async () => {
      try {
        const { data } = await $axios.get(`/drugs/${id}/`);
        setDrug(data);
        setDisabled(drugsCart.some((item) => item.id === data.id));
      } catch (error) {
        console.error("Error fetching drug", error);
      }
    };

    fetchDrug();
  }, [id, drugsCart]);

  const addCart = (drug: IDrug) => {
    const updatedCart = drugsCart.find((item) => item.id === drug.id)
      ? drugsCart.map((item) => item.id === drug.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...drugsCart, { ...drug, quantity: 1 }];

    setDrugs(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Drug added to cart");
    setDisabled(true);
  }

  if (!drug) {
    return <div className="h-full">Loading...</div>;
  }

  const api = import.meta.env.VITE_BASE_URL;

  return (
    <section className="min-h-[50vh] mx-auto px-6 overflow-y-hidden">
      <div className="flex flex-col justify-center items-center pt-24">
        <div className="p-6 box-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          <div>
            <Fade direction="left" triggerOnce>
              <img
                className="md:w-[400px] mx-auto object-cover rounded-lg"
                alt="coverimg"
                src={`${api}${drug.image}`}
              />
            </Fade>
          </div>
          <div className="flex flex-col justify-center ">
            <Fade direction="left" triggerOnce>
              <div className="border-b border-gray-400 pb-4">
                <h1 className="poppins text-gray-800 md:text-3xl text-xl">{drug.drug_name}</h1>
                <p className="text-sm text-gray-400 my-4">{drug.description}</p>
              </div>
              <div className="flex items-center justify-between py-6">
                <h2 className="text-3xl text-black font-bold poppins">${drug.price}</h2>
                {accessToken && user?.role === 'buyer' && (
                  <button
                    onClick={() => addCart(drug)}
                    disabled={disabled}
                    className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none focus:ring-4 ${
                      disabled
                        ? "bg-gray-500 cursor-not-allowed"
                        : "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    }`}
                  >
                    <span className="text-white">{disabled ? "Added to Cart" : "Add To Cart"}</span>
                  </button>
                )}
              </div>
            </Fade>
          </div>
          <Link
            to="/products"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            <span>Back</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
