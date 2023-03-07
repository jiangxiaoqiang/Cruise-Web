import { combineReducers } from 'redux';

import article from '../reducer/ArticleReducer';
import pay from '../reducer/pay/PayReducer';

const rootReducer = combineReducers({
    article,
    pay
})

export default rootReducer;