const initState = {
    article: {}
};

const ArticleReducer = (state=initState, action:any) => {
    switch (action.type) {
        case "GET_ARTICLE":
            state = action.article;
            break;
        case "GET_RECOMMAND_ARTICLES":
            return {
                ...state,
                article: action.article
            };
        case "GET_OFFICIAL_ARTICLES":
            return {
                ...state,
                article: action.article
            };
        case "CLEAR_ARTICLES":
            return {
                ...state,
                article: {}
            };
        case "USER_LOGIN":
            return {
                ...state,
                redirectUrl: action.redirectUrl
            };
        default:
            break;
    }
    return state;
};

export default ArticleReducer;