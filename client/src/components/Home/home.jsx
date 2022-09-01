import React from 'react';
import h from './h.module.css';
import { Link } from 'react-router-dom'
import { getAllCountries, filterCountriesByContinent, alphabeticSort, populationSort } from '../../actions/actions';
import Card from '../Card/Card';
import Searchbar from '../Searchbar/searchbar';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import Pagination from '../Pagination/Pagination';


export default function home() {

    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(10);
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountry,indexOfLastCountry);
    const [order, setOrder] = useState("")
    
    console.log(allCountries,"paises")

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getAllCountries())
        dispatch(filterCountriesByContinent())
        // console.log(getAllCountries);
    }, [dispatch])


    useEffect(() => {
        if(currentPage === 1)
            setCountriesPerPage(9)
        else 
            setCountriesPerPage(10)
    }, [currentPage])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllCountries());
    }

    // (allCountries.filter(country => country.continents === continentName))

    function handleContientFilter(e){
        e.preventDefault();
        dispatch(filterCountriesByContinent(e.target.value))
        setOrder(e.target.value)
        console.log(allCountries)
    }
    
    function handleAToZ(e){
        e.preventDefault()
        dispatch(alphabeticSort(e.target.value))
        setCurrentPage(1)
        setOrder(`Order Sort ${e.target.value}`)
    }

    function handlePopulationSort(e){
        e.preventDefault()
        dispatch(populationSort(e.target.value))
        setCurrentPage(1)
        setOrder(`Order Sort ${e.target.value}`)
    }
    

    return (
        <div className={h.container}>
            <div>
                <h1 className={h.title}>Home</h1>
                <button onClick={e => {handleClick(e)}}>
                    Refresh Page
                </button>
                <div>
                    <select onChange={e => {handleAToZ(e)}} className={h.botonCrearRec}> 
                        <option value="" hidden>Alphabetic Sort</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                    <select onChange={e =>{handlePopulationSort(e)}}>
                        <option value="" hidden>Sort by country population</option>
                        <option value="up">Upper</option>
                        <option value="down">Lower</option>
                    </select>
                    <select onChange={e =>{handleContientFilter(e)}}>
                        <option value="All Continents">All Contients</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                        <option value="South America">South America</option>
                        <option value="North America">North America</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Antarctica">Antarctica</option>
                    </select>
                </div>
                <Searchbar/>
                <div>
                    <Link to='/activities'><button className={h.botonCrearAct}>Go to Tourist Activity Page</button></Link>
                </div>
                <div className={h['cards-container']}>
                    {
                        currentCountries.map(country => {
                            return (
                                <Card
                                    id={country.id}
                                    key={country.name}
                                    name={country.name}
                                    image={country.image}
                                    capital={country.capital}
                                    className={h['country-card']}
                                    continents={country.continents}
                                />
                            )
                        })
                    }
                </div>
                <Pagination
                    pagination={pagination}
                    countriesPerPage={10}
                    allCountries={allCountries.length}
                />
            </div>
        </div>
    )
}