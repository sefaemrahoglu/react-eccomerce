import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Products from "./pages/products/Products";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import Product from "./pages/product/product";
import Profile from "./pages/profile/Profile";
import Admin from "./pages/admin/Admin";
import Basket from "./pages/basket/Basket";
import Error404 from './pages/error/error404'

import PrivateRoute from "./pages/PrivateRoute";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div id="content">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/product/:product_id" element={<Product />} />
          <Route path="/profile" element={<PrivateRoute component={Profile}/>} />
          <Route path="/admin/*" element={<PrivateRoute component={Admin} admin={true}/>} />
          <Route path="*" element={<Error404 />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
