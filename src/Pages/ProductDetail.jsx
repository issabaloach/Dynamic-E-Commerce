import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setNotFound(false);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setNotFound(true);
        setLoading(false);
        console.log(err);
      });
  }, [id]);

  const themeStyles = {
    light: {
      background: "bg-white",
      text: "text-gray-600",
      heading: "text-gray-900",
      border: "border-gray-200",
    },
    dark: {
      background: "bg-gray-800",
      text: "text-gray-300",
      heading: "text-white",
      border: "border-gray-700",
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className={`container mx-auto ${currentTheme.background}`}>
      {loading ? (
        <h1 className={`text-center text-2xl ${currentTheme.text}`}>Loading....</h1>
      ) : notFound ? (
        <h1 className={`text-center text-2xl ${currentTheme.text}`}>Product Not Found</h1>
      ) : (
        <section className={`${currentTheme.text} body-font overflow-hidden`}>
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h2 className={`text-sm title-font ${currentTheme.text} tracking-widest`}>
                  {product.category}
                </h2>
                <h1 className={`${currentTheme.heading} text-3xl title-font font-medium mb-4`}>
                  {product.title}
                </h1>
                <div className="flex mb-4">
                  <a className={`flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1`}>
                    Description
                  </a>
                  <a className={`flex-grow border-b-2 ${currentTheme.border} py-2 text-lg px-1`}>
                    Reviews
                  </a>
                  <a className={`flex-grow border-b-2 ${currentTheme.border} py-2 text-lg px-1`}>
                    Details
                  </a>
                </div>
                <p className="leading-relaxed mb-4">
                  {product.description}
                </p>
                <div className={`flex border-t ${currentTheme.border} py-2`}>
                  <span className={currentTheme.text}>Color</span>
                  <span className={`ml-auto ${currentTheme.heading}`}>Blue</span>
                </div>
                <div className={`flex border-t ${currentTheme.border} py-2`}>
                  <span className={currentTheme.text}>Size</span>
                  <span className={`ml-auto ${currentTheme.heading}`}>Medium</span>
                </div>
                <div className={`flex border-t border-b mb-6 ${currentTheme.border} py-2`}>
                  <span className={currentTheme.text}>Quantity</span>
                  <span className={`ml-auto ${currentTheme.heading}`}>4</span>
                </div>
                <div className="flex">
                  <span className={`title-font font-medium text-2xl ${currentTheme.heading}`}>
                    ${product.price}
                  </span>
                  <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Add to Cart
                  </button>
                  <button className={`rounded-full w-10 h-10 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} p-0 border-0 inline-flex items-center justify-center ${currentTheme.text} ml-4`}>
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={product.thumbnail}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;