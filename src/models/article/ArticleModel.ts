
import { REST } from 'js-wheel';

export interface IArticleState {
    data: API.ArticleListItem[],
    recommandArticle: API.ArticleListItem,
    pagination: REST.Pagination,
    maxOffset: number
}



