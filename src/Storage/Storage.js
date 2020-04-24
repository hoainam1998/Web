class Storage {
    static saveCart(cart){
        localStorage.setItem("cart",JSON.stringify(cart));
    }

    static getCart(){
        let listItem=localStorage.getItem("cart")?JSON.parse(localStorage.getItem('cart')):[];
        return listItem;
    }
}

export default Storage;