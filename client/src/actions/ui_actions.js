import {
    SET_MENU_CLOSED,
    SET_CART_CLOSED
} from './types';

export const handleHeaderClick = (data, item) => dispatch => {
    if (item === 'Cart') {
        dispatch({
            type: SET_CART_CLOSED,
            payload: data
        })
    } else if (item === 'Menu') {
        dispatch({
            type: SET_MENU_CLOSED,
            payload: data
        })
    } else {
        return;
    }
}