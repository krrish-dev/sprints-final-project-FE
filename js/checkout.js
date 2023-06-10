// const { get, METHODS } = require("http");

class User {
fName;
lName;
userMail;
userMobile;
userAddress1;
userAddess2;
userCountry;
uerCity;
userState;
userZip;
isValid;
id;
token;
   constructor(){
      
      this.fName="";
      this.lName="";
      this.userMail="";
      this.userMobile="";
      this.userAddress1="";
      this.userAddess2="";
      this.userCountry="";
      this.uerCity="";
      this.userState="";
      this.userZip="";
    
   
   }

firstNameValidation = ()=>{
      let pattern = /^[A-Za-z]+$/;
      let fName = document.getElementById("fName").value;
      let fNameEror = document.getElementById("fNameCheck")

      if(fName.match(pattern)) {
           this.fName=fName;
           fNameEror.innerHTML=" Valid ";
           fNameEror.setAttribute('style', 'color:green !important'); 

              }
           else {
           
              fNameEror.innerHTML=" * Please enter a valid name ";
              fNameEror.setAttribute('style', 'color:red !important');   
           }
     
   }
lastNameValidation = ()=>{
     let pattern = /^[A-Za-z]+$/;
     let lName = document.getElementById("lName").value;
     let lNameEror = document.getElementById("lNameCheck")

     if(lName.match(pattern)) {
          this.lName=lName;
          
          lNameEror.innerHTML=" Valid ";
          lNameEror.setAttribute('style', 'color:green !important');   
             }
          else {
             lNameEror.innerHTML=" * Please enter a valid name ";
             lNameEror.setAttribute('style', 'color:red !important');   
          }
    
   }
mailInputvalidation = ()=>{

  let userMail = document.getElementById("userMail").value;
  let pattern =  /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
 let  mailEror = document.getElementById("mailCheck")

  if(userMail.match(pattern)) {
   this.userMail=userMail;
     mailEror.innerHTML="   Valid ";
     mailEror.setAttribute('style', 'color:green !important');   
        }
     else {
        
        mailEror.innerHTML=" * Please enter a vaild Email ";
        mailEror.setAttribute('style', 'color:red !important');   
     }

   }
MobileInputvalidation = ()=>{

     let userMobile = document.getElementById("userMobile").value;
     let pattern =  /^[0][1]\d{9}$/;
    let mobileError = document.getElementById("mobileCheck")

     if(userMobile.match(pattern)) {
      this.userMobile=userMobile;
      mobileError.innerHTML="  Valid ";
        mobileError.setAttribute('style', 'color:green !important');   
           }
        else {
           mobileError.innerHTML=" * Please enter a vaild phone number ";
           mobileError.setAttribute('style', 'color:red !important');   
     
        }
  
   }
address1Validation = ()=>{
        let pattern = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        let userAddress1 = document.getElementById("userAddress1").value;
       let userAddress1Eror = document.getElementById("userAddress1check");
  
        if(userAddress1.match(pattern)){
         this.userAddress1=userAddress1;
             userAddress1Eror.innerHTML=" Valid ";
             userAddress1Eror.setAttribute('style', 'color:green !important');   
                }
        else {
                userAddress1Eror.innerHTML=" * Please enter your Adress ";
                userAddress1Eror.setAttribute('style', 'color:red !important');   
             }
       
   }
zipInputvalidation = ()=>{

        let userZip = document.getElementById("userZip").value;
        // let pattern =  /^[0]?[789]\d{9}$/;
        let zipError = document.getElementById("zipCheck")
        
  
        if(userZip.length == 5) {
         this.userZip=userZip;
           zipError.innerHTML="  Valid ";
           zipError.setAttribute('style', 'color:green !important');   
              }
           else {
              zipError.innerHTML=" * Please enter a Zip code ";
              zipError.setAttribute('style', 'color:red !important');   
           }
     
   }
checkAllData=()=>{
      if (this.fName.match(/^[A-Za-z]+$/)&&this.lName.match(/^[A-Za-z]+$/)&&
      this.userMail.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)&&
       this.userMobile.match(/^[0][1]\d{9}$/)) return true;
       return false; 
   }
   setUserInfo(currentUser){
      document.getElementById("fName").value = currentUser.first_name;
      document.getElementById("lName").value = currentUser.last_name;
      document.getElementById("userMail").value = currentUser.email;
      this.fName = currentUser.first_name;
      this.lName = currentUser.last_name;
      this.userMail=currentUser.email;
      this.id = currentUser._id;
      this.token = currentUser.token;
   }
