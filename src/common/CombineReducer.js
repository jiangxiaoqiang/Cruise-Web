import { combineReducers } from 'redux';

import article from '../reducer/ArticleReducer';

const rootReducer = combineReducers({
    article
})

export default rootReducer;