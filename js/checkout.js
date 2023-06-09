// const { get, METHODS } = require("http");
var subTotal= 0 ;
var totalPrice=0;
var tax=0;

arr =[
   {name:"Product Test A", count:"2", price:250},
   {name:"Product Test B", count:"5", price:250},
   {name:"Product Test C", count:"10", price:100},
   {name:"Product Test D", count:"15", price:100},
   {name:"Product Test E", count:"20", price:50}
]
checkoutProducts =()=> {
   const checkoutProduct = document.querySelector('div.checkoutProducts');
   arr.forEach((name, i ) =>{
   checkoutProduct.innerHTML+=
   `<div class="d-flex justify-content-between">
   <p>${arr[i].name} x (<span>${arr[i].count} </span> )</p>
   <p>$${arr[i].price} </p>
   </div>`
});
console.log(checkoutProduct)
}
checkoutProducts()

subTotal = () =>{ 
   const checkoutSubTotal = document.querySelector('div.checkoutSubTotal');
   subTotal=0;
   for (let i = 0; i < arr.length; i++) {
       subTotal +=arr[i].price;
   }
   checkoutSubTotal.innerHTML+=
      `<div >
      <h6>$${subTotal}</h6>
  </div>`  
};
subTotal();

taxCalc =() =>{
   const paypalchoic = document.querySelector('#paypal');
   const directchoic = document.querySelector('#directcheck');
   const bankchoic = document.querySelector('#banktransfer');
if (paypalchoic.checked === true) {
   
    tax = 0.1 * subTotal;
    totalPrice = tax + subTotal;

   console.log ("paypal", tax, totalPrice) 

}
else if (directchoic.checked === true){
   
    tax = 0.15 * subTotal;
    totalPrice = tax+ subTotal;
   console.log ("Direct transfer", tax, totalPrice)
}
else if (bankchoic.checked === true){
   
    tax= 0.05 * subTotal;
    totalPrice = tax + subTotal;
   console.log ("Direct Bank", tax, totalPrice)
}
displayTax()
displayTotalPrice()
}
displayTax =() => {
   const checkoutTaxLable = document.querySelector('div.taxLable');
   checkoutTaxLable.innerHTML =`
   <h6 class="font-weight-medium ">Tax</h6>
   <h6 class="font-weight-medium">$${tax}</h6>
   `
};
displayTotalPrice =() => {
   const checkoutTaxLable = document.querySelector('div.totalPriceLable');
   checkoutTaxLable.innerHTML =`
   
   <h5>Total</h5>
   <h5 class="font-weight-medium">$${totalPrice}</h5>
   `
};

firstNameValidation = ()=>{
       let pattern = /^[A-Za-z]+$/;
       let fName = document.getElementById("fName").value;
       fNameEror = document.getElementById("fNameCheck")

       if(fName.match(pattern)) {

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
      lNameEror = document.getElementById("lNameCheck")

      if(lName.match(pattern)) {

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
   mailEror = document.getElementById("mailCheck")

   if(userMail.match(pattern)) {
      
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
      // let pattern =  /^[0]?[789]\d{9}$/;
      mobileError = document.getElementById("mobileCheck")

      if(!isNaN(userMobile) && userMobile.length== 10 && userMobile.includes("+")) {
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
         userAddress1Eror = document.getElementById("userAddress1check");
   
         if(userAddress1.match(pattern)){
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
         zipError = document.getElementById("zipCheck")
         
   
         if(userZip.length == 5) {
            zipError.innerHTML="  Valid ";
            zipError.setAttribute('style', 'color:green !important');   
               }
            else {
               zipError.innerHTML=" * Please enter a Zip code ";
               zipError.setAttribute('style', 'color:red !important');   
            }
      
    }


// getSelectedCountry = ()=>{
//     document.getElementById("userMail").selectedOptions.value
    
// }

// addTax =()=>{

//     if (document.getElementById("paypal-choice").value == true) {
//         document.getElementById("result").innerHTML="";
//     }
//     elseif (document.getElementById("directcheck-choice").value == true)
//         {
//     }
//     elseif (document.getElementById("banktransfer-choice").value == true)
//     {
// }

// }

// cart
// {}
// { 1 : { name: "uudfd", }}
// map.forEach((key, value) =>{ });
// value.productName
// value.price;
// value.amount;
// value.productId