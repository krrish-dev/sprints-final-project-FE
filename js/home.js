//krrish ==> index || home page 
//Update: The categories have been sorted by product count in descending order..
class Category {
  constructor(id, name, image, productCount) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.productCount = productCount;
  }

  renderLink() {
    return `<a data-id="${this.id}" onclick="getCities(${this.id})" href="products.php?cat_id=${this.id}" class="nav-item nav-link">${this.name}</a>`;
  }

  renderBox() {
    return `
      <div id="category-box-${this.id}" class="col-lg-3 col-md-4 col-sm-6 pb-1">
        <a class="text-decoration-none" href="products.php?cat_id=${this.id}">
          <div class="cat-item d-flex align-items-center mb-4">
            <div class="overflow-hidden" style="width: 100px; height: 100px">
              <img class="img-fluid" src="${this.image}" alt="${this.name}" />
            </div>
            <div class="flex-fill pl-3">
              <h6>${this.name}</h6>
              <small class="text-body">${this.productCount}</small>
            </div>
          </div>
        </a>
      </div>`;
  }
}

class CategoryRenderer {
  constructor(apiUrl, targetElementId) {
    this.apiUrl = apiUrl;
    this.targetElementId = targetElementId;
  }

  async fetchCategories() {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  renderCategories(categories) {
    const linkList = categories.map((category) => {
      const { _id, name } = category;
      const categoryObj = new Category(_id, name);
      return categoryObj.renderLink();
    }).join("");

    const targetElement = document.getElementById(this.targetElementId);
    if (targetElement) {
      targetElement.innerHTML = linkList;
    }
  }

  renderBoxCategories(categories) {
    const targetElement = document.getElementById(this.targetElementId);
    if (targetElement) {
      targetElement.innerHTML = ""; // Clear any existing content

      categories.slice(0, 4).forEach((category) => {
        const { _id, name, image, productCount } = category;
        const categoryObj = new Category(_id, name, image, productCount);
        const categoryHtml = categoryObj.renderBox();
        targetElement.insertAdjacentHTML("beforeend", categoryHtml);
      });
    }
  }

  async initMenu() {
    const categoriesMenu = await this.fetchCategories();
    this.renderCategories(categoriesMenu);
  }

  async initBoxCategories() {
    const categories = await this.fetchCategories();
    const sortedCategories = categories.sort((a, b) => b.productCount - a.productCount);
    this.renderBoxCategories(sortedCategories);
  }
}
// feature product + recent product 
class Product {
  favIcon;
  constructor(id, name, image, categoryId, price, discount, rating, ratingCount, isFeatured, isRecent, color, size, description) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.categoryId = categoryId;
    this.price = price;
    this.discount = discount;
    this.rating = rating;
    this.ratingCount = ratingCount;
    this.isFeatured = isFeatured;
    this.isRecent = isRecent;
    this.color = color;
    this.size = size;
    this.description = description;
    this.afterDiscount = this.price - (this.price * this.discount);
  }

