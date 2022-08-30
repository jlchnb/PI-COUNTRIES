import React from 'react';
import CardStyles from './card.module.css';

export default function Card({ name, image, continents, capital, className }) {
    return (
        <div className={`${CardStyles['card-container']} ${className}`} >
            <div className={CardStyles['card-header']}>
                <h3 className={CardStyles['card-title']}>{name}</h3>
                <img className={CardStyles['card-img']} src={image} alt='imagen-pais' />
            </div>
            <div className={CardStyles['card-details']}>
                <label><strong>Capital:</strong> {capital}</label>
                <label><strong>Continent:</strong> {continents}</label>
            </div>
        </div>
    )
}
