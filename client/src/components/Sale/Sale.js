import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class Sale extends Component {
    render() {
        return (
            <div className="page">
                Sale
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Sale);