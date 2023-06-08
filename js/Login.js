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
        let y;
       let x = await service.postRequest(myApi,_userLogin).catch((err)=>
       window.alert("error")
       );
        console.log(x)
       dm.saveObject("User",x)
       
    
       
    }
   
    
}
let _userLogin=new userLogin()
myfunc= async()=>{
    console.log(returnedData)
}

