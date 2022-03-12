import { Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import { Box } from "@chakra-ui/react";

import AdminHome from "./home/home";
import AdminOrders from "./orders/Orders";
import AdminProducts from "./products/products";
import NewProduct from "./new-product/NewProduct";
import AdminProductDetail from "./product-detail/ProductDetail";

function Admin(params) {
  return (
    <>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to="/admin">Admin Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
          <li>
            <Link to="/admin/new-product">Add Product</Link>
          </li>
        </ul>
      </nav>
      <Box mt="10">
        <Routes>
          <Route exact path="/" element={<AdminHome />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/products/:product_id" element={<AdminProductDetail />} />
          <Route path="/new-product" element={<NewProduct />} />
        </Routes>
      </Box>
    </>
  );
}
export default Admin;
