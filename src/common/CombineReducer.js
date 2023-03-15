import { combineReducers } from 'redux';

import article from '../reducer/ArticleReducer';
import pay from '../reducer/pay/PayReducer';
import user from '@/reducer/user/UserReducer';

const rootReducer = combineReducers({
    article,
    pay,
    user
})

export default rootReducer;