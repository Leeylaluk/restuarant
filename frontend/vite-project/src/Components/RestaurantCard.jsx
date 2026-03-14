import { Link } from "react-router-dom"

export default function RestaurantCard({ id, title, time, rate, image, price, category }) {
  const getRestaurantLink = () => {
    const links = {
      "Пицца Плюс": "/pizza",
      "Тануки": "/tanuki",
      "PizzaBurger": "/pizza-burger",
      "FoodBand": "/foodband",
      "Палки Скалки": "/palki-skalki",
      "Гуси Лебеди": "/gusi-lebedi"
    }
    return links[title] || `/restaurant/${id}`
  }

  return (
    <Link to={getRestaurantLink()} className="card card-restaurant">
      <img src={image} alt={title} className="card-image" />
      <div className="card-text">
        <div className="card-heading">
          <h3 className="card-title">{title}</h3>
          <span className="card-tag tag">{time}</span>
        </div>
        <div className="card-info">
          <div className="rating">{rate}</div>
          <div className="price">{price}</div>
          <div className="category">{category}</div>
        </div>
      </div>
    </Link>
  )
}