import React from 'react';
import { countryByName } from '../../actions/actions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import sb from '../Searchbar/sb.module.css';


export default function Searchbar(setCountries){
    
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault(e)
        setName(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault(e)
        if(name !== ''){
            console.log(dispatch(countryByName(name)));
            await dispatch(countryByName(name))
        }else{
            alert("Please make sure to submit an existing country")
        }
    }

    return(
        <React.Fragment>
            <input type="text" placeholder="Enter a country" onChange={(e) => handleInputChange(e)} className={sb.input}/>
            <button type="submit" onClick={(e) => handleSubmit(e)} className={sb.botonBuscarCoun}>Search</button>
        </React.Fragment>
    )
}