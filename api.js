const axios = require("axios");

const api = {
    getUserInfo(username){
        return axios.get("https://api.github.com/users/samanthasengsouvanh").catch(err => {
            console.log("err fetching user info")
        })

    },
    getStarsInfo(username){
        return axios.get("https://api.github.com/users/samanthasengsouvanh/starred").then(response => {
            return response.data.reduce((star, curr) => {
                 star += curr.stargazers_count;
                return star;
            }, 0)
        })

    }
}


module.exports = api;