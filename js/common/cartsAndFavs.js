class Cart{
    cartKey;
    cartItems;
    cartItemsCount;
    constructor(){
        this.cartKey = "cart";
       this.getCart();
    }
    addToCart(product){
        this.cartItems.push(this.#getCartItemFromProduct(product));
        this.cartItemsCount = this.cartItems.length;
        this.#updateCartIconCounter();
        dm.saveObject(this.cartKey,this.cartItems);
    }

    getCart(){
        this.cartItems = dm.getObject(this.cartKey)?? [];
        this.cartItemsCount = this.cartItems.length;
        this.#updateCartIconCounter();
    }

    #getCartItemFromProduct(product){
        return {
            productId: product.id,
            amount: 1,
            price: product.afterDiscount,
            productName: product.name
        };
    }
    #updateCartIconCounter(){
       let cartIcons = document.getElementsByClassName("cartIcon");
       for (var i = 0; i < cartIcons.length; i++) {
        cartIcons[i].innerHTML = this.cartItemsCount;
      }
    }
}
let cart = new Cart()

class Favourites{

}