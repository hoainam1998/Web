import React, { Component } from 'react';
import ProductData from '../product.json';
import Stogare from '../Storage/Storage.js';
import style from './cart.module.css';
import { Link } from 'react-router-dom';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            amount: 0
        }
    }

    cart = () => {
        if (this.props.match.url !== "/cart") {
            let id = parseInt(this.props.match.params.id);
            let quantity = parseInt(this.props.match.params.quantity);
            let cart = [];
            let singleItem = ProductData.find(item => item.id === id);
            singleItem.quantity = quantity;
            let itemInCart = this.checkItemExisted(id);
            cart.push(singleItem);
            cart = [...itemInCart, ...cart];

            Stogare.saveCart(cart);
        }

        this.cartItem = Stogare.getCart();
    };

    renderCart = () => {
        return this.cartItem.map((item, pos) => {
            return (
                <tr id={pos} key={pos}>
                    <td><img src={require(`../images/${item.images[0]}`)} alt="chair"></img></td>
                    <td>{item.name}</td>
                    <td>$ {item.price}</td>
                    <td>
                        <div className={style.quantity}>
                            <span>Qty</span>
                            <span>-</span>
                            <span>{item.quantity}</span>
                            <span>+</span>
                        </div>
                        <Link to={'/cart'}><span className={style.remove}>remove</span></Link>
                    </td>
                </tr>
            );
        })
    }

    checkItemExisted = (id) => {
        return Stogare.getCart().filter(item => item.id !== id);
    }

    removeCardItem = (index) => {
        this.cartItem.splice(index, 1);
        Stogare.saveCart(this.cartItem);
    }

    addEventRemoveCart = () => {
        let remove = document.querySelectorAll('.cart_remove__30Tho');
        remove.forEach(item => {
            item.addEventListener('click', (evt) => {
                let element = evt.target.parentElement.parentElement;
                let id = element.id;
                this.removeCardItem(id);
                this.calcTotal();
            });
        });
    }

    addEventCartControl = () => {
        let cartcontrol = document.querySelectorAll('.cart_quantity__1YjCP');
        cartcontrol.forEach(item => {
            let productCart = item.parentElement.parentElement;
            item.addEventListener('click', (evt) => {
                let element = evt.target;
                if (element.innerText === "+") {
                    let quantity = parseInt(element.previousSibling.innerText) + 1;
                    element.previousSibling.innerText = quantity;
                    this.cartItem[productCart.id].quantity = quantity;
                    Stogare.saveCart(this.cartItem);
                    this.calcTotal();
                } else if (element.innerText === "-") {
                    let quantity = parseInt(element.nextSibling.innerText) - 1;
                    if (quantity === 0) {
                        this.removeCardItem(productCart.id);
                        element.parentElement.nextSibling.click();
                    } else {
                        this.cartItem[productCart.id].quantity = quantity;
                        Stogare.saveCart(this.cartItem);
                        element.nextSibling.innerText = quantity;
                    }
                    this.calcTotal();
                }
            });
        });
    }

    calcTotal = () => {
        let total = 0;
        let amount = 0;
        this.cartItem.forEach(item => {
            total += item.price * item.quantity;
            amount += item.quantity;
        });

        document.querySelector('#subtotal').innerText = total;
        document.querySelector('#total').innerText = total;
        document.querySelector('#amount').innerText = `(${amount})`;

        this.setState({
            total: total,
            amount: amount
        });
    }

    addEventForLinkSideMenu = () => {
        let styleSideMenu=document.querySelector('.sideMenu_active__1xRv3');
        if(styleSideMenu){
            styleSideMenu.classList.remove('sideMenu_active__1xRv3');
        }
        document.querySelector('#cart').classList.add(`sideMenu_active__1xRv3`);
    }

    componentDidMount() {
        this.calcTotal();
        this.addEventCartControl();
        this.addEventRemoveCart();
        this.addEventForLinkSideMenu();
    }

    render() {
        this.cart(this.props.match.params.id);
        return (
            <div className={style.cart}>
                <h1>Shopping Cart</h1>
                <div className={style.container}>
                    <div className={style.cardTable}>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
                        </table>
                    </div>
                    <div className={style.cartTotal}>
                        <h2>Cart Total</h2>
                        <div>
                            <span>Subtotal</span>
                            <span id="subtotal">0</span>
                        </div>

                        <div>
                            <span>Delivery</span>
                            <span>Free</span>
                        </div>

                        <div>
                            <span>Total</span>
                            <span id="total">$140.00</span>
                        </div>

                        <Link to={`/checkout/${this.state.total}/${this.state.amount}`}><button>Checkout</button></Link>
                    </div>
                </div>
            </div>
        );
    }

}
export default Cart;