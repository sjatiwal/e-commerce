import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { MdSearch, MdAccountCircle, MdAddShoppingCart } from "react-icons/md";

function Header() {
  return (
    <ReactNavbar
      burgerColorHover="#eb4034"
      navColor1="rgba(150,150,150)"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.3vmax"
      link1Color="rgba(35,35,35,0.8)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link1Margin="1vmax"
      searchIcon={true}
      searchIconColor="rgba(35,35,35,0.8)"
      SearchIconElement={MdSearch}
      profileIcon={true}
      profileIconColor="rgba(35, 35, 35,0.8)"
      ProfileIconElement={MdAccountCircle}
      profileIconUrl="/login"
      cartIcon={true}
      cartIconColor="rgba(35, 35, 35,0.8)"
      CartIconElement={MdAddShoppingCart}
      profileIconColorHover="#eb4034"
      searchIconColorHover="#eb4034"
      cartIconColorHover="#eb4034"
      cartIconMargin="1vmax"
    />
  );
}

export default Header;
