import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class Clothes extends Component {
    render() {
        return (
            <div className="page">
                Clothes
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Clothes);