import React, { Fragment } from 'react';
import h from './h.module.css';
import LandingPage from '../LandingPage/landing';
import { Link } from 'react-router-dom'
import { getAllCountries, filterCountriesByContinent } from '../../actions/actions';
import Card from '../Card/Card';
import Searchbar from '../Searchbar/searchbar';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import Pagination from '../Pagination/Pagination';


export default function home() {

    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(9)
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const [currentCountries, setCurrentCountries] = useState(allCountries);


    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getAllCountries());
    }, [])

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

    function handleFilterStatus(continentName) {
        if( continentName !== 'All Continents' )
            setCurrentCountries(allCountries.filter(country => country.continents === continentName));
        else
            setCurrentCountries(allCountries)
    }
    
    return (
        <div className={h.container}>
            <div>
                <h1>Home</h1>
                <button onClick={e => {handleClick(e)}}>
                    Refresh Page
                </button>
                <div>
                    <select onChange={e => handleFilterStatus(e.target.value)}>
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
                <Link to='/countries'><button className={h.botonCrearAct}>Agregar Actividad</button></Link>
                <div className={h['cards-container']}>
                    {
                        currentCountries.slice(indexOfFirstCountry, indexOfLastCountry).map(country => {
                            return (
                                <Card
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
                    countriesPerPage={countriesPerPage}
                    allCountries={currentCountries.length}
                />
            </div>
        </div>
    )
}