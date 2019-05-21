import React, { Component } from 'react';
import { setProductToBeEdited, deleteProduct } from '../../actions/products';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class ProductCard extends Component {

    state = {
        redirect: false,
        redirectPath: ''
    }

    renderOptions = () => {
        if (!this.props.auth.isAuthenticated()) return;
        return (
            <div className="product-card-options">
                <button className="medium outlined-warning rounded" onClick={() => this.editProduct()}>Edit</button>
                <button className="medium outlined-danger rounded" onClick={() => this.deleteProduct()}>Delete</button>
            </div>
        );
    }

    editProduct = () => {
        this.props.setProductToBeEdited(this.props.product);
        this.setState({redirect: true, redirectPath: '/products/edit'});
    }

    deleteProduct = () => {
        this.props.deleteProduct(this.props.product);
        this.setState({ redirect: true, redirectPath: '/admin' });
    }

    render() {

        const { product } = this.props;
        const { redirect, redirectPath } = this.state;
        if (redirect) return <Redirect to={redirectPath} />;
        return (
            <div className="product-card mt-2">
                <div className="product-card-image">
                    {product.photo_url ? <img src={product.photo_url} alt={product.description} /> : <div className="placeholder-photo">No Photo Available</div>}
                </div>
                <div className="product-card-details">
                    <h3 className="">{product.name}</h3>
                    <div>
                        <p className="mt-1"><i className="fas fa-dollar-sign"></i>{product.price}</p>
                        { this.props.auth ? this.renderOptions() : null }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setProductToBeEdited, deleteProduct })(ProductCard);