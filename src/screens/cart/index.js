import React, { useEffect } from 'react';
import CartList from '../../components/cart-list';
import { ThemeContext } from '../../core/provider';

const Cart = () => {
    useEffect( () => {
        
    }, [])

    return (
        <ThemeContext.Consumer>
            {({toggleCartCount}) => (
                <React.Fragment>
                    <CartList toggleCartCount={toggleCartCount} />
                </React.Fragment>
            )}
        </ThemeContext.Consumer>
    );
}

export default Cart;