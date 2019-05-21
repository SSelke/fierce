import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class Wearables extends Component {
    render() {
        return (
            <div className="page">
                Wearables
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Wearables);