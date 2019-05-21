import {
    SET_PRODUCTS
} from './types';
import axios from 'axios';

export const setProductToBeEdited = (product) => dispatch => {
    dispatch({
        action: SET_PRODUCT_TO_BE_EDITED,
        payload: product
    });
}

export const deleteProduct = (product) => dispatch => {
    axios.delete('/api/product', { data: { id: product._id } })
        .then(() => {
            dispatch(updateProducts());
        })
}

export const updateProducts = () => dispatch => {
    axios.get('/api/products')
         .then(response => {
             dispatch({
                 action: SET_PRODUCTS,
                 payload: response.data
             });
         })

}