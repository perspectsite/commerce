import "tw-elements";
import Header from "./components/header";
import Footer from "./components/footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/screens/home";
import Contact from "./components/screens/contact";
import AllProducts from "./components/screens/allProducts";
import "./main.scss";
import Product from "./components/screens/product";
import About from "./components/screens/about";
import { useEffect, useState } from "react";
import OrderSuccess from "./components/orderSuccess";
import Blogs from "./components/screens/blogs";
import SingleBlog from "./components/screens/blogs/singleBlog";
import NotFound from "./components/screens/NotFound";

function App() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  useEffect(() => {
    if (location.hash) {
      const elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div>
      <Header />
      <div id="page-wrapper" className="mt-18 mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <Home product_categories_json={window.product_categories_json} />
            }
          />
          <Route
            path="/products"
            element={
              <AllProducts
                product_categories_json={window.product_categories_json}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/product/:slug"
            element={
              <Product
                product_categories_json={window.product_categories_json}
              />
            }
          />
          <Route path="/aboutus" element={<About />} />
          <Route path="/checkout/success" element={<OrderSuccess />} />
          <Route path="/checkout/test-success" element={<OrderSuccess />} />
          <Route path="/blogs" element={<Blogs blog_json={window.pages} />} />
          <Route
            path="/blogs/:blog_slug"
            element={<SingleBlog blog_json={window.pages} />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      {location.pathname === "/checkout/test-success" ? null : <Footer />}
      <div
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
        className="p-2 text-center bg-secondary-clr rounded-full h-10 w-10 backTotop z-20"
      >
        <i className="fa-solid fa-angles-up text-white"></i>
      </div>
    </div>
  );
}

export default App;
