import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import Home from "./Pages/Home"
import Pizza from "./Pages/Pizza"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
// import Tanuki from "./Pages/Tanuki"
// import PizzaBurger from "./Pages/PizzaBurger"
// import FoodBand from "./Pages/FoodBand"
// import PalkiSkalki from "./Pages/PalkiSkalki"
// import GusiLebedi from "./Pages/GusiLebedi"
import CartModal from "./Components/CartModal"
import AuthModal from "./Components/AuthModal"

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

  // Загрузка корзины из localStorage при запуске
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // Сохранение корзины в localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Сохранение пользователя в localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthOpen(false)
  }

  const handleLogout = () => {
    setUser(null)
    setCart([]) // Очищаем корзину при выходе
  }

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      }
      return prevCart.filter(item => item.id !== itemId)
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <BrowserRouter>
      <Header 
        user={user}
        onLoginClick={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartCount}
      />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizza" element={<Pizza addToCart={addToCart} user={user} />} />
        {/* <Route path="/tanuki" element={<Tanuki addToCart={addToCart} user={user} />} />
        <Route path="/pizza-burger" element={<PizzaBurger addToCart={addToCart} user={user} />} />
        <Route path="/foodband" element={<FoodBand addToCart={addToCart} user={user} />} />
        <Route path="/palki-skalki" element={<PalkiSkalki addToCart={addToCart} user={user} />} />
        <Route path="/gusi-lebedi" element={<GusiLebedi addToCart={addToCart} user={user} />} /> */}
      </Routes>
      
      <Footer />

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onAdd={addToCart}
        onRemove={removeFromCart}
        onClear={clearCart}
        total={cartTotal}
        user={user}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
      />
    </BrowserRouter>
  )
}

export default App