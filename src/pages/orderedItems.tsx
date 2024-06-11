import $axios from "@/http";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const OrderedItems = () => {
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();

    const getOrderedItems = async () => {
        try {
            const response = await $axios.get("/users/orders/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log(response.data);
        } catch (error) {   
            console.error(error);
        }
    }

    useEffect(() => {
        getOrderedItems();
    }
    , []);
    
    if(!accessToken || user?.role !== "buyer") {
        navigate("/");
    }

    const orders = [
        {
          id: 1,
          image: 'image1.png', 
          name: 'Decoration Item Set',
          orderNumber: 'PK0010820563',
          status: 'Delivered',
          price: 70.55,
        },
        {
          id: 2,
          image: 'image2.png', 
          name: 'Decoration Item Set',
          orderNumber: 'PK0010820563',
          status: 'Cancelled',
          price: 70.55,
        },
        {
          id: 3,
          image: 'https://pdp.araltech.tech/media/images/drugs/aspirin.jpg', 
          name: 'Decoration Item Set',
          orderNumber: 'PK0010820563',
          status: 'Delivered',
          price: 70.55,
        },
      ];

  return (
    <div className="p-4 sm:p-6">
  <h2 className="text-base sm:text-lg md:text-2xl font-semibold mb-4">Order History List</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-2 sm:px-4 text-left text-xs sm:text-sm md:text-base">Product</th>
          <th className="py-2 px-2 sm:px-4 text-left text-xs sm:text-sm md:text-base">Status</th>
          <th className="py-2 px-2 sm:px-4 text-left text-xs sm:text-sm md:text-base">Price</th>
          <th className="py-2 px-2 sm:px-4 text-left text-xs sm:text-sm md:text-base">Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="border-t">
            <td className="py-2 px-2 sm:px-4 flex items-center text-xs sm:text-sm md:text-base">
              <img src={order.image} alt={order.name} className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mr-2 sm:mr-4" />
              <span>{order.name}</span>
            </td>
            <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm md:text-base">
              <span
                className={`${
                  order.status === 'Delivered' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {order.status}
              </span>
            </td>
            <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm md:text-base">${order.price.toFixed(2)}</td>
            <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm md:text-base">
              {order.status === 'Delivered' ? (
                <button className="bg-gray-200 text-black py-1 px-2 sm:px-3 rounded">Show Invoice</button>
              ) : (
                <button className="bg-blue-500 text-white py-1 px-2 sm:px-3 rounded">Buy Again</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  )
}

export default OrderedItems