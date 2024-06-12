import React, { useState } from 'react';
import { IMyDrug } from '@/interfaces';
import $axios from '@/http';
import { toast } from 'sonner';

interface UpdateDrugModalProps {
  isOpen: boolean;
  onClose: () => void;
  drug: IMyDrug;
  onUpdate: (updatedDrug: IMyDrug[]) => void;
}

interface FormDataState {
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

const UpdateDrugModal: React.FC<UpdateDrugModalProps> = ({ isOpen, onClose, drug, onUpdate }) => {
  const [formData, setFormData] = useState<FormDataState>({
    drug_name: drug.drug_name,
    brand: drug.brand,
    price: drug.price,
    category: drug.category,
    quantity: drug.quantity.toString(),
    manufacturer_country: drug.manufacturer_country,
    manufacturer: drug.manufacturer,
    active_substance: drug.active_substance,
    type: drug.type,
    dozens: drug.dozens.toString(),
    expiration_date: drug.expiration_date,
    description: drug.description,
    image: null, // Initialize image as null
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData((prevFormData) => ({ ...prevFormData, image: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        const formKey = key as keyof FormDataState;
        const value = formData[formKey];
        if (value !== null) {
          formDataToSend.append(formKey, value instanceof File ? value : value.toString());
        }
      });

      const response = await $axios.put(`/drugs/update/${drug.id}/`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Drug updated successfully');
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating drug:', error);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  const handleCreateDrug = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        const formKey = key as keyof FormDataState;
        const value = formData[formKey];
        if (value !== null) {
          formDataToSend.append(formKey, value instanceof File ? value : value.toString());
        }
      });

      const response = await $axios.post(`/drugs/create/`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Drug created successfully');
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Error creating drug:', error);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Product</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label htmlFor="drug_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="drug_name"
                  id="drug_name"
                  value={formData.drug_name}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="manufacturer_country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Manufacturer Country
                </label>
                <input
                  type="text"
                  name="manufacturer_country"
                  id="manufacturer_country"
                  value={formData.manufacturer_country}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="manufacturer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Manufacturer
                </label>
                <input
                  type="text"
                  name="manufacturer"
                  id="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="active_substance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Active Substance
                </label>
                <input
                  type="text"
                  name="active_substance"
                  id="active_substance"
                  value={formData.active_substance}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="dozens" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Dozens
                </label>
                <input
                  type="number"
                  name="dozens"
                  id="dozens"
                  value={formData.dozens}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="expiration_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Expiration Date
                </label>
                <input
                  type="date"
                  name="expiration_date"
                  id="expiration_date"
                  value={formData.expiration_date}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write product description here"
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Update product
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateDrugModal;
