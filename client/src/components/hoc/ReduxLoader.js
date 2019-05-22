import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/products';

class ReduxLoader extends Component {

    componentDidMount() {
        this.props.getProducts();
    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default connect(null, { getProducts })(ReduxLoader);