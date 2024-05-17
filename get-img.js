const fetch = require('node-fetch');

require("dotenv").config();

const ACCESS_KEY = process.env.ACCESS_KEY;

const getRandomURL = async (query) => {
    try {
        const res = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}`
        );
        const data = await res.json();
        const urlList = data.results.map( img => img.urls.regular);
        const randomURL = urlList[Math.floor(Math.random() * urlList.length)];
        return randomURL;
    } catch (err) {
        console.log("error fetching the image url from unsplash: ",err);
        throw err;
    }
}

module.exports = getRandomURL;