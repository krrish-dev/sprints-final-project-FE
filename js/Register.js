class user{
    
    first_name;
    last_name;
    email;
    password;
    constructor(firstName,lastName,email,password){
        this.first_name=firstName
        this.last_name=lastName
        this.email=email
        this.password=password
    }
    clear(){
    document.getElementById("email").value=""
        document.getElementById("firstName").value=""
        document.getElementById("lastName").value=""
        document.getElementById("password").value=""
        document.getElementById("passwordConfimation").value=""
    }
    async addUser(){
        document.getElementById("userSuccess").style.display="none"
        document.getElementById("error").style.display="none"
        document.getElementById("passwordValidation").style.display="none"
        userObject.email=document.getElementById("email").value
        userObject.first_name=document.getElementById("firstName").value
        userObject.last_name=document.getElementById("lastName").value
        userObject.password=document.getElementById("password").value
        let passwordConfimation =document.getElementById("passwordConfimation").value
        if(this.password!=passwordConfimation){
            debugger
            document.getElementById("passwordValidation").style.display="block"
            return false
        }else if (userObject.first_name.length<3){
            document.getElementById("firstnameValidation").style.display="block"

            return false
        }else if(userObject.last_name.length<3){
            document.getElementById("lastnameValidation").style.display="block"
            return false
        }

        
        let myApi ="users/register"
        await service.postRequest(myApi,userObject).then((success)=>{
        document.getElementById("userSuccess").style.display="block"
            this.clear()

       }).catch((err)=>
       {

           console.log(err)
           
           document.getElementById("error").style.display="block"
       }
        )
    }

    
}

let userObject=new user()
let token

let x= localStorage.getItem("User");
(function(){
    
if(x){
    window.alert("you are already logged in");
    location.href = 'index.html';
}
})();


