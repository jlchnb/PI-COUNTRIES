import React from 'react';
import CardStyles from './card.module.css';
import { Link } from 'react-router-dom';

export default function Card({id, name, image, continents, capital, className }) {
    return (
        <div className={`${CardStyles['card-container']} ${className}`} >
            <div className={CardStyles['card-header']}>
                <h3 className={CardStyles['card-title']}>{name}</h3>
                <Link to={`countries/${id}`}>
                    
                    <img className={CardStyles['card-img']} src={image} alt='imagen-pais'/>
                </Link>
            </div>
            <div className={CardStyles['card-details']}>
                <label><strong>Capital:</strong> {capital}</label>
                <label><strong>Continent:</strong> {continents}</label>
            </div>
        </div>
    )
}
