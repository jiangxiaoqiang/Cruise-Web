import {createStore} from 'redux';
import rootReducer from './app/CombineReducer'

const store = createStore(rootReducer);

export default store;

