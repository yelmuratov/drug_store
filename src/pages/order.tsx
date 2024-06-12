import OrderCard from "@/components/shared/order.card";
import { IDrug } from "@/interfaces";
import { drugCartStore } from "@/store/cart.store";
import { useEffect, useState } from "react";
import $axios from "@/http"; // Import your axios instance
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/orders.store";

const Orders = () => {
  const { setDrugs } = drugCartStore();
  const accessToken = localStorage.getItem("accessToken");
  const [orders, setOrders] = useState<IDrug[]>([]);
  const {setOrderedProducts} = useCartStore();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("cart") || "[]") as IDrug[]);
  }, []);

  useEffect(() => {
    if (!accessToken || user?.role !== "buyer") {
      navigate("/");
    }
  }, [accessToken]);

  const handleRemove = (id: number) => {
    const updatedOrders = orders.filter(order => order.id !== id);
    setOrders(updatedOrders);
    setDrugs(updatedOrders);
    localStorage.removeItem(`quantity-${id}`);
    setOrderedProducts(updatedOrders);
    localStorage.setItem("cart", JSON.stringify(updatedOrders));
    toast.success("Drug removed from cart");
  };

  const handleOrder = async () => {
    const orderItems = orders.map(order => ({
      drug: order.id,
      quantity: localStorage.getItem(`quantity-${order.id}`), // Ensure you have quantity in your IDrug interface
      price: order.price
    }));

    const orderPayload = {
      status: "pending",
      items: orderItems
    };

    try {
      const response = await $axios.post("/users/orders/", orderPayload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      });
      console.log(response.data);
      setOrders([]);
      setDrugs([]);
      localStorage.removeItem("cart");
      orders.forEach(order => localStorage.removeItem(`quantity-${order.id}`));
      setOrderedProducts([]);
      toast.success("Order placed successfully");
    } catch (error) {
      console.error("Error placing order", error);
      toast.error("Error placing order");
    }
  };

  return (
    <div className="grid md:grid-cols-1 min-h-[60vh] gap-4 pl-6 p-12">
      {orders.length > 0 ? (
        <>
          {orders.map((drug, index) => (
            <OrderCard key={index} drug={drug} onRemove={handleRemove} />
          ))}
          <button
            onClick={handleOrder}
            className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded hover:bg-blue-500 transition-colors"
          >
            Place Order
          </button>
        </>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <h1 className="text-gray-600 text-2xl">No Orders yet</h1>
        </div>
      )}
    </div>
  );
};

export default Orders;
