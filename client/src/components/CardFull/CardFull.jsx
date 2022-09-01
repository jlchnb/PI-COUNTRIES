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
                    <div className={CardStyles['out']}>
                        <img className={CardStyles['card-img']} src={item.image} alt='imagen-pais' />
                        <div className={CardStyles['in']}>
                        <h3 className={CardStyles['title']}>Country:{item.name || ""} ({item.id})</h3><br></br>
                        <label><strong>Capital:</strong> {item.capital}</label><br></br>
                        <label><strong>Continent:</strong> {item.continents}</label><br></br>
                        <label><strong>SubRegion:</strong> {item.subregion}</label><br></br>
                        <label><strong>Area:</strong> {item.area}</label><br></br>
                        <label><strong>Population:</strong> {item.population} people</label>
                    </div>
                </div>
                </div>)
            })}
        </div>
    )
}