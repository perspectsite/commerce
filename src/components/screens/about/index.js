import "./styles.scss";

const About = () => {
  return (
    <div className="page-content about">
      <div className="relative">
        <div
          className="flex-container justify-center bg-cover bg-no-repeat bg-fixed banner-bg"
          style={{
            backgroundImage: "url(//{window.perspect.domain})",
          }}
        >
          <div className="text-center z-10">
            <h1 className="text-white">
              About <span className="primary-clr">Us</span>
            </h1>
            <h2 className="text-white">{window.perspect.site_description}</h2>
          </div>
        </div>
      </div>
      <section>
        <div className="container mx-auto py-8">
          <div className="text-center py-3">
            <h3 className="text-3xl font-bold mb-8 relative main-h">
              OUR PHILOSOPHY
            </h3>
          </div>
          <div className="grid lg:grid-cols-2 mg:grid-cols-2 sm:grid-cols-1 box-gap">
            <div>
              <img
                src="//"
                className="img-fluid w-100"
                alt=""
              />
            </div>
            <div>
              <p className="mb-3">
                This is an example about page.  
              </p>
              <p className="mb-3">
                You can write about your site here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About view Modal */}
      <section className="bg-primary-clr py-10">
        <div className="container mx-auto text-center text-white pb-6">
          <div
            id="about-slider"
            className="carousel slide relative"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner relative w-full overflow-hidden md:h-80 mb-6">
              <div className="carousel-item active relative float-left w-full">
                <div className="mb-5 md:mx-20">
                  {/* <img
                    src="../../../assets/img/profile.jpg"
                    className="img-fluid w-20 h-20 mx-auto rounded-full mb-4"
                    alt=""
                  /> */}
                  <span className="font-semibold text-lg">Bold 1</span>
                  <p>
                    Our mission is to ...
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <div className="mb-5 md:mx-20">
                  {/* <img
                    src="../../../assets/img/profile.jpg"
                    className="img-fluid w-20 h-20 mx-auto rounded-full mb-4"
                    alt=""
                  /> */}
                  <span className="font-semibold text-lg">
                    Bold 2
                  </span>
                  <p className="mb-3">
                    Item 2
                  </p>
                  <p>
                    Item 2, (continued)
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <div className="mb-5 md:mx-20">
                  {/* <img
                    src="../../../assets/img/profile.jpg"
                    className="img-fluid w-20 h-20 mx-auto rounded-full mb-4"
                    alt=""
                  /> */}
                  <span className="font-semibold text-lg">
                    Bold 3
                  </span>
                  <p>
                    Item 3
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-indicators flex justify-center p-0 mb-4">
              <button
                type="button"
                data-bs-target="#about-slider"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#about-slider"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#about-slider"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
