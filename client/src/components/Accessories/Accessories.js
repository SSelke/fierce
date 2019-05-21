import React, { Component } from 'react';
import { connect } from 'react-redux';

class Accessories extends Component {
    render() {
        return (
            <div className="page">
                Accessories
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(
    mapStateToProps,
)(Accessories);