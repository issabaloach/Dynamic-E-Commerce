import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import ThemeContextProvider from "./Context/ThemeContext";
import Homepage from './Pages/Home';


function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;