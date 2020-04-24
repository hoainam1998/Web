import React from 'react';
import style from './home.module.css';
import ProductData from '../product.json';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    ProductSlice = (arrname) => {
        switch (arrname) {
            case "row1": {
                return ProductData.slice(0, 3);
            }

            case "row2": {
                return ProductData.slice(3, 6);
            }

            case "row3": {
                return ProductData.slice(6, ProductData.length - 1);
            }

            default: { return []; }
        }
    }

    renderItem = (item, left, top, height) => {
        return (
            <Link key={"row" + item.id} to={"/shop"}>
                <div className={style.product} style={{ left: left + 'px', top: top + 'px' }}>
                    <img src={require(`../images/${item.images[0]}`)} style={{ height: height + 'px' }} alt="product"></img>
                    <div className={style.cardHover} style={{ left: 0 + 'px', top: 0 + 'px' }}>
                        <div></div>
                        <span>From ${item.price}</span>
                        <h2>{item.name}</h2>
                    </div>
                </div>
            </Link>
        );
    };

    RenderRow1 = () => {
        const arr = this.ProductSlice("row1");
        const product = arr.map((item, pos) => {
            switch (pos) {
                case 0: { return (this.renderItem(item, 0, 0, 300)); }
                case 1: { return (this.renderItem(item, 315, 0, 400)); }
                case 2: { return (this.renderItem(item, 630, 0, 300)); }
                default: { return null }
            }
        });
        return product;
    };

    RenderRow2 = () => {
        const arr = this.ProductSlice("row2");
        const product = arr.map((item, pos) => {
            switch (pos) {
                case 0: { return (this.renderItem(item, 0, 300, 400)); }
                case 1: { return (this.renderItem(item, 315, 400, 350)); }
                case 2: { return (this.renderItem(item, 630, 300, 400)); }
                default: { return null }
            }
        });
        return product;
    };

    RenderRow3 = () => {
        const arr = this.ProductSlice("row3");
        const product = arr.map((item, pos) => {
            switch (pos) {
                case 0: { return (this.renderItem(item, 0, 700, 300)); }
                case 1: { return (this.renderItem(item, 315, 750, 250)); }
                case 2: { return (this.renderItem(item, 630, 700, 300)); }
                default: { return null }
            }
        });
        return product;
    };

    Render = () => {
        const arr1 = this.RenderRow1();
        const arr2 = this.RenderRow2();
        const arr3 = this.RenderRow3();

        const product = [...arr1, ...arr2, ...arr3];

        return product;
    }

    componentDidMount(){
        this.addEventForLinkSideMenu();
    }

    addEventForLinkSideMenu = () => {
        let styleSideMenu=document.querySelector('.sideMenu_active__s1_Vn');
        if(styleSideMenu){
            styleSideMenu.classList.remove('sideMenu_active__s1_Vn');
        }
        document.querySelector('#home').classList.add(`sideMenu_active__s1_Vn`);
    }

    render() {
        return (
            <div className={style.home_product}>
                {this.Render()}
            </div>
        );
    }
}

export default Home;