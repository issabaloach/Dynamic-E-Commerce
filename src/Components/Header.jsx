import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import Button from "./Button";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  if (typeof theme === "undefined" || typeof toggleTheme === "undefined") {
    console.error(
      "ThemeContext is undefined. Ensure ThemeContextProvider is wrapping the component tree."
    );
    return null;
  }

  return (
    <header
      className={`text-gray-600 body-font ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
      }`}
    >
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <a
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span
            className={`${
              theme === "light" ? "text-gray-600" : "text-white"
            } text-xl`}
          >
            Shop App
          </span>
        </a>

        <div className="flex items-center">
          <nav className="md:ml-auto flex flex-wrap gap-3 items-center text-base justify-center">
          <Button
            href="./pages/Home"
            label={"Home"}
            borderColor={theme === "light" ? "border-blue-600" : "border-white"}
            txtColor={theme === "light" ? "text-gray-600" : "text-white"}
          />
            <Button
            label={"About"}
            borderColor={theme === "light" ? "border-blue-600" : "border-white"}
            txtColor={theme === "light" ? "text-gray-600" : "text-white"}
          />
            <Button
            label={"Contact"}
            borderColor={theme === "light" ? "border-blue-600" : "border-white"}
            txtColor={theme === "light" ? "text-gray-600" : "text-white"}
          />
            <Button
            onClick={toggleTheme}
            label={theme === "light" ? "Dark Mode" : "Light Mode"}
            borderColor={theme === "light" ? "border-blue-600" : "border-white"}
            txtColor={theme === "light" ? "text-gray-600" : "text-white"}
          />
          </nav>

        
        </div>
      </div>
    </header>
  );
}

export default Header;
