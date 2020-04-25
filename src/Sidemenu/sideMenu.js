import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './sideMenu.module.css';

class SideMenu extends Component {

    linklist = [];

    render() {
        return (
            <div>
                <div className={style.header}>
                    <img src={require("../images/logo.png")} alt="logoResponsive"></img>
                    <i className="fas fa-bars" onClick={this.barheaderClick}></i>
                </div>
                <div className={style.sideMenu + " " + style.sideMenuAppear}>
                    <img src={require("../images/logo.png")} alt="logo1"></img>
                    <nav className={style.navigator}>
                        <ul id="linklist">
                            <Link id="home" className={style.active} to={"/"}><li>Home</li></Link>
                            <Link id="shop" to={`/shop`}><li>Shop</li></Link>
                            {/* <Link id="product" to={`/product`}><li>Product</li></Link> */}
                            <Link id="cart" to={`/cart`}><li>Cart</li></Link>
                            {/* <Link id="checkout" to={`/checkout`}><li>Checkout</li></Link> */}
                        </ul>
                    </nav>
                    <div>
                        <button className={style.discountBtn}>
                            %Discount%
                        </button>
                        <button className={style.newproductBtn}>
                            New this week
                        </button>
                    </div>
                    <div className={style.cart_fav_search}>
                        <span><i className="fas fa-shopping-cart"></i>Cart <span id="amount">(0)</span></span>
                        <span><i className="far fa-star"></i>favourite</span>
                        <span><i className="fas fa-search"></i>search</span>
                    </div>
                    <div className={style.socila_info}>
                        <i className="fab fa-pinterest"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-twitter"></i>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.addEventforLink();
    }

    addEventforLink = () => {
        const a = document.querySelectorAll('#linklist a');
        this.linklist = [...a];

        a.forEach(item => {
            item.addEventListener('click', (evt) => {
                let styleSideMenu=document.querySelector('.sideMenu_active__s1_Vn');
                if(styleSideMenu){
                    styleSideMenu.classList.remove('sideMenu_active__s1_Vn');
                }
                item.classList.add(`sideMenu_active__s1_Vn`);
            });
        });
    }

    barheaderClick = () => {
        document.querySelector('.sideMenu_sideMenu__1HpcT')
            .classList.toggle(`${style.sideMenuAppear}`);

        document.querySelector('.sideMenu_sideMenu__1HpcT')
            .classList.toggle(`${style.sideMenuDisappear}`);
    }
}

export default SideMenu;