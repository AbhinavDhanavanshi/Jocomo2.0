import React, { useContext } from 'react';
import myContext from '../../context/Data/MyContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AbhinavImg = './Customers/Abhinav.png';

function Testimonial() {
    const context = useContext(myContext);
    const { mode } = context;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 3, // Default: 3 testimonials
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2, // Show 2 testimonials for medium screens
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1, // Show 1 testimonial for small screens
                },
            },
        ],
    };

    return (
        <div className='m-8'>
            <section className="text-gray-600 body-font mb-10">
                <div className="container px-2 py-10 mx-auto text-center">
                    <h1 className="text-3xl font-bold text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>Testimonial</h1>
                    <h2 className="text-2xl font-semibold mb-10" style={{ color: mode === 'dark' ? 'white' : '' }}>What our <span className="text-blue-500">customers</span> are saying</h2>
                    <Slider {...settings}>                        
                        <div className="flex flex-col items-center" style={{ width: '300px'}}>
                            <div className="h-full text-center group mx-8">
                                {/* <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100 mx-auto" src={AbhinavImg}/> */}
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed">
                                    I have been using this platform for a while now and I am very happy with the service. The platform is very easy to use . My experience with this platform has been great. I would recommend this platform to my friends.
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4 transition-all duration-300 transform group-hover:w-full" />
                                <h2 style={{ color: mode === 'dark' ? '#3B82F6' : '' }} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Abhinav Swami</h2>
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="text-gray-500">Btech 3rd Year IITJ</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center" style={{ width: '300px' }}>
                            <div className="h-full text-center group mx-8">
                                {/* <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100 mx-auto" src="https://cdn-icons-png.flaticon.com/128/2763/2763444.png" /> */}
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed">
                                    I liked the concept of the platform and the way it is designed. It is very easy to use and user-friendly. I would recommend this platform to my friends. I am very happy with the service. Thank you.   
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4 transition-all duration-300 transform group-hover:w-full" />
                                <h2 style={{ color: mode === 'dark' ? '#3B82F6' : '' }} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Alok Godara</h2>
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="text-gray-500">Student at IIT Jodhpur</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center" style={{ width: '300px' }}>
                            <div className="h-full text-center group mx-8">
                                {/* <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100 mx-auto" src="https://webknudocs.vercel.app/logo/react.png" /> */}
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed">
                                    Previously students depended on the telegram channel for trading products but this platform has made it very easy for students to buy and sell products. I myself have put up my products for sale on this platform.
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4 transition-all duration-300 transform group-hover:w-full" />
                                <h2 style={{ color: mode === 'dark' ? '#3B82F6' : '' }} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Palash Khatod</h2>
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="text-gray-500">Student IIT Jodhpur</p>
                            </div>
                        </div>
                    </Slider>
                </div>
            </section>
        </div>
    );
}

export default Testimonial;
