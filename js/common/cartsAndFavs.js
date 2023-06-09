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

    addToCartByValues(id, amount, price, productName, img){
        let cartObj = {productId: id, amount: amount, price:price, productName:productName, img:img}
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
            productName: product.name,
            img: product.image
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
        this.cartItems = this.cartItems.filter((cartItem)=>{
            console.log(cartItem.productName);
            return cartItem.productId != productId;
        });
        this.#afterChanges();
    }
    decrementItemAmount(productId){
        for(let i = 0; i<this.cartItems.length; i++){
            if(this.cartItems[i].productId == productId){
                this.cartItems.splice(i, 1);
                break;
            }
        }
        this.#afterChanges();
    }
    setProductAmount(productid, amount){
        let newList = [];
        let item;
        for(let cartItem of this.cartItems){
            if(cartItem.productId != productid){
                newList.push(cartItem);
                continue;
            }
            if(amount == 0) continue;
            item = item ?? cartItem;
            newList.push(cartItem);
            amount--;
        }
        for(let i=0; i<amount && item; i++)newList.push(item);
        this.cartItems = newList;
        this.#afterChanges();
    }

    incrementItemInCart(cartItem){
        cartItem.amount = 1;
        this.cartItems.push(cartItem);
        this.#afterChanges();
    }
    /**
     * @param {bool} getAsArray optional
     */
    getUniqeCartItems(getAsArray){
        getAsArray = getAsArray ?? false;
        this.getCart();
        let cartMap = new Map();
        let tempItem;
        for(let item of this.cartItems){
            if(cartMap.has(item.productId)){
                tempItem = cartMap.get(item.productId);
                tempItem.amount += 1;
            }
            else{
                cartMap.set(item.productId, {...item});
            }
        }
        if(getAsArray) return Array.from(cartMap.values);
        return cartMap;
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