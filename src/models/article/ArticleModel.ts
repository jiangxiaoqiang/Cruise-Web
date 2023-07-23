
import { Pagination } from 'rdjs-wheel';

export interface IArticleState {
    data: API.ArticleListItem[],
    recommandArticle: API.ArticleListItem,
    pagination: Pagination,
    maxOffset: number
}



