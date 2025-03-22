import { useState } from 'react';
import { Link } from 'react-router-dom';
import { lenovoTablet, phoneProduct, hp, homepage1, homepage2, eldenringhome, rl } from '../constants'

function Homepage() {
  const images = [eldenringhome, phoneProduct,rl];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const getImageIndex = (offset) => {
    return (currentIndex + offset + images.length) % images.length;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] -mt-5">
        <img className="w-full h-full object-cover" src={hp} alt="laptop" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="text-4xl font-semibold text-white absolute top-[38%] left-1/2 transform -translate-x-1/2 leading-normal md:text-5xl text-center text-gradient pb-2">Technology for you</h1>
      </div>

      <div className="max-w-4xl mx-auto text-center pt-12 px-4">
        <h2 className="text-3xl sm:text-4xl font-semibold text-black">Categories</h2>
        <p className="text-lg sm:text-xl text-[#979797] mt-4">Find comfort, novelty and quality within a vast variety of products directly from our best sellers, shipping available!</p>
        <div className="flex justify-center mt-8">
          <Link to={`/shopAll`} className="block w-full max-w-[300px]">
            <button className="bg-white text-black border-2 border-black text-lg font-semibold py-2 px-8 sm:px-16 rounded w-full">Shop All</button>
          </Link>
        </div>
      </div>

      <div className="mt-12 px-4">
        <div className="flex flex-wrap justify-center mt-8 -mx-4">
          <div className="w-full sm:w-1/2 md:w-1/3 p-4">
            <div className="aspect-w-4 aspect-h-3">
              <img className="w-full h-full object-cover rounded-md" src={homepage1} alt="laptop" />
            </div>
            <div className="text-black text-center text-lg font-bold mt-2">Laptops</div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 p-4">
            <div className="aspect-w-4 aspect-h-3">
              <img className="w-full h-full object-cover rounded-md" src={lenovoTablet} alt="ipad" />
            </div>
            <div className="text-black text-center text-lg font-bold mt-2">Tablets</div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 p-4">
            <div className="aspect-w-4 aspect-h-3">
              <img className="w-full h-full object-cover rounded-md" src={homepage2} alt="phone" />
            </div>
            <div className="text-black text-center text-lg font-bold mt-2">Phones</div>
          </div>
        </div>
      </div>

      <hr className="border-t-2 border-gray-500 mt-12"></hr>


      <div className="mt-12 relative mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl font-semibold text-black text-center mb-8">New Products</h2>
        <div className="relative max-w-7xl mx-auto mt-5">
          <div className="w-full overflow-hidden">
            <div className="flex items-center justify-center space-x-8 rounded-md">
              {[0].map((offset) => (
                <div key={offset} className="w-72 h-72 sm:w-96 sm:h-96 flex-shrink-0 transition-all duration-300 lg:hidden">
                  <img 
                    className="w-full h-full object-cover rounded-lg" 
                    src={images[getImageIndex(offset)]} 
                    alt={`Product ${getImageIndex(offset) + 1}`} 
                  />
                </div>
              ))}
              {[-1, 0, 1].map((offset) => (
                <div key={offset} className={`w-72 h-72 lg:w-96 lg:h-96 flex-shrink-0 transition-all duration-300 hidden lg:block ${offset === 0 ? 'scale-120 z-10' : 'scale-75 opacity-60'}`}>
                  <img 
                    className="w-full h-full object-cover rounded-lg" 
                    src={images[getImageIndex(offset)]} 
                    alt={`Product ${getImageIndex(offset) + 1}`} 
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            id="prev"
            className="absolute top-1/2 left-0 lg:-left-8 transform -translate-y-1/2 text-black p-4 rounded-full text-2xl sm:text-4xl hover:bg-opacity-100 transition-all duration-200"
            onClick={handlePrev}
          >
            &#10094;
          </button>

          <button
            id="next"
            className="absolute top-1/2 right-0 lg:-right-8 transform -translate-y-1/2 text-black p-4 rounded-full text-2xl sm:text-4xl hover:bg-opacity-100 transition-all duration-200"
            onClick={handleNext}
          >
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;