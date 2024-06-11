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
  return (
    <div>OrdereItems</div>
  )
}

export default OrderedItems