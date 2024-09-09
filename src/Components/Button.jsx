import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

function Button({ label, borderColor, txtColor, onClick }) {
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme || 'light';

  return (
    <button
      onClick={onClick}
      className={`border px-4 py-2 rounded-full transition-colors duration-300 ${
        currentTheme === 'light'
          ? 'bg-white hover:bg-gray-200 text-gray-600 hover:text-gray-800'
          : 'bg-gray-700 hover:bg-gray-600 text-white hover:text-white'
      } ${borderColor || 'border-gray-400'} ${txtColor || 'text-gray-600'}`}
    >
      {label}
    </button>
  );
}

export default Button;