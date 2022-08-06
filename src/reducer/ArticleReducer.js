
const initState = {
    article: {}
};

const ArticleReducer = (state=initState, action) => {
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
            }
        default:
            break;
    }
    return state;
};

export default ArticleReducer;