const { Country, Activity } = require('../db')
const axios = require('axios')

const getCountries = async () => {
    const apiUrl = await axios.get(`https://restcountries.com/v3/all`);
    const apiInfo = await apiUrl.data.map(co => {
        return{
            id: co.cca3,
            name: co.name.common,
            image: co.flags[0],
            continents: co.continents[0],
            capital: co.capital != null ? co.capital[0] : "no hay data",
            subregion: co.subregion,
            area: co.area + ' km²',
            population: co.population
        }
    });
    return apiInfo;
};

const getDbInfo = async () =>{
    return await Country.findAll({
        include:{
            model: Activity,
            attributes: ['name','difficulty','duration','season'],
            through:{
                attributes: [],
            },
        }
    })
}

const getAllCountries = async () =>{
    const apiInfo = await getCountries();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

module.exports ={
    getCountries,
    getAllCountries
}
