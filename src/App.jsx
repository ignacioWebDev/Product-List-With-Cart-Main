import { useState } from 'react'
import Card from './card.jsx'
import Cart from './cart.jsx'
import { products } from './products.jsx'
import './index.css'
import confirmedIllustration from './assets/images/icon-order-confirmed.svg'

function App() {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (id) => {
    const product = products.find((p) => p.id === id)
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === id)
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }


  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  function confirmOrder() {
    const cartConfirmed = document.querySelector('.cart-confirmed')
    const body = document.querySelector('body')

    if (cartConfirmed) {
      cartConfirmed.style.display = 'flex'
      body.classList.add('overlay-active')
    }
  }


  function startNewOrder() {
    setCartItems([])
    const cartConfirmed = document.querySelector('.cart-confirmed')
    if (cartConfirmed) {
      cartConfirmed.style.display = 'none';
      const body = document.querySelector('body')
      body.classList.remove('overlay-active')
    }
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <>
      <main>
        <div className="container">
          <h1>Desserts</h1>
          <div className="products-list">
            {products.map((card) => (
              <Card
                key={card.id}
                {...card}
                addToCart={addToCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                cartItems={cartItems}
              />
            ))}
          </div>
        </div>

        <Cart cartItems={cartItems} removeFromCart={removeFromCart} confirmOrder={confirmOrder} totalPrice={totalPrice} />

        <div className="cart-confirmed" style={{display: 'none'}}>
            <img src={confirmedIllustration} alt="confirmed" />
            <h1>Order Confirmed</h1>
            <p className='rose-p'>We hope you enjoy your food!</p>
            <div className='div-order-confirmed'>
              <div className='cart-confirmed-items'>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-confirmed-item-container">
                    <div className='cart-confirmed-item-desc'>
                      <img src={item.imgMobile} alt="item" />
                      <div>
                        <p className='cart-confirmed-rose-p'>{item.title}</p>
                        <div className="cart-confirmed-item-quantity">
                          <p className='red-p'>{item.quantity}x</p>
                          <p className='cart-confirmed-item-price'>@ ${item.price}</p>
                        </div>
                      </div>
                      <div className='cart-confirmed-item-total'>
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <hr className='hr-cart-confirmed' />
                  </div>
              ))}
              </div>
              <div className='cart-confirmed-total'>
                <p className='total-p-confirmed'>Order Total:</p>
                <h2>${totalPrice.toFixed(2)}</h2>
              </div>
            </div>

            <button className="checkout-btn" onClick={startNewOrder}>Start New Order</button>
        </div>
      </main>

      <footer className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="https://www.frontendmentor.io/profile/ignacioWebDev" target="_blank"><i><b>Ignacio Bortolin</b></i></a>.
      </footer>
    </>
  )
}

export default App
