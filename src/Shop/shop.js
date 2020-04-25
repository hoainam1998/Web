import React, { Component } from 'react';
import style from './shop.module.css';
import ProductShow from './productshow.js';
import ProductData from '../product.json';

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 1
        }
    }

    componentDidMount() {
        this.addEventforLink();
        this.addEventforLabel();
        this.addEventforPriceRange();
        this.addEventForLinkSideMenu();
    }

    linklist = [];
    addEventforLink = () => {
        const linkCategory = (document.querySelectorAll('.shop_category__8yVzD ul li'));
        this.linklist = [...linkCategory];
        linkCategory.forEach(link => {
            link.addEventListener('click', (evt) => {
                this.setState({ id: link.id });
                document.querySelector('.shop_colorLink__hoBUI').classList.remove('shop_colorLink__hoBUI');
                link.classList.add(`${style.colorLink}`);
            }
            );
        });
    }

    addEventForLinkSideMenu = () => {
        let styleSideMenu=document.querySelector('.sideMenu_active__1xRv3');
        if(styleSideMenu){
            styleSideMenu.classList.remove('sideMenu_active__1xRv3');
        }
        document.querySelector('#shop').classList.add(`sideMenu_active__1xRv3`);
    }

    addEventforLabel = () => {
        const labels = document.querySelectorAll('.shop_category__8yVzD form fieldset label');
        labels.forEach(label => {
            label.onclick = () => {
                label.previousElementSibling.click();
            }
        });
    };

    addEventforPriceRange = () => {
        const range = document.querySelector('input[type="range"]');
        const value = document.querySelector('#value');
        value.innerHTML = range.value;
        range.oninput = () => {
            value.innerHTML = range.value;
        }
    };

    render() {
        let product = ProductData[this.state.id];
        return (
            <div className={style.reserver}>
                <div className={style.category}>
                    <h3>Categories</h3>
                    <ul>
                        <li id="1" className={style.colorLink}>Chairs</li>
                        <li id="2">Bed</li>
                        <li id="3">Accesories</li>
                        <li id="4">Furniture</li>
                        <li id="5">Home Deco</li>
                        <li id="6">Dressings</li>
                        <li id="7">Tables</li>
                    </ul>

                    <h3>Brands</h3>
                    <form>
                        <fieldset>
                            <input type="checkbox" ></input>
                            <label >Amado</label>
                        </fieldset>

                        <fieldset>
                            <input type="checkbox" ></input>
                            <label >Ikea</label>
                        </fieldset>

                        <fieldset>
                            <input type="checkbox" ></input>
                            <label >Furniture Inc</label>
                        </fieldset>

                        <fieldset>
                            <input type="checkbox" ></input>
                            <label >The Factory</label>
                        </fieldset>

                        <fieldset>
                            <input type="checkbox" ></input>
                            <label >Artdeco</label>
                        </fieldset>
                    </form>

                    <h3>Color</h3>
                    <div className={style.color}>
                        <div>
                            <span style={{ backgroundColor: "#ffffff" }}></span>
                            <span style={{ backgroundColor: "#fff56a" }}></span>
                            <span style={{ backgroundColor: "black" }}></span>
                            <span style={{ backgroundColor: "blue" }}></span>
                        </div>
                        <div>
                            <span style={{ backgroundColor: "#fd7e14" }}></span>
                            <span style={{ backgroundColor: "#e83e8c" }}></span>
                            <span style={{ backgroundColor: "#6f42c1" }}></span>
                            <span style={{ backgroundColor: "#dc3545" }}></span>
                        </div>
                    </div>

                    <h3>Price</h3>
                    <input type="range" min="10" max="1000" className={style.slider} id="myRange"></input>
                    <p>$<span id="value"></span> - $1000</p>
                </div>
                <ProductShow data={product}></ProductShow>
                <div className="clearfix"></div>
            </div>
        );
    }

};

export default Shop;