import { IUser } from "@/interfaces";
import { AuthStore } from "@/store/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [burgerMenu, setBurgerMenu] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}") as IUser;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const LogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    AuthStore.getState().setAuth(false);
    AuthStore.getState().setUser({} as IUser);
    navigate('/')
  };

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
              {accessToken ? (
                <>
                  <Link to={'/orders'}>
                    <i className="fa-solid cursor-pointer fa-cart-shopping text-2xl"></i>
                  </Link>
                  <div className="avatar">
                    <Avatar>
                      <AvatarImage
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-12 rounded-full cursor-pointer"
                        src="https://github.com/shadcn.png"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div
                      id="userDropdown"
                      className={`z-10 ${dropdownOpen ? "" : "hidden"} absolute z-50 right-35 mt-2  bg-white   rounded-lg shadow w-44 dark:bg-gray-700 `}
                    >
                      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div className="font-medium truncate cursor-pointer mb-2">{user.username.toLowerCase()}</div>
                        <div className="font-medium truncate cursor-pointer mb-2">{user.email.toLowerCase()}</div>
                        <div className="font-medium truncate cursor-pointer mb-2">{user.role}</div>
                        <div className="font-medium truncate cursor-pointer">{user.phone}</div>
                      </div>
                      <div className="py-1 bg-[red]">
                        <button
                          onClick={LogOut}
                          className="block px-4 py-2  text-sm text-white"
                        >
                          Sign out
                        </button>
                      </div>
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
