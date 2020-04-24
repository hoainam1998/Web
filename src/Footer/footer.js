import React from 'react';
import style from './footer.module.css';
import {Link} from 'react-router-dom';

const footer = () => {
    return (
        <footer>
            <div className={style.discount}>
                <div className={style.contentDiscount}>
                    <h1>Subscribe for a <span>25% Discount</span></h1>
                    <p>Quisque velit nisi, pretium ut lacinia in, elementum id enim.
                    Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.
                </p>
                </div>
                <div className={style.email}>
                    <input type="text" className={style.emailbox} placeholder="Your Email"></input>
                    <input type="submit" className={style.subcribeBtn} value="Subcribe"></input>
                </div>
            </div>
            <div className={style.copyright_navigator}>
                <div className={style.copyright}>
                    <img src={require("../images/logo2.webp")} alt="logo"></img>
                    <p>Copyright ©2020 All rights reserved | This template is made with <i className="far fa-heart"></i> by Colorlib</p>
                </div>
                <i className="fas fa-bars" onClick={clickBar}></i>
                <div className={style.navigator}>
                    <ul>
                        <Link to={`/`}><li>home</li></Link>
                        <Link to={`/shop`}><li>shop</li></Link>
                        <Link to={`/cart`}><li>cart</li></Link>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

const clickBar=()=>{
    document.getElementsByClassName('footer_navigator__2UJV-')[0].classList.toggle("is-visible");
}

export default footer;