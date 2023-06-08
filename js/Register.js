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
    addUser(){
        localStorage.clear();



        
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
        service.postRequest(myApi,userObject)
    }

    
}

let userObject=new user()
let token
