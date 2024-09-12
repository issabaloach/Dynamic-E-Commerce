import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/utils";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (typeof theme === "undefined" || typeof toggleTheme === "undefined") {
    console.error(
      "ThemeContext is undefined. Ensure ThemeContextProvider is wrapping the component tree."
    );
    return null;
  }

  const isLoggedIn = user?.isLogin;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser({ isLogin: false, userInfo: {} });
      navigate('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header
      className={`shadow-full ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-600"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-5">
        <Link to="/" className="flex items-center">
          <span className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
            Shop App
          </span>
        </Link>

        <nav className="flex items-center space-x-4 rounded-full">
          <NavLink to="/" label="Home" />
          <NavLink to="/about" label="About" />
          <NavLink to="/contact" label="Contact" />

          {isLoggedIn ? (
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  src={user.userInfo.photoURL}
                  size="md"
                  className="cursor-pointer"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu">
                <DropdownItem key="profile">Profile</DropdownItem>
                <DropdownItem key="settings">Settings</DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={handleSignOut}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <NavLink to="/login" label="Login" />
              <NavLink to="/signup" label="Sign Up" />
            </>
          )}

          <Button
            onClick={toggleTheme}
            label={theme === "light" ? "Dark" : "Light"}
            borderColor={theme === "light" ? "border-blue-600" : "border-white"}
            txtColor={theme === "light" ? "text-gray-600" : "text-white"}
          />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, label }) {
  const { theme } = useContext(ThemeContext);
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        theme === "dark"
          ? "text-gray-300 hover:bg-gray-700 hover:text-white"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {label}
    </Link>
  );
}

export default Header;