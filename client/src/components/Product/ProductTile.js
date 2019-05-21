import React from 'react';
import { Link } from 'react-router-dom';

const ProductTile = (props) => {
    return (
        <Link to={props.to} >
            <div className="product-tile">
                {props.children}
            </div>
        </Link>
    );
};

export default ProductTile;