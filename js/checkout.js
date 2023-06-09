// const { get, METHODS } = require("http");

// class UserInfo {
//     constructor (fdName)
// }


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
taxCalc =() =>{
   const paypalchoic = document.querySelector('#paypal');
   const directchoic = document.querySelector('#directcheck');
   const bankchoic = document.querySelector('#banktransfer');
if (paypalchoic.checked === true) {
   console.log ("paypal")
}
else if (directchoic.checked === true){
   console.log ("Direct transfer")
}
else if (bankchoic.checked === true){
   console.log ("Direct Bank")
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