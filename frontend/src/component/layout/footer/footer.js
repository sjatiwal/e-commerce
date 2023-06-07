import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="leftFooter">
        <h4>Download Our App</h4>
      </div>
      <div className="middleFooter">
        <h1>Ecommerce</h1>
        <div>Buy Best & Reliable Products</div>
        <div>Copyrights 2023 &copy; Ecommerce</div>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="/">Instagram</a>
        <a href="/">Youtube</a>
        <a href="/">Facebook</a>
      </div>
    </footer>
  );
}

export default Footer;
