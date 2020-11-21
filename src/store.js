import {createStore} from 'redux';
import rootReducer from './common/CombineReducer'

const store = createStore(rootReducer);

export default store;