  render() {
    const ratingStars = this.getRatingStars();
    const priceAfterDiscount = this.getPriceAfterDiscount();

    return `
      <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
        <div class="product-item bg-light mb-4">
          <div class="product-img position-relative overflow-hidden">
            <img class="img-fluid w-100" src="${this.image}" alt="${this.name}" />
            <div class="product-action">
              ${this.buildCartIcon()}
              ${this.buildFaveIcon()}
              <a class="btn btn-outline-dark btn-square" href="#">
                <i class="fa fa-sync-alt"></i>
              </a>
              <a class="btn btn-outline-dark btn-square" href="#">
                <i class="fa fa-search"></i>
              </a>
            </div>
          </div>
          <div class="text-center py-4">
            <a class="h6 text-decoration-none text-truncate" href="">${this.name}</a>
            <div class="d-flex align-items-center justify-content-center mt-2">
              <h5>${priceAfterDiscount}</h5>
              <h6 class="text-muted ml-2"><del>${this.price}</del></h6>
            </div>
            <div class="d-flex align-items-center justify-content-center mb-1">
              ${ratingStars}
              <small>(${this.ratingCount})</small>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getRatingStars() {
    const fullStars = Math.floor(this.rating);
    const hasHalfStar = this.rating % 1 !== 0;

    let ratingHtml = "";
    for (let i = 0; i < fullStars; i++) {
      ratingHtml += '<small class="fa fa-star text-primary mr-1"></small>';
    }

    if (hasHalfStar) {
      ratingHtml += '<small class="fa fa-star-half-alt text-primary mr-1"></small>';
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      ratingHtml += '<small class="far fa-star text-primary mr-1"></small>';
    }

    return ratingHtml;
  }

  getPriceAfterDiscount() {
    const priceAfterDiscount = this.price * (1 - this.discount);
    return priceAfterDiscount.toFixed(2);
  }

  buildFaveIcon(){
    let favIcon = document.createElement('a');
    favIcon.setAttribute('class', 'btn btn-outline-dark btn-square');
    favIcon.setAttribute('onclick', `favourites.addToFavsToggel1('${this.id}', this)`);
    favIcon.innerHTML = favourites.isFavourite(this.id)?`<i class="fa fa-heart"></i>`:`<i class="far fa-heart"></i>`;
    return favIcon.outerHTML;
  }
  buildCartIcon(){
   
    let cartIcon = document.createElement('a');
    cartIcon.setAttribute('class', 'btn btn-outline-dark btn-square');
    cartIcon.setAttribute('onclick', `cart.addToCartByValues('${this.id}',${1},${this.afterDiscount},'${this.name}')`);
    cartIcon.innerHTML = `<i class="fa fa-shopping-cart"></i>`;
    return cartIcon.outerHTML;
  }

}

class FeatureProductRenderer {
  constructor(apiUrl, targetElementId) {
    this.apiUrl = apiUrl;
    this.targetElementId = targetElementId;
  }

  async fetchFeatureProducts() {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching feature products:", error);
      return [];
    }
  }

  renderFeatureProducts(products) {
    const targetElement = document.getElementById(this.targetElementId);
    if (targetElement) {
      targetElement.innerHTML = ""; // Clear any existing content

      products.forEach((product) => {
        const { _id, name, image, category_id, price, discount, rating, rating_count, is_featured, is_recent, color, size, description } = product;
        const productObj = new Product(_id, name, image, category_id, price, discount, rating, rating_count, is_featured, is_recent, color, size, description);

        if (productObj.isFeatured) {
          const productHtml = productObj.render();
          targetElement.insertAdjacentHTML("beforeend", productHtml);
        }
      });
    }
  }

  async init() {
    const featureProducts = await this.fetchFeatureProducts();
    this.renderFeatureProducts(featureProducts);
  }
}

class RecentProductRenderer extends FeatureProductRenderer {
  renderFeatureProducts(products) {
    const targetElement = document.getElementById(this.targetElementId);
    if (targetElement) {
      targetElement.innerHTML = ""; // Clear any existing content

      products.forEach((product) => {
        const { _id, name, image, category_id, price, discount, rating, rating_count, is_featured, is_recent, color, size, description } = product;
        const productObj = new Product(_id, name, image, category_id, price, discount, rating, rating_count, is_featured, is_recent, color, size, description);

        if (productObj.isRecent) {
          const productHtml = productObj.render();
          targetElement.insertAdjacentHTML("beforeend", productHtml);
        }
      });
    }
  }
}

// Usage
const featureProductRenderer = new FeatureProductRenderer("http://localhost:5000/api/products/getFeatured", "FeatureProducts");
featureProductRenderer.init();

const recentProductRenderer = new RecentProductRenderer("http://localhost:5000/api/products/getFeatured", "RecentProducts");
recentProductRenderer.init();



// Usage
const categoryMenuRenderer = new CategoryRenderer("http://localhost:5000/api/categories/", "categories-menu");
categoryMenuRenderer.initMenu();

const categoryRenderer = new CategoryRenderer("http://localhost:5000/api/categories/", "categoriesboxs");
categoryRenderer.initBoxCategories();




