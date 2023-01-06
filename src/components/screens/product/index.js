import "./styles.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserDispatchContext } from "../../context/userProvider";

const Product = ({ product_categories_json }) => {
  const navigate = useNavigate();
  // const { cat_id, id } = useParams();
  const { slug } = useParams();
  const [singleProductData, setSingleProductData] = useState();
  const setCart = useContext(UserDispatchContext);
  const [quantity, setQuantity] = useState(1);
  const [buttonState, setButtonState] = useState();
  const [buttonText, setButtonText] = useState();

  useEffect(() => {
    if (product_categories_json && slug) {
      const currentProduct = product_categories_json[0].products.filter(
        (ct) => ct.slug === slug
      );
      if (currentProduct) {
        setSingleProductData(currentProduct);
        if (currentProduct[0].quantity_available === 0) {
          setButtonState("disabled");
          setButtonText("SOLD OUT");
        } else {
          setButtonState("");
          setButtonText("ADD TO CART");
        }
      } else {
        redirectToAllProducts();
      }
    } else {
      redirectToAllProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product_categories_json, slug]);

  const redirectToAllProducts = () => {
    navigate("/products");
  };

  const perspect = window.perspect;
  const getStripeProductId = (product) => {
    let stripeProductId;
    if (perspect.site_env === "test") {
      stripeProductId = product.stripe_product_id_test;
    } else {
      stripeProductId = product.stripe_product_id_live;
    }
    return stripeProductId;
  };

  const regex = /(<([^>]+)>)/gi;

  const addProductToCart = (
    productStripeId,
    productName,
    productPrice,
    productImage,
    count
  ) => {
    let cartProducts =
      JSON.parse(localStorage.getItem("cartProducts-live")) || {};

    if (Object.keys(cartProducts).includes(productStripeId)) {
      const currentCount = cartProducts[productStripeId].count;
      const currentProduct = cartProducts[productStripeId];
      cartProducts = {
        ...cartProducts,
        [productStripeId]: {
          ...currentProduct,
          count: currentCount + count,
        },
      };
    } else {
      cartProducts = {
        ...cartProducts,
        [productStripeId]: {
          count: count,
          product: productName,
          productPrice,
          productImage,
        },
      };
    }
    localStorage.setItem("cartProducts-live", JSON.stringify(cartProducts));
    setCart(cartProducts);
  };

  return (
    <div className="pt-20 pb-6 my-10 product-page">
      <div className="container mx-auto mt-18">
        <div className="grid lg:grid-cols-2 mg:grid-cols-2 sm:grid-cols-1 box-gap">
          <section>
            <div className="container mx-auto product-cards lg:px-10">
              <div className="product-box">
                <div className="relative">
                  <div
                    id="product"
                    className="carousel slide carousel-fade relative"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner relative w-full overflow-hidden">
                      {singleProductData &&
                        singleProductData.map((items) =>
                          items.media.map((productImg, idx) => (
                            <div
                              key={idx}
                              className={`${
                                idx === 0
                                  ? "carousel-item active relative float-left w-full"
                                  : "carousel-item"
                              } `}
                            >
                              <img
                                src={`https://${productImg.link}`}
                                className="img-fluid w-100"
                                alt=""
                              />
                            </div>
                          ))
                        )}
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#product"
                        data-bs-slide="prev"
                      >
                        <span
                          // className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#product"
                        data-bs-slide="next"
                      >
                        <span
                          // className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>

                    {/* <div className="carousel-indicators right-0 bottom-0 left-0 flex justify-center p-0 mb-4 mt-8">
                      {singleProductData &&
                        singleProductData.map((items) =>
                          items.media.map((productImg, idx) =>
                            idx <= 8 ? (
                              <button
                                key={idx}
                                type="button"
                                data-bs-target="#product"
                                data-bs-slide-to={idx}
                                className={`${idx === 0 ? "active" : ""}`}
                                aria-current="true"
                                aria-label={`Slide ${idx + 1}`}
                              >
                                <img
                                  src={`https://${productImg.link}`}
                                  className="img-fluid w-20"
                                  alt=""
                                />
                              </button>
                            ) : (
                              ""
                            )
                          )
                        )}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {singleProductData &&
            singleProductData.map((items, idx) => (
              <div key={idx} className="pl-5">
                <h2 className="mb-2 text-[2rem]">{items.product}</h2>
                <div className="border-b py-2">
                  <span className="pricing font-light">${items.price}</span>
                </div>
                <div className="flex-container mt-3">
                  <p className="mr-2 font-semibold">QUANTITY</p>
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    min="1"
                    className="w-16 input-style"
                  />
                </div>
                <div className="mt-8 mb-5">
                  <button
                    type="button"
                    disabled={buttonState}
                    className="site-btn mr-3 w-60"
                    onClick={() =>
                      addProductToCart(
                        getStripeProductId(items),
                        items.product,
                        items.price,
                        items.media[0].link,
                        parseInt(quantity)
                      )
                    }
                  >
                    {buttonText}
                  </button>
                </div>
                <div className="border-t py-4">
                  {/* <h6 className="mb-3">VIEW STORE INFORMATION</h6> */}
                  <p className="mb-3">{items.description.replace(regex, "")}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
