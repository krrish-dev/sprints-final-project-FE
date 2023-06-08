
class ShopPageManager{
    #current;
    #next;
    #previous;
    #productsList;
    constructor(){
       
    }

    onLoad(){
        let productsSection = document.getElementById("productsSection");
        let product;
        response.forEach((item)=>{
            product = new ProductItem(item);
            productsSection.appendChild(product.renderProduct());
        });

    }
    renderItems(){
        
     
    }
    buildNameSection(){
        let nav = document.getElementById('pagesBar');
        let content = `<div class="col-12">
        <nav>
          <ul class="pagination justify-content-center">
            <li class="page-item disabled"><a class="page-link" href="#">Previous</span></a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
    </div>`
        nav.innerHTML = content;
    }
}

let shopPageManager = new ShopPageManager();
shopPageManager.onLoad();
