import React from 'react';

import PaginationStyles from './pagination.module.css';

export default function Pagination({ countriesPerPage, allCountries, pagination }) {
    const pageNumbers = []

    for (let i = 0; i < Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    return (
        <nav className={PaginationStyles['nav-pagination']}>
            <ul className={PaginationStyles['pagination-container']}>
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li className={PaginationStyles['pagination-options']} key={number} onClick={() => pagination(number)}>
                            {number}
                        </li>
                    ))}
            </ul>
        </nav>
    )
}