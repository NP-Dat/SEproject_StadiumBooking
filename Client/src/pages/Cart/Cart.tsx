import React from 'react';
import styles from './Cart.module.css';

const Cart = () => {
    return (
        <div className={styles.cartContainer}>
            <h1>Your Cart</h1>
            <div className={styles.cartContent}>
                {/* Cart items will be displayed here */}
                <p>Your cart is empty</p>
            </div>
        </div>
    );
};

export default Cart; 