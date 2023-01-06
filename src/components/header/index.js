import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext, UserDispatchContext } from "../context/userProvider";
import "./styles.scss";
import { loadStripe } from "@stripe/stripe-js";

const Header = () => {
  const [sticky, setSticky] = useState("");
  const location = useLocation();
  const pathName = location.pathname;
  const cart = useContext(UserContext);
  const setCart = useContext(UserDispatchContext);
  const [stateChange, setStateChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 10 ? "is-sticky" : "";
    setSticky(stickyClass);
  };

  function getProductsInCartToCheckout() {
    var checkoutOrder = [];
    var productsInCart = JSON.parse(localStorage.getItem("cartProducts-live"));

    for (var key in productsInCart) {
      var item = {};
      item["stripe_product_id"] = key;
      item["quantity"] = productsInCart[key]["count"];
      checkoutOrder.push(item);
    }
    return checkoutOrder;
  }
  async function checkout() {
    setIsLoading(true);
    let sk = "";
    const perspect = window.perspect;
    if (perspect.site_env === "test") {
      sk = perspect.spkt;
    } else {
      sk = perspect.spkl;
    }

    let said = perspect.said;
    var stripe = await loadStripe(sk, {
      stripeAccount: said,
    });

    const headers = new Headers({
      "content-type": "application/json",
    });

    fetch("/checkout", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ products: getProductsInCartToCheckout() }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (session) {
        if (session.id) {
          setIsLoading(false);
        }
        return stripe.redirectToCheckout({ sessionId: session.id });
      })
      .then(function (result) {
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        console.error("Error:", error);
      });
  }

  const handleQuantity = (type, productStripeId) => {
    let cartProducts = cart;
    if (Object.keys(cartProducts).includes(productStripeId)) {
      const currentProduct = cartProducts[productStripeId];
      const count = cartProducts[productStripeId].count;
      if (type === "increment") {
        cartProducts = {
          ...cartProducts,
          [productStripeId]: {
            ...currentProduct,
            count: count + 1,
          },
        };
      } else {
        let updatedCount = count - 1;
        if (updatedCount === 0) {
          delete cartProducts[productStripeId];
        } else {
          cartProducts = {
            ...cartProducts,
            [productStripeId]: {
              ...currentProduct,
              count: count - 1,
            },
          };
        }
      }
    }
    localStorage.setItem("cartProducts-live", JSON.stringify(cartProducts));
    setCart(cartProducts);
    setStateChange(!stateChange);
  };

  const handleRemoveProduct = (productStripeId) => {
    const cartProducts = cart;
    delete cartProducts[productStripeId];
    if (Object.keys(cartProducts).length === 0) {
      localStorage.removeItem("cartProducts-live");
    } else {
      localStorage.setItem("cartProducts-live", JSON.stringify(cartProducts));
    }
    setCart(cartProducts);
    setStateChange(!stateChange);
  };

  const getSubTotal = () => {
    let subTotal = 0,
      total = 0;
    for (const key in cart) {
      if (Object.hasOwnProperty.call(cart, key)) {
        const count = cart[key].count;
        const productPrice = cart[key].productPrice;
        subTotal = subTotal + productPrice * count;
      }
    }
    total = subTotal;
    return { subTotal, total };
  };

  const classes = `page-navbar navbar bg-white py-0 ${sticky}`;

  const getQuantity = () => {
    let quantity = 0;
    for (const key in cart) {
      if (Object.hasOwnProperty.call(cart, key)) {
        const count = cart[key].count;
        quantity = quantity + count;
      }
    }
    return quantity;
  };

  return (
    <div className="header-content">
      <header>
        {location.pathname === "/checkout/test-success" ? null : (
          <div className="text-center top-nav-alert bg-secondary-clr py-3 text-white">
            <p>Free shipping on all orders!</p>
          </div>
        )}
        <nav className={classes}>
          <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
            <button
              className="navbar-toggler mobile-view-btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent1"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fa-solid fa-bars-staggered"></i>
            </button>
            <Link to="/" className="text-xl pr-2">
              <img
                src="/commerce/static/images/logo.jpg"
                alt="Example Co, Inc"
                className="h-20"
              />
            </Link>
            {location.pathname === "/checkout/test-success" ? null : (
              <div
                className="collapse navbar-collapse flex-grow items-center"
                id="navbarSupportedContent1"
              >
                <ul className="navbar-nav flex flex-col pl-0 list-style-none mx-auto">
                  <li className="nav-item p-2">
                    <Link
                      to="/"
                      className={`nav-link nav-menu ${
                        pathName === "/" ? "active" : ""
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item p-2">
                    <Link
                      to="/products"
                      className={`nav-link nav-menu ${
                        pathName === "/products" ||
                        pathName.includes("/product")
                          ? "active"
                          : ""
                      }`}
                    >
                      Products
                    </Link>
                  </li>
                  <li className="nav-item p-2">
                    <Link
                      to="/aboutus"
                      className={`nav-link nav-menu ${
                        pathName === "/aboutus" ? "active" : ""
                      }`}
                    >
                      About
                    </Link>
                  </li>
                  {/* <li className="nav-item p-2">
                    <Link
                      to="/blogs"
                      className={`nav-link nav-menu ${
                        pathName === "/blogs" || pathName.includes("/blogs")
                          ? "active"
                          : ""
                      }`}
                    >
                      Blog
                    </Link>
                  </li> */}
                  {/* <li className="nav-item p-2">
                    <Link
                      to="/"
                      className={`nav-link nav-menu ${
                        pathName === "Contact" ? "active" : ""
                      }`}
                    >
                      Contact
                    </Link>
                  </li> */}
                </ul>
              </div>
            )}

            <div
              className="flex-container mr-3 relative cursor-pointer"
              data-bs-toggle="modal"
              data-bs-target="#CartModal"
            >
              <div className="relative h-cart mr-2">
                <i className="fa-solid fa-cart-arrow-down text-lg"></i>
                {Object.keys(cart).length ? (
                  <span className="cart-notification bg-primary-clr flex-container">
                    {getQuantity()}
                  </span>
                ) : null}
              </div>
              <span className="mr-2 font-bold">Cart</span>
            </div>
          </div>
        </nav>
      </header>

      {/* Cart view Modal */}
      <div
        className="modal fade"
        id="CartModal"
        aria-labelledby="CartModalTitle"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close ml-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="font-semibold text-lg">Cart</div>
              <p className="item-pricing">{getQuantity()} Item(s)</p>
            </div>
            <div className="modal-body bg-white relative p-4 pt-2">
              {!!Object.keys(cart).length &&
                Object.keys(cart).map((key, index) => {
                  const product = cart[key];
                  return (
                    <div key={index} className="border-b">
                      <div className="flex justify-between pt-4 pb-2">
                        <div className="flex items-center">
                          <img
                            src={`https://${product.productImage}`}
                            className="img-fluid w-14 h-14 mr-3"
                            alt=""
                          />
                          <div>
                            <p>{product.product}</p>
                          </div>
                        </div>
                        <div>
                          <i
                            onClick={() => handleRemoveProduct(key)}
                            className="fa-solid fa-xmark cursor-pointer"
                          ></i>
                        </div>
                      </div>
                      <div className="flex-container justify-between pt-3 pb-5 item-pricing">
                        <p>${product.productPrice}</p>
                        <div className="quantity flex-container h-8">
                          <button
                            type="button"
                            className="mr-1"
                            aria-hidden="true"
                            onClick={() => handleQuantity("decrement", key)}
                          >
                            &minus;
                          </button>
                          <span className="flex items-center justify-center input-style item-quantity">
                            {product.count}
                          </span>
                          <button
                            type="button"
                            className="ml-1"
                            aria-hidden="true"
                            onClick={() => handleQuantity("increment", key)}
                          >
                            &#x2b;
                          </button>
                        </div>
                        <p>
                          $
                          {parseInt(product.productPrice) *
                            parseInt(product.count)}
                        </p>
                      </div>
                    </div>
                  );
                })}

              <div className="mt-12">
                <div className="flex justify-between mt-5 border-b py-2">
                  <p>Subtotal</p>
                  <p className="item-pricing">${getSubTotal().subTotal}</p>
                </div>
                <div className="flex justify-between py-2">
                  <p>Total</p>
                  <p className="item-pricing">${getSubTotal().total}</p>
                </div>
                {!!Object.keys(cart).length && (
                  <div className="text-right mt-6">
                    <button
                      disabled={isLoading}
                      type="button"
                      className="site-btn"
                      onClick={() => checkout()}
                    >
                      Checkout
                      {!!isLoading && (
                        <i className="fas fa-circle-notch ml-2 animate-spin"></i>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
