import React from 'react'
import classNames from 'classnames';

import './style.scss';


const Badge = ({ color, onClick, className }) => {
    return (
        <i 
            onClick={onClick} 
            className={classNames('badge', {[`badge--${color}`]: color}, className)}
        ></i>
    )
}

export default Badge;