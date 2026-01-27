import "../styles/components/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <h2>NovaCart</h2>
          <p>Read. Learn. Grow.</p>
        </div>

        <div className="footer-center">
          <a href="/">Home</a>
          <a href="/products">Books</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-right">
          <p>© {new Date().getFullYear()} NovaCart</p>
          <p>All rights reserved</p>
        </div>

      </div>
    </footer>
  );
}
