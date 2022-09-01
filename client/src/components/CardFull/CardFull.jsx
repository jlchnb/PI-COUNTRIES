import React from 'react';
import CardStyles from './cf.module.css';
import { useParams } from 'react-router-dom';
import { getDetailedCountry } from '../../actions/actions';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function CardFull({ className }) {

    const params = useParams();
    const dispatch = useDispatch();
    const detailedCountry = useSelector((state) => state.countriesCopy);
    console.log(detailedCountry[0], 'soy el detalle');


    useEffect(() => {
        dispatch(getDetailedCountry(params.id))
    }, [dispatch])

    // if(detailedCountry.length >= 1) return null;
    return (
        <div>
            {detailedCountry.map(item => {
                return (<div key={item.id} className={`${CardStyles['card-container']} ${className}`} >
                    <div className={CardStyles['card-header']}>
                        <h3 className={CardStyles['card-title']}>Nombre:{item.name || ""} id:{item.id}</h3>
                        <img className={CardStyles['card-img']} src={item.image} alt='imagen-pais' />
                    </div>

                    <div className={CardStyles['card-details']}>
                        <label><strong>Capital:</strong> {item.capital}</label>
                        <label><strong>Continent:</strong> {item.continents}</label>
                        <label><strong>SubRegion:</strong> {item.subregion}</label>
                        <label><strong>Area:</strong> {item.area}</label>
                        <label><strong>Population:</strong>{item.population}</label>
                    </div>
                </div>)
            })}
        </div>
    )
}