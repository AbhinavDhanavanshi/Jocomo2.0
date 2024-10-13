import React, { useContext, useState } from "react";
import myContext from "../../context/Data/MyContext";
import Layout from "../../components/Layout/Layout";
import Sell from "./Sell";
import { toast } from "react-toastify";

function ProductCard() {
  const context = useContext(myContext);
  const { mode, product } = context;
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user.name"))
    : null;

  const [sellOn, setSellOn] = useState(false);

  const addProductSale = () => {
    setSellOn(true);
  };

  const closeSell = () => {
    setSellOn(false);
  };

  return (
    <Layout>
      <section
        className={`text-gray-600 body-font ${sellOn ? "blur-sm" : ""}`}
      >
        <div className="container px-5 py-8 md:py-16 mx-auto">
          {/* Flex container for Your Products and Add Product button */}
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10 group flex items-center justify-between">
            <h1
              className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Your Products
            </h1>
            <button
              onClick={addProductSale}
              type="button"
              className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm py-2 px-4"
            >
              Add Product
            </button>
          </div>
          {/* Line below Your Products */}
          <div className="h-1 w-20 bg-blue-500 rounded transition-all duration-300 group-hover:w-1/2 mb-6"></div>

          <div className="flex flex-wrap -m-4">
            {product.map((item, index) => {
              const { title, price, imageUrl, approved } = item;
              if (!approved || item.ownerName !== user) {
                return null;
              }
              return (
                <div className="p-4 md:w-1/4 drop-shadow-lg" key={index}>
                  <div
                    className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
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
                      <h2
                        className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        JOCOMO
                      </h2>
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
                          onClick={() => addCart(item)}
                          type="button"
                          className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
                        >
                          Add To Cart
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

      {sellOn && <Sell onClose={closeSell} />}
    </Layout>
  );
}

export default ProductCard;
