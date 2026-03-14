import { useState, useEffect } from "react"
import FoodCard from "../Components/FoodCard"

export default function Pizza({ addToCart, user }) {
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true)
  const [restaurant, setRestaurant] = useState(null)

  useEffect(() => {
    fetchRestaurantData()
  }, [])

  const fetchRestaurantData = async () => {
    try {
      // Получаем данные ресторана
      const restaurantRes = await fetch('http://localhost:3000/restaurants')
      const restaurantData = await restaurantRes.json()
      setRestaurant(restaurantData)

      // Получаем меню
      const menuRes = await fetch('http://localhost:3000/pizzaPlus')
      const menuData = await menuRes.json()
      setMenu(menuData)
      setLoading(false)
    } catch (error) {
      console.error('Ошибка загрузки:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="main">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Загрузка меню...</h2>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="main">
      <div className="container">
        <section className="menu">
          <div className="section-heading">
            <h2 className="section-title restaurant-title">
              {restaurant?.name || "Пицца Плюс"}
            </h2>
            <div className="card-info">
              <div className="rating">{restaurant?.stars || 4.5}</div>
              <div className="price">От {restaurant?.price_from || 900} ₽</div>
              <div className="category">{restaurant?.kitchen || "Пицца"}</div>
            </div>
          </div>
          <div className="cards cards-menu">
            {menu.map((item) => (
              <FoodCard
                key={item.id}
                id={item.id}
                title={item.name}
                description={item.description}
                price={item.price + " ₽"}
                image={item.image}
                onAddToCart={addToCart}
                user={user}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}