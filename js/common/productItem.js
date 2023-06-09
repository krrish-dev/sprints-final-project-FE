class ProductItem{
    id;
    name;
    image;
    categoryId;
    price;
    discount;
    afterDiscount;
    rating;
    ratingCount;
    isFeatured;
    isRecent;
    color;
    size;
    description;
    constructor(product){
        if(!product) return;
        this.id = product._id ?? "";
        this.name = product.name ?? "";
        this.image =product.image ?? "";
        this.categoryId = product.category_id ?? "";
        this.price = product.price ?? 0;
        this.discount = product.discount ?? 0.0;
        this.rating = product.rating ?? 0;
        this.ratingCount = product.rating_count ?? 0;
        this.isFeatured = product.is_featured ?? false;
        this.isRecent = product.is_recent ?? false;
        this.color = product.color ?? "";
        this.size = product.size ?? "";
        this.description = product.description ?? "";
        this.afterDiscount = this.price - (this.price * this.discount);
    }
    
    renderProduct(){
        let div = "div";
        let containerDiv = this.#createTag(div, "col-lg-4 col-md-6 col-sm-6 pb-1");
        let productItem = this.#createTag(div, "product-item bg-light mb-4");
        let productImage = this.#createTag(div, "product-img position-relative overflow-hidden");

        productImage.appendChild(this.#buildProductImage());
        productImage.appendChild(this.#buildActionsSection());

        productItem.appendChild(productImage);
        productItem.appendChild(this.#buildDetailsSection());

        containerDiv.appendChild(productItem);
        return containerDiv;
    }

    #createTag(tagName, classes){
      
        let tag = document.createElement(tagName);
        if(!classes) return tag;
        tag.setAttribute("class", classes);
        return tag;
    }

    #buildProductImage(){
        let img = this.#createTag("img", "img-fluid w-100");
        img.setAttribute("src", this.image??"img/product-1.jpg");
        img.setAttribute("alt", this.name);
        return img;
    }
    #buildActionsSection(){
        let cart = this.#createTag("a", "btn btn-outline-dark btn-square"); cart.innerHTML = `<i class="fa fa-shopping-cart"></i>`
        let fav = this.#createTag("a", "btn btn-outline-dark btn-square"); fav.innerHTML = `<i class="far fa-heart"></i>`
        let sync = this.#createTag("a", "btn btn-outline-dark btn-square"); sync.innerHTML = `<i class="fa fa-sync-alt"></i>`;
        let search = this.#createTag("a", "btn btn-outline-dark btn-square"); search.innerHTML = `<i class="fa fa-search"></i>`

        cart.addEventListener('click', this.addToCart.bind(this));
        fav.addEventListener('click', this.addToFavs.bind(this));
        let productAction = this.#createTag("div", "product-action");
        productAction.appendChild(cart);
        productAction.appendChild(fav);
        productAction.appendChild(sync);
        productAction.appendChild(search);
        return productAction;
    }
    #buildDetailsSection(){
       let detailsSecion = this.#createTag("div", "text-center py-4");
       let title = this.#createTag("a", "h6 text-decoration-none text-truncate me-3");
       title.innerHTML = this.name;
      
       let priceDiv = this.#createTag("div", "d-flex align-items-center justify-content-center mt-2");
       let price = `<h5>$${this.afterDiscount}</h5><h6 class="text-muted ml-2"><del>$${this.price}</del></h6>`;
       priceDiv.innerHTML = price;

       detailsSecion.appendChild(title);
       detailsSecion.appendChild(priceDiv);
       detailsSecion.appendChild(this.#buildRatingBar());

        return detailsSecion;
    }
    #buildRatingBar(){
        let currentRate = this.rating;
        let ratingDiv = this.#createTag("div", "d-flex align-items-center justify-content-center mb-1");
        let small;
        let star = "fa fa-star text-primary mr-1";
        let halfStar = "fa fa-star-half-alt text-primary mr-1";
        let offStar = "far fa-star text-primary mr-1"
        for(let i = 0; i < 5; i++){
            small = document.createElement("small");
            if(currentRate >= 1){
                small.setAttribute("class", star);
            }
            else if(currentRate < 1 && currentRate > 0){
                small.setAttribute("class", halfStar);
            }
            else{
                small.setAttribute("class", offStar);
            }
            ratingDiv.appendChild(small);
            currentRate --;
        }
        small = document.createElement("small");
        small.innerHTML = `(${this.ratingCount})`;
        ratingDiv.appendChild(small);
        return ratingDiv;
    }
    addToCart(){
        console.log("in product item");
       cart.addToCartFromProductObj(this);
    }
    addToFavs(){

    }
}