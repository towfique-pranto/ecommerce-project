import { NavLink, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import mobileLogoWhite from "../assets/images/mobile-logo-white.png";
import logoWhite from "../assets/images/logo-white.png";
import searchIcon from "../assets/images/icons/search-icon.png";
import cartIcon from "../assets/images/icons/cart-icon.png";
import "./Header.css";

export function Header({ cart, search }) {
  const [searchBox, setSearchBox] = useState(search || "");
  const navigate = useNavigate();

  useEffect(() => {
    setSearchBox(search || "");
  }, [search]);

  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={logoWhite} />
          <img className="mobile-logo" src={mobileLogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          value={searchBox}
          className="search-bar"
          type="text"
          placeholder="Search"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              navigate(`/?search=${encodeURIComponent(searchBox)}`);
            }
          }}
          onChange={(event) => {
            setSearchBox(event.target.value);
          }}
        />

        <button
          className="search-button"
          onClick={() => {
            //console.log(searchBox);
            navigate(`/?search=${encodeURIComponent(searchBox)}`);
          }}
        >
          <img className="search-icon" src={searchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={cartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
