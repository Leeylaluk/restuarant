import { Link } from "react-router-dom";

export default function Header({ user, onLoginClick, onLogout, onCartClick, cartCount }) {
  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="logo">
          <img src="/img/icon/logo.svg" alt="Logo" />
        </Link>
        
        <label className="address">
          <input type="text" className="input input-address" placeholder="Адрес доставки" />
        </label>
        
        <div className="buttons">
          {user && <span className="user-name">{user.name}</span>}
          
          {!user ? (
            <button 
              className="button button-primary button-auth"
              onClick={onLoginClick}
            >
              <span className="button-auth-svg"></span>
              <span className="button-text">Войти</span>
            </button>
          ) : (
            <button 
              className="button button-primary button-out"
              onClick={onLogout}
            >
              <span className="button-text">Выйти</span>
              <span className="button-out-svg"></span>
            </button>
          )}
          
          <button 
            className="button button-cart" 
            id="cart-button"
            onClick={onCartClick}
          >
            <span className="button-cart-svg"></span>
            <span className="button-text">
              Корзина {cartCount > 0 && `(${cartCount})`}
            </span>
          </button>
        </div>
      </header>
    </div>
  );
}