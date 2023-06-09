let returnedData;
class userLogin{
    _id
    first_name;
    last_name;
    
    token;
    email;
    password;
    
    constructor(id,first_name,last_name,email,password,token,){
        this._id=id
        this.first_name=first_name
        this.last_name=last_name
        this.email=email
        this.password=password
        this.token=token
    }

   async loginBtn(){
       
        _userLogin.email=document.getElementById("email").value
   
        _userLogin.password=document.getElementById("password").value
        let myApi ="users/login"

       let x = await service.postRequest(myApi,_userLogin).then((data)=>{
       
        console.log(data)
        
        dm.saveObject("User",data)
        location.href = 'index.html'
       }).catch((err)=>{
console.log(err)
           document.getElementById("errorLogin").style.display="block"
       }
       );
     
       
       
    }
   
    
}
let _userLogin=new userLogin()
let x= localStorage.getItem("User");
(function(){
    
if(x){
    window.alert("you are already logged in");
    location.href = 'index.html';
}
})();
