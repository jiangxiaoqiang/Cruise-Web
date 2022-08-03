
const ArticleReducer = (state=[], action) => {
    switch (action.type) {
        case "GET_ARTICLE":
            state = action.article;
            break;
        case "GET_RECOMMAND_ARTICLES":
            state = action.article;
            break;
        default:
            break;
    }
    return state;
};

export default ArticleReducer;