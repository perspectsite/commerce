import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserDispatchContext } from "../context/userProvider";

const OrderSuccess = () => {
  const setCart = useContext(UserDispatchContext);

  useEffect(() => {
    localStorage.removeItem("cartProducts-live");
    setCart({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="success-page">
      <div className="pt-20">
        <div className="container mx-auto pb-6 pt-3 mt-5 text-center">
          <div className="bg-white primary-clr text-2xl w-16 h-16 mx-auto shadow animate-bounce m-4 rounded-full flex-container justify-center">
            <i className="fas fa-check-double"></i>
          </div>
          <div className="page-card relative bg-white mx-auto px-5 py-8 rounded-md max-w-2xl">
            <div className="text-left z-10">
              <h3 className="text-3xl font-bold mb-4">
                <span className="primary-clr">{window.perspect.site_title}</span> Order
                Successfully Placed!
              </h3>
              <p className="text-lg mb-3">
                <i className="far fa-envelope primary-clr mr-2 w-5"></i>We
                received your order and will send a confirmation email shortly.
              </p>
              <span className="text-lg">
                <i className="fas fa-question primary-clr mr-2 w-5"></i> If you
                have any questions, please email{" "}
                <Link to="/" className="primary-clr">
                  hello@example.com
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
