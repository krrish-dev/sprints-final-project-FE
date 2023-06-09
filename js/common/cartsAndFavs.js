class Cart{
    cartKey;
    cartItems;
    cartItemsCount;
    constructor(){
        this.cartKey = "cart";
       this.getCart();
    }
    addToCartFromProductObj(product){
        this.cartItems.push(this.#getCartItemFromProduct(product));
        this.#afterChanges();
    }

    addToCartByValues(id, amount, price, productName){
        let cartObj = {id: id, amount: amount, price:price, productName:productName}
        this.cartItems.push(cartObj);
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
   favesKey;
   #favsList;
   constructor(){
    this.favesKey = "favourites";
    this.#favsList = dm.getObject(this.favesKey)?? []; 
    this.#refreshFavsIcon();
   } 

   addToFavsToggel(productId){
        let isFound = false;
        for(let i = 0; i<this.#favsList.length; i++){
            if(this.#favsList[i] == productId){
                this.#favsList.splice(i, 1);
                isFound = true;
                break;
            }
        }
        if(!isFound) this.#favsList.push(productId);
        dm.saveObject(this.favesKey, this.#favsList);
        this.#refreshFavsIcon();
        return isFound;
   }
   addToFavsToggel1(productId, fave){
    let isFound = false;
    for(let i = 0; i<this.#favsList.length; i++){
        if(this.#favsList[i] == productId){
            this.#favsList.splice(i, 1);
            isFound = true;
            break;
        }
    }
    if(!isFound) this.#favsList.push(productId);
    dm.saveObject(this.favesKey, this.#favsList);
    this.#refreshFavsIcon();
    fave.innerHTML = isFound?`<i class="far fa-heart"></i>`:`<i class="fa fa-heart"></i>`;
    return isFound;
}

   isFavourite(productId){
       return this.#favsList.includes(productId);
   }
   #refreshFavsIcon(){
    let favsIcon = document.getElementsByClassName('favsIcon');
    for (var i = 0; i < favsIcon.length; i++) {
        favsIcon[i].innerHTML = this.#favsList.length;
      }
   }
}
let favourites = new Favourites();