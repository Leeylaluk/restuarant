import { useState, useEffect } from "react"
import RestaurantCard from "../Components/RestaurantCard"
import { Promo } from "../Components/Promo"
import "../styles/style.css"
import "../styles/normalize.css"

export default function Home() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:3000/restaurants')
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных')
      }
      const data = await response.json()
      setRestaurants(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim() === "") {
      fetchRestaurants()
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/api/search?q=${query}`)
      if (!response.ok) {
        throw new Error('Ошибка поиска')
      }
      const data = await response.json()
      setRestaurants(data.restaurants)
    } catch (err) {
      console.error('Ошибка поиска:', err)
    }
  }

  if (loading) {
    return (
      <main className="main">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Загрузка ресторанов...</h2>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="main">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
            <h2>Ошибка: {error}</h2>
            <button 
              onClick={fetchRestaurants}
              style={{
                padding: '10px 20px',
                marginTop: '20px',
                cursor: 'pointer'
              }}
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="main">
      <div className="container">
        <Promo />
        <section className="restaurants">
          <div className="section-heading">
            <h2 className="section-title">Рестораны</h2>
            <label className="search">
              <input 
                type="text" 
                className="input input-search" 
                placeholder="Поиск блюд и ресторанов"
                value={searchQuery}
                onChange={handleSearch}
              />
            </label>
          </div>
          
          {restaurants.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <h3>Рестораны не найдены</h3>
            </div>
          ) : (
            <div className="cards cards-restaurants">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  title={restaurant.name}
                  image={restaurant.image}
                  time={restaurant.time_of_delivery + " мин"}
                  rate={restaurant.stars}
                  price={`От ${restaurant.price_from} ₽`}
                  category={restaurant.kitchen}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}