const { Router } = require('express');
const { Country, Activity, Op } = require('../db.js')
const { getAllCountries } = require('../controllers/ApiData')


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

router.post('/activities', async(req,res,next) =>{
    try{
        const {name,difficulty,duration,season} = req.body
            const actividad = Activity.create({name,difficulty,duration,season})
            

            const ActivityWithCountry = await Activity.findOne({
                where:{
                    name: name
                },
                attributes: {
                    exclude: ['updatedAt', 'createdAt'],
                },
                include:{
                    
                    model:Country,
                    through:{
                        attributes:[]
                    }
                }
            })
            res.json(ActivityWithCountry)
    } catch (err){
        next(err)
    }
});


module.exports = router;
