import React, { useContext, useState, useEffect, useRef } from "react";
import MyContext from "../../context/Data/MyContext";
import { toast } from "react-toastify";

function UpdateProduct({ onClose, selectedProduct }) {
  const context = useContext(MyContext);
  const { updateProduct } = context;

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const userName = user ? user.name : "Unknown User";

  const modalRef = useRef(null); // Create a ref for the modal

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toast.dismiss(); // Dismiss all active toasts if clicked outside the modal
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside); // Clean up event listener
    };
  }, []);

  const [updatedProduct, setUpdatedProduct] = useState({});

  useEffect(() => {
    setUpdatedProduct({ ...selectedProduct, ownerName: userName });
  }, [selectedProduct, userName]);

  const handleUpdateProduct = () => {
    toast.success(updatedProduct.title + " updated successfully");
    updateProduct(updatedProduct);
    onClose(); // Close the modal after updating
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-gray-800 bg-opacity-30">
      <div
        className="relative bg-gray-800 px-10 py-10 rounded-xl w-full max-w-md"
        style={{
          maxHeight: "90vh", // Ensure the modal doesn't exceed 90% of the viewport height
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        <button
          className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-gray-400"
          onClick={onClose}
        >
          &times;
        </button>
        <h1 className="text-center text-white text-xl mb-4 font-bold">
          Update Product
        </h1>
        <div>
          <input
            type="text"
            value={updatedProduct.title || ""}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, title: e.target.value })
            }
            name="title"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product title"
          />
        </div>
        <div>
          <input
            type="number"
            value={updatedProduct.price || ""}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, price: e.target.value })
            }
            name="price"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product price"
          />
        </div>
        <div>
          <input
            type="url"
            value={updatedProduct.imageUrl || ""}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, imageUrl: e.target.value })
            }
            name="imageurl"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product image URL"
          />
        </div>
        <div>
          <select
            value={updatedProduct.category || ""}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, category: e.target.value })
            }
            name="category"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white outline-none"
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            {[
              "Accessories",
              "Beauty",
              "Books",
              "Cycles",
              "Clothing",
              "Decoration",
              "Electronics",
              "Furniture",
              "Health",
              "Stationery",
              "Sports",
              "Other",
            ].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

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
            value={updatedProduct.ownerContact || ""}
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedProduct,
                ownerContact: e.target.value,
              })
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
            value={updatedProduct.description || ""}
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedProduct,
                description: e.target.value,
              })
            }
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product Description"
          ></textarea>
        </div>
        <div className="flex justify-center mb-3">
        <button
            onClick={handleUpdateProduct}
            className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
