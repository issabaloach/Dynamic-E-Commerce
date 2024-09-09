import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import Button from "./Button";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  if (typeof theme === 'undefined' || typeof toggleTheme === 'undefined') {
    console.error('ThemeContext is undefined. Ensure ThemeContextProvider is wrapping the component tree.');
    return null;
  }

  return (
    <header className={`text-gray-600 body-font ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className={`${theme === "light" ? "text-gray-600" : "text-white"} text-xl`}>Shop App</span>
        </a>

        <div className="flex items-center">
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a href="/" className={`mr-5 hover:text-gray-900 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Home</a>
            <a href="/about" className={`mr-5 hover:text-gray-900 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>About</a>
            <a href="/contact" className={`mr-5 hover:text-gray-900 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Contact</a>
          </nav>

          <Button
            onClick={toggleTheme}
            label={theme === "light" ? "Dark Mode" : "Light Mode"}
            borderColor={theme === "light" ? "border-gray-600" : "border-white"}
            txtColor={theme === "light" ? "text-gray-600" : "text-white"}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;