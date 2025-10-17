import cart from './assets/images/icon-add-to-cart.svg'
import { useState, useEffect } from 'react'

function Card({ imgDesktop, imgTablet, imgMobile, desc, title,  price, id, addToCart, increaseQuantity, decreaseQuantity, cartItems }) {
    const [img, setImg] = useState(imgDesktop)

    useEffect(() => {
        const updateImage = () => {
        const width = window.innerWidth
        if (width <= 425) setImg(imgMobile)
        else if (width <= 768) setImg(imgTablet)
        else setImg(imgDesktop)
        }
        updateImage()
        window.addEventListener('resize', updateImage)
        return () => window.removeEventListener('resize', updateImage)
    }, [imgDesktop, imgTablet, imgMobile])

    const itemInCart = cartItems.find((item) => item.id === id)

    return (
        <div className={`product-item ${itemInCart ? 'in-cart' : ''}`} id={id}>
        <div
            className={`product-img ${itemInCart ? 'with-border' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
        />


        <div className="btn-cart-div">
            {!itemInCart ? (
            <button className="btn-cart" onClick={() => addToCart(id)}>
                <img src={cart} alt="cart" className="cart-img" />
                Add to Cart
            </button>
            ) : (
            <div className="quantity-controls">
                <button className="quantity-btn" onClick={() => decreaseQuantity(id)}>
                    <span>−</span>
                </button>
                <span className="quantity-number">{itemInCart.quantity}</span>
                <button className="quantity-btn" onClick={() => increaseQuantity(id)}>
                    <span>+</span>
                </button>
            </div>
            )}
        </div>

        <p className="product-desc">{desc}</p>
        <h2 className="product-title">{title}</h2>
        <p className="product-price">
            {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(price)}
        </p>
        </div>
    )
}

export default Card
