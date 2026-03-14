export default function FoodCard({ id, title, description, price, image, onAddToCart, user }) {
  const numericPrice = parseInt(price.toString().replace(/[^\d]/g, ''))

  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-text">
        <div className="card-heading">
          <h3 className="card-title card-title-reg">{title}</h3>
        </div>
        <div className="card-info">
          <div className="ingredients">{description}</div>
        </div>
        <div className="card-buttons">
          <button 
            className="button button-primary button-add-cart"
            onClick={() => onAddToCart({ id, name: title, price: numericPrice, image })}
            disabled={!user}
          >
            <span className="button-card-text">
      В корзину
            </span>
            <span className="button-cart-svg"></span>
          </button>
          <strong className="card-price-bold">{price}</strong>
        </div>
      </div>
    </div>
  )
}