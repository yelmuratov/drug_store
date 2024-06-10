import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import $axios from "@/http"; // Import your axios instance
import { IDrug } from "@/interfaces";
import { Fade } from "react-awesome-reveal";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [drug, setDrug] = useState<IDrug | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const fetchDrug = async () => {
      try {
        const { data } = await $axios.get(`/drugs/${id}/`);
        setDrug(data);
      } catch (error) {
        console.error("Error fetching drug", error);
      }
    };

    fetchDrug();
  }, [id]);

  if (!drug) {
    return <div>Loading...</div>;
  }

  return (
    <section className="max-w-screen-xl py-24 mx-auto px-6  overflow-y-hidden">
      <div className="flex flex-col justify-center items-center pt-24">
        <div className="p-6 box-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {/* image  */}
          <div>
            <Fade direction="left" triggerOnce>
              <img
                className="w-full h-full mx-auto object-cover rounded-lg"
                alt="coverimg"
              />
            </Fade>
          </div>
          {/* details  */}
          <div className="flex flex-col justify-center h-full">
            <Fade direction="left" triggerOnce>
              <div className="border-b border-gray-400 pb-4">
                <h1 className="poppins text-gray-800 text-3xl">Hello</h1>
                {/* rating and reviews  */}
                <div className="flex items-center-space-x-3 mt-4">
                  <span className="text-gray-600"> reviews</span>
                </div>
                {/* description  */}
                <p className=" text-gray-400 my-4">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Ipsum accusantium molestiae, corporis, facere quos voluptates
                  quis ullam beatae asperiores inventore ratione sapiente. Iure
                  aspernatur quo quae repudiandae magni dolore enim!
                </p>
              </div>
              <div className="flex items-center justify-between py-6">
                <h2 className="text-3xl text-black font-bold poppins">$20$</h2>
                <button
                  disabled={disabled}
                  className={` ${disabled} && "opacity-30" w-36 btn-primary py-3 px-4 poppins text-sm flex items-center space-x-3 text-center justify-center`}
                >
                  <span>Add To Cart</span>
                </button>
              </div>
            </Fade>
          </div>
          <Link
            to="/products"
            className="pt-4 text-blue-500 text-sm hover:underline flex items-center space-x-3"
          >
            {" "}
            <span>Back</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
