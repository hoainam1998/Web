import React, { Component } from 'react';
import style from './productshow.module.css';
import { Link } from 'react-router-dom';

class ProductShow extends Component {

    addEventforLinkToCart = () => {
        document.querySelector('#cart').classList.add(`sideMenu_active__s1_Vn`);
        document.querySelector('.sideMenu_active__s1_Vn').classList.remove('sideMenu_active__s1_Vn');
    }

    render() {
        let product = this.props.data;
        return (
            <div className={style.productshow}>
                <h3>SHOWING 1-8 0F 25</h3>
                <div className={style.flexContainer}>
                    <div className={style.display}>
                        <span><i className="fas fa-th-large"></i></span>
                        <span><i className="fas fa-bars"></i></span>
                    </div>
                    <div className={style.option}>
                        <form>
                            <fieldset>
                                <label>Sort by</label>
                                <select>
                                    <option>Date</option>
                                    <option>Newest</option>
                                    <option>Popular</option>
                                </select>
                            </fieldset>

                            <fieldset>
                                <label>View</label>
                                <select>
                                    <option>12</option>
                                    <option>24</option>
                                    <option>48</option>
                                </select>
                            </fieldset>
                        </form>
                        <div className="clearfix"></div>
                    </div>
                </div>
                <div className={style.main}>
                    {
                        product.images.map((item, pos) => {
                            return (
                                <div key={pos + 1} className={style.product}>
                                    <Link to={`/product/${product.id}`}>
                                        <img src={require(`../images/${item}`)} alt="itemImages"></img>
                                    </Link>
                                    <div className={style.info}>
                                        <div className={style.price_name}>
                                            <div></div>
                                            <span>$ {product.price}</span>
                                            <span>{product.name}</span>
                                        </div>
                                        <div className={style.cart}>
                                            <span>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </span>
                                            <Link to={`/cart/${product.id}/${product.quantity}`} onClick={this.addEventforLinkToCart}>
                                                <img src={require("../images/cart.webp")} alt="addtocart"></img>
                                                <span>Add to cart</span>
                                            </Link>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
};

export default ProductShow;