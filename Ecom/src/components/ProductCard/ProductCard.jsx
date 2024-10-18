import React, { useContext, useEffect } from 'react';
import myContext from '../../context/Data/MyContext';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/CartSlice';

function ProductCard() {
    const context = useContext(myContext);
    const { mode, product, searchkey, filterType, filterPrice } = context;

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const addCart = (product) => {
        const { ownerName, ownerContact, ...safeProduct } = product;
        
        dispatch(addToCart(safeProduct));
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10 group">
                    <h1 
                        className="sm:text-2xl text-xl font-medium title-font mb-2 text-gray-900" 
                        style={{ color: mode === 'dark' ? 'white' : '' }}
                    >
                        Our Latest Collection
                    </h1>
                    <div className="h-1 w-20 bg-blue-500 rounded transition-all duration-300 group-hover:w-1/2"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
                    {product
                        .filter((obj) => obj.title.toLowerCase().includes(searchkey.toLowerCase()))
                        .filter((obj) => filterType === '' || obj.category.toLowerCase() === filterType.toLowerCase())
                        .filter((obj) => filterPrice === '' || obj.price <= parseInt(filterPrice, 10))
                        .map((item, index) => {
                            const { title, price, imageUrl, approved } = item;
                            if (!approved) return null;
                            return (
                                <div className="p-2" key={index}> 
                                    <div
                                        className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                                        style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}
                                    >
                                        <div
                                            onClick={() => window.location.href = `/productinfo/${item.id}`}
                                            className="flex justify-center cursor-pointer"
                                        >
                                            <img
                                                className="rounded-2xl w-full h-52 p-2 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                                src={imageUrl}
                                                alt="product"
                                                style={{ objectFit: 'cover' }}  
                                            />
                                        </div>
                                        <div className="p-4 border-t-2">
                                            <h2
                                                className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}
                                            >
                                                JOCOMO
                                            </h2>
                                            <h1
                                                className="title-font text-sm font-medium text-gray-900 mb-2 overflow-hidden text-ellipsis whitespace-nowrap" // Added overflow styles
                                                style={{ color: mode === 'dark' ? 'white' : '' }}
                                            >
                                                {title}
                                            </h1>
                                            <p
                                                className="leading-relaxed text-sm mb-2"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}
                                            >
                                                ₹ {price}
                                            </p>
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => addCart(item)}
                                                    type="button"
                                                    className="focus:outline-none text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
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
    );
}

export default ProductCard;
