import React, { useContext, useState, useEffect } from "react";
import myContext from "../../context/Data/MyContext";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/modal/Modal"; // Import Modal component
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../redux/CartSlice";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

function Cart() {
  const context = useContext(myContext);
  const { mode, customToastSuccess, customToastError } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    customToastSuccess("Product removed from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [ownerDetails, setOwnerDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    let total = 0;
    cartItems.forEach((cartItem) => {
      total += parseInt(cartItem.price);
    });
    setTotalAmount(total);
  }, [cartItems]);

  const Reveal = 5 * cartItems.length;
  const grandTotal = totalAmount + Reveal;

  const saveOrderDetails = async (orderData) => {
    try {
      const orderDocRef = doc(fireDB, "orders", orderData.orderId); // Unique order ID
      await setDoc(orderDocRef, orderData);
      customToastSuccess("Order details saved successfully!");
    } catch (error) {
      console.error("Error saving order details: ", error);
      customToastError("Failed to save order details.");
    }
  };

  const buyNow = async () => {
    if (isNaN(phoneNumber) || phoneNumber.length !== 10) {
      return customToastError("Please enter a valid phone number");
    }

    const userDetails = JSON.parse(localStorage.getItem("user"));
    if (!userDetails) {
      return customToastError("Please login to continue");
    }

    const orderData = {
      userId: userDetails.uid,
      name: userDetails.name,
      email: userDetails.email,
      phoneNumber,
      cartItems,
      totalAmount,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      timestamp: Timestamp.now(),
    };

    orderData.orderId = `${userDetails.uid}-${Date.now()}`; // Unique order ID

    try {
      const newOwnerDetails = {};
      for (const cartItem of cartItems) {
        const productDocRef = doc(fireDB, "products", cartItem.id);
        const productSnapshot = await getDoc(productDocRef);

        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          const ownerName = productData.ownerName;
          const ownerContact = productData.ownerContact;

          newOwnerDetails[cartItem.id] = { ownerName, ownerContact };
        } else {
          customToastError(`Product details not found for ${cartItem.title}`);
        }
      }

      setOwnerDetails(newOwnerDetails);
      setShowModal(true); // Show modal when owner details are fetched

      await saveOrderDetails(orderData); // Save order details here
    } catch (error) {
      console.error("Error during buy now process: ", error);
      customToastError("Error during the buy now process");
    }
  };

  return (
    <Layout>
      <div
        className="min-h-screen bg-gray-100 pt-5 pb-20"
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((item, index) => {
              const { id, title, price, description, category, imageUrl } =
                item;
              const ownerDetail = ownerDetails[id];
              return (
                <div
                  key={id}
                  className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2
                        className="text-lg font-bold text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {title}
                      </h2>
                      <h2
                        className="text-sm text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {description}
                      </h2>
                      <p
                        className="mt-1 text-xs font-semibold text-gray-700"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        ₹{price}
                      </p>
                      {ownerDetail && (
                        <div className="mt-2">
                          <p
                            className="text-xs font-semibold text-gray-700"
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            Owner: {ownerDetail.ownerName}
                          </p>
                          <p
                            className="text-xs font-semibold text-gray-700"
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            Contact: {ownerDetail.ownerContact}
                          </p>
                        </div>
                      )}
                    </div>
                    <div
                      onClick={() => deleteCart(item)}
                      className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 hover:cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
            style={{
              backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <div className="mb-2 flex justify-between">
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total Amount
              </p>
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                ₹{totalAmount}
              </p>
            </div>
            <div className="mb-2 flex justify-between">
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Reveal Charges
              </p>
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                FREE
              </p>
            </div>
            <hr className="border border-gray-300" />
            <div className="mt-2 flex justify-between">
              <p
                className="font-bold text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Grand Total
              </p>
              <p
                className="font-bold text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                ₹{totalAmount}
              </p>
            </div>
            <Modal
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              showModal={showModal}
              setShowModal={setShowModal}
              buyNow={buyNow}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
