const { Router } = require('express');
const { Country, Activity, Op } = require('../db.js')
const { getAllCountries, getCountries } = require('../controllers/ApiData')


const router = Router();

// Ejemplo de la estructura para guiarme:

// router.get('/test', async (req,res) => {
//     res.send('Mensaje de prueba')
// })


// GET /countries:
// router.get('/countries', async (req,res) => {
//     const {name} = req.query

// })



// GET /countries/{idPais}
router.get('/countries/:idPais', async (req,res) => {
    try{
        const {idPais} = req.params
        const paises2 = await getAllCountries()
        if(idPais){
            const pais = paises2.filter(p => p.id === idPais)
            if(pais.length === 0){
                res.status(404).send('ID no encontrado')
            }else{
                res.status(200).send(pais)
            }
    }
    }catch(err){
        console.log(err)
    }
})

// router.get('countries/:idPais', async (req,res) => {
//     const {idPais} = req.params
    
//     try {
//         const country = await Country.findAll({
//             where: {
//                 id: idPais.toUpperCase()
//             },
//             include:[{
//                 model: Activity,
//                 attributes: ['name', 'difficulty', 'duration', 'season'],
//                 through: {attributes:[]}
//             }]
//         })
//         if(country.length){
//             return res.status(200).json(country)
//         }else{
//             return res.status(400).send('Country not found')
//         }
//     } catch (err) {
//         console.log(err)
//     }
// })

// GET /countries?name="..."

router.get('/countries', async (req,res) =>{
    try{
    const name = (req.query.name)
    let totalCountries = await getAllCountries();
    if (name){
        const namefix = name.toLowerCase().charAt(0).toUpperCase()+name.slice(1);
        let countryName = await totalCountries.filter(co => co.name.includes(namefix))
        countryName.length ?
        res.status(200).send(countryName) :
        res.status(404).send('Country Not Found');
    }else{
        res.status(200).send(totalCountries)
    }
    }catch(err){
        console.log(err)
    }
})

// POST /activities

router.post('/activity', async(req,res) =>{
    try{
        const {name,difficulty} = req.body
        if(name && difficulty){
            const actividad = await Activity.create(req.body)
            res.status(200).send(actividad)
        }else{
            res.status(404).send('Faltan datos')
        }
    } catch (err){
        console.log(err)
    }
})

module.exports = router;
