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

// Usage
const categoryMenuRenderer = new CategoryRenderer("http://localhost:5000/api/categories/", "categories-menu");
categoryMenuRenderer.initMenu();

const categoryRenderer = new CategoryRenderer("http://localhost:5000/api/categories/", "categoriesboxs");
categoryRenderer.initBoxCategories();




