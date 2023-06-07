class Services {
    #token;
    #baseUrl;
    constructor(token){
        this.#token = token;
        this.#baseUrl = "http://localhost:5000/api/"
    }
    setBaseUrl(baseUrl){
        this.#baseUrl = baseUrl;
    }
    setToken(token){
        this.#token = token;
    }


    async postRequest(api, body){
        let requestBody = body??{};
        const response = await fetch(`${this.#baseUrl}${api}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-access-token': `${this.#token}`
        },
    })
    const data = await response.json()
    return data;
    }

    async getRequest(api, params){
        let url = `${this.#baseUrl}${api}`;
        if(params != null){
            url = `${url}?${new URLSearchParams(params)}`;
        }
        const response = await fetch(url,
            {
                method: 'GET',
                headers:{
                    'Content-type': 'application/json; charset=UTF-8',
                    'x-access-token': `${this.#token}`
                }
            });
        const data = await response.json();
        return data;
    }
}

async function  getData() {
    let services = new Services();
    let param = {'q':'phone'}
    let response  = await services.getRequest("products/search", param);

   response.products.forEach(element => {
        console.log(element.title);
        element.images.forEach(item =>{
            console.log(item);
        });
    });
}

async function  getDataViaPost() {
    let services = new Services();
    let response  = await services.postRequest("products/add", {title: "Mercides"});
    console.log(response);
}
getData();