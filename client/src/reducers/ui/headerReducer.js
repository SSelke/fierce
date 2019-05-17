import {
    SET_MENU_CLOSED,
    SET_CART_CLOSED
} from '../../actions/types';


const initialState = {
    isMenuClosed: true,
    isCartClosed: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_MENU_CLOSED:
            return {
                ...state,
                isMenuClosed: !action.payload
            };
        case SET_CART_CLOSED:
            return {
                ...state,
                isCartClosed: !action.payload
            };
        default:
            return state;
    }
}