import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import MyContext from "../../context/Data/MyContext";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import { BsCart } from "react-icons/bs";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const context = useContext(MyContext);
  const { mode, toggleMode } = context;
  const user = JSON.parse(localStorage.getItem("user"));
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  const cartItems = useSelector((state) => state.cart);

  return (
    <div className="bg-white sticky top-0 z-50">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(40, 44, 52)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <Link
                    to="/"
                    className="text-sm font-medium text-gray-900"
                    style={{
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    All Products
                  </Link>

                  {user && user?.email !== "abhinavbbis@gmail.com" && (
                    <div className="flow-root">
                      <Link
                        to="/sell"
                        className="-m-2 block p-2 font-medium text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        Sell
                      </Link>
                    </div>
                  )}

                  {user?.email === "abhinavbbis@gmail.com" && (
                    <div className="flow-root">
                      <Link
                        to="/dashboard"
                        className="-m-2 block p-2 font-medium text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        Admin
                      </Link>
                    </div>
                  )}

                  {/* Login/Logout button for mobile */}
                  <div className="flow-root">
                    {!user ? (
                      <Link
                        to="/login"
                        className="text-sm font-medium text-gray-700"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        Login
                      </Link>
                    ) : (
                      <a
                        onClick={logout}
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        Logout
                      </a>
                    )}
                  </div>

                  {/* <div className="flow-root">
                    <Link
                      to="/"
                      className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                    >
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                        alt="Dan_Abromov"
                      />
                    </Link>
                  </div> */}
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="/" className="-m-2 flex items-center p-2">
                    <span
                      className="ml-3 block text-base font-medium text-gray-900"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      INDIA
                    </span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop version */}
      <header className="relative bg-white">
        <p
          className="flex h-10 items-center justify-center bg-blue-500 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
          style={{
            backgroundColor: mode === "dark" ? "rgb(40, 44, 52)" : "#3B82F6",
            color: mode === "dark" ? "white" : "",
          }}
        >
          Free contact reveal till 30th November
        </p>

        <nav
          aria-label="Top"
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl"
          style={{
            backgroundColor: mode === "dark" ? "#393d4c" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
                style={{
                  backgroundColor: mode === "dark" ? "rgb(80 82 87)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={"/"} className="flex">
                  <div className="flex">
                    <h1
                      className="text-2xl font-bold text-black px-2 py-1 rounded"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      JOCOMA
                    </h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    to="/"
                    className="text-sm font-medium text-gray-700"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    All Products
                  </Link>
                  {user?.email !== "abhinavbbis@gmail.com" && (
                    <Link
                      to="/sell"
                      className="text-sm font-medium text-gray-700"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Sell
                    </Link>
                  )}

                  {user?.email === "abhinavbbis@gmail.com" && (
                    <Link
                      to="/dashboard"
                      className="text-sm font-medium text-gray-700"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Admin
                    </Link>
                  )}
                  {!user ? (
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-700"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Login
                    </Link>
                  ) : (
                    <a
                      onClick={logout}
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Logout
                    </a>
                  )}
                </div>

                <span className="hidden lg:ml-2 lg:flex">
                  <a
                    href="/"
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    {/* india fla */}
                    <span
                      className="ml-3 block text-sm font-medium"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      INDIA
                    </span>
                  </a>
                </span>

                {/* Mode toggle */}
                <div className="ml-2">
                  <BsFillCloudSunFill
                    onClick={toggleMode}
                    className="text-gray-700 h-6 w-6 cursor-pointer"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  />
                </div>

                {/* Cart */}
                <div className="ml-2 flex items-center space-x-6">
                  <Link to="/cart" className="relative">
                    <BsCart
                      className="h-6 w-6"
                      style={{ color: mode === "dark" ? "white" : "gray" }}
                    />
                    <span
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1"
                      style={{ color: mode === "dark" ? "white" : "black" }}
                    >
                      {cartItems.length}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
