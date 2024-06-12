import { IUser } from "@/interfaces";
import { AuthStore } from "@/store/auth.store";
import { Avatar} from "@radix-ui/react-avatar";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dropdown, type MenuProps } from 'antd';
import { useCartStore } from "@/store/orders.store";


const Navbar = () => {

  const {cartQuantity} = useCartStore();
  const [burgerMenu, setBurgerMenu] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}") as IUser;
  const navigate = useNavigate();
  const location = useLocation();

  const LogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    AuthStore.getState().setAuth(false);
    AuthStore.getState().setUser({} as IUser);
    navigate('/')
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <li>
          {user.first_name} {user.last_name}
        </li>
      ),
    },
    {
      key: '2',
      label: (
        <li>
          {user.email}
        </li>
      ),
    },
    {
      key: '3',
      label: (
        <a>
          {user.role}
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a>
          {user.phone}
        </a>
      ),
    },
    {
      key: '5',
      label: (
        <button onClick={LogOut} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            Log Out
        </button>
      ),
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Fade direction="left" triggerOnce>
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="favicon.png" className="h-16" alt="Logo" />
            <span className="self-center text-[#3a86ff] md:text-4xl text-2xl font-semibold whitespace-nowrap dark:text-white">
              Pharmacy Uz
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
            onClickCapture={() => setBurgerMenu(!burgerMenu)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className={`${burgerMenu ? "" : "hidden"} md:block w-full md:w-auto`} id="navbar-solid-bg">
            <ul className="flex flex-col items-center font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className={
                    isActive("/")
                      ? "block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent font-sans font-bold text-xl"
                      : "block py-2 px-3 md:p-0 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold text-xl"
                  }
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className={
                    isActive("/products")
                      ? "block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent font-bold text-xl"
                      : "block py-2 px-3 md:p-0 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold text-xl"
                  }
                >
                  Products
                </Link>
              </li>
              {accessToken && user.role == 'seller' ? (
                <li>
                  <Link
                    to="/addProduct"
                    className={
                      isActive("/addProduct")
                        ? "block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent font-bold text-xl"
                        : "block py-2 px-3 md:p-0 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold text-xl"
                    }
                  >
                    Add product
                  </Link>
                </li>
              ) : null}
              <li>
                <Link
                  to="/contact"
                  className={
                    isActive("/contact")
                      ? "block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent font-bold text-xl"
                      : "block py-2 px-3 md:p-0 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold text-xl"
                  }
                >
                  Contact
                </Link>
              </li>
              {
                accessToken && user.role === 'seller' ? (
                  <li>
                <Link
                  to="/mydrugs"
                  className={
                    isActive("/mydrugs")
                      ? "block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent font-bold text-xl"
                      : "block py-2 px-3 md:p-0 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold text-xl"
                  }
                >
                  My drugs
                </Link>
              </li>): null
              }
              {
                accessToken && user.role === 'buyer' ? (
                  <li>
                <Link
                  to="/ordereditems"
                  className={
                    isActive("/ordereditems")
                      ? "block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent font-bold text-xl"
                      : "block py-2 px-3 md:p-0 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold text-xl"
                  }
                >
                  Orders
                </Link>
              </li>): null
              }
              {accessToken ? (
                <>
                  {user.role === "buyer" && (
                    <div className="relative">
                      <Link className="my-4 md:inline block" to="/orders">
                        <i className="fa-solid cursor-pointer fa-cart-shopping text-2xl"></i>
                      </Link>
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                          {cartQuantity}
                        </span>
                    </div>
                  )}
                  <div className="relative">
      <div className="avatar">
        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
        <Avatar className="bg-secondary rounded-full p-4">
            <i className="fa-solid fa-user cursor-pointer text-2xl"></i>
        </Avatar>
      </Dropdown>
      </div>
    </div>
                </>
              ) : (
                <li className="flex items-center gap-8 my-4">
                  <Link
                    to="/signin"
                    className={
                      isActive("/signin")
                        ? "block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent font-bold text-xl"
                        : "block py-2 px-3 md:p-0 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold text-xl"
                    }
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className={
                      isActive("/signup")
                        ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    }
                  >
                    Sign Up
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </Fade>
  );
};

export default Navbar;
