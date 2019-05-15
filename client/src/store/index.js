import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from '../reducers';

/* Save Data to Local Storage on State change */

const saveToLocalStorage = (state) => {
    try {
        const serializeState = JSON.stringify(state);
        localStorage.setItem('state', serializeState);
    } catch (error) {
        throw new Error(error, 'State was not saved in Local Storage');
    }
}

/* Attempt to load state from Local Storage */

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null ) return undefined;
        return JSON.parse(serializedState);
    } catch (error) {
        throw new Error(error, 'State was not loaded from Local Storage');
    }
}

/* Create Redux Store */

const persistedState = loadFromLocalStorage();

const store = createStore(
    reducers,
    persistedState,
    composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe( () => saveToLocalStorage(store.getState()));

export default store;