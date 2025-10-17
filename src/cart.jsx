import illustration from './assets/images/illustration-empty-cart.svg'
import removeIllustration from './assets/images/icon-remove-item.svg'
import carbonNeutralIllustration from './assets/images/icon-carbon-neutral.svg'

function Cart({ cartItems, removeFromCart, confirmOrder, totalPrice }) {
    if (cartItems.length === 0) {
        return (
        <div className="cart">
            <h2>Your Cart (<span id="cart-span">0</span>)</h2>
            <div className="empty-cart-div">
            <img src={illustration} alt="illustration" />
            <p className="cart-p-empty">Your added items will appear here</p>
            </div>
        </div>
        )
    }

    const totalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <div className="cart">
        <h2>Your Cart <span id="cart-span">( {totalUnits} )</span></h2>

        <div className="cart-items">
            {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
                <div className="cart-item-container">
                    <div className="cart-item-quantity">
                        <div>
                            <p className="cart-item-title">{item.title}</p>
                            <div className="cart-item-quantity-number-container">
                                <p className="cart-item-quantity-number">{item.quantity}x</p>
                                <p className="cart-item-quantity-price">@ ${item.price}</p>
                                <p className="cart-item-quantity-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                        <button className="cart-item-remove-btn" onClick={() => removeFromCart(item.id)}>
                            <img src={removeIllustration} alt="remove" />
                        </button>
                    </div>
                </div>
            </div>
            ))}
        </div>

            <div className="cart-total">
                <p className="cart-p-total">Order total:</p>
                <p className="cart-total-price">${totalPrice.toFixed(2)}</p>
            </div>
            <div className='div-carbon-neutral'>
                <img src={carbonNeutralIllustration} alt="carbon neutral illustration" />
                <p className='carbon-neutral-text'>This is a <b>carbon-neutral</b> delivery</p>
            </div>
            <div className='div-checkout'>
                <button className="checkout-btn" onClick={confirmOrder}>Confirm Order</button>
            </div>
        </div>
    )
}

export default Cart
