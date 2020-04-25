import React from 'react';
import ProductData from '../product.json';
import style from './product.module.css';
import { Link } from 'react-router-dom';

class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imagesSrc: this.product.images[0],
            amount: 1
        }
    }

    product = ProductData.find(item => item.id === parseInt(this.props.match.params.id));
    Quantity = 1;


    renderImages = () => {
        return this.product.images.map((item, pos) => {
            return <li key={pos}>
                <div>
                    <img src={require(`../images/${item}`)} alt={`${item}`}></img>
                </div>
            </li>
        })
    }

    componentDidMount() {
        this.addEventForCollection();
        this.addEventforQuantityControl();
        this.addEventForLinkSideMenu();
    }

    addEventforQuantityControl() {
        let $btn_updown = document.querySelector('#up_down');
        let $value = document.querySelector('#value');
        $btn_updown.addEventListener('click', (evt) => {
            let element = evt.target;
            if (element.id === "up") {
                let quantity = parseInt($value.innerText);
                $value.innerText = quantity + 1;
            } else {
                let quantity = parseInt($value.innerText);
                if (quantity <= 1) {
                    $value.innerText = 1;
                } else {
                    $value.innerText = quantity - 1;
                }
            }
            this.setState({amount:parseInt($value.innerText)});
        });

    }

    addEventForCollection = () => {
        let $listImg = document.querySelectorAll('.product_imagesCollection__1jC7y li div img');

        let styleForimg = "2px solid var(--primarycolor)";
        $listImg.forEach(item => {
            item.addEventListener('click', () => {
                let imgstyle = Array.from($listImg).find(item => item.style.border === styleForimg);
                if (imgstyle !== undefined) {
                    imgstyle.style.border = "none";
                }
                item.style.border = styleForimg;
                let newsrc = item.attributes.alt.value;
                this.setState({ imagesSrc: newsrc });
            })
        })
    }

    addEventForLinkSideMenu = () => {
        document.querySelector('.sideMenu_active__3D3fU').classList.remove('sideMenu_active__3D3fU');
    }

    render() {
        return (
            <div>
                <div className={style.container}>
                    <p><span>Home </span> ><span>Furniture </span> ><span>Chairs </span> ><span>modern Chairs</span></p>
                    <div className={style.images_infor}>
                        <div className={style.images}>
                            <img src={require(`../images/${this.state.imagesSrc}`)} alt="largeImg"></img>
                            <ul className={style.imagesCollection}>
                                {this.renderImages()}
                            </ul>
                        </div>
                        <div className={style.productInfor}>
                            <div></div>
                            <span>$ {this.product.price}</span>
                            <span>{this.product.name}</span>
                            <div className={style.evaluate}>
                                <span>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </span>

                                <span>Write A Review</span>
                            </div>
                            <span className={style.instock}>
                                <i className="fas fa-circle" style={{
                                    color: "#20d34a",
                                    fontSize: "12px"
                                }}></i>
                                <span>In Stock</span>
                            </span>
                            <p>{this.product.description}</p>
                            <div className={style.quantity}>
                                <span>Qty</span><span id="value">1</span>
                                <span id="up_down">
                                    <i id="up" style={{ cursor: "pointer" }} className="fas fa-caret-up"></i>
                                    <i id="down" style={{ cursor: "pointer" }} className="fas fa-caret-down"></i>
                                </span>
                            </div>
                            <Link to={`/cart/${this.product.id}/${this.state.amount}`} style={{textDecoration: "none"}}>
                                <button className={style.btn_addtocart}>Add to cart</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="clearfix"></div>
            </div>
        );
    }
}

export default Product;