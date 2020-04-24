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

    renderCart = (cart) => {
        return cart.map((item, pos) => {
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
                        <span className={style.remove}>remove</span>
                    </td>
                </tr>
            );
        })
    }

    cart = () => {
        if (this.props.match.url !== "/cart") {
            let id = parseInt(this.props.match.params.id);
            let quantity = this.props.match.params.quantity;
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

    checkItemExisted = (id) => {
        return Stogare.getCart().filter(item => item.id !== id);
    }

    removeCardItem = (index) => {
        this.cartItem.splice(index, 1);
        Stogare.saveCart(this.cartItem);
    }

    addEventRemoveCart = () => {
        let remove = document.querySelectorAll('.cart_remove__2Eq6C');
        let tbody = document.querySelector('tbody');
        remove.forEach(item => {
            item.addEventListener('click', (evt) => {
                let element = evt.target.parentElement.parentElement;
                let id = element.id;
                this.removeCardItem(id);
                tbody.removeChild(element);
                this.calcTotal();
            });
        });
    }

    addEventCartControl = () => {
        let cartcontrol = document.querySelectorAll('.cart_quantity__2iMEW');
        let tbody = document.querySelector('tbody');
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
                        tbody.removeChild(productCart);
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
        let styleSideMenu=document.querySelector('.sideMenu_active__s1_Vn');
        if(styleSideMenu){
            styleSideMenu.classList.remove('sideMenu_active__s1_Vn');
        }
        document.querySelector('#cart').classList.add(`sideMenu_active__s1_Vn`);
    }

    componentDidMount() {
        this.calcTotal();
        this.addEventCartControl();
        this.addEventRemoveCart();
        this.addEventForLinkSideMenu();
    }

    render() {
        this.cart(this.props.match.params.id);
        this.renderCart(this.cartItem);
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
                                {this.renderCart(this.cartItem)}
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