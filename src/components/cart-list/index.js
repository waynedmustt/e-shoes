import React, { useEffect, useState } from 'react';
import { coreService } from '../../core/service';

const CartList = (props) => {
    const { toggleCartCount } = props;
    const [carts, setCarts] = useState([]);

    const [quantity, setQuantity] = useState([]);
    const [total, setTotal] = useState(0);
    const [reloading, setReloading] = useState(false);

    useEffect(() => {
        if (!coreService.getObjectItem('cart')) {
            return;
        }

        toggleCartCount();
        initiateCart();
    }, [])

    const initiateCart = () => {
        setReloading(false);
        setTotal(0);
        const selectedCart = coreService.getObjectItem('cart');
        if (selectedCart?.data.length === 0) {
            return;
        }
        const mappedCart = selectedCart?.data?.map((cart, i) => {
            return {
                ...cart,
                id: i + 1
            }
        })
        for (const idx in mappedCart) {
            const qty = {
                [mappedCart[idx]?.id]: 1
            }
            quantity.push(qty);
            setQuantity(quantity);
        }
        setCarts(mappedCart);
    }

    useEffect(() => {
        if (carts?.length === 0 || quantity?.length === 0) {
            return;
        }

        calculateTotal();
    }, [carts, quantity])

    useEffect(() => {
        if (!reloading) {
            return;
        }

        toggleCartCount();
        initiateCart();
    }, [reloading])

    const calculateTotal = () => {
        let total = 0;
        for (const idx in carts) {
            total += carts[idx].price * quantity[idx][carts[idx]?.id]
        }

        setTotal(total);
    }

    const changeQty = (e, id) => {
        e.preventDefault();
        if (e.target.value === '') {
            return;
        }
        let newQty = quantity.map((qty) => {
            return {
                ...qty,
                [id]: parseInt(e.target.value)
            }
        })
        setQuantity(newQty);
    }

    const deleteCart = (e, id) => {
        e.preventDefault();

        const findCart = carts.find(cart => cart?.id === id)
        if (typeof findCart === 'undefined') {
            return;
        }
        
        const newCart = carts.filter(cart => cart?.id !== id)
        coreService.removeItem('cart');
        if (newCart?.length > 0) {
            coreService.setObjectItem('cart', {data: newCart});
        }
        setCarts([]);
        setQuantity([]);
        setReloading(true);
    }

    return (
        <React.Fragment>
            <div className="d-flex align-items-center my-5 justify-content-center">
                <div className="px-2 f-50 bold">Your Bag</div>
                <img className="px-2" src={process.env.PUBLIC_URL + `/assets/img/cart/bag-lg.svg`} alt="bag lg" />
            </div>
            {reloading && <img className="spinner" src={process.env.PUBLIC_URL + `/assets/img/spinner.gif`} alt="spinner" />}
            {!reloading && 
                <React.Fragment>
                    <div className="table-responsive pt-5">
                        <table className="table table-borderless cart">
                            <thead>
                                <tr>
                                    <th className="w-20-5" scope="col"></th>
                                    <th scope="col">{'Product'.toUpperCase()}</th>
                                    <th scope="col">{'Price'.toUpperCase()}</th>
                                    <th scope="col">{'Quantity'.toUpperCase()}</th>
                                    <th scope="col">{'Total'.toUpperCase()}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carts?.map((cart, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div className="d-flex flex-row align-items-center">
                                                <a className="a-none" href="# " onClick={e => deleteCart(e, cart?.id)}>
                                                    <img className="px-3" src={process.env.PUBLIC_URL + `/assets/img/cart/remove.svg`} alt="remove" />
                                                </a>
                                                <img className="px-3 h-188 w-100" src={process.env.PUBLIC_URL + `/assets/img/shoes/${cart?.img}.svg`} alt="shoes" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column">
                                                <div className="px-2 pb-3 f-16 f-600">{cart?.shoeName.toUpperCase()}</div>
                                                <div className="d-flex flex-row align-items-center">
                                                    <div className="px-2 f-16 f-400">Size : {cart?.size.toUpperCase()}</div>
                                                    <div className="d-flex flex-row align-items-center">
                                                        <div className="px-2 f-16 f-400">Color :</div>
                                                        <div className="square cart-color" style={{backgroundColor: cart?.color}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>${cart?.price}</td>
                                        <td>
                                            <form>
                                                <input type="number" className="form-control w-25" min="1" value={quantity[i][cart?.id]} 
                                                onChange={e => changeQty(e, cart?.id)}
                                                />
                                            </form>
                                        </td>
                                        <td>${cart?.price * quantity[i][cart?.id]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="right w-25 pb-5">
                        <div className="d-flex flex-column">
                            <div className="detail-footer">
                                <div className="d-flex flex-row space-between py-3 px-3">
                                    <div className="px-2">{'Total'.toUpperCase()}</div>
                                    <div className="px-2">${total}</div>
                                </div>
                            </div>
                            <div className="bg-dark mt-2">
                                <div className="d-flex flex-row space-between py-3 px-3">
                                    <div className="px-2 text-white">{'Pay Now'.toUpperCase()}</div>
                                    <img className="px-2" src={process.env.PUBLIC_URL + "/assets/img/arrow-right.svg"} alt="arrow right" />
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default CartList;