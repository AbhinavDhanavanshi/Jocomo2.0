import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import MyContext from "../../context/Data/MyContext";

export default function Sell({ onClose }) {
  const [imageFile, setImageFile] = useState(null); // State to hold the image file
  const [uploading, setUploading] = useState(false); // State to show upload progress
  const context = useContext(MyContext);
  const { products, setProducts, addProduct } = context;
  const categories = [
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
  ];

  // Retrieve the user's name from localStorage
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const userName = user ? user.name : "Unknown User"; // Fallback in case user is not available

  // Handle the file input change to select the image file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Handle uploading the image to Firebase Storage
  const handleImageUpload = async () => {
    if (!imageFile) {
      toast.error("Please select an image file to upload.");
      return;
    }

    setUploading(true); // Set uploading state to true
    const storage = getStorage();
    const storageRef = ref(storage, `productImages/${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: handle progress here
      },
      (error) => {
        setUploading(false);
        toast.error("Image upload failed. Please try again.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          handleAddProduct(downloadURL); // Call function to add product with image URL
          setUploading(false);
        });
      }
    );
  };

  // Updated addProduct to include ownerName and imageUrl directly in the function call
  const handleAddProduct = (imageUrl) => {
    // Add imageUrl to the product object
    const updatedProduct = {
      ...products,
      ownerName: userName,
      imageUrl, // URL generated from Firebase Storage
    };
    addProduct(updatedProduct);
    toast.success("Product added successfully! It will be visible once approved.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-gray-800 bg-opacity-30 overflow-auto">
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
          Add Product
        </h1>
        <div>
          <input
            type="text"
            value={products.title || ""}
            onChange={(e) =>
              setProducts({ ...products, title: e.target.value })
            }
            name="title"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product title"
          />
        </div>
        <div>
          <input
            type="number"
            value={products.price || ""}
            onChange={(e) =>
              setProducts({ ...products, price: e.target.value })
            }
            name="price"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product price"
          />
        </div>
        
        {/* File input for image upload */}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
          />
        </div>

        <div>
          <select
            value={products.category || ""}
            onChange={(e) =>
              setProducts({ ...products, category: e.target.value })
            }
            name="category"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white outline-none"
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
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
            value={products.ownerContact || ""}
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
            value={products.description || ""}
            onChange={(e) =>
              setProducts({ ...products, description: e.target.value })
            }
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product Description"
          ></textarea>
        </div>

        <div className="flex justify-center mb-3 group">
          <button
            onClick={handleImageUpload} // Call the upload function on button click
            disabled={uploading} // Disable button during upload
            className={`focus:outline-none text-white ${
              uploading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
            } group-hover:scale-105 transition-all ease-in-out 3s focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2`}
          >
            {uploading ? "Uploading..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
