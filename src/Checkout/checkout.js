import React from 'react';
import style from './checkout.module.css';

class Checkout extends React.Component {

    componentDidMount() {
        this.addEventForLinkSideMenu();
        this.addEventforCountryChoiseBox();
        this.addEventforDropdownMenuValueChange();
        this.changeValueCartInSideMenu();
        this.addEventforCheckBox();
    }

    addEventForLinkSideMenu = () => {
        document.querySelector('.sideMenu_active__s1_Vn').classList.remove('sideMenu_active__s1_Vn');
    }

    addEventforCountryChoiseBox = () => {
        let $icon = document.querySelector('.fa-angle-down');
        let $choisebox = document.querySelector('.checkout_dropdownMenu__2ICbi');
        $icon.onclick = () => {
            $icon.classList.toggle(`${style.rotate}`);
            $choisebox.classList.toggle('is-visible');
        }
    }

    addEventforDropdownMenuValueChange = () => {
        let $value = document.querySelectorAll('.checkout_dropdownMenu__2ICbi ul li');
        let $text = document.querySelector('#valuetext');
        $value.forEach(item => {
            item.onclick = () => {
                let oldvalue = document.querySelector('.checkout_changeColor__1lLA5');
                if (oldvalue) {
                    oldvalue.classList.remove('checkout_changeColor__1lLA5');
                }
                $text.innerText = item.innerText;
                item.classList.add(`${style.changeColor}`);
            }
        })
    }

    addEventforCheckBox=()=>{
        let $paybycash=document.querySelector('#paybycash');
        let $paybycredit=document.querySelector('#paybycredit');
        $paybycash.onclick=()=>{
            $paybycredit.checked=false;
        }
        $paybycredit.onclick=()=>{
            $paybycash.checked=false;
        }
    }

    changeValueCartInSideMenu=()=>{
        document.querySelector('#amount').innerText=`(${this.props.match.params.quantity})`; 
    }

    render() {
        let total = this.props.match.params.total;
        return (
            <div>
                <div className={style.container}>
                    <h1>Checkout</h1>
                    <div className={style.layout}>
                        <div className={style.infor}>
                            <form>
                                <fieldset>
                                    <input type="text" placeholder="First Name"></input>
                                    <input type="text" placeholder="Last Name"></input>
                                </fieldset>
                                <fieldset>
                                    <input type="text" placeholder="Company Name"></input>
                                </fieldset>
                                <fieldset>
                                    <input type="mail" placeholder="Email"></input>
                                </fieldset>
                                <fieldset>
                                    <div><span id="valuetext">United State</span><i className="fas fa-angle-down"></i></div>
                                    <div className={style.dropdownMenu}>
                                        <ul>
                                            <li>Country 1</li>
                                            <li>Country 2</li>
                                            <li>Country 3</li>
                                            <li>Country 4</li>
                                            <li>Country 5</li>
                                            <li>Country 6</li>
                                            <li>Country 7</li>
                                        </ul>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <input type="text" placeholder="Address"></input>
                                </fieldset>
                                <fieldset>
                                    <input type="text" placeholder="Town"></input>
                                </fieldset>
                                <fieldset>
                                    <input type="text" placeholder="Zip Code"></input>
                                    <input type="number" placeholder="Phone No"></input>
                                </fieldset>
                                <fieldset>
                                    <textarea placeholder="Please a comment about your order">

                                    </textarea>
                                </fieldset>
                                <fieldset>
                                    <input type="checkbox"></input>
                                    <label>Create an accout</label>
                                </fieldset>
                                <fieldset>
                                    <input type="checkbox"></input>
                                    <label>Ship to a different address</label>
                                </fieldset>
                            </form>
                        </div>
                        <div className={style.cartTotal}>
                            <h2>cart total</h2>
                            <div><span>Subtotal</span><span>$ {total}</span></div>
                            <div><span>Delivery</span><span>Free</span></div>
                            <div><span>Total</span><span>$ {total}</span></div>
                            <fieldset>
                                <input id="paybycash" type="checkbox" name="pay" defaultChecked></input>
                                <label>Cash on Delivery</label>
                            </fieldset>
                            <fieldset>
                                <input id="paybycredit" type="checkbox" name="pay"></input>
                                <label>Paypal <img src={require(`../images/paypal.png`)} alt="paypal"></img></label>
                            </fieldset>
                            <button>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Checkout;