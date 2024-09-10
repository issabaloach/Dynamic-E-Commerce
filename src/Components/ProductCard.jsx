import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

function ProductCard({ item }) {
  const { thumbnail, category, title, price, id } = item;
  const { theme } = useContext(ThemeContext); 

  return (
    <Link
      to={`/products/${id}`}
      className={`lg:w-1/4 md:w-1/2 p-4 w-full shadow ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`} 
    >
      {/* my product card */}
      <div className="">
        <a className="block relative h-48 rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src={thumbnail}
          />
        </a>
        <div className="mt-4">
          <h3
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            } text-xs tracking-widest title-font mb-1`}
          >
            {category}
          </h3>
          <h2 className="title-font text-lg font-medium">
            {title}
          </h2>
          <p className="mt-1">${price}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
