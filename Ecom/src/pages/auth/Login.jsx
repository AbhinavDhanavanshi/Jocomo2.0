import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; 
import { auth, fireDB } from '../../firebase/firebaseConfig'; // Import Firestore database (adjust path accordingly)
import { doc, setDoc, Timestamp } from 'firebase/firestore'; // Import Firestore functions
import { useState, useContext } from 'react';
import myContext from '/src/context/Data/MyContext';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { useNavigate, Link } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const signin = async () => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('user', JSON.stringify(result));
            toast.success('Signin Successfully');
            navigate('/');
            setLoading(false);
        } catch (error) {
            toast.error('Signin Failed');
            setLoading(false);
        }
    };

    // Google Sign-In
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
      
          // Check if user exists in Firestore by checking their uid
          const userRef = doc(fireDB, "users", user.uid);
      
          // Create user data
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
      
          // Add or update user document in the Firestore 'users' collection
          await setDoc(userRef, userData, { merge: true });
          localStorage.setItem("user", JSON.stringify(userData));
      
          // Optionally: Show success toast or navigate to another page
          toast.success("Google sign-in successful!");
            navigate("/");
      
        } catch (error) {
          console.error("Error signing in with Google: ", error);
          toast.error(error.message); // Show error to the user
        }
      };

    return (
        <div className="flex justify-center items-center h-screen">
            {loading && <Loader />}
            <div className="bg-gray-800 px-10 py-10 rounded-xl">
                <div>
                <h1 className="text-center text-white text-xl mb-4 font-bold">Login</h1>
                </div>
                <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                    placeholder="Email"
                />
                </div>
                <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                    placeholder="Password"
                />
                </div>
                <div className="flex justify-center mb-3">
                <button
                    onClick={signin}
                    className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
                >
                    Login
                </button>
                </div>

                {/* Google Sign-in Button */}
                <div className="flex justify-center mb-3">
                <button
                    onClick={signInWithGoogle}
                    className="bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg"
                >
                    Sign in with Google
                </button>
                </div>

                <div>
                <h2 className="text-white">
                    Don't have an account?{' '}
                    <Link className="text-yellow-500 font-bold" to="/signup">
                    Signup
                    </Link>
                </h2>
                </div>
            </div>
        </div>
    );
}

export default Login;
