import { SET_PRODUCTS } from './types';
import axios from 'axios';

export const setProductToBeEdited = (product) => dispatch => {
    dispatch({
        type: SET_PRODUCT_TO_BE_EDITED,
        payload: product
    });
    dispatch(getProducts());
}

export const deleteProduct = (product, history) => dispatch => {
    axios.post('/api/product/delete', { data: { id: product._id } })
        .then(() => {
            console.log('hit');
            dispatch(getProducts());
        })
}

export const getProducts = () => dispatch => {
    console.log('hit');
    axios.get('/api/products')
         .then(response => {
             dispatch({
                 type: SET_PRODUCTS,
                 payload: response.data
             });
         })

}