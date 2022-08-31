import axios from 'axios';

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY'
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'

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
        payload
    }
}

export function requestParams() {
    return{
        
    }
}