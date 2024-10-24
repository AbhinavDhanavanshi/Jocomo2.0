import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import myContext from '../../context/Data/MyContext';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/CartSlice';
import { fireDB } from '../../firebase/FirebaseConfig';

function ProductInfo() {
    const context = useContext(myContext);
    const { loading, setLoading, mode } = context;

    const [products, setProducts] = useState('');
    const params = useParams();

    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, 'products', params.id));
            setProducts(productTemp.data());
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const addCart = (products) => {
        dispatch(addToCart(products));
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Dynamic class names based on mode
    const containerClass = mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
    
    return (
        <Layout>
            <section className={`body-font overflow-hidden ${containerClass}`}>
                <div className="container px-5 py-10 mx-auto">
                    {products && (
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <img
                                alt="ecommerce"
                                className="lg:w-1/3 w-full lg:h-auto object-cover object-center rounded"
                                src={products.imageUrl}
                            />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font tracking-widest">JOCOMO</h2>
                                <h1 className="text-3xl title-font font-medium mb-1">{products.title}</h1>
                                <p className="leading-relaxed border-b-2 mb-5 pb-5">
                                    {products.description}
                                </p>

                                <div className="flex">
                                    <span className="title-font font-medium text-2xl">
                                        ₹{products.price}
                                    </span>
                                    <button onClick={() => addCart(products)} className={`flex ml-auto border-0 text-white py-2 px-6 focus:outline-none rounded bg-blue-500 hover:bg-blue-700 hover:scale-105 transition-all ease-in-out 300`}>
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}

export default ProductInfo;
