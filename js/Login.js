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

    loginBtn(){
    
        _userLogin.email=document.getElementById("email").value
   
        _userLogin.password=document.getElementById("password").value
        let myApi ="users/login"
       let x = service.postRequest(myApi,_userLogin)
       dm.saveObject(JSON.stringify(x))
       
       service.postRequest(myApi,_userLogin).then(value=>
        console.log(value)
        )
       
    }
   
    
}
let _userLogin=new userLogin()
myfunc= async()=>{
    console.log(returnedData)
}

