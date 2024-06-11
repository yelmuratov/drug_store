import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fade } from "react-awesome-reveal";
import $axios from "@/http";
import { toast } from "sonner";

interface FormData {
  drug_name: string;
  brand: string;
  price: string;
  category: string;
  quantity: string;
  manufacturer_country: string;
  manufacturer: string;
  active_substance: string;
  type: string;
  dozens: string;
  expiration_date: string;
  description: string;
  image: File | null;
}

const AddProduct = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [formData, setFormData] = useState<FormData>({
    drug_name: "",
    brand: "",
    price: "",
    category: "",
    quantity: "",
    manufacturer_country: "",
    manufacturer: "",
    active_substance: "",
    type: "",
    dozens: "",
    expiration_date: "",
    description: "",
    image: null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === "file") {
      setFormData({ ...formData, [name]: files ? files[0] : null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const initialFormData: FormData = {
    drug_name: "",
    brand: "",
    price: "",
    category: "",
    quantity: "",
    manufacturer_country: "",
    manufacturer: "",
    active_substance: "",
    type: "",
    dozens: "",
    expiration_date: "",
    description: "",
    image: null,
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData[key as keyof FormData] !== null) {
        if (key === "expiration_date") {
          const date = new Date(formData[key]);
          const formattedDate = date.toISOString().split("T")[0];
          data.append(key, formattedDate);
        } else {
          data.append(key, formData[key as keyof FormData] as Blob);
        }
      }
    }

    try {
      await $axios.post("/drugs/create/", data,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product added successfully");
      setFormData(initialFormData); // Reset form data
      setErrors({}); // Clear any errors
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <Fade direction="left" triggerOnce>
      <section className="add-product dark:bg-gray-900 -z-50 relative">
        <div className="py-8 px-12 mx-auto max-w-5xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold inline text-gray-900 dark:text-white">
            Add a new product
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="drug_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white inline"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="drug_name"
                  id="drug_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                  onChange={handleChange}
                  value={formData.drug_name} // bind value
                />
                {errors.drug_name && <p className="text-red-500 text-sm">{errors.drug_name.join(", ")}</p>}
              </div>
              <div className="w-full">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product brand"
                  required
                  onChange={handleChange}
                  value={formData.brand} // bind value
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required
                  onChange={handleChange}
                  value={formData.price} // bind value
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product category"
                  required
                  onChange={handleChange}
                  value={formData.category} // bind value
                />
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Quantity"
                  required
                  onChange={handleChange}
                  value={formData.quantity} // bind value
                />
              </div>
              <div>
                <label
                  htmlFor="manufacturer_country"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Manufacturer country
                </label>
                <input
                  type="text"
                  name="manufacturer_country"
                  id="manufacturer_country"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Manufacturer country"
                  required
                  onChange={handleChange}
                  value={formData.manufacturer_country} // bind value
                />
                {errors.manufacturer_country && <p className="text-red-500 text-sm">{errors.manufacturer_country.join(", ")}</p>}
              </div>
              <div>
                <label
                  htmlFor="manufacturer"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Manufacturer
                </label>
                <input
                  type="text"
                  name="manufacturer"
                  id="manufacturer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Manufacturer"
                  required
                  onChange={handleChange}
                  value={formData.manufacturer} // bind value
                />
              </div>
              <div>
                <label
                  htmlFor="active_substance"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Active substance
                </label>
                <input
                  type="text"
                  name="active_substance"
                  id="active_substance"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Active substance"
                  required
                  onChange={handleChange}
                  value={formData.active_substance} // bind value
                />
                {errors.active_substance && <p className="text-red-500 text-sm">{errors.active_substance.join(", ")}</p>}
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type"
                  required
                  onChange={handleChange}
                  value={formData.type} // bind value
                />
              </div>
              <div>
                <label
                  htmlFor="dozens"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Dozens
                </label>
                <input
                  type="number"
                  name="dozens"
                  id="dozens"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Dozens"
                  required
                  onChange={handleChange}
                  value={formData.dozens} // bind value
                />
              </div>
              <div>
                <label
                  htmlFor="expiration_date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Expiration date
                </label>
                <input
                  type="date"
                  name="expiration_date"
                  id="expiration_date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Expiration date"
                  required
                  onChange={handleChange}
                  value={formData.expiration_date} // bind value
                />
                {errors.expiration_date && <p className="text-red-500 text-sm">{errors.expiration_date.join(", ")}</p>}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image
                </label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                  required
                  onChange={handleChange}
                  value={formData.description} // bind value
                ></textarea>
              </div>
            </div>
            <Button type="submit" className="mt-6">
              Add Product
            </Button>
          </form>
        </div>
      </section>
    </Fade>
  );
};

export default AddProduct;
