import $axios from "@/http";
import { Order, OrderItem } from "@/interfaces";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderedItems: React.FC = () => {
  const accessToken = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const [orderedItems, setOrderedItems] = useState<Order[]>([]);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const getOrderedItems = async () => {
    try {
      const response = await $axios.get("/users/orders/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setOrderedItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      const order = orderedItems.find(order => order.id === orderId);
      if (!order) return;

      await $axios.put(`/users/orders/${orderId}/`, 
        { status },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      setOrderedItems((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, status }
            : order
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const removeDrug = async (orderId: number, itemId: number) => {
    try {
      const order = orderedItems.find(order => order.id === orderId);
      if (!order) return;

      const updatedItems = order.items.filter(item => item.id !== itemId);

      await $axios.post(`/users/orders/items/`, 
        { 
            "order_id": orderId,
            "item_id": itemId
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      setOrderedItems((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, items: updatedItems }
            : order
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrderedItems();
    if (!accessToken || user?.role !== "buyer") {
        navigate("/");
      }
  }, []);

  

  const api = import.meta.env.VITE_BASE_URL;

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="p-4 sm:p-6 min-h-[60vh]">
      <h2 className="text-base sm:text-lg md:text-2xl font-semibold mb-4">
        Order History List
      </h2>
      <div className="overflow-x-auto">
        {orderedItems && orderedItems.map((order, index) => (
          order.items.length > 0 && (
            <div key={order.id} className="mb-4">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
                onClick={() => toggleAccordion(index)}
                
              >
                <span>Order ID: {order.id}</span>
                <span className={`${
                  order.status === "approved" ? "text-green-500" : "text-red-500"
                }`}>
                  {order.status}
                </span>
                <button className={`focus:outline-none mt-4 text-${order.status == "rejected"?"black":"white"} bg-${order.status == "rejected"?"secondary":"red-700"}  focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ${order.status == "rejected" ? "cursor-not-allowed" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateOrderStatus(order.id, "rejected");
                  }}
                  disabled = {order.status == "rejected"}>
                  Cancel order
                </button>
              </button>
              <div
                id={`accordion-color-body-${index}`}
                className={`${openAccordion === index ? '' : 'hidden'}`}
                aria-labelledby={`accordion-color-heading-${index}`}
              >
                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <table className="min-w-full bg-white border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-2 sm:px-4 text-left text-xs sm:text-sm md:text-base">Product</th>
                        <th className="py-2 px-2 sm:px-4 text-left text-xs sm:text-sm md:text-base">Price</th>
                        <th className="py-2 px-2 sm:px-4 text-left text-xs sm:text-sm md:text-base">Quantity</th>
                        <th className="py-2 px-2 sm:px-4 text-left text-xs sm:text-sm md:text-base">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item: OrderItem) => (
                        <tr key={item.id} className="border-t">
                          <td className="py-2 px-2 sm:px-4 text-center flex items-center text-xs sm:text-sm md:text-base">
                            <img
                              src={`${api}${item.drug_details.image}`}
                              alt={item.drug_details.image}
                              className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mr-2 sm:mr-4"
                            />
                            <span>{item.drug_details.drug_name}</span>
                          </td>
                          <td className="py-2 px-2 sm:px-4 text-center text-xs sm:text-sm md:text-base">
                            ${item.drug_details.price}
                          </td>
                          <td className="py-2 px-2 sm:px-4 text-center text-xs sm:text-sm md:text-base">
                            {item.quantity}
                          </td>
                          <td className="py-2 px-2 sm:px-4 text-center text-xs sm:text-sm md:text-base">
                            {order.status === "approved" ? (
                              <button className="bg-gray-200 text-black py-1 px-2 sm:px-3 rounded">
                                Show Invoice
                              </button>
                            ) : (
                              <button
                                onClick={() => removeDrug(order.id, item.id)}
                                className={`focus:outline-none mt-4 text-${order.status == "rejected"?"black":"white"} bg-${order.status == "rejected"?"secondary":"red-700"}  focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ${order.status == "rejected" ? "cursor-not-allowed" : ""}`}
                                disabled = {order.status == "rejected"}
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default OrderedItems;
