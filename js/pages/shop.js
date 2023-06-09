
class ShopPageManager{
    #current;
    #next;
    #previous;
    #productsList;
    #filteredList;
    #numberOfPages;
    #itemsPerPage;
    #itemsPerPageButtonRef;
    #colorsSet;
    #sizesSet;
    #pricesSet;
    constructor(){
       this.#current = 1;
       this.#next = 2;
       this.#previous = 0;
       this.#productsList = [];
       this.#filteredList = null; //if its null the pagination will renderded based on its value;
       this.#numberOfPages = 1;
       this.#itemsPerPage = 9;
       this.#colorsSet = new Set();
       this.#sizesSet = new Set();
       this.#pricesSet = new Set();
    }

    async onLoad(){
       await this.#getProducts();
       this.renderItems(this.#getPage());
       this.buildNavSerctionSection();

    }
    renderItems(productsList){
       let products = productsList??this.#productsList; 
      let productsSection = document.getElementById("productsSection");
      productsSection.innerHTML = "";
       
        products.forEach((item)=>{
            productsSection.appendChild(item.renderProduct());
        });
    }
    buildNavSerctionSection(){
        let nav = document.getElementById('pagesBar');
        let outerDiv = document.createElement("div");
        outerDiv.setAttribute('class', 'col-12');
        let innerDiv = document.createElement("div");
        let pages = document.createElement('ul');
        pages.setAttribute('class', 'pagination justify-content-center');

        let pageitem = this.#createPageItem(this.#current <= 1, "page-item disabled","page-item", `shopPageManager.previous()`);
        let pageLink = this.#createPageLink('Previous');
        pageitem.appendChild(pageLink);
        pages.appendChild(pageitem);
        for(let i = 1; i <= this.#numberOfPages; i++ ){
            pageLink = this.#createPageLink(i);
            pageitem = this.#createPageItem(this.#current ==i, "page-item active", "page-item", `shopPageManager.moveTo(${i})`);
            pageitem.appendChild(pageLink);
            pages.appendChild(pageitem);
        } 
        pageitem = this.#createPageItem(this.#current >= this.#numberOfPages, "page-item disabled","page-item", `shopPageManager.next()`);
        pageLink = this.#createPageLink('Next');
        pageitem.appendChild(pageLink);
        pages.appendChild(pageitem);
        nav.innerHTML = "";
        innerDiv.appendChild(pages);
        outerDiv.appendChild(innerDiv);
        nav.appendChild(outerDiv);
    }
    #createPageLink(value){
        let pageLink = document.createElement('a');
        pageLink.setAttribute('class', 'page-link');
        pageLink.innerText = value;
        return pageLink;
    }
    #createPageItem(condition, class1, class2, onclick){
        let classValue = condition? class1:class2;
        let pageitem = document.createElement('li');
        pageitem.setAttribute('class', classValue);
        pageitem.setAttribute('onclick', onclick);
        return pageitem;
    }
    #getPage(){
        let productsList = this.#filteredList??this.#productsList;
        let start = this.#previous*this.#itemsPerPage;
        let end = this.#current*this.#itemsPerPage;
        if(end > productsList.length) end = productsList.length;
        return productsList.slice(start, end);
    }
   async #getProducts(){
       let res = await service.getRequest(api.products).catch((err)=>{
        console.log(err);
       });

       if(!res) return;
       if(res.status != "success") {console.log(res.status); return;}
       for(let product of res.data){
        this.#productsList.push(new ProductItem(product));
       } 
       this.#setNumOfPages();
    }
    #setNumOfPages(){
        let productsList = this.#filteredList?? this.#productsList;
        let remaider = (this.#productsList.length % this.#itemsPerPage)>0 ? 1: 0;
        this.#numberOfPages =((productsList.length - (productsList.length % this.#itemsPerPage))/this.#itemsPerPage) + remaider;
    };
    setNumberOfItemsPerPage(numOfItemsPerPage, buttonRef){
       this.#current = 1;
       this.#next = 2;
       this.#previous = 0;
        if(this.#itemsPerPageButtonRef){
            this.#itemsPerPageButtonRef.style.backgroundColor = "white";
        }
        buttonRef.style.backgroundColor = "#FFD333";
        this.#itemsPerPageButtonRef = buttonRef;
        this.#itemsPerPage = numOfItemsPerPage;
        this.#setNumOfPages();
        this.renderItems(this.#getPage());
        this.buildNavSerctionSection();
    }
    next(){
        if(this.#current>= this.#numberOfPages) return;
        this.#manageNav(this.#current + 1);
        this.renderItems(this.#getPage());//TODO: should handel the fitler list
        this.buildNavSerctionSection();
    }
    previous(){
        if(this.#current<= 1) return;
        this.#manageNav(this.#current - 1);
        this.renderItems(this.#getPage());//TODO: should handel the fitler list
        this.buildNavSerctionSection();
    }
    moveTo(pageNumber){
        this.#manageNav(pageNumber);
        this.renderItems(this.#getPage());//TODO: should handel the fitler list
        this.buildNavSerctionSection();
    }
    #manageNav(currentPage){
        this.#current = currentPage;
        this.#previous = currentPage<=1? 0:currentPage - 1;
        this.#next = currentPage >= this.#numberOfPages? this.#numberOfPages: currentPage+1;
    }
/**filter section */
    filterByThisPrice(priceRef){
        if(priceRef.id == "price-all"){
            this.#unCheckAll(5,"price-");
            this.#pricesSet.clear();
            this.applyFilter();
            return;
        }
        document.getElementById(`price-all`).checked = false;
        let range = this.#getRange(priceRef.id);
        if(this.#pricesSet.has(range.max)) this.#pricesSet.delete(range.max);
        else this.#pricesSet.add(range.max);
        this.applyFilter();
    }

    filterByThisColor(colorRef, color){
        if(colorRef.id == "color-all"){
            this.#unCheckAll(5,"color-");
            this.#colorsSet.clear();
            this.applyFilter();
            return;
        }
        document.getElementById(`color-all`).checked = false;
        if(this.#colorsSet.has(color)) this.#colorsSet.delete(color);
        else this.#colorsSet.add(color);
        this.applyFilter();
    }
    filterByThisSize(SizeRef, size){
        if(SizeRef.id == "size-all"){
            this.#unCheckAll(5,"size-");
            this.#sizesSet.clear();
            this.applyFilter();
            return;
        }
        else document.getElementById(`size-all`).checked = false;
        if(this.#sizesSet.has(size)) this.#sizesSet.delete(size);
        else this.#sizesSet.add(size);
        this.applyFilter();
    }
    applyFilter(){
        
        if(!this.#colorsSet.size && !this.#sizesSet.size && !this.#pricesSet.size){
            this.#filteredList = null;
            this.#setNumOfPages();
            this.renderItems(this.#getPage());
            this.buildNavSerctionSection();
            return;
        }
        this.#filteredList = [];
        let emptyColor = this.#colorsSet.size == 0;
        let emptySize = this.#sizesSet.size == 0;
        for(let product of this.#productsList){
            if((emptyColor || this.#colorsSet.has(product.color)) && 
               (emptySize || this.#sizesSet.has(product.size)) && 
             this.#isPriceInRange(product)){
                this.#filteredList.push(product);
             }     
        }
        this.#current = 1;
        this.#next = 2;
        this.#previous = 0;
        this.#setNumOfPages();
        this.renderItems(this.#getPage());
        this.buildNavSerctionSection();
    }
    #isPriceInRange(product){
       
        if(this.#pricesSet.size == 0) return true;
        for (let value of this.#pricesSet.values() )
            if(product.afterDiscount<= value && product.afterDiscount> (value-100)) return true; 
        
        return false;
    }
    #unCheckAll(range, prefix){
        for(let i = 1; i <= range ; i++){
            document.getElementById(`${prefix}${i}`).checked = false;
        }
    }

    #getRange(id){
        let range = {min:0, max:0};
        switch(id){
            case "price-1":
                range.min = 0;
                range.max = 100;
            break;
            case "price-2":
                range.min = 100;
                range.max = 200;
            break;
            case "price-3":
                range.min = 200;
                range.max = 300;
            break;
            case "price-4":
                range.min = 300;
                range.max = 400;
            break;
            case "price-5":
                range.min = 400;
                range.max = 500;
            break;
            default:
                range.min = 0
                range.max = Infinity;
        }
        return range;
    }

    priceSort(){
        let products = this.#filteredList??this.#productsList;
        for(let i = 1; i< products.length; i++){
            for(let j = 0; j < products.length-1; j++){
                if(products[j].afterDiscount >products[i].afterDiscount){
                    [products[j], products[i]] = [products[i], products[j]];
                }
            }
        }
        this.renderItems(this.#getPage());
    }
    ratingSort(){
        let products = this.#filteredList??this.#productsList;
        for(let i = 1; i< products.length; i++){
            for(let j = 0; j < products.length-1; j++){
                if(products[j].rating < products[i].rating){
                    [products[j], products[i]] = [products[i], products[j]];
                }
            }
        }
        this.renderItems(this.#getPage());
    }
    popularitySort(){
       
        let products = this.#filteredList??this.#productsList;
        for(let i = 1; i< products.length; i++){
            for(let j = 0; j < products.length-1; j++){
                if(products[j].ratingCount < products[i].ratingCount){
                    [products[j], products[i]] = [products[i], products[j]];
                }
            }
        }
        this.renderItems(this.#getPage());
    }
}

let shopPageManager = new ShopPageManager();
shopPageManager.onLoad();
/**
 * white
 * black
 * green
 * red
 * blue
 * 
 * xs
 * x
 */