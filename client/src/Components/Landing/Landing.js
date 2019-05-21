import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductTile from '../Product/ProductTile';
const Landing = () => {
    const [style, setStyle] = useState('');
    return (
        <div className="landing page">
            <Link to="/" className="landing-header-link mt-3">
                <div className="landing-header">
                    <h2 className="landing-header-title">ALL GLASSES 20% OFF</h2>
                    <img src="/images/glasses-left.png" className="image-sides" />
                    <img src="/images/glasses-center.png" />
                    <img src="/images/glasses-right.png" className="image-sides" />
                </div>
            </Link>
            <div className="product-tile-container">
                <ProductTile to="/accessories">
                    <div className="product-tile-header">
                        <h4>Signature Line | By Fierce</h4>
                        <p>Wearables are now available</p>
                    </div>
                    <div className="product-tile-image">
                        <img src="/images/suspender-spaded.jpg" className={style} alt="Picture of a man in suspenders" onLoad={() => setStyle('loaded')} />
                    </div>
                </ProductTile>
                <ProductTile to="/accessories">
                    <div className="product-tile-header">
                        <h4>Signature Line | By Fierce</h4>
                        <p>Wearables are now available</p>
                    </div>
                    <div className="product-tile-image">
                        <img src="/images/suspender-spaded.jpg" className={style} alt="Picture of a man in suspenders" onLoad={() => setStyle('loaded')} />
                    </div>
                </ProductTile>
            </div>
        </div>
    );
};

export default Landing;