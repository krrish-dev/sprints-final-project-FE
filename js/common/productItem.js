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

    /*
    <div class="col-12">
                        
                    </div>
    */
}

let response = [
    {
        "_id": "6480c58fdf79d4aa66029dcf",
        "name": "New Balance Sportswear New Arrivals",
        "image": "img/product-1.jpg",
        "category_id": "6480c58edf79d4aa66029db6",
        "price": 100,
        "discount": 0.1,
        "rating": 4.5,
        "rating_count": 120,
        "is_featured": true,
        "is_recent": false,
        "color": "white",
        "size": "xl",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
        "__v": 0
    },
    {
        "_id": "6480c590df79d4aa66029dd1",
        "name": "Mintra Shoes",
        "image": "img/product-2.jpg",
        "category_id": "6480c58edf79d4aa66029db8",
        "price": 250,
        "discount": 0.15,
        "rating": 4,
        "rating_count": 99,
        "is_featured": true,
        "is_recent": false,
        "color": "blue",
        "size": "s",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
        "__v": 0
    },
    {
        "_id": "6480c590df79d4aa66029dd3",
        "name": "Appliances",
        "image": "img/product-3.jpg",
        "category_id": "6480c58edf79d4aa66029dba",
        "price": 48.5,
        "discount": 0.1,
        "rating": 3.5,
        "rating_count": 45,
        "is_featured": true,
        "is_recent": false,
        "color": "red",
        "size": "xs",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
        "__v": 0
    },
    {
        "_id": "6480c590df79d4aa66029dd5",
        "name": "Kitchen small Appliances",
        "image": "img/product-4.jpg",
        "category_id": "6480c58edf79d4aa66029dbc",
        "price": 280,
        "discount": 0.15,
        "rating": 4.5,
        "rating_count": 70,
        "is_featured": true,
        "is_recent": false,
        "color": "green",
        "size": "l",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
        "__v": 0
    },
    {
        "_id": "6480c590df79d4aa66029dd7",
        "name": "LG TV's",
        "image": "img/product-5.jpg",
        "category_id": "6480c58edf79d4aa66029dbe",
        "price": 999,
        "discount": 0.05,
        "rating": 4.5,
        "rating_count": 34,
        "is_featured": true,
        "is_recent": true,
        "color": "red",
        "size": "xs",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
        "__v": 0
    },
    {
        "_id": "6480c590df79d4aa66029dd9",
        "name": "Nikon Cameras & Accessores",
        "image": "img/product-6.jpg",
        "category_id": "6480c58edf79d4aa66029dc0",
        "price": 3200,
        "discount": 0.1,
        "rating": 4.5,
        "rating_count": 15,
        "is_featured": true,
        "is_recent": true,
        "color": "white",
        "size": "m",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
        "__v": 0
    },
    {
        "_id": "6480c590df79d4aa66029ddb",
        "name": "Power Bank",
        "image": "img/product-7.jpg",
        "category_id": "6480c58fdf79d4aa66029dc2",
        "price": 300,
        "discount": 0.05,
        "rating": 4.5,
        "rating_count": 190,
        "is_featured": true,
        "is_recent": true,
        "color": "green",
        "size": "s",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
        "__v": 0
    },
    {
        "_id": "6480c590df79d4aa66029ddd",
        "name": "Kitchen Collection",
        "image": "img/product-8.jpg",
        "category_id": "6480c58fdf79d4aa66029dc4",
        "price": 999,
        "discount": 0.1,
        "rating": 4,
        "rating_count": 55,
        "is_featured": true,
        "is_recent": true,
        "color": "red",
        "size": "xl",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum ipsam quisquam molestiae expedita laudantium necessitatibus! Necessitatibus accusantium aspernatur aliquam.",
        "__v": 0
    },
    {
        "_id": "6480f6f11f5fd147b3e08d3a",
        "name": "Product 2 Cat2",
        "image": "assets/img/prod-2.jpg",
        "category_id": "6346aed67c308ccff12e065c",
        "price": 100,
        "discount": 0.1,
        "rating": 3,
        "rating_count": 140,
        "is_featured": true,
        "is_recent": false,
        "description": "Product 1 Cat2 Product 1 Cat2 Product 1 Cat2 Product 1 Cat2 Product 1 Cat2 Product 1 Cat2 Product 1 Cat2 Product 1 Cat2 Product 1 Cat2 Product 1 Cat2 Product 1 Cat2 Product 1 Cat2 Product 1 Cat2 ",
        "__v": 0
    }
]
