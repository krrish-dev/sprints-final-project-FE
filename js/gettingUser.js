(function () {
 let x= localStorage.getItem("User")
 x=JSON.parse(x)
if(!x){
  document.querySelector(".loginList").innerHTML=`
   <li class="nav-item">
   <a class="nav-link " href="./login.html">Log in</a>
 </li>
 <li class="nav-item">
   <a class="nav-link "  href="./register.html">Register</a>
 </li>
   `
}else{
  document.querySelector(".loginList").innerHTML=`
   <li class="nav-item">
   <a class="nav-link " href="#">Hello : ${x.first_name}</a>
 </li>
 <li class="nav-item">
   <a class="nav-link" onclick="logout()" href="#">Log out</a>
 </li>
 
   `
}
  })();

  function logout(){
   localStorage.clear()
   location.reload()
  }