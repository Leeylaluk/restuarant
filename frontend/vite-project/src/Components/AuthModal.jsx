import { useState } from "react"
import RegisterModal from "./RegisterModal"

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showRegister, setShowRegister] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!login || !password) {
      setError("Введите логин и пароль")
      return
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password })
      })

      const data = await response.json()

      if (response.ok) {
        onLogin(data.user)
        setLogin("")
        setPassword("")
        setError("")
        onClose()
      } else {
        setError(data.error || "Неверный логин или пароль")
      }
    } catch (error) {
      setError("Ошибка соединения с сервером")
    }
  }

  if (showRegister) {
    return (
      <RegisterModal 
        isOpen={isOpen}
        onClose={onClose}
        onSwitchToLogin={() => setShowRegister(false)}
      />
    )
  }

  return (
    <div className="modal-auth" style={{ display: 'flex' }}>
      <div className="modal-dialog modal-dialog-auth">
        <button className="close-auth" onClick={onClose}>&times;</button>
        <form onSubmit={handleSubmit}>
          <fieldset className="modal-body">
            <legend className="modal-title">Авторизация</legend>
            
            {error && <div className="auth-error" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            
            <label className="label-auth">
              <span>Логин</span>
              <input 
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Введите логин"
              />
            </label>
            
            <label className="label-auth">
              <span>Пароль</span>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
              />
            </label>
          </fieldset>
          
          <div className="modal-footer">
            <div className="footer-buttons" style={{ flexDirection: 'column', gap: '10px' }}>
              <button className="button button-primary" type="submit" style={{ width: '100%' }}>
                Войти
              </button>
              <button className="button" type="button" onClick={() => setShowRegister(true)} style={{ width: '100%' }}>
                Зарегистрироваться
              </button>
              <button className="button clear-cart" type="button" onClick={onClose} style={{ width: '100%' }}>
                Отмена
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}