getUserData =()=>{

   return{
      first_name: this.fName,
      last_name: this.lName,
      email: this.userMail,
      mobile_number: this.userMobile,
      address1: this.userAddress1,
      address2: this.userAddess2,
      country: this.userCountry,
      city: this.uerCity,
      state: this.userState,
      zip_code: this.userZip
  }
   }
}


class CheckoutManger{
requestData;
  user;
  subTotal;
   totalPrice;
   tax;
   cartOrder;
   constructor(){
   this.subTotal= 0 ;
   this.totalPrice=0;
   this.tax=0;
   this.user = new User()
   this.cartOrder=[];
}
onloadCheckout=()=>{
   let currentUser = dm.getObject("User");
   if(!currentUser){
      window.location.replace("./login.html");
      return;
   }
   this.user.setUserInfo(currentUser);
   this.newCheckoutProducts();
   this.calcSubTotal();
}
newCheckoutProducts =()=> {
   
   const checkoutProduct = document.querySelector('div.checkoutProducts');
   let cartItems= cart.getUniqeCartItems();
   if(cartItems.size == 0){
      history.back();
      alert("Your cart is empty!");
      return;
   }
   cartItems.forEach((value, key ) =>{
     
   checkoutProduct.innerHTML+=
   `<div class="d-flex justify-content-between">
   <p>${value.productName} x (<span>${value.amount} </span> )</p>
   <p>$${(value.amount*value.price).toFixed(2)} </p>
   </div>`
   console.log(value.productName)
});
}

calcSubTotal=()=>{ 
   this.cartOrder=[];
   let item={};
   const checkoutSubTotal = document.querySelector('div.checkoutSubTotal');
   this.subTotal=0;
   let cartItems= cart.getUniqeCartItems();
for (const [key, value] of cartItems.entries()) {
   item.product_id = value.productId;
   item.price = value.price;
   item.qty = value.amount;
   this.cartOrder.push(item);
   item={}; 
  this.subTotal +=(value.price*value.amount)
  
 }
 checkoutSubTotal.innerHTML+=
      `<div >
      <h6>$${this.subTotal.toFixed(2)}</h6>
  </div>` 

};

taxCalc =() =>{
   const paypalchoic = document.querySelector('#paypal');
   const directchoic = document.querySelector('#directcheck');
   const bankchoic = document.querySelector('#banktransfer');
if (paypalchoic.checked === true) {
   
    this.tax = 0.1 * this.subTotal;
    this.totalPrice = this.tax + this.subTotal;

   console.log ("paypal", this.tax, this.totalPrice) 

}
else if (directchoic.checked === true){
   
   this.tax = 0.15 * this.subTotal;
   this.totalPrice = this.tax+ this.subTotal;
   console.log ("Direct transfer",  this.stax,this.totalPrice)
}
else if (bankchoic.checked === true){
   
   this.tax= 0.05 * this.subTotal;
   this.totalPrice = this.tax + this.subTotal;
   console.log ("Direct Bank", this.tax, this.totalPrice)
}
this.displayTax()
this.displayTotalPrice()
}
displayTax =() => {
   const checkoutTaxLable = document.querySelector('div.taxLable');
   checkoutTaxLable.innerHTML =`
   <h6 class="font-weight-medium ">Tax</h6>
   <h6 class="font-weight-medium">$${this.tax.toFixed(2)}</h6>
   `
};
displayTotalPrice =() => {
   const checkoutTaxLable = document.querySelector('div.totalPriceLable');
   checkoutTaxLable.innerHTML =`
   
   <h5>Total</h5>
   <h5 class="font-weight-medium">$${this.totalPrice.toFixed(2)}</h5>
   `
};
 checkout= async()=>{
   if (!this.user.checkAllData()) {
      alert("please enter a valid data" )
      return;
   }
   let requestBody= {
      sub_total_price : this.subTotal,
       shipping : 10,
      total_price: this.totalPrice,
      user_id:this.user.id,
      order_date: new Date().toDateString(),
      order_details:this.cartOrder,
      shipping_info:this.user.getUserData(),
   } 
   service.setToken(this.user.token);
   let response;
   try{
      response = await service.postRequest(api.orders,requestBody);
      if(response.status != "success") throw("Error occured while placing order.");
      alert("Your Order Placed Successfully");
      window.location.replace("./index.html");
      dm.remove(cart.cartKey);

   }catch(err){
      alert(err);
   }
}  
}
let checkoutManger = new CheckoutManger();

let x= localStorage.getItem("User");

(function(){
    
    if(!x){
        if (confirm("You will need to login first to proceed.")) {
            location.href = 'login.html';
           
          } else{
           location.href = 'index.html';
          }
    }
    })();