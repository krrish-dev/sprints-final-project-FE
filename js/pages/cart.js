

class CartManager{
    #amountPostFix = "amount"; //text field
    #minusPostFix = "m";
    #addPostFix = "p";
    #cartItems;
    constructor(){
        this.#cartItems = new Map();
    }
    onLoad(){
        this.#cartItems = cart.getUniqeCartItems();
        this.buildCartProducts();
    }
    buildCartProducts(){
        let tableBody = document.getElementById("products");
        let subTotalRef = document.getElementById('sub-total');
        let subTotal = 0;
        tableBody.innerHTML = "";
        for(let [key, value] of this.#cartItems.entries()){
            tableBody.appendChild(this.#buildCartItem(value));
            subTotal = subTotal + (value.price * value.amount);
        }
        subTotalRef.innerText = `$${subTotal}`;
    }
    #buildCartItem(product, justContent){
        
        let cartItem = `<td class="align-middle" style="text-align: left;">
          <img src="${product.img??"img/product-1.jpg"}" alt="" style="width: 50px"/>
          ${product.productName}
        </td>
        <td class="align-middle">$${product.price}</td>
        <td class="align-middle">
          <div class="input-group quantity mx-auto" style="width: 100px">
            <div class="input-group-btn">
              <button type="button"
              id = "${product.productId}m" 
              class="decBtn btn btn-sm btn-primary btn-minus" 
              onclick="cartManager.amountButtonsAction('${product.productId}', -1)" ${product.amount<=1?"disabled":""}>
                <i class="fa fa-minus"></i>
              </button>
            </div>
            <input
              type="text"
              id="${product.productId}amount"
              class="quantityVal form-control form-control-sm bg-secondary border-0 text-center"
              value=${product.amount}
              onchange="cartManager.changeAmount('${product.productId}')"/>
            <div class="input-group-btn">
              <button
                type="button"
                id = "${product.productId}p" 
                class="incBtn btn btn-sm btn-primary btn-plus"
                onclick="cartManager.amountButtonsAction('${product.productId}', 1)">
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </td>
        <td class="align-middle">$${(product.price * product.amount).toFixed(2)}</td>
        <td class="align-middle">
          <button class="btn btn-sm btn-danger" type="button" onclick="cartManager.deleteItem('${product.productId}')">
            <i class="fa fa-times"></i>
          </button>
        </td>`;
        if(justContent) return cartItem;
        let item = document.createElement('tr');
        item.setAttribute('id', product.productId);
        item.innerHTML = cartItem;
        return item;
    }                                                                                           

    amountButtonsAction(id, amount){
      if(amount > 0){
        cart.incrementItemInCart({...this.#cartItems.get(id)});
        this.#cartItems.get(id).amount +=1;
        document.getElementById(this.getId(id,this.#minusPostFix)).disabled = false;
      }else{
        if(this.#cartItems.get(id).amount <= 1) return;
        cart.decrementItemAmount(id);
        this.#cartItems.get(id).amount -=1; 
        document.getElementById(this.getId(id,this.#minusPostFix)).disabled = this.#cartItems.get(id).amount <=1;
      }
      this.#refreshItemRow(this.#cartItems.get(id));
      this.#updateSubTotal();
    }
    changeAmount(id){
      let amoutInputRef = document.getElementById(this.getId(id,this.#amountPostFix));
      let amount = Number(amoutInputRef.value);
      if(isNaN(amount)){
        amoutInputRef.value = this.#cartItems.get(id).amount;
        alert("Really!");
        return;
      }
      if( amount < 1){
        amoutInputRef.value = this.#cartItems.get(id).amount;
        return;
      }
      cart.setProductAmount(id, amount);
      debugger;
      this.#cartItems.get(id).amount = amount;
      this.#refreshItemRow(this.#cartItems.get(id));
      this.#updateSubTotal();
    }
    deleteItem(id){
      cart.removeItemFromCart(id);
      this.#cartItems.delete(id);
      document.getElementById(id).remove();
      this.#updateSubTotal();
    }
    getId(id, postFix){
        return `${id}${postFix}`;
    }


    #updateSubTotal(){
      let subTotalRef = document.getElementById('sub-total');
      let subTotal = 0;
      for(let [key, value] of this.#cartItems.entries()){
          subTotal = subTotal + (value.price * value.amount);
      }
      subTotalRef.innerText = `$${subTotal.toFixed(2)}`;
    }
    #refreshItemRow(product){
      
      let content = this.#buildCartItem(product, true);
      let itemRow = document.getElementById(product.productId);
      itemRow.innerHTML = content;
    }
    proceedToCheckOut(){
     if(!dm.getObject("User")){
      window.location.replace("./login.html");
      return;
     }
      if(this.#cartItems.size == 0) {
         alert("The Cart is Empty!");
         return;
      }
      window.location.href = "./checkout.html";
      console.log("fdfd");
    }
}
let cartManager = new CartManager();