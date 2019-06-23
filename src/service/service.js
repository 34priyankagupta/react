export const MyServices = {
    fetchAllOutfits,
    authorizationFunc,
    fetchSingleOutFitDetails
}

const axios = require('axios');
const authKey = '7db6527a8b8f1e67497abaf083de6117';

function fetchAllOutfits() {
    return axios.get(`https://fortnite-api.theapinetwork.com/items/list`, {
        headers: { 'Authorization': authKey }
    })

}

function authorizationFunc(data) {
    return axios.post(`https://reqres.in/api/login`, data);
}

function fetchSingleOutFitDetails(id) {
    return axios.get(`https://fortnite-api.theapinetwork.com/item/get`,{
        params: { id },
        headers: { 'Authorization': authKey }
    })
}