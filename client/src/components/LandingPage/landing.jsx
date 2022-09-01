import React from 'react';
import { Link } from 'react-router-dom';
import lg from '../LandingPage/lg.module.css';


export default function LandingPage() {
    return (
        <div className={lg.container}>
            <div className={lg.h1}>
                <h1>Countries all over the world</h1>
            </div>
            <Link to='/home'>
                <button className={lg.boton}>Enter</button>
            </Link>
        </div>
    )
}