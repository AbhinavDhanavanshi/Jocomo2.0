import React, { useContext } from "react";
import myContext from "../../context/Data/MyContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Track() {
  const context = useContext(myContext);
  const { mode } = context;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 790,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 md:py-5 mx-auto">
          <Slider {...settings}>
            <div className="p-4 flex justify-center">
              <div
                className="border-2 hover:scale-105 transition-transform duration-300 border-gray-200 bg-gray-100 px-4 py-4 rounded-lg flex flex-col items-center"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <svg
                  className="text-blue-500 w-12 h-12 mb-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <h2
                  className="title-font font-medium text-lg text-gray-900"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Your Marketplace
                </h2>
                <p className="leading-relaxed text-sm text-center">
                  Buy-Sell products with your collegemates
                </p>
              </div>
            </div>

            <div className="p-4 flex justify-center">
              <div
                className="border-2 hover:scale-105 transition-transform duration-300 border-gray-200 bg-gray-100 px-4 py-4 rounded-lg flex flex-col items-center"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="text-blue-500 w-12 h-12 mb-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                <h2
                  className="title-font font-medium text-lg text-gray-900"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Sellers
                </h2>
                <p className="leading-relaxed text-sm text-center">
                  Reveal product owner details
                </p>
              </div>
            </div>

            <div className="p-4 flex justify-center">
              <div
                className="border-2 hover:scale-105 transition-transform duration-300 border-gray-200 bg-gray-100 px-4 py-4 rounded-lg flex flex-col items-center"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="text-blue-500 w-12 h-12 mb-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h2
                  className="title-font font-medium text-lg text-gray-900"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Advertisements
                </h2>
                <p className="leading-relaxed text-sm text-center">
                  Run ads to get more buyers
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </section>
    </div>
  );
}

export default Track;
