import React, { useContext, useState } from "react";
import myContext from "../../context/Data/MyContext";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Sell from "./Sell";
import UpdateProduct from "./UpdateProduct";
import { toast } from "react-toastify";

function ProductCard() {
  const context = useContext(myContext);
  const { mode, product, deleteProduct } = context;
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).name
    : null;

  const [sellOn, setSellOn] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [updateOn, setUpdateOn] = useState(false);

  const addProductSale = () => {
    setSellOn(true);
  };

  const closeSell = () => {
    setSellOn(false);
  };

  const updateProductSell = () => {
    setUpdateOn(true);
  };
  const closeUpdateSell = () => {
    setUpdateOn(false);
  };

  const userProducts = product.filter((item) => item.ownerName === user);



  return (
    <Layout>
      <section className={`text-gray-600 body-font ${sellOn ? "blur-sm" : ""}`}>
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div className="lg:w-full w-full mb-6 lg:mb-10 group">
            <div className="lg:w-full w-full mb-2 lg:mb-2 flex justify-between items-center group">
              <h1
                className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Your Products
              </h1>
              <button
                onClick={addProductSale}
                type="button"
                className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-white bg-blue-500 rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring focus:ring-blue-300 shadow-lg"
              >
                <span className="absolute inset-0 w-full h-full bg-blue-400 rounded-lg opacity-50 transition duration-500 transform scale-110 group-hover:scale-100"></span>
                <span className="relative z-10">Sell Product</span>
              </button>
            </div>
            <div className="h-1 w-1/6 bg-blue-500 rounded transition-all duration-3 group-hover:w-full"></div>
          </div>

          <div className="flex flex-wrap -m-4">
            {userProducts.map((item, index) => {
              const { title, price, imageUrl, approved } = item;
              
              return (
                <div className="p-4 md:w-1/4 drop-shadow-lg" key={index}>
                  <div
                    className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden relative"
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <div
                      onClick={() =>
                        (window.location.href = `/productinfo/${item.id}`)
                      }
                      className="flex justify-center cursor-pointer"
                    >
                      <img
                        className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out"
                        src={imageUrl}
                        alt="product"
                      />
                    </div>
                    <div className="p-5 border-t-2">
                      <div className="flex justify-between">
                        <h2
                          className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          JOCOMO
                        </h2>
                        {/* Delete button positioned absolutely */}
                        <div
                          className="absolute top-2 right-2 hover:cursor-pointer"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this product?")) {
                              deleteProduct(item);
                              toast.success("Product deleted successfully");
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-400 hover:text-red-500 transition duration-200"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
                      </div>
                      <h1
                        className="title-font text-lg font-medium text-gray-900 mb-3"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {title}
                      </h1>
                      <p
                        className="leading-relaxed mb-3"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        ₹ {price}
                      </p>
                      <div className="flex justify-center">
                        <button
                          onClick={() => {
                            updateProductSell();
                            setCurrentProduct(item);
                          }}
                          type="button"
                          className="focus:outline-none text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
                        >
                          Update Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {updateOn && (
        <UpdateProduct
          onClose={closeUpdateSell}
          selectedProduct={currentProduct}
        />
      )}
      {sellOn && <Sell onClose={closeSell} />}
    </Layout>
  );
}

export default ProductCard;
