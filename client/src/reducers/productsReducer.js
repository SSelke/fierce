import { SET_PRODUCTS } from '../actions/types';

const initialState = {
    products: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                products: [...action.payload]
            }
        default:
            return state;
    }
}