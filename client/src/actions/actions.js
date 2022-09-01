import axios from 'axios';

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const ALPHABETICAL_SORT = 'ALPHABETICAL_SORT';
export const POPULATION_SORT = 'POPULATION_SORT';
export const GET_DETAIL = 'GET_DETAIL';

export function getAllCountries(){
    return function(dispatch){
        axios.get(`http://localhost:3001/countries`)
        .then(paises =>
            dispatch({
                type: GET_ALL_COUNTRIES,
                payload: paises.data
            })
        )
        .catch(error => console.log(error))
    }
}

export function countryByName(name){
    return async function(dispatch){
        try {
            const search = await axios.get(`http://localhost:3001/countries?name=${name}`)
            return dispatch({
                type: "SEARCH_COUNTRY",
                payload: search.data
            })
        } catch (error) {
            alert("Country not found")
        }
    }
}

export function filterCountriesByContinent(payload){
    return{
        type: 'FILTER_BY_CONTINENT',
        payload: payload
    }
}

// export function requestParams() {
//     return{
        
//     }
// }

export function postActivity(payload,id){
    return async function(dispatch){
        const posted = await axios.post(`http://localhost:3001/activities`, payload)
        return posted
    }
}

export function alphabeticSort(payload){
    return{
        type: "ALPHABETICAL_SORT",
        payload: payload
    }   
}

export function populationSort(payload){
    return{
        type: "POPULATION_SORT",
        payload: payload
    }
}

export function getDetailedCountry(id) {
    return async function (dispatch) {
            const res = await axios.get(`http://localhost:3001/countries/${id}`)
            console.log(res)
            return dispatch({
                type: GET_DETAIL,
                payload: res.data
            })
    }
}
