import { IDrug } from "@/interfaces";
import { useState, useEffect } from "react";

interface OrderCardProps {
  drug: IDrug;
  onRemove: (id: number) => void;
}

const OrderCard = ({ drug, onRemove }: OrderCardProps) => {
  const api = import.meta.env.VITE_BASE_URL;
  const [quantity, setQuantity] = useState<number>(() => {
    const savedQuantity = localStorage.getItem(`quantity-${drug.id}`);
    return savedQuantity ? parseInt(savedQuantity, 10) : 1;
  });

  useEffect(() => {
    // Save quantity to local storage whenever it changes
    localStorage.setItem(`quantity-${drug.id}`, quantity.toString());
  }, [quantity, drug.id]);

  return (
    <div  className="rounded-lg flex flex-col justify-center border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" className="shrink-0 md:order-1">
          <img
            className="h-40 w-60 dark:hidden"
            src={`${api}${drug.image}`}
            alt="imac image"
          />
          <img
            className="hidden h-40 w-20 dark:block"
            src={`${api}${drug.image}`}
            alt="imac image"
          />
        </a>

        <label htmlFor="counter-input" className="sr-only">
          Choose quantity:
        </label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button
              onClick={() => {
                if (quantity > 1) {
                  setQuantity((prev) => prev - 1);
                }
              }}
              type="button"
              id="decrement-button-4"
              data-input-counter-decrement="counter-input-4"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <svg
                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              id="counter-input-4"
              data-input-counter
              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
              placeholder=""
              value={quantity}
              readOnly
            />
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              type="button"
              id="increment-button-4"
              data-input-counter-increment="counter-input-4"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <svg
                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900 dark:text-white">
              ${drug.price}
            </p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <a
            href="#"
            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
          >
            {drug.drug_name}
          </a>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {drug.description}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onRemove(drug.id)}
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
