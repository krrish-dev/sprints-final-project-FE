function renderItems(){
    let productsSection = document.getElementById("productsSection");
    let product;
    response.forEach((item)=>{
        product = new ProductItem(item);
        productsSection.appendChild(product.renderProduct());
    });
    let nav = document.createElement("div");
    let content = `<nav>
    <ul class="pagination justify-content-center">
      <li class="page-item disabled"><a class="page-link" href="#">Previous</span></a></li>
      <li class="page-item active"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>`
    nav.innerHTML = content;
    productsSection.appendChild(nav);
}