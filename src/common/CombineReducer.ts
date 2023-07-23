import { combineReducers } from 'redux';
import article from '../reducer/article/ArticleReducer';
import pay from '../reducer/pay/PayReducer';
import user from '@/reducer/user/UserReducer';
import feedback from '@/reducer/user/FeedbackReducer';

const rootReducer = combineReducers({
    article,
    pay,
    user,
    feedback
})

export default rootReducer;