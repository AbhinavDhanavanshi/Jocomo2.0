import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { useState, useContext } from "react";
import myContext from "/src/context/Data/MyContext";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const signin = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (result.user.emailVerified) {
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success("Signin Successfully");
        navigate("/");
      } else {
        toast.error("Please verify your email before logging in.");
        await auth.signOut(); // Log the user out if their email is not verified
      }
    } catch (error) {
      toast.error("Signin Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const forgetPassword = async () => {
    if (!email) {
      return toast.error("Please enter your email address");
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error) {
      toast.error("Error sending password reset email: " + error.message);
    }
  };

  // Google Sign-In with Firestore check
  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(fireDB, "users", user.uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        // Add new user if not exists in Firestore
        const userData = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          time: new Date().toLocaleTimeString(),
          timestamp: Timestamp.now(),
        };
        await setDoc(userRef, userData);
      }

      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Google sign-in successful!");
      navigate("/");
    } catch (error) {
      toast.error("Error signing in with Google: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
        <div className="flex flex-col justify-center items-center h-screen">
        {loading && <Loader />}
        <div className="flex flex-col gap-4 bg-gray-800 px-10 py-10 rounded-xl">
            <h1 className="text-center text-white text-xl mb-4 font-bold">Login</h1>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-600 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
            />
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-600 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
            />
            <button
            onClick={signin}
            className="bg-blue-500 w-full text-white font-bold px-2 py-2 rounded-lg hover:bg-blue-600 cursor-pointer hover:scale-105 transform transition duration-75"
            >
            Login
            </button>
            <button
            onClick={signInWithGoogle}
            className="bg-blue-500 w-full text-white font-bold px-2 py-2 rounded-lg  hover:bg-blue-600 cursor-pointer hover:scale-105 transform transition duration-75"
            >
            Sign in with Google
            </button>
            <h2 className="text-white">
            Don't have an account?{" "}
            <span
                className="text-blue-500 font-bold cursor-pointer"
                onClick={() => navigate("/signup")}
            >
                Signup
            </span>
            </h2>
            <span
            className="text-blue-500 font-bold cursor-pointer"
            onClick={() => forgetPassword()}
            >
            Forgot Password
            </span>
        </div>
        </div>
    </Layout>
  );
}

export default Login;
