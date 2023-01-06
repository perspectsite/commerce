const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="container-fluid px-6 md:flex justify-between items-center text-center my-4">
        <p className="font-semibold">© {currentYear} {perspect.site_title}</p>
        <a className="font-semibold" href="https://perspect.com">
          Powered by Perspect Ecommerce
        </a>
      </div>
    </footer>
  );
};

export default Footer;
