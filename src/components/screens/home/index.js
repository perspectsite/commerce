import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserDispatchContext } from "../../context/userProvider";
import "./styles.scss";

const Home = ({ product_categories_json }) => {
  // const navigate = useNavigate();
  const setCart = useContext(UserDispatchContext);
  const [singleProductData, setSingleProductData] = useState({});
  const [quantity, setQuantity] = useState(1);

  // const goToAllProducts = (category_id) => {
  //   navigate("/products", { state: { category_id } });
  // };

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

  const handleCloseModal = () => {
    setSingleProductData({});
    setQuantity(1);
  };

  const ProductsView = ({ product, category }) => {
    return (
      <div className="product-box" key={product.product_id}>
        <Link to={`/product/${product.slug}`}>
          <div className="relative">
            <div
              id={product.slug + "-" + category.category}
              className="carousel slide carousel-fade relative"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner relative w-full overflow-hidden">
                {product.media.map((itemImg, idx) => (
                  <div
                    key={idx}
                    className={`carousel-item ${idx === 0 ? "active" : ""}`}
                  >
                    <img
                      src={`https://${itemImg.link}`}
                      className="img-fluid w-100"
                      alt=""
                    />
                  </div>
                ))}

                {product.media.length > 1 ? (
                  <>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#${
                        product.slug + "-" + category.category
                      }`}
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
                      data-bs-target={`#${
                        product.slug + "-" + category.category
                      }`}
                      data-bs-slide="next"
                    >
                      <span
                        // className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </Link>

        <div className="product-content px-0">
          <div className="w-full flex items-start justify-between my-4 product-card">
            <Link to={`/product/${product.slug}`}>
              <h6 className="mb-0">{product.product}</h6>
            </Link>
            <span className="pricing font-normal">{`$${product.price}`}</span>
          </div>
        </div>

        <button
          className="cart"
          onClick={() =>
            addProductToCart(
              // product.stripe_product_id_test,
              getStripeProductId(product),
              product.product,
              product.price,
              product.media[0].link,
              1
            )
          }
        >
          Add to cart
          <i className="fa-solid fa-cart-arrow-down ml-2"></i>
        </button>

        {/* <button
          type="button"
          className="site-btn quick-view"
          data-bs-toggle="modal"
          data-bs-target="#ProductModal"
          onClick={() => setSingleProductData(product)}
        >
          Quick View
        </button> */}
      </div>
    );
  };

  return (
    <div className="page-content">
      <div className="relative">
        <div
          className="flex-container justify-center bg-cover bg-no-repeat bg-fixed banner-bg"
          style={{
            backgroundImage:
              "url(//home.JPG)",
          }}
        >
          <div className="text-center z-10">
            <h1 className="text-white">
              Welcome to <span className="primary-clr">{perspect.site_title}</span>
            </h1>
            <h2 className="text-white">Serving Health</h2>
          </div>
        </div>
      </div>

      <section className="">
        <div className="container mx-auto product-cards mt-10 mb-20 pb-8">
          <div className="text-center py-3">
            <h3 className="text-3xl font-bold mb-8 relative main-h">
              FEATURED PRODUCTS
            </h3>
          </div>
          <div className="grid lg:grid-cols-3 mg:grid-cols-2 sm:grid-cols-1 box-gap mb-2">
            {product_categories_json &&
              product_categories_json.length &&
              product_categories_json[0].products
                .slice(0, 3)
                .map((product, idx) => (
                  <ProductsView
                    key={idx}
                    product={product}
                    category={product.product_category_id}
                  />
                ))}
          </div>
          <div className="text-center mt-5">
            <Link
              to="/products"
              className="mt-4 primary-clr pb-6 site-btn view-btn"
            >
              View All
            </Link>
          </div>
        </div>
      </section>
      <div
        className={`modal fade ${
          Object.keys(singleProductData).length ? "" : "hidden"
        }`}
        id="ProductModal"
        aria-labelledby="ProductModalTitle"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleCloseModal()}
              ></button>
            </div>
            <div className="modal-body relative p-4 pt-0">
              {Object.keys(singleProductData).length && (
                <div className="grid lg:grid-cols-2 mg:grid-cols-2 sm:grid-cols-1 box-gap">
                  <section>
                    <div className="container mx-auto product-cards">
                      <div className="product-box">
                        <div className="relative">
                          <div
                            id="product-slider"
                            className="carousel slide carousel-fade relative"
                            data-bs-ride="carousel"
                          >
                            <div className="carousel-inner relative w-full overflow-hidden">
                              {singleProductData.media.map(
                                (productImg, idx) => (
                                  <div
                                    className={`${
                                      idx === 0
                                        ? "carousel-item active relative float-left w-full"
                                        : "carousel-item"
                                    } `}
                                    key={idx}
                                  >
                                    <img
                                      src={`https://${productImg.link}`}
                                      className="img-fluid w-100"
                                      alt=""
                                    />
                                  </div>
                                )
                              )}
                              {/* <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#product-slider"
                                data-bs-slide="prev"
                              >
                                <span
                                  className="carousel-control-prev-icon"
                                  aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">
                                  Previous
                                </span>
                              </button>
                              <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#product-slider"
                                data-bs-slide="next"
                              >
                                <span
                                  className="carousel-control-next-icon"
                                  aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">Next</span>
                              </button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <div className="pl-5">
                    <h6 className="mb-2">{singleProductData.product}</h6>
                    <div className="border-b py-2">
                      <span className="pricing font-light">
                        ${singleProductData.price}
                      </span>
                    </div>
                    {/* <div className="mt-6">
                        <p className="font-semibold">Packaging:</p>
                        <p className="text-xs mt-3">Bag (1 oz)</p>
                      </div> */}

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
                        className="site-btn mr-3 w-44"
                        onClick={() =>
                          addProductToCart(
                            singleProductData.stripe_product_id_test,
                            singleProductData.product,
                            singleProductData.price,
                            singleProductData.media[0].link,
                            parseInt(quantity)
                          )
                        }
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
