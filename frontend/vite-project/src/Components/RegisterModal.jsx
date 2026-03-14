import { useState } from "react"

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phone: "",
    address: ""
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  if (!isOpen) return null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!formData.login || !formData.password || !formData.name) {
      setError("Заполните обязательные поля (Логин, Пароль, Имя)")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают")
      return
    }

    if (formData.password.length < 4) {
      setError("Пароль должен быть минимум 4 символа")
      return
    }

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: formData.login,
          password: formData.password,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess("Регистрация успешна! Теперь можете войти.")
        setTimeout(() => {
          onSwitchToLogin()
        }, 2000)
      } else {
        setError(data.error || "Ошибка при регистрации")
      }
    } catch (error) {
      setError("Ошибка соединения с сервером")
    }
  }

  return (
    <div className="modal-auth" style={{ display: 'flex' }}>
      <div className="modal-dialog modal-dialog-auth">
        <button className="close-auth" onClick={onClose}>&times;</button>
        <form onSubmit={handleSubmit}>
          <fieldset className="modal-body">
            <legend className="modal-title">Регистрация</legend>
            
            {error && <div className="auth-error" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            {success && <div className="auth-success" style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
            
            <label className="label-auth">
              <span>Логин <span style={{ color: 'red' }}>*</span></span>
              <input 
                type="text"
                name="login"
                value={formData.login}
                onChange={handleChange}
                placeholder="Введите логин"
                required
              />
            </label>

            <label className="label-auth">
              <span>Пароль <span style={{ color: 'red' }}>*</span></span>
              <input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <label className="label-auth">
              <span>Подтвердите пароль <span style={{ color: 'red' }}>*</span></span>
              <input 
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Повторите пароль"
                required
              />
            </label>

            <label className="label-auth">
              <span>Имя <span style={{ color: 'red' }}>*</span></span>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Введите ваше имя"
                required
              />
            </label>

            <label className="label-auth">
              <span>Email</span>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label className="label-auth">
              <span>Телефон</span>
              <input 
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>

            <label className="label-auth">
              <span>Адрес доставки</span>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                style={{ width: '100%', padding: '5px', marginTop: '5px' }}
              />
            </label>
          </fieldset>
          
          <div className="modal-footer">
            <div className="footer-buttons" style={{ flexDirection: 'column', gap: '10px' }}>
              <button className="button button-primary" type="submit" style={{ width: '100%' }}>
                Зарегистрироваться
              </button>
              <button className="button" type="button" onClick={onSwitchToLogin} style={{ width: '100%' }}>
                Уже есть аккаунт? Войти
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