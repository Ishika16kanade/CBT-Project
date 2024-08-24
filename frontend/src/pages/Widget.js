import React from 'react';
import '../App.css'


const Widget = ({ title, text }) => {
    return (
        <div className="widget">
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    );
};

export default Widget;
