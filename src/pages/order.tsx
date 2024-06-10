import OrderCard from "@/components/shared/order.card";
import { IDrug } from "@/interfaces";
import { drugCartStore } from "@/store/cart.store";
import { useEffect, useState } from "react";

const Orders = () => {
  const { setDrugs } = drugCartStore();
  const accessToken = localStorage.getItem("accessToken");
  const [orders, setOrders] = useState<IDrug[]>([]);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("cart") || "[]") as IDrug[]);
  }, []);

  useEffect(() => {
    if (!accessToken) {
      window.location.href = "/";
    }
  }, [accessToken]);

  const handleRemove = (id: number) => {
    const updatedOrders = orders.filter(order => order.id !== id);
    setOrders(updatedOrders);
    setDrugs(updatedOrders);
    localStorage.setItem("cart", JSON.stringify(updatedOrders));
  };

  return (
    <div className="grid md:grid-cols-1 min-h-[60vh] gap-4 pl-6 p-12">
      {orders.length > 0 ? (
        orders.map((drug, index) => (
          <OrderCard key={index} drug={drug} onRemove={handleRemove} />
        ))
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <h1 className="text-gray-600 text-2xl">No Orders yet</h1>
        </div>
      )}
    </div>
  );
};

export default Orders;
function setDrugs(updatedOrders: IDrug[]) {
  throw new Error("Function not implemented.");
}

