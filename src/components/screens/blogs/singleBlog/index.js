import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getFormattedDate,
  getImageFromList,
} from "../../../../utilities/utili";
import "../styles.scss";

const SingleBlog = ({ blog_json }) => {
  const navigate = useNavigate();
  const { blog_slug } = useParams();
  const [singleBlog, setSingleBlog] = useState({});

  useEffect(() => {
    const blog = blog_json
      .filter((blogs) => blogs.page_type === "post")
      .filter((blog) => blog.slug === blog_slug);
    if (blog.length) {
      setSingleBlog(blog[0]);
    } else {
      navigate("/blogs");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return Object.keys(singleBlog).length ? (
    <div className="page-content blog">
      <section className="single-blog-section my-20 pt-6">
        <div className="container mx-auto py-8 px-6">
          <div className="md:mx-20 md:pr-20">
            <div className="py-3">
              <h2 className="text-[2rem] font-bold mb-3 relative border-b py-2">
                {singleBlog.title}
              </h2>
              <p>
                Posted on{" "}
                {getFormattedDate(singleBlog.date).replace(/[/]/g, "-")}
              </p>
            </div>
            <div>
              <img
                src={`https://${getImageFromList(singleBlog.media, "large")}`}
                className="img-fluid w-full"
                alt=""
              />
              <p className="mt-3">
                <i>{singleBlog.content.replace(/[<p></p>]/g, "")}</i>
              </p>
            </div>
            <div className="definitions mt-6">
              <div className="social-links border-t border-b py-6">
                <span className="mr-4">Share:</span>
                <Link to="/" className="text-2xl mr-3">
                  <i className="fa-brands fa-facebook-f"></i>
                </Link>
                <Link to="/" className="text-2xl mr-3">
                  <i className="fa-brands fa-twitter"></i>
                </Link>
                <Link to="/" className="text-2xl mr-3">
                  <i className="fa-brands fa-pinterest-square"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : null;
};

export default SingleBlog;
