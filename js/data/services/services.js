class Services {
    #token;
    #baseUrl;
    /**
     * 
     * @param {userToken} token this is the authentication token which will be send in the request header 
     */
    constructor(token){
        this.#token = token;
        this.#baseUrl = "http://localhost:5000/api/"
    }
    /**
     * 
     * @param {string} baseUrl it is the common part in all apis 
     * @example api1 = "http://localhost:5000/api/users/register", api2 = "http://localhost:5000/api/products/", baseUrl = "http://localhost:5000/api/"
     */
    setBaseUrl(baseUrl){
        this.#baseUrl = baseUrl;
    }

     /**
     * 
     * @param {userToken} token this is the authentication token which will be send in the request header 
     */
    setToken(token){
        this.#token = token;
    }

    /**
     * 
     * @param {string} api value from the class Apis represent the dirctory which will be added to the base url 
     * @param {object} body key value object to be send in the request body
     * @returns {json}
     */
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
    /**
     * 
     * @param {string} api value from the class Apis represent the dirctory which will be added to the base url 
     * @param {object} params key value object to be send in the get request url
     * @returns {json}
     */
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
