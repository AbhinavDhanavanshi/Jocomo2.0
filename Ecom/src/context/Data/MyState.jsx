import React, { useEffect } from "react";
import { createContext, useState } from "react";
import MyContext from "./MyContext";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FirebaseConfig";
import {
  addDoc,
  getDocs,
  collection,
  onSnapshot,
  Timestamp,
  deleteDoc,
  query,
  doc,
  setDoc,
  orderBy,
} from "firebase/firestore";

const MyState = (props) => {
  const customToastSuccess = (message) => {
    // Show the toast with the message passed as input
    const toastId = toast.success(message, {
      autoClose: false, // Keep the toast open until it's dismissed by the user
      closeOnClick: false, // Prevent closing when clicking the toast itself
    });

    // Add a slight delay before attaching the click event listener
    setTimeout(() => {
      const handleClick = () => {
        toast.dismiss(toastId); // Close the toast
        document.removeEventListener("click", handleClick); // Remove listener after toast is dismissed
      };

      document.addEventListener("click", handleClick);
    }, 200); // 200ms delay
  };

  const customToastError = (message) => {
    // Show the toast with the message passed as input
    const toastId = toast.error(message, {
      autoClose: false, // Keep the toast open until it's dismissed by the user
      closeOnClick: false, // Prevent closing when clicking the toast itself
    });

    // Add a slight delay before attaching the click event listener
    setTimeout(() => {
      const handleClick = () => {
        toast.dismiss(toastId); // Close the toast
        document.removeEventListener("click", handleClick); // Remove listener after toast is dismissed
      };

      document.addEventListener("click", handleClick);
    }, 200); // 200ms delay
  };

  const [mode, setMode] = React.useState("light");
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [products, setProducts] = React.useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    ownerName: null,
    ownerContact: null,
    approved: false,
    time: Timestamp.now(),
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProduct = async (updatedProduct) => {
    if (
      updatedProduct.title == null ||
      updatedProduct.price == null ||
      updatedProduct.imageUrl == null ||
      updatedProduct.category == null ||
      updatedProduct.description == null
    ) {
      return customToastError("Please fill all the fields");
    }

    // check if number is 10 digits
    if (updatedProduct.ownerContact.length !== 10) {
      return customToastError("Contact number must be 10 digits");
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, { ...updatedProduct });
      getProductsData();
      // empty all fields and navigate to admin page
      setProducts({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        ownerName: null,
        ownerContact: null,
        approved: false,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      setLoading(false);
    } catch (err) {
      customToastError(err.message);
      setLoading(false);
    }
  };

  const [product, setProduct] = React.useState([]);

  const getProductsData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time", "desc"));
      const data = onSnapshot(q, (snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push({ ...doc.data(), id: doc.id });
        });
        setProduct(items);
        setLoading(false);
      });
      return () => data();
    } catch (err) {
      customToastError(err.message);
      setLoading(false);
    }
  };

  // update product data
  const edithandle = (item) => {
    setProducts(item);
  };

  const approveProduct = async (item) => {
    setLoading(true);
    try {
      // keep all values same and change only approved value
      await setDoc(doc(fireDB, "products", item.id), {
        ...item,
        approved: !item.approved,
      });
      {
        item.approved
          ? customToastSuccess("Product disapproved successfully")
          : customToastSuccess("Product approved successfully");
      }
      getProductsData();
      setLoading(false);
    } catch (err) {
      customToastError(err.message);
      setLoading(false);
    }
  };

  const updateProduct = async (updatedProduct) => {
    // Check if product data exists and has an ID
    if (!updatedProduct || !updatedProduct.id) {
      customToastError("Product data is incomplete");
      return;
    }

    // Check for missing fields
    const requiredFields = [
      "title",
      "price",
      "imageUrl",
      "category",
      "description",
      "id",
      "time",
      "date",
      "ownerName",
      "ownerContact",
    ];
    const missingFields = requiredFields.filter(
      (field) => !updatedProduct[field]
    );

    if (missingFields.length > 0) {
      customToastError(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }

    setLoading(true);

    try {
      // Update the product in Firestore
      await setDoc(doc(fireDB, "products", updatedProduct.id), updatedProduct);
      customToastSuccess("Product updated successfully");

      // Refresh product data
      getProductsData();

      customToastSuccess("Product updated successfully");
    } catch (error) {
      customToastError(error.message);
    } finally {
      // Ensure loading is stopped even if there's an error
      setLoading(false);
    }
  };

  // delete product data
  const deleteProduct = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      customToastSuccess("Product deleted successfully");
      getProductsData();
      setLoading(false);
    } catch (error) {
      customToastError(error.message);
      setLoading(false);
    }
  };

  const [order, setOrder] = React.useState([]);
  const getOrderData = async () => {
    setLoading(true);
    try {
      // Use the Firestore query function with collection and orderBy clauses
      const result = await getDocs(
        query(collection(fireDB, "orders"), orderBy("date", "desc"))
      );

      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push({ ...doc.data(), id: doc.id }); // Use 'doc.id' instead of 'doc.uid'
      });

      setOrder(ordersArray);
    } catch (error) {
      console.error("Error fetching orders:", error); // Improved error logging
      customToastError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      // Create a query with the orderBy clause
      const q = query(collection(fireDB, "users"), orderBy("time", "desc"));

      // Fetch the documents using the query
      const result = await getDocs(q);
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
      });

      setUser(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderData();
    getUserData();
    getProductsData();
  }, []);

  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        edithandle,
        updateProduct,
        deleteProduct,
        order,
        user,
        searchkey,
        setSearchkey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
        approveProduct,
        customToastSuccess,
        customToastError,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
