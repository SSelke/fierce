import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import ProductCard from '../Product/ProductCard';

class Admin extends Component {

    state = {
        products: [],
        sortedProducts: [],
        inputNumber: 0.00,
        show: false
    }

    handleSelectChange = async (event) => {
        let sortedProducts = [];
        if ( event.target.value === 'all' ) {
            await this.setState({sortedProducts: [...this.state.products]});
            return;
        }
        const products = [...this.state.products];
        sortedProducts = products.filter( product => {
            return product.category == event.target.value;
        });
        this.setState({sortedProducts: sortedProducts});
    }  
    
    displayProducts = () => {
        const products = [...this.state.sortedProducts];
        if ( products.length == 0 ) {
            return <div>No Products Available</div>;
        }
        const chunked = _.chunk(products, 4);
        return chunked.map( chunk => this.renderRow(chunk) );
    }

    renderRow = (chunk) => {
        return <div className="product-row" key={`${Math.random()}`}>
            {chunk.map((product) => <ProductCard product={product} auth={this.props.auth} {...this.props}/>)}
        </div>;
    }

    handleNumberChange = (event) => {
        const number = parseFloat(event.target.value).toFixed(2);
        this.setState({inputNumber: number});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData();
        const { 
            name,
            description, 
            price, 
            category,
            skew
        } = event.target;
        const image = event.target.image.files[0];
        data.append('image', image);
        data.append('name', name.value);
        data.append('description', description.value);
        data.append('price', price.value);
        data.append('category', category.value);
        data.append('skew', skew.value);
        const { getIdToken } = this.props.auth;
        const API_URL = 'http://localhost:5600/api';
        const headers = { 'Authorization': `Bearer ${getIdToken()}` }
        axios.post(`http://localhost:5600/api/product`, data, { headers })
            .then(response => this.setState({ message: response.data.message, show: false }))
            .catch(error => this.setState({ message: error.message }));
    }

    render() {
        const { inputNumber, show } = this.state;
        const styles = show ? 'new-product-show' : '';
        return (
            <React.Fragment>
                <div className={`new-product ${styles}`}>
                    <div className="new-product-form">
                        <div className="product-form-close" onClick={() => this.setState({show: false})}><div className="close"></div></div>
                        <h3 className="my-2">New Product</h3>
                        <form method="POST" action="/api/product" encType="multipart/form-data" onSubmit={() => this.handleSubmit(event)}>
                            <div>
                                <label htmlFor="product-name">Product Name</label>
                                <input type="text" name="name" maxLength="50" id="product-name" required/>
                            </div>
                            <div>
                                <label htmlFor="product-description">Product Description</label>
                                <textarea id="product-description" name="description" required></textarea>
                            </div>
                            <div>
                                <label htmlFor="product-price">Product Price</label>
                                <div><div className="inside-dollar"><i className="fas fa-dollar-sign"></i><input type="number" min="0.00" max="1000000" id="product-price" name="price" onChange={() => this.handleNumberChange(event)} required/></div></div>
                            </div>
                            <div>
                                <label htmlFor="product-category">Product Category</label>
                                <select name="category" required>
                                    <option value="accessories">Accessories</option>
                                    <option value="clothes">Clothes</option>
                                    <option value="sale">Sale</option>
                                    <option value="wearables">Wearables</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="product-skew">Product Skew</label>
                                <input type="text" name="skew" maxLength="6" id="product-skew" required/>
                            </div>
                            <div>
                                <label htmlFor="product-skew">Product Picture</label>
                                <input type="file" name="image"/>
                            </div>
                            <input type="submit" />
                        </form>
                    </div>
                </div>
                <div className="page admin">
                    <div className="admin-header">
                        <h2>Administration Page</h2>
                        <div className="admin-header-options mt-3">
                            <button onClick={() => this.setState({show: true})}>New Product</button>
                            <div>
                                <span> Filter Results </span>
                                <select onChange={() => this.handleSelectChange(event)}>
                                    <option value="all">All</option>
                                    <option value="accessories">Accessories</option>
                                    <option value="clothes">Clothes</option>
                                    <option value="sale">Sale</option>
                                    <option value="wearables">Wearables</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="products-display mt-5">
                        {this.displayProducts()}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({products: state.products});

export default connect(mapStateToProps, null)(Admin);