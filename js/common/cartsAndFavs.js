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
        this.#afterChanges();
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
    #afterChanges(){
        dm.saveObject(this.cartKey, this.cartItems);
        this.cartItemsCount = this.cartItems.length;
        this.#updateCartIconCounter();
    }
    removeItemFromCart(productId){
        debugger;
        this.cartItems = this.cartItems.filter((cartItem)=>{
            console.log(cartItem.productName);
            return cartItem.productId != productId;
        });
        this.#afterChanges();
    }
    removeItemAmountFromCart(productId, count){
        this.cartItems = this.cartItems.filter((cartItem)=>{
            if(count > 0 ){
                if(cartItem.productId == productId) count--;
                return cartItem.productId != productId
            }
            return true;
        });
        this.#afterChanges();
    }
    incrementItemInCart(cartItem){
        this.cartItems.push(cartItem);
        this.#afterChanges();
    }
    getUniqeCartItems(){
        this.getCart();
        let cartMap = new Map();
        let tempItem;
        for(let item of this.cartItems){
            if(cartMap.has(item.productId)){
                tempItem = cartMap.get(item.productId);
                tempItem.amount += 1;
            }
            else{
                cartMap.set(item.productId, item);
            }
        }
        cartMap.forEach((value, key)=>{
            console.log(`${value.productName} - ${value.amount}`);
        });
    }
}
let cart = new Cart()

class Favourites{

}