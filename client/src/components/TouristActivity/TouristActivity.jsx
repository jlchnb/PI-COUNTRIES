import React, { useEffect, useState } from 'react';
import { getAllCountries, postActivity} from '../../actions/actions';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ta from '../TouristActivity/ta.module.css';





function validate(input){
    
    const errors = {}
    if(!input.name){
        errors.name = 'Please write a name';
    }
    if(!input.duration){
        errors.duration = 'Please add a valid duration'
    }
    return errors
}

export default function ActivityCreate(){
    const allCountries = useSelector((state) => state.countries);
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        difficulty: -1,
        duration: "",
        season: -1,
        countries: []
    })

    useEffect(() =>{
        dispatch(getAllCountries())
    }, [dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(!input.name || !input.duration){
            return alert('Please fill in all the fields')
          }
          console.log('sadasd',input.countries)
        input.countries.forEach(item => dispatch(postActivity(input,allCountries[item].id)))

        // dispatch(postActivity(input))
        setInput({
            name: "",
            difficulty: -1,
            duration: "",
            season: -1,
            countries: []
        })
        alert("Your activity has been added")
    }

    function handleSelect(e){
        e.preventDefault()
        setInput({
            ...input,
            countries: [...input.countries,e.target.value]
        })
        console.log(e.target.value,'soy el value jeje')
    }

    function handleDelete(e,country){
        e.preventDefault()
        const indexOfItem = input.countries.indexOf(country)
        if(indexOfItem > -1){
            const newCountries = input.countries.splice(indexOfItem,1)
            setInput({
                ...input,
                countries: newCountries
            })
            
        }
        setInput({
            ...input,
            countries: input.countries.slice(c => c !== country)
        })
    }

    function handleSelectDiff(e){
        e.preventDefault()
        setInput({
            ...input,
            difficulty: e.target.value
        })
    }

    function handleSelectSzn(e){
        e.preventDefault()
        setInput({
            ...input,
            season: e.target.value
        })
    }
    console.log(input.difficulty === -1 && input.season === -1, 'soy la respuesta')
    return(
        <div className={ta.container}>
            <div>
                <h1 className={ta.h1}>🌴Create Tourist Activity🌴</h1>
                <form onSubmit={(e) => {handleSubmit(e)}}>
                    <div>
                        <div>
                            <label>Name</label>
                            <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)}></input>
                            {errors.name && (<p>{errors.name}</p>)}
                        </div>
                        <div>
                            <label>Difficulty</label>
                            <select value={input.difficulty} onChange={(e) => handleSelectDiff(e)}>
                                <option value={-1} hidden>Choose difficulty</option>
                                <option value="1">1.-Very Easy</option>
                                <option value="2">2.- Easy</option>
                                <option value="3">3.- Normal</option>
                                <option value="4">4.- Hard</option>
                                <option value="5">5.- Very Hard</option>
                            </select>
                        </div>
                        <div>
                            <label>Duration(Hrs)</label> 
                            <input type="number" value={input.duration} name="duration" onChange={(e) => handleChange(e)}></input>
                            {errors.duration && (<p>{errors.duration}</p>)}
                        </div>
                        <div>
                            <label>Season</label>
                            <select value={input.season} onChange={(e) => handleSelectSzn(e)}>
                                <option value={-1} hidden>Choose season</option>
                                <option value="Spring">Spring</option>
                                <option value="Summer">Summer</option>
                                <option value="Autumn">Autumn</option>
                                <option value="Winter">Winter</option>
                            </select>
                        </div>
                        <div>
                            <label>Select Country/Countries</label>
                            <select onChange={handleSelect} multiple>
                            {
                            allCountries.map((country,index) => {
                            return (
                                <option value={index} key={country.id}>
                                    {country.name}
                                </option>
                            )
                        })
                    }
                            </select>
                        </div>
                        
                    </div>
                    <div>
                        {
                            input.countries.length > 0 ? input.countries.map(c =>{
                                console.log('upsi',c)
                                return(<div key={allCountries[c].id}>
                                    <p>{allCountries[c].name}</p>
                                    <button type="button" onClick={e => handleDelete(e,allCountries[c].name)}>X</button>
                                </div>)
                            }):
                    <span></span>
                    }
                    <button type="submit" disabled={(input.difficulty === -1 || input.season === -1)} className={ta.button}>Create Activity</button>
                </div>
                </form>
                <Link to = '/home'><button className={ta.back}>Home</button></Link>    
            </div>
        </div>
    )
}
