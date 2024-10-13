import React, { useContext } from "react";
import MyContext from "../../context/Data/MyContext";

export default function Sell({ onClose }) {
  const context = useContext(MyContext);
  const { products, setProducts, addProduct } = context;

  // Retrieve the user's name from localStorage
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const userName = user ? user.name : "Unknown User"; // Fallback in case user is not available

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-gray-800 bg-opacity-30">
      <div className="relative bg-gray-800 px-10 py-10 rounded-xl w-full max-w-md">
        <button
          className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-gray-400"
          onClick={onClose}
        >
          &times;
        </button>
        <h1 className="text-center text-white text-xl mb-4 font-bold">
          Add Product
        </h1>
        <div>
          <input
            type="text"
            value={products.title}
            onChange={(e) => setProducts({ ...products, title: e.target.value })}
            name="title"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product title"
          />
        </div>
        <div>
          <input
            type="number"
            value={products.price}
            onChange={(e) => setProducts({ ...products, price: e.target.value })}
            name="price"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product price"
          />
        </div>
        <div>
          <input
            type="url"
            value={products.imageUrl}
            onChange={(e) =>
              setProducts({ ...products, imageUrl: e.target.value })
            }
            name="imageurl"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product imageUrl"
          />
        </div>
        <div>
          <input
            type="text"
            value={products.category}
            onChange={(e) =>
              setProducts({ ...products, category: e.target.value })
            }
            name="category"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product category"
          />
        </div>

        {/* Owner Name field, auto-filled and non-editable */}
        <div>
          <input
            type="text"
            value={userName}
            name="OwnerName"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white outline-none cursor-not-allowed"
            disabled
          />
        </div>

        <div>
          <input
            type="number"
            value={products.ownerContact}
            onChange={(e) =>
              setProducts({ ...products, ownerContact: e.target.value })
            }
            name="OwnerContact"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Owner Contact"
          />
        </div>
        <div>
          <textarea
            cols="30"
            rows="10"
            name="description"
            value={products.description}
            onChange={(e) =>
              setProducts({ ...products, description: e.target.value })
            }
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product Description"
          ></textarea>
        </div>
        <div className="flex justify-center mb-3">
          <button
            onClick={addProduct}
            className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
