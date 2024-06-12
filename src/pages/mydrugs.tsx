import Mydrugitem from "@/components/shared/mydrugitem";
import $axios from "@/http";
import { IMyDrug } from "@/interfaces";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MyDrugs = () => {
  const accessToken = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const [myDrugs, setMyDrugs] = useState<IMyDrug[]>([]);

  useEffect(() => {
    getMyDrugs();
    if (!accessToken || user?.role !== "seller") {
      navigate("/");
    }
  }, []);

  const handleDelete = async (drugId: number) => {
    try {
      await $axios.delete(`/drugs/delete/${drugId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      toast.success('Drug deleted successfully');
      setMyDrugs(myDrugs.filter(drug => drug.id !== drugId));
    } catch (error) {
      console.error('Error deleting drug:', error);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  const getMyDrugs = async () => {
    try {
      const response = await $axios.get("/drugs/my_drugs/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setMyDrugs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased min-h-[60vh]">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden min-h-[60vh]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    Product name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Brand
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {myDrugs.map((drug) => (
                  <Mydrugitem key={drug.id} drug={drug} onUpdate={()=>{}} onDelete={handleDelete} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyDrugs;
