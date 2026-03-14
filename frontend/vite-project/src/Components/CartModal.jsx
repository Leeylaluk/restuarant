export default function CartModal({ isOpen, onClose, cart, onAdd, onRemove, onClear, total, user }) {
    if (!isOpen) return null
  
    return (
      <div className="modal modal-cart" style={{ display: 'flex' }}>
        <div className="modal-dialog">
          <div className="modal-header">
            <h3 className="modal-title">Корзина</h3>
            <button className="close" onClick={onClose}>&times;</button>
          </div>
          
          <div className="modal-body">
            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '20px' }}>
                Корзина пуста
              </p>
            ) : (
              cart.map((item, index) => (
                <div className="food-row" key={index}>
                  <span className="food-name">{item.name}</span>
                  <strong className="food-price">{item.price} ₽</strong>
                  <div className="food-counter">
                    <button 
                      className="counter-button"
                      onClick={() => onRemove(item.id)}
                    >-</button>
                    <span className="counter">{item.quantity}</span>
                    <button 
                      className="counter-button"
                      onClick={() => onAdd(item)}
                    >+</button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="modal-footer">
            <span className="modal-pricetag">{total} ₽</span>
            <div className="footer-buttons">
              {user ? (
                <button className="button button-primary">
                  Оформить заказ
                </button>
              ) : (
                <button className="button button-primary" disabled>
                  Войдите для заказа
                </button>
              )}
              <button className="button clear-cart" onClick={onClose}>
                Отмена
              </button>
              {cart.length > 0 && (
                <button className="button clear-cart" onClick={onClear}>
                  Очистить
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }