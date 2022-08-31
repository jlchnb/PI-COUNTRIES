import React from 'react';
import CardStyles from './cf.module.css';
import { useParams } from 'react-router-dom';

export default function CardFull({id, name, image, continents, capital, subregion, area , population ,className }) {
    const params = useParams()
    console.log(params)
    return (
        <div className={`${CardStyles['card-container']} ${className}`} >
            <div className={CardStyles['card-header']}>
                <h3 className={CardStyles['card-title']}>Nombre:{name} id:{id}</h3>
                    <img className={CardStyles['card-img']} src={image} alt='imagen-pais'/>
            </div>
            <div className={CardStyles['card-details']}>
                <label><strong>Capital:</strong> {capital}</label>
                <label><strong>Continent:</strong> {continents}</label>
                <label><strong>SubRegion:</strong> {subregion}</label>
                <label><strong>Area:</strong> {area}</label>
                <label><strong>Population:</strong>{population}</label>
            </div>
        </div>
    )
}