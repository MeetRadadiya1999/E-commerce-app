import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavbarComponent from "./components/NavbarComponent";
import Products from "./components/Products";
import AddNewProduct from "./components/AddNewProduct";
import EditProduct from "./components/EditProduct";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://e-commerce-app-server-fl98.onrender.com/products");
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Router>
        <NavbarComponent />
        <Routes>
          <Route exact path="/" element={<Products products={products} fetchProducts={fetchProducts}/>} />
          <Route exact path="/new-product" element={<AddNewProduct fetchProducts={fetchProducts}/>} />
          <Route exact path="/edit-product" element={<EditProduct fetchProducts={fetchProducts}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